import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const roles = await prisma.jobRole.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(roles);
  } catch (error) {
    console.error('Erro ao listar cargos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'O nome do cargo é obrigatório' }, { status: 400 });
    }

    const newRole = await prisma.jobRole.create({
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar cargo:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
