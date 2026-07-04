import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch('http://localhost:3002/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Erro ao registrar empresa' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in proxy register:', error);
    return NextResponse.json({ error: 'Erro de conexão com o servidor de registro' }, { status: 500 });
  }
}
