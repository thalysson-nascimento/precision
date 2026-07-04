import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cnpjQuery = searchParams.get('cnpj');

    if (!cnpjQuery) {
      return NextResponse.json({ error: 'CNPJ is required' }, { status: 400 });
    }

    const cleanCnpj = cnpjQuery.replace(/\D/g, '');
    if (cleanCnpj.length !== 14) {
      return NextResponse.json({ error: 'Invalid CNPJ format' }, { status: 400 });
    }

    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      // Try fallback to receitaws if BrasilAPI fails or returns 404
      try {
        const fallbackRes = await fetch(`https://receitaws.com.br/v1/cnpj/${cleanCnpj}`);
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (fallbackData.status === 'ERROR') {
            return NextResponse.json({ error: fallbackData.message || 'CNPJ not found' }, { status: 404 });
          }
          return NextResponse.json({
            razao_social: fallbackData.nome,
            nome_fantasia: fallbackData.fantasia || fallbackData.nome,
            street: fallbackData.logradouro,
            number: fallbackData.numero,
            city: fallbackData.municipio,
            state: fallbackData.uf,
            zip: fallbackData.cep ? fallbackData.cep.replace(/\D/g, '') : '',
          });
        }
      } catch (err) {
        console.error('Fallback CNPJ fetch failed:', err);
      }

      return NextResponse.json({ error: 'CNPJ não encontrado ou inválido' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({
      razao_social: data.razao_social,
      nome_fantasia: data.nome_fantasia || data.razao_social,
      street: data.logradouro,
      number: data.numero,
      city: data.municipio,
      state: data.uf,
      zip: data.cep,
    });
  } catch (error: any) {
    console.error('CNPJ lookup error:', error);
    return NextResponse.json({ error: 'Erro interno ao consultar CNPJ' }, { status: 500 });
  }
}
