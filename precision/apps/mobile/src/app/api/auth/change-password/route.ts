import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies, encryptSession, SESSION_COOKIE_NAME } from '@precision/auth';
import { translations, Locale } from '@/locales';

export async function POST(req: NextRequest) {
  let locale: Locale = 'pt';
  try {
    const cookieStore = await cookies();
    locale = (cookieStore.get('precision_locale')?.value || 'pt') as Locale;
    const dict = translations[locale] || translations['pt'];

    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: dict.auth.notAuthenticated }, { status: 401 });
    }

    const body = await req.json();
    const { newPassword, confirmPassword } = body;

    if (!newPassword || !confirmPassword) {
      return NextResponse.json({ error: dict.auth.allFieldsRequired }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: dict.auth.passwordMismatch }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: dict.auth.passwordTooShort }, { status: 400 });
    }

    // Update the employee password
    await prisma.employee.update({
      where: { id: session.userId },
      data: {
        password: newPassword,
        isPasswordTemp: false,
        tempPassword: null,
      },
    });

    // Refresh the cookie with isPasswordTemp = false
    const updatedSession = {
      ...session,
      isPasswordTemp: false,
    };

    const token = await encryptSession(updatedSession);

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Erro ao mudar de senha:', error);
    const fallbackDict = translations[locale] || translations['pt'];
    return NextResponse.json({ error: fallbackDict.auth.internalServerError }, { status: 500 });
  }
}
