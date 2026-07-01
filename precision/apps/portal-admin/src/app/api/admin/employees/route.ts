import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const companyId = session.companyId;

    const employees = await prisma.employee.findMany({
      where: isSuperAdmin ? {} : { companyId },
      include: {
        team: true,
        manager: true,
        company: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.error('Erro ao listar colaboradores:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

function generateTempPassword(): string {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '$#%?';
  const all = letters + numbers + special;
  
  let result = '';
  result += letters.charAt(Math.floor(Math.random() * letters.length));
  result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  result += special.charAt(Math.floor(Math.random() * special.length));
  
  for (let i = 0; i < 5; i++) {
    result += all.charAt(Math.floor(Math.random() * all.length));
  }
  
  return result.split('').sort(() => 0.5 - Math.random()).join('');
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      email,
      role,
      userRole,
      phone,
      address,
      contractNumber,
      isTeamLeader,
      teamId,
      managerId,
      companyId: bodyCompanyId,
      workStart,
      lunchStart,
      lunchEnd,
      workEnd,
    } = body;

    // Validation
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'O nome é obrigatório.' }, { status: 400 });
    }
    if (!email || email.trim() === '') {
      return NextResponse.json({ error: 'O e-mail é obrigatório.' }, { status: 400 });
    }
    if (!role || role.trim() === '') {
      return NextResponse.json({ error: 'O cargo é obrigatório.' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.employee.findUnique({
      where: { email: email.trim() },
    });
    if (existing) {
      return NextResponse.json({ error: 'Já existe um colaborador cadastrado com este e-mail.' }, { status: 400 });
    }

    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const targetCompanyId = isSuperAdmin ? bodyCompanyId : session.companyId;

    if (!targetCompanyId) {
      return NextResponse.json({ error: 'O ID da empresa é obrigatório.' }, { status: 400 });
    }

    // Tenant boundary checks for Team and Manager
    if (teamId) {
      const team = await prisma.team.findUnique({ where: { id: teamId } });
      if (!team || team.companyId !== targetCompanyId) {
        return NextResponse.json({ error: 'Equipe inválida ou pertencente a outra empresa.' }, { status: 400 });
      }
    }

    if (managerId) {
      const manager = await prisma.employee.findUnique({ where: { id: managerId } });
      if (!manager || manager.companyId !== targetCompanyId) {
        return NextResponse.json({ error: 'Gestor inválido ou pertencente a outra empresa.' }, { status: 400 });
      }
    }

    const generatedPassword = generateTempPassword();

    const newEmployee = await prisma.employee.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: generatedPassword,
        tempPassword: generatedPassword,
        isPasswordTemp: true,
        userRole: userRole || 'EMPLOYEE',
        role: role.trim(),
        workStart: workStart || '09:00',
        lunchStart: lunchStart || '12:00',
        lunchEnd: lunchEnd || '13:00',
        workEnd: workEnd || '18:00',
        phone: phone ? phone.trim() : null,
        address: address ? address.trim() : null,
        contractNumber: contractNumber ? contractNumber.trim() : null,
        isTeamLeader: !!isTeamLeader,
        teamId: teamId || null,
        managerId: managerId || null,
        companyId: targetCompanyId,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar colaborador:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
