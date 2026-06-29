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

    const teams = await prisma.team.findMany({
      where: isSuperAdmin ? {} : { companyId },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Erro ao listar equipes:', error);
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

    const body = await request.json();
    const { name, companyId: bodyCompanyId } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'O nome da equipe é obrigatório' }, { status: 400 });
    }

    // Determine target companyId
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const targetCompanyId = isSuperAdmin ? bodyCompanyId : session.companyId;

    if (!targetCompanyId) {
      return NextResponse.json({ error: 'ID da empresa é obrigatório' }, { status: 400 });
    }

    // Check if team name already exists for this company
    const existing = await prisma.team.findFirst({
      where: {
        name: name.trim(),
        companyId: targetCompanyId,
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'Já existe uma equipe com este nome nesta empresa.' }, { status: 400 });
    }

    const newTeam = await prisma.team.create({
      data: {
        name: name.trim(),
        companyId: targetCompanyId,
      },
    });

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar equipe:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
