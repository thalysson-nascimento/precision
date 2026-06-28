import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
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
    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'O nome da equipe é obrigatório' }, { status: 400 });
    }

    const newTeam = await prisma.team.create({
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar equipe:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
