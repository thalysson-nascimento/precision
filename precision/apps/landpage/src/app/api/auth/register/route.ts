import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let baseUrl = process.env.NEXT_PUBLIC_PORTAL_ADMIN_URL || 'http://localhost:3002';
    // Remove trailing slashes to avoid double slashes in the path
    baseUrl = baseUrl.replace(/\/+$/, '');

    console.log('[Landpage API] Proxying registration request to:', `${baseUrl}/api/auth/register`);

    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    let data: any = {};

    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('[Landpage API] Failed to parse JSON response from portal-admin. Raw response:', responseText);
      return NextResponse.json({ 
        error: `O portal-admin retornou uma resposta inválida (HTTP ${response.status}). Verifique se a URL em NEXT_PUBLIC_PORTAL_ADMIN_URL está correta.` 
      }, { status: response.status || 502 });
    }

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Erro ao registrar empresa' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in proxy register:', error);
    return NextResponse.json({ error: 'Erro de conexão com o servidor de registro' }, { status: 500 });
  }
}
