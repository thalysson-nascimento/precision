import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      country,
      document,
      company, // Trade Name
      corporateName,
      zip,
      street,
      number,
      city,
      stateName,
      manager,
      email,
      password,
      employees,
    } = body;

    // Basic Validation
    if (!company || !manager || !email || !password) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    // Check if company already exists by name
    const existingCompany = await prisma.company.findFirst({
      where: { name: company.trim() }
    });
    if (existingCompany) {
      return NextResponse.json({ error: 'Já existe uma empresa cadastrada com este nome.' }, { status: 400 });
    }

    // Check if manager email already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { email: email.trim() }
    });
    if (existingEmployee) {
      return NextResponse.json({ error: 'Este e-mail corporativo já está em uso.' }, { status: 400 });
    }

    // Create Company
    const endsAt = new Date();
    endsAt.setDate(endsAt.getDate() + 30); // 30 days trial

    const streetStr = street ? street.trim() : '';
    const cityStr = city ? city.trim() : '';
    const stateStr = stateName ? stateName.trim() : '';
    const fullAddress = `${streetStr}, ${cityStr} - ${stateStr}`;

    const newCompany = await prisma.company.create({
      data: {
        name: company.trim(),
        address: fullAddress.trim() || 'Não informado',
        number: number ? number.trim() : 'S/N',
        contact: manager.trim(),
        country: country ? country.trim() : null,
        document: document ? document.trim() : null,
        corporateName: corporateName ? corporateName.trim() : null,
        zip: zip ? zip.trim() : null,
        street: streetStr || null,
        city: cityStr || null,
        state: stateStr || null,
        email: email.trim(),
        subscriptionPlan: 'TRIAL',
        subscriptionStatus: 'ACTIVE',
        subscriptionEndsAt: endsAt,
      },
    });

    // Create OWNER Employee (Manager)
    const newEmployee = await prisma.employee.create({
      data: {
        name: manager.trim(),
        email: email.trim(),
        password: password, // Plain text as per project architecture
        isPasswordTemp: false,
        userRole: 'OWNER',
        role: 'Diretor / Gestor',
        companyId: newCompany.id,
      },
    });

    // Set CORS headers for the response
    const res = NextResponse.json({ success: true, company: newCompany, manager: newEmployee }, { status: 201 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  } catch (error: any) {
    console.error('Erro no cadastro de empresa:', error);
    const errRes = NextResponse.json({ error: 'Erro interno ao realizar cadastro.' }, { status: 500 });
    errRes.headers.set('Access-Control-Allow-Origin', '*');
    return errRes;
  }
}

// Enable OPTIONS preflight request for CORS (since landpage may hit it directly if desired)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
