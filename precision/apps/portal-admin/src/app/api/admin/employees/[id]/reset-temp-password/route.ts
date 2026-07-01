import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';
import { translations, Locale } from '@/locales';

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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let locale: Locale = 'pt';
  try {
    const cookieStore = await cookies();
    locale = (cookieStore.get('precision_locale')?.value || 'pt') as Locale;
    const dict = translations[locale] || translations['pt'];

    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: dict.employees.notAuthenticated }, { status: 401 });
    }

    const { id } = await params;
    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      return NextResponse.json({ error: dict.employees.employeeNotFound }, { status: 404 });
    }

    // Tenant check
    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    if (!isSuperAdmin && existingEmployee.companyId !== session.companyId) {
      return NextResponse.json({ error: dict.employees.accessDeniedDifferentCompany }, { status: 403 });
    }

    const newTempPassword = generateTempPassword();

    await prisma.employee.update({
      where: { id },
      data: {
        password: newTempPassword,
        tempPassword: newTempPassword,
        isPasswordTemp: true,
      },
    });

    return NextResponse.json({ success: true, tempPassword: newTempPassword });
  } catch (error) {
    console.error('Erro ao resetar senha temporária:', error);
    const fallbackDict = translations[locale] || translations['pt'];
    return NextResponse.json({ error: fallbackDict.employees.internalServerError }, { status: 500 });
  }
}
