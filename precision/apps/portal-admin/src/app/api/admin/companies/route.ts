import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const companyId = session.companyId;

    const companies = await prisma.company.findMany({
      where: isSuperAdmin ? {} : { id: companyId },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(companies);
  } catch (error) {
    console.error('Erro ao listar empresas:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Only SUPERADMIN can create companies (register new tenants)
    if (session.userRole !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Acesso negado. Apenas administradores globais podem criar empresas.' }, { status: 403 });
    }

    const body = await request.json();
    const { name, address, number, contact, subscriptionPlan } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'O nome da empresa é obrigatório' }, { status: 400 });
    }
    if (!address || address.trim() === '') {
      return NextResponse.json({ error: 'O endereço da empresa é obrigatório' }, { status: 400 });
    }
    if (!number || number.trim() === '') {
      return NextResponse.json({ error: 'O número do endereço é obrigatório' }, { status: 400 });
    }
    if (!contact || contact.trim() === '') {
      return NextResponse.json({ error: 'O contato da empresa é obrigatório' }, { status: 400 });
    }

    const plan = subscriptionPlan || 'TRIAL';
    const endsAt = new Date();
    if (plan === 'THREE_MONTHS') {
      endsAt.setMonth(endsAt.getMonth() + 3);
    } else if (plan === 'SIX_MONTHS') {
      endsAt.setMonth(endsAt.getMonth() + 6);
    } else {
      // TRIAL
      endsAt.setDate(endsAt.getDate() + 15);
    }

    const newCompany = await prisma.company.create({
      data: {
        name: name.trim(),
        address: address.trim(),
        number: number.trim(),
        contact: contact.trim(),
        subscriptionPlan: plan,
        subscriptionStatus: 'ACTIVE',
        subscriptionEndsAt: endsAt,
      },
    });

    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
