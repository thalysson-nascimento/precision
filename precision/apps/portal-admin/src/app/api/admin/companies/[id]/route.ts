import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { id } = await params;
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const isOwner = session.userRole === 'OWNER';

    // Verification of permissions
    if (!isSuperAdmin && (!isOwner || session.companyId !== id)) {
      return NextResponse.json({ error: 'Acesso negado. Apenas o proprietário da empresa ou administradores globais podem editar estes dados.' }, { status: 403 });
    }

    const body = await request.json();
    const { name, address, number, contact, subscriptionPlan, subscriptionStatus } = body;

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

    // Only SUPERADMIN can change subscription plan/status
    const updateData: any = {
      name: name.trim(),
      address: address.trim(),
      number: number.trim(),
      contact: contact.trim(),
    };

    if (isSuperAdmin) {
      if (subscriptionPlan) {
        updateData.subscriptionPlan = subscriptionPlan;
        const endsAt = new Date();
        if (subscriptionPlan === 'THREE_MONTHS') {
          endsAt.setMonth(endsAt.getMonth() + 3);
        } else if (subscriptionPlan === 'SIX_MONTHS') {
          endsAt.setMonth(endsAt.getMonth() + 6);
        } else {
          endsAt.setDate(endsAt.getDate() + 15);
        }
        updateData.subscriptionEndsAt = endsAt;
      }
      if (subscriptionStatus) {
        updateData.subscriptionStatus = subscriptionStatus;
      }
    }

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { id } = await params;
    const isSuperAdmin = session.userRole === 'SUPERADMIN';

    // Only SUPERADMIN can delete companies (deleting tenants is a high-risk system action)
    if (!isSuperAdmin) {
      return NextResponse.json({ error: 'Acesso negado. Apenas administradores globais podem excluir empresas.' }, { status: 403 });
    }

    await prisma.company.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
