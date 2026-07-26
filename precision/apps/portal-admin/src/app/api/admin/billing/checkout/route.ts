import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';
import Stripe from 'stripe';
import priceMapping from '@/lib/stripe-prices.json';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

function generateRandomSuffix(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const isOwner = session.userRole === 'OWNER';
    const isAdmin = session.userRole === 'ADMIN';

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Acesso negado. Apenas administradores da empresa podem gerenciar cobranças.' }, { status: 403 });
    }

    const company = await prisma.company.findUnique({
      where: { id: session.companyId }
    });

    if (!company) {
      return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 });
    }

    const body = await request.json();
    const { planId } = body; // e.g., planId: "15_EMPLOYEES_MONTHLY"

    if (!planId) {
      return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 });
    }

    // Trava a moeda com base no país cadastrado no banco de dados da empresa
    const companyCountry = (company.country || 'BR').toUpperCase();
    const lockedCurrency = (companyCountry === 'BR' || companyCountry === 'BRASIL') ? 'BRL' : 'EUR';

    const priceKey = `${planId}_${lockedCurrency}`;
    // Check environment variables first (prefixed with PRICE_ to satisfy Vercel naming conventions), fallback to stripe-prices.json
    const priceId = process.env[`PRICE_${priceKey}`] || (priceMapping as Record<string, string>)[priceKey];

    if (!priceId) {
      return NextResponse.json({ error: `Preço não encontrado para a chave: ${priceKey}` }, { status: 400 });
    }

    let stripeCustomerId = company.stripeCustomerId;

    // Create a new customer in Stripe if not exists
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: company.email || undefined,
        name: company.name,
        metadata: {
          companyId: company.id
        }
      });
      stripeCustomerId = customer.id;

      await prisma.company.update({
        where: { id: company.id },
        data: { stripeCustomerId }
      });
    }

    // Get origin to redirect back to portal
    const origin = request.headers.get('origin') || 'http://localhost:3002';

    // Calculate remaining trial days if company is currently in TRIAL
    let trialPeriodDays: number | undefined = undefined;
    if (company.subscriptionPlan === 'TRIAL' && company.subscriptionEndsAt) {
      const msRemaining = new Date(company.subscriptionEndsAt).getTime() - Date.now();
      const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));
      if (daysRemaining > 0) {
        // Stripe expects an integer number of days
        trialPeriodDays = daysRemaining;
      }
    }

    // Create checkout session configuration
    const sessionConfig: any = {
      mode: 'subscription',
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      automatic_tax: { enabled: false },
      tax_id_collection: { enabled: true },
      customer_update: {
        name: 'auto',
        address: 'auto'
      },
      success_url: `${origin}/settings?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${origin}/settings?cancelled=true`,
      metadata: {
        companyId: company.id,
        planId: planId,
        currency: lockedCurrency
      },
      subscription_data: {
        metadata: {
          companyId: company.id,
          planId: planId
        }
      },
      integration_identifier: `precision_checkout_${generateRandomSuffix()}`
    };

    // If there is active trial time left, respect it in the subscription
    if (trialPeriodDays && trialPeriodDays > 0) {
      sessionConfig.subscription_data.trial_period_days = trialPeriodDays;
    }

    const checkoutSession = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json({ error: error.message || 'Erro interno do servidor' }, { status: 500 });
  }
}
