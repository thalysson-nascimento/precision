import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: 'precision_session',
    value: '',
    httpOnly: true,
    path: '/',
    expires: new Date(0), // Expira imediatamente
  });
  return response;
}
