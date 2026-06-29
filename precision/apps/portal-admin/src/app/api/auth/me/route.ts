import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSessionFromCookies } from '@precision/auth';

export async function GET() {
  const cookieStore = await cookies();
  const session = await getSessionFromCookies(cookieStore);

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  return NextResponse.json(session);
}
