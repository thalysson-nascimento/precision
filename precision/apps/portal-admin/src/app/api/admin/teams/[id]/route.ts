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
    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'O nome da equipe é obrigatório' }, { status: 400 });
    }

    const existingTeam = await prisma.team.findUnique({
      where: { id },
    });

    if (!existingTeam) {
      return NextResponse.json({ error: 'Equipe não encontrada' }, { status: 404 });
    }

    // Tenant authorization check
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    if (!isSuperAdmin && existingTeam.companyId !== session.companyId) {
      return NextResponse.json({ error: 'Acesso negado. Esta equipe pertence a outra empresa.' }, { status: 403 });
    }

    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error('Erro ao atualizar equipe:', error);
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

    const existingTeam = await prisma.team.findUnique({
      where: { id },
    });

    if (!existingTeam) {
      return NextResponse.json({ error: 'Equipe não encontrada' }, { status: 404 });
    }

    // Tenant authorization check
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    if (!isSuperAdmin && existingTeam.companyId !== session.companyId) {
      return NextResponse.json({ error: 'Acesso negado. Esta equipe pertence a outra empresa.' }, { status: 403 });
    }

    await prisma.team.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir equipe:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
