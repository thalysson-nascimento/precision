import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';

// Mapeador de tipo de pendência para tipo de TimeRecord
const mapAdjustmentTypeToRecordType = (type: string): 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT' | null => {
  const t = type.toUpperCase();
  if (t.includes('INÍCIO') || t.includes('ENTRADA') || t.includes('IN')) return 'IN';
  if (t.includes('SAÍDA ALMOÇO') || t.includes('LUNCH_OUT')) return 'LUNCH_OUT';
  if (t.includes('RETORNO') || t.includes('LUNCH_IN')) return 'LUNCH_IN';
  if (t.includes('SAÍDA') || t.includes('FIM') || t.includes('OUT')) return 'OUT';
  return null;
};

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const companyId = session.companyId;

    const body = await req.json();
    const { requestId, action } = body;

    if (!action) {
      return NextResponse.json({ error: 'Ação não informada' }, { status: 400 });
    }

    if (action === 'bulk_approve') {
      // Buscar todas as pendências PENDING filtrando por empresa
      const pendingAdjustments = await prisma.timeAdjustment.findMany({
        where: { 
          status: 'PENDING',
          employee: isSuperAdmin ? {} : { companyId },
        },
      });

      // Aprovar cada uma delas
      const operations = pendingAdjustments.map(async (adj) => {
        // Se for ajuste de ponto, cria/atualiza o TimeRecord
        const recType = mapAdjustmentTypeToRecordType(adj.type);
        if (recType && adj.time) {
          await prisma.timeRecord.upsert({
            where: {
              employeeId_date_type: {
                employeeId: adj.employeeId,
                date: adj.date,
                type: recType,
              },
            },
            update: {
              time: adj.time,
              confirmed: true,
            },
            create: {
              employeeId: adj.employeeId,
              date: adj.date,
              type: recType,
              time: adj.time,
              confirmed: true,
            },
          });
        }

        // Atualizar status do ajuste
        return prisma.timeAdjustment.update({
          where: { id: adj.id },
          data: { status: 'APPROVED' },
        });
      });

      await Promise.all(operations);

      return NextResponse.json({ success: true, message: 'Todas as pendências foram aprovadas com sucesso' });
    }

    if (!requestId) {
      return NextResponse.json({ error: 'ID da solicitação não informado' }, { status: 400 });
    }

    // Buscar a solicitação correspondente incluindo o colaborador para verificar tenant
    const adjustment = await prisma.timeAdjustment.findUnique({
      where: { id: requestId },
      include: { employee: true },
    });

    if (!adjustment) {
      return NextResponse.json({ error: 'Solicitação não encontrada' }, { status: 404 });
    }

    // Tenant check
    if (!isSuperAdmin && adjustment.employee.companyId !== companyId) {
      return NextResponse.json({ error: 'Acesso negado. Esta solicitação pertence a colaborador de outra empresa.' }, { status: 403 });
    }

    if (action === 'approve') {
      const recType = mapAdjustmentTypeToRecordType(adjustment.type);
      
      // Se for um tipo de ajuste de horário e tiver o horário especificado
      if (recType && adjustment.time) {
        await prisma.timeRecord.upsert({
          where: {
            employeeId_date_type: {
              employeeId: adjustment.employeeId,
              date: adjustment.date,
              type: recType,
            },
          },
          update: {
            time: adjustment.time,
            confirmed: true,
          },
          create: {
            employeeId: adjustment.employeeId,
            date: adjustment.date,
            type: recType,
            time: adjustment.time,
            confirmed: true,
          },
        });
      }

      // Atualizar status do ajuste
      await prisma.timeAdjustment.update({
        where: { id: requestId },
        data: { status: 'APPROVED' },
      });

      return NextResponse.json({ success: true, message: 'Solicitação aprovada e ponto registrado/corrigido' });
    } else if (action === 'reject') {
      await prisma.timeAdjustment.update({
        where: { id: requestId },
        data: { status: 'REJECTED' },
      });

      return NextResponse.json({ success: true, message: 'Solicitação rejeitada com sucesso' });
    } else {
      return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erro ao processar solicitação administrativa:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
