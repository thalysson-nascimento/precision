import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSessionFromCookies, encryptSession } from '@precision/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const session = await getSessionFromCookies(cookieStore);

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  // Dynamically verify company subscription status to bypass stale cookie session info
  if (session.userRole !== 'SUPERADMIN' && session.companyId) {
    try {
      const company = await prisma.company.findUnique({
        where: { id: session.companyId }
      });
      if (company) {
        return NextResponse.json({
          ...session,
          subscriptionStatus: company.subscriptionStatus,
          subscriptionEndsAt: company.subscriptionEndsAt,
        });
      }
    } catch (e) {
      console.error('Error fetching company in portal-admin /api/auth/me:', e);
    }
  }

  return NextResponse.json(session);
}

export async function POST() {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const updatedSession = { ...session };

    if (session.userRole !== 'SUPERADMIN' && session.companyId) {
      const company = await prisma.company.findUnique({
        where: { id: session.companyId }
      });
      if (company) {
        updatedSession.subscriptionStatus = company.subscriptionStatus;
        updatedSession.subscriptionEndsAt = company.subscriptionEndsAt;
      }
    }

    const token = await encryptSession(updatedSession);
    const response = NextResponse.json({ success: true, employee: updatedSession });
    
    response.cookies.set({
      name: 'precision_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return response;
  } catch (error) {
    console.error('Erro ao recarregar a sessão no cookie:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
