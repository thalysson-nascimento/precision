const Stripe = require('stripe');

const apiKey = process.env.STRIPE_SECRET_KEY;
const productionUrl = process.env.PRODUCTION_URL || 'https://portal-admin.precision-hour.com';

if (!apiKey) {
  console.error('Erro: STRIPE_SECRET_KEY não fornecida.');
  process.exit(1);
}

const stripe = new Stripe(apiKey);

async function run() {
  console.log('==================================================');
  console.log(' Configurando Stripe em Produção para Precision');
  console.log(` Domínio Oficial: ${productionUrl}`);
  console.log('==================================================\n');

  try {
    console.log('1. Criando Produtos e Preços no Stripe (Live Mode)...');

    // Plano 15
    console.log('-> Criando plano de 15 Colaboradores...');
    const prod15 = await stripe.products.create({
      name: 'Precision - 15 Colaboradores',
      description: 'Plano ideal para pequenas empresas e equipes em crescimento.',
    });
    const price15M_BRL = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 18999, // R$ 189,99
      currency: 'brl',
      recurring: { interval: 'month' },
    });
    const price15A_BRL = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 159999, // R$ 1.599,99
      currency: 'brl',
      recurring: { interval: 'year' },
    });
    const price15M_EUR = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 9999, // € 99,99
      currency: 'eur',
      recurring: { interval: 'month' },
    });
    const price15A_EUR = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 83999, // € 839,99
      currency: 'eur',
      recurring: { interval: 'year' },
    });
    const price15M_USD = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 9999, // $ 99.99
      currency: 'usd',
      recurring: { interval: 'month' },
    });
    const price15A_USD = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 83999, // $ 839.99
      currency: 'usd',
      recurring: { interval: 'year' },
    });
    const price15M_CAD = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 9999, // $ 99.99
      currency: 'cad',
      recurring: { interval: 'month' },
    });
    const price15A_CAD = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 83999, // $ 839.99
      currency: 'cad',
      recurring: { interval: 'year' },
    });

    // Plano 30
    console.log('-> Criando plano de 30 Colaboradores...');
    const prod30 = await stripe.products.create({
      name: 'Precision - 30 Colaboradores',
      description: 'Controle de ponto completo para médias equipes.',
    });
    const price30M_BRL = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 32999, // R$ 329,99
      currency: 'brl',
      recurring: { interval: 'month' },
    });
    const price30A_BRL = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 276999, // R$ 2.769,99
      currency: 'brl',
      recurring: { interval: 'year' },
    });
    const price30M_EUR = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 16999, // € 169,99
      currency: 'eur',
      recurring: { interval: 'month' },
    });
    const price30A_EUR = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 142999, // € 1.429,99
      currency: 'eur',
      recurring: { interval: 'year' },
    });
    const price30M_USD = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 16999, // $ 169.99
      currency: 'usd',
      recurring: { interval: 'month' },
    });
    const price30A_USD = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 142999, // $ 1,429.99
      currency: 'usd',
      recurring: { interval: 'year' },
    });
    const price30M_CAD = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 16999, // $ 169.99
      currency: 'cad',
      recurring: { interval: 'month' },
    });
    const price30A_CAD = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 142999, // $ 1,429.99
      currency: 'cad',
      recurring: { interval: 'year' },
    });

    // Plano 50
    console.log('-> Criando plano de 50 Colaboradores...');
    const prod50 = await stripe.products.create({
      name: 'Precision - 50 Colaboradores',
      description: 'Máxima flexibilidade para empresas com alto volume.',
    });
    const price50M_BRL = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 49999, // R$ 499,99
      currency: 'brl',
      recurring: { interval: 'month' },
    });
    const price50A_BRL = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 419999, // R$ 4.199,99
      currency: 'brl',
      recurring: { interval: 'year' },
    });
    const price50M_EUR = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 24999, // € 249,99
      currency: 'eur',
      recurring: { interval: 'month' },
    });
    const price50A_EUR = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 209999, // € 2.099,99
      currency: 'eur',
      recurring: { interval: 'year' },
    });
    const price50M_USD = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 24999, // $ 249.99
      currency: 'usd',
      recurring: { interval: 'month' },
    });
    const price50A_USD = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 209999, // $ 2,099.99
      currency: 'usd',
      recurring: { interval: 'year' },
    });
    const price50M_CAD = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 24999, // $ 249.99
      currency: 'cad',
      recurring: { interval: 'month' },
    });
    const price50A_CAD = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 209999, // $ 2,099.99
      currency: 'cad',
      recurring: { interval: 'year' },
    });

    console.log('Planos de assinatura e preços criados com sucesso!');

    console.log('\n2. Criando Endpoint de Webhook apontando para o Domínio Oficial...');
    const cleanUrl = productionUrl.replace(/\/$/, '');
    const webhook = await stripe.webhookEndpoints.create({
      url: `${cleanUrl}/api/webhooks/stripe/`,
      enabled_events: [
        'checkout.session.completed',
        'invoice.paid',
        'customer.subscription.updated',
        'customer.subscription.deleted'
      ],
    });
    
    console.log('Webhook registrado com sucesso!');

    console.log('\n==================================================');
    console.log('       CONFIGURAÇÕES PRONTAS PARA O VERCEL        ');
    console.log('==================================================\n');
    console.log('Copie e cole estas variáveis exatas nas Environment Variables do Vercel:\n');
    console.log(`STRIPE_SECRET_KEY="${apiKey}"`);
    console.log(`STRIPE_WEBHOOK_SECRET="${webhook.secret}"`);
    console.log('\n# IDs dos preços criados em modo de produção:');
    
    console.log('\n# Plano 15');
    console.log(`PRICE_15_EMPLOYEES_MONTHLY_BRL="${price15M_BRL.id}"`);
    console.log(`PRICE_15_EMPLOYEES_ANNUAL_BRL="${price15A_BRL.id}"`);
    console.log(`PRICE_15_EMPLOYEES_MONTHLY_EUR="${price15M_EUR.id}"`);
    console.log(`PRICE_15_EMPLOYEES_ANNUAL_EUR="${price15A_EUR.id}"`);
    console.log(`PRICE_15_EMPLOYEES_MONTHLY_USD="${price15M_USD.id}"`);
    console.log(`PRICE_15_EMPLOYEES_ANNUAL_USD="${price15A_USD.id}"`);
    console.log(`PRICE_15_EMPLOYEES_MONTHLY_CAD="${price15M_CAD.id}"`);
    console.log(`PRICE_15_EMPLOYEES_ANNUAL_CAD="${price15A_CAD.id}"`);

    console.log('\n# Plano 30');
    console.log(`PRICE_30_EMPLOYEES_MONTHLY_BRL="${price30M_BRL.id}"`);
    console.log(`PRICE_30_EMPLOYEES_ANNUAL_BRL="${price30A_BRL.id}"`);
    console.log(`PRICE_30_EMPLOYEES_MONTHLY_EUR="${price30M_EUR.id}"`);
    console.log(`PRICE_30_EMPLOYEES_ANNUAL_EUR="${price30A_EUR.id}"`);
    console.log(`PRICE_30_EMPLOYEES_MONTHLY_USD="${price30M_USD.id}"`);
    console.log(`PRICE_30_EMPLOYEES_ANNUAL_USD="${price30A_USD.id}"`);
    console.log(`PRICE_30_EMPLOYEES_MONTHLY_CAD="${price30M_CAD.id}"`);
    console.log(`PRICE_30_EMPLOYEES_ANNUAL_CAD="${price30A_CAD.id}"`);

    console.log('\n# Plano 50');
    console.log(`PRICE_50_EMPLOYEES_MONTHLY_BRL="${price50M_BRL.id}"`);
    console.log(`PRICE_50_EMPLOYEES_ANNUAL_BRL="${price50A_BRL.id}"`);
    console.log(`PRICE_50_EMPLOYEES_MONTHLY_EUR="${price50M_EUR.id}"`);
    console.log(`PRICE_50_EMPLOYEES_ANNUAL_EUR="${price50A_EUR.id}"`);
    console.log(`PRICE_50_EMPLOYEES_MONTHLY_USD="${price50M_USD.id}"`);
    console.log(`PRICE_50_EMPLOYEES_ANNUAL_USD="${price50A_USD.id}"`);
    console.log(`PRICE_50_EMPLOYEES_MONTHLY_CAD="${price50M_CAD.id}"`);
    console.log(`PRICE_50_EMPLOYEES_ANNUAL_CAD="${price50A_CAD.id}"`);

  } catch (error) {
    console.error('\nErro ao configurar a API Stripe:', error.message);
  }
}

run();
