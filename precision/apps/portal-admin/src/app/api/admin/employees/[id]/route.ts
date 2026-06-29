import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { id } = await params;
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        team: true,
        manager: true,
        company: true,
      },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Colaborador não encontrado' }, { status: 404 });
    }

    // Tenant check
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    if (!isSuperAdmin && employee.companyId !== session.companyId) {
      return NextResponse.json({ error: 'Acesso negado. Este colaborador pertence a outra empresa.' }, { status: 403 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error('Erro ao buscar colaborador:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { id } = await params;
    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      return NextResponse.json({ error: 'Colaborador não encontrado' }, { status: 404 });
    }

    // Tenant check
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const targetCompanyId = existingEmployee.companyId;

    if (!isSuperAdmin && targetCompanyId !== session.companyId) {
      return NextResponse.json({ error: 'Acesso negado. Este colaborador pertence a outra empresa.' }, { status: 403 });
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
      isActive,
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

    // Email conflict check
    if (email.trim().toLowerCase() !== existingEmployee.email.toLowerCase()) {
      const emailConflict = await prisma.employee.findUnique({
        where: { email: email.trim() },
      });
      if (emailConflict) {
        return NextResponse.json({ error: 'Já existe outro colaborador cadastrado com este e-mail.' }, { status: 400 });
      }
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

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        name: name.trim(),
        email: email.trim(),
        role: role.trim(),
        userRole: userRole || existingEmployee.userRole,
        phone: phone ? phone.trim() : null,
        address: address ? address.trim() : null,
        contractNumber: contractNumber ? contractNumber.trim() : null,
        isTeamLeader: isTeamLeader !== undefined ? !!isTeamLeader : existingEmployee.isTeamLeader,
        teamId: teamId || null,
        managerId: managerId || null,
        isActive: isActive !== undefined ? !!isActive : existingEmployee.isActive,
        workStart: workStart || existingEmployee.workStart,
        lunchStart: lunchStart || existingEmployee.lunchStart,
        lunchEnd: lunchEnd || existingEmployee.lunchEnd,
        workEnd: workEnd || existingEmployee.workEnd,
      },
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { id } = await params;
    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      return NextResponse.json({ error: 'Colaborador não encontrado' }, { status: 404 });
    }

    // Tenant check
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    if (!isSuperAdmin && existingEmployee.companyId !== session.companyId) {
      return NextResponse.json({ error: 'Acesso negado. Este colaborador pertence a outra empresa.' }, { status: 403 });
    }

    await prisma.employee.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir colaborador:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
