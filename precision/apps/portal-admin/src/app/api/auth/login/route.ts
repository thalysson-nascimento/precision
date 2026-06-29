import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { encryptSession } from '@precision/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 });
    }

    const employee = await prisma.employee.findFirst({
      where: { email },
      include: { company: true },
    });

    if (!employee || employee.password !== password) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 });
    }

    if (!employee.isActive) {
      return NextResponse.json({ 
        error: 'Sua conta está inativa. Entre em contato com o administrador da sua empresa.' 
      }, { status: 403 });
    }

    // Role-based Access Control for Portal-Admin
    // Only SUPERADMIN, OWNER, and ADMIN can access portal-admin
    const allowedRoles = ['SUPERADMIN', 'OWNER', 'ADMIN'];
    if (!allowedRoles.includes(employee.userRole)) {
      return NextResponse.json({ 
        error: 'Acesso negado. Este portal é de uso exclusivo de administradores e gestores.' 
      }, { status: 403 });
    }

    const sessionPayload = {
      userId: employee.id,
      email: employee.email,
      name: employee.name,
      userRole: employee.userRole,
      companyId: employee.companyId,
      role: employee.role, // Job Title
      subscriptionEndsAt: employee.company?.subscriptionEndsAt || null,
      subscriptionStatus: employee.company?.subscriptionStatus || 'ACTIVE',
    };

    const token = await encryptSession(sessionPayload);

    const response = NextResponse.json({ success: true, employee: sessionPayload });
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
    console.error('Erro na rota de login admin:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
