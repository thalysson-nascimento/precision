import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let baseUrl = process.env.NEXT_PUBLIC_PORTAL_ADMIN_URL;
    if (!baseUrl || baseUrl.trim() === '') {
      baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://portal-admin.precision-hour.com'
        : 'http://localhost:3002';
    }
    // Remove trailing slashes to avoid double slashes in the path
    baseUrl = baseUrl.replace(/\/+$/, '');

    console.log('[Landpage API] Proxying contact request to:', `${baseUrl}/api/contact`);

    const response = await fetch(`${baseUrl}/api/contact`, {
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
      return NextResponse.json({ error: data.error || 'Erro ao enviar mensagem de contato' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in proxy contact:', error);
    return NextResponse.json({ error: 'Erro de conexão com o servidor de contato' }, { status: 500 });
  }
}
