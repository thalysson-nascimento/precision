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
      return NextResponse.json({ error: 'O nome do cargo é obrigatório' }, { status: 400 });
    }

    const existingRole = await prisma.jobRole.findUnique({
      where: { id },
    });

    if (!existingRole) {
      return NextResponse.json({ error: 'Cargo não encontrado' }, { status: 404 });
    }

    // Tenant authorization check
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    if (!isSuperAdmin && existingRole.companyId !== session.companyId) {
      return NextResponse.json({ error: 'Acesso negado. Este cargo pertence a outra empresa.' }, { status: 403 });
    }

    const updatedRole = await prisma.jobRole.update({
      where: { id },
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(updatedRole);
  } catch (error) {
    console.error('Erro ao atualizar cargo:', error);
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

    const existingRole = await prisma.jobRole.findUnique({
      where: { id },
    });

    if (!existingRole) {
      return NextResponse.json({ error: 'Cargo não encontrado' }, { status: 404 });
    }

    // Tenant authorization check
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    if (!isSuperAdmin && existingRole.companyId !== session.companyId) {
      return NextResponse.json({ error: 'Acesso negado. Este cargo pertence a outra empresa.' }, { status: 403 });
    }

    await prisma.jobRole.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir cargo:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
