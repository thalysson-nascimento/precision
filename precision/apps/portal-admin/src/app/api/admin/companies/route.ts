import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
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
    const body = await request.json();
    const { name, address, number, contact } = body;

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

    const newCompany = await prisma.company.create({
      data: {
        name: name.trim(),
        address: address.trim(),
        number: number.trim(),
        contact: contact.trim(),
      },
    });

    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
