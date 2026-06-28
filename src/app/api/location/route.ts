import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Obter o IP do cliente através dos cabeçalhos padrões do Next.js/Vercel
    const ip = req.headers.get('x-forwarded-for') || (req as any).ip || '';
    
    // No ambiente local, o IP será localhost. Podemos deixar vazio para o ipapi.co consultar o IP público do servidor
    const isLocal = ip === '127.0.0.1' || ip === '::1' || ip === '';
    const queryIp = isLocal ? '' : ip;

    const response = await fetch(`https://ipapi.co/${queryIp}/json/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      next: { revalidate: 3600 } // Cache por 1 hora
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.city && data.region_code) {
        return NextResponse.json({ city: data.city, region: data.region_code });
      }
    }
    
    return NextResponse.json({ city: 'São Paulo', region: 'SP' });
  } catch (error) {
    console.error('Erro ao buscar localização no servidor:', error);
    // Fallback amigável
    return NextResponse.json({ city: 'São Paulo', region: 'SP' });
  }
}
