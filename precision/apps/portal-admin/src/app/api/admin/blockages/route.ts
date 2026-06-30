import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const { searchParams } = new URL(request.url);
    const companyIdParam = searchParams.get('companyId');

    const companyId = isSuperAdmin && companyIdParam ? companyIdParam : session.companyId;

    if (!companyId) {
      return NextResponse.json({ error: 'Nenhuma empresa associada' }, { status: 400 });
    }

    const blockages = await prisma.workBlockage.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });

    const weekdays = blockages
      .filter((b) => b.type === 'WEEKDAY' && b.dayOfWeek !== null)
      .map((b) => b.dayOfWeek as number);

    const dates = blockages.filter((b) => b.type === 'DATE' && b.date !== null);

    return NextResponse.json({ weekdays, dates });
  } catch (error) {
    console.error('Erro ao buscar bloqueios:', error);
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

    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const body = await request.json();
    const { type, companyIdParam } = body;

    const companyId = isSuperAdmin && companyIdParam ? companyIdParam : session.companyId;

    if (!companyId) {
      return NextResponse.json({ error: 'Nenhuma empresa associada' }, { status: 400 });
    }

    if (type === 'WEEKDAY') {
      const { dayOfWeek } = body; // Array of numbers, e.g. [0, 6]
      if (!Array.isArray(dayOfWeek)) {
        return NextResponse.json({ error: 'Dias da semana inválidos' }, { status: 400 });
      }

      // Delete existing weekday blockages and insert new ones inside a transaction
      await prisma.$transaction(async (tx) => {
        await tx.workBlockage.deleteMany({
          where: {
            companyId,
            type: 'WEEKDAY',
          },
        });

        if (dayOfWeek.length > 0) {
          await tx.workBlockage.createMany({
            data: dayOfWeek.map((day) => ({
              companyId,
              type: 'WEEKDAY',
              dayOfWeek: day,
            })),
          });
        }
      });

      return NextResponse.json({ success: true });
    }

    if (type === 'DATE') {
      const { date, reason } = body; // date: "YYYY-MM-DD", reason: string
      if (!date || !reason) {
        return NextResponse.json({ error: 'Data e motivo são obrigatórios' }, { status: 400 });
      }

      // Check duplicate date block
      const existing = await prisma.workBlockage.findFirst({
        where: {
          companyId,
          type: 'DATE',
          date,
        },
      });

      if (existing) {
        return NextResponse.json({ error: 'duplicateBlock' }, { status: 400 });
      }

      const block = await prisma.workBlockage.create({
        data: {
          companyId,
          type: 'DATE',
          date,
          reason,
        },
      });

      return NextResponse.json({ success: true, block });
    }

    return NextResponse.json({ error: 'Tipo de bloqueio inválido' }, { status: 400 });
  } catch (error) {
    console.error('Erro ao salvar bloqueio:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    // Verify company scope
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const blockage = await prisma.workBlockage.findUnique({
      where: { id },
    });

    if (!blockage) {
      return NextResponse.json({ error: 'Bloqueio não encontrado' }, { status: 404 });
    }

    if (!isSuperAdmin && blockage.companyId !== session.companyId) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    await prisma.workBlockage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar bloqueio:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
