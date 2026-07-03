import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSessionFromCookies } from '@precision/auth';
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
