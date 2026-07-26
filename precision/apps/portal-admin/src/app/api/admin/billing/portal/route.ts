import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

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

    if (!company.stripeCustomerId) {
      return NextResponse.json({ error: 'Você ainda não possui uma assinatura ativa ou histórico de pagamentos no Stripe.' }, { status: 400 });
    }

    // Get origin to redirect back to portal
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: company.stripeCustomerId,
      return_url: `${origin}/settings`
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Erro ao criar sessão do portal do cliente:', error);
    return NextResponse.json({ error: error.message || 'Erro interno do servidor' }, { status: 500 });
  }
}
