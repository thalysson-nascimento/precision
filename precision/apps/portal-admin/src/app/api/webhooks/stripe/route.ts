import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';
import priceMapping from '@/lib/stripe-prices.json';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Helper to find planId from price ID by inverting stripe-prices.json
function getPlanIdFromPriceId(priceId: string): string {
  const invertedMapping = Object.entries(priceMapping).reduce((acc, [key, value]) => {
    // Strip currency suffix (e.g. "_BRL" or "_EUR") from key to get planId
    const planIdWithoutCurrency = key.replace(/_(BRL|EUR)$/, '');
    acc[value] = planIdWithoutCurrency;
    return acc;
  }, {} as Record<string, string>);

  return invertedMapping[priceId] || 'TRIAL';
}

function getPlanLimit(planId: string): number {
  if (planId === 'TRIAL') return 15;
  if (planId === 'THREE_MONTHS') return 30;
  if (planId === 'SIX_MONTHS') return 50;
  const match = planId.match(/^(\d+)_EMPLOYEES_/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 15; // default fallback
}

function getSubscriptionPeriodEnd(subscription: any): Date {
  const periodEnd = subscription.current_period_end || subscription.items?.data?.[0]?.current_period_end;
  if (periodEnd) {
    return new Date(periodEnd * 1000);
  }
  // Default fallback: 30 days from now
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}

async function enforceCompanyEmployeeLimit(companyId: string, planId: string) {
  const limit = getPlanLimit(planId);
  
  // Find all currently active employees for the company, ordered by createdAt asc (oldest first)
  const activeEmployees = await prisma.employee.findMany({
    where: { companyId, isActive: true },
    orderBy: { createdAt: 'asc' }
  });

  if (activeEmployees.length > limit) {
    const excessCount = activeEmployees.length - limit;
    // Deactivate excess active employees (newest first)
    const employeesToDeactivate = activeEmployees.slice(limit);
    const idsToDeactivate = employeesToDeactivate.map(e => e.id);
    
    await prisma.employee.updateMany({
      where: { id: { in: idsToDeactivate } },
      data: { isActive: false }
    });
    console.log(`[Limit Enforcement] Desativados ${excessCount} colaboradores excedentes para a empresa ${companyId}. Limite do plano: ${limit}.`);
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    if (!webhookSecret || webhookSecret === 'whsec_placeholder') {
      console.warn('[Stripe Webhook] Webhook secret is not configured or is a placeholder. Skipping signature verification for local testing.');
      // In local dev, if webhookSecret is placeholder, we parse directly (only use for testing!)
      event = JSON.parse(body) as Stripe.Event;
    } else {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    }
  } catch (err: any) {
    console.error(`[Stripe Webhook Error] Falha na verificação de assinatura: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log(`[Stripe Webhook] Recebido evento do tipo: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const companyId = session.metadata?.companyId;
        const planId = session.metadata?.planId;
        const subscriptionId = session.subscription as string;

        if (companyId && subscriptionId) {
          // Retrieve subscription details to get period end
          const subscription = (await stripe.subscriptions.retrieve(subscriptionId)) as any;
          const endsAt = getSubscriptionPeriodEnd(subscription);

          await prisma.company.update({
            where: { id: companyId },
            data: {
              stripeSubscriptionId: subscriptionId,
              stripeCustomerId: session.customer as string,
              subscriptionPlan: planId || 'TRIAL',
              subscriptionStatus: 'ACTIVE',
              subscriptionEndsAt: endsAt
            }
          });
          console.log(`[Stripe Webhook] Assinatura ativada para empresa ${companyId}. Plano: ${planId}. Expira em: ${endsAt}`);
          await enforceCompanyEmployeeLimit(companyId, planId || 'TRIAL');
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as any;
        const subscriptionId = invoice.subscription as string;

        if (subscriptionId) {
          const subscription = (await stripe.subscriptions.retrieve(subscriptionId)) as any;
          const endsAt = getSubscriptionPeriodEnd(subscription);

          // Find company by subscription ID
          const company = await prisma.company.findFirst({
            where: { stripeSubscriptionId: subscriptionId }
          });

          if (company) {
            await prisma.company.update({
              where: { id: company.id },
              data: {
                subscriptionStatus: 'ACTIVE',
                subscriptionEndsAt: endsAt
              }
            });
            console.log(`[Stripe Webhook] Fatura paga para empresa ${company.id}. Período estendido até: ${endsAt}`);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;
        const priceId = subscription.items.data[0]?.price.id;
        // Prioritize planId from subscription metadata (production), fallback to priceId mapping (dev/test)
        const planId = subscription.metadata?.planId || getPlanIdFromPriceId(priceId);
        const endsAt = getSubscriptionPeriodEnd(subscription);
        const status = subscription.status === 'active' ? 'ACTIVE' : 'EXPIRED';

        const company = await prisma.company.findFirst({
          where: { stripeCustomerId: subscription.customer as string }
        });

        if (company) {
          await prisma.company.update({
            where: { id: company.id },
            data: {
              stripeSubscriptionId: subscription.id,
              subscriptionPlan: planId,
              subscriptionStatus: status,
              subscriptionEndsAt: endsAt
            }
          });
          console.log(`[Stripe Webhook] Assinatura atualizada para empresa ${company.id}. Novo Plano: ${planId}. Status: ${status}. Expira em: ${endsAt}`);
          await enforceCompanyEmployeeLimit(company.id, planId);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;

        const company = await prisma.company.findFirst({
          where: { stripeSubscriptionId: subscription.id }
        });

        if (company) {
          await prisma.company.update({
            where: { id: company.id },
            data: {
              subscriptionStatus: 'EXPIRED'
            }
          });
          console.log(`[Stripe Webhook] Assinatura cancelada para empresa ${company.id}. Status definido como EXPIRED.`);
        }
        break;
      }

      default:
        console.log(`[Stripe Webhook] Ignorando evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Stripe Webhook Processing Error]:', error);
    return NextResponse.json({ error: 'Erro no processamento do webhook' }, { status: 500 });
  }
}
