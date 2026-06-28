import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: {
        name: name.trim(),
        address: address.trim(),
        number: number.trim(),
        contact: contact.trim(),
      },
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
    const { id } = await params;

    await prisma.company.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
