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

    const { searchParams } = new URL(request.url);
    const isSuperAdmin = session.userRole === 'SUPERADMIN';

    if (isSuperAdmin) {
      const companyId = searchParams.get('companyId');

      if (companyId) {
        // Fetch chat messages for a specific company
        const messages = await prisma.supportMessage.findMany({
          where: { companyId },
          orderBy: { createdAt: 'asc' },
        });
        return NextResponse.json(messages);
      } else {
        // Fetch all companies with their last message to show in the superadmin sidebar
        const companies = await prisma.company.findMany({
          include: {
            supportMessages: {
              orderBy: { createdAt: 'desc' },
              take: 1,
            },
          },
        });

        // Sort companies: put the ones with messages or expired trials first
        const sortedCompanies = companies.sort((a, b) => {
          const aHasMsg = a.supportMessages.length > 0;
          const bHasMsg = b.supportMessages.length > 0;
          if (aHasMsg && !bHasMsg) return -1;
          if (!aHasMsg && bHasMsg) return 1;
          
          const aTime = aHasMsg ? new Date(a.supportMessages[0].createdAt).getTime() : 0;
          const bTime = bHasMsg ? new Date(b.supportMessages[0].createdAt).getTime() : 0;
          if (aTime !== bTime) return bTime - aTime;

          return a.name.localeCompare(b.name);
        });

        return NextResponse.json(sortedCompanies);
      }
    } else {
      // Regular company admin: fetch messages for their own company
      const companyId = session.companyId;
      if (!companyId) {
        return NextResponse.json({ error: 'Empresa não vinculada' }, { status: 400 });
      }

      const messages = await prisma.supportMessage.findMany({
        where: { companyId },
        orderBy: { createdAt: 'asc' },
      });

      return NextResponse.json(messages);
    }
  } catch (error) {
    console.error('Error fetching support messages:', error);
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
    const { text, companyId: bodyCompanyId } = body;

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'A mensagem não pode ser vazia' }, { status: 400 });
    }

    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const targetCompanyId = isSuperAdmin ? bodyCompanyId : session.companyId;

    if (!targetCompanyId) {
      return NextResponse.json({ error: 'ID da empresa não especificado' }, { status: 400 });
    }

    const newMessage = await prisma.supportMessage.create({
      data: {
        companyId: targetCompanyId,
        senderId: session.userId,
        senderName: session.name,
        senderRole: isSuperAdmin ? 'SUPERADMIN' : session.userRole,
        text: text.trim(),
      },
    });

    if (!isSuperAdmin) {
      try {
        await prisma.supportMessage.create({
          data: {
            companyId: targetCompanyId,
            senderId: 'system-bot',
            senderName: 'Suporte Precision',
            senderRole: 'SUPERADMIN',
            text: 'Em breve entraremos em contato.',
          },
        });
      } catch (err) {
        console.error('Error creating auto-reply message:', err);
      }
    }

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating support message:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
