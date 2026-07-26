const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load env variables manually to verify if Stripe is installed
function getStripeLib() {
  const stripePath = path.resolve(__dirname, '../apps/portal-admin/node_modules/stripe');
  try {
    return require(stripePath);
  } catch (e) {
    try {
      return require('stripe');
    } catch (err) {
      console.error('Erro: Biblioteca "stripe" não encontrada. Execute npm install antes de rodar o script.');
      process.exit(1);
    }
  }
}

const Stripe = getStripeLib();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function run() {
  console.log('==================================================');
  console.log('  Precision - Configuração de Stripe em Produção  ');
  console.log('==================================================\n');

  const apiKey = await question('Digite sua chave secreta da Stripe de Produção (sk_live_... ou sk_test_...): ');
  if (!apiKey || (!apiKey.startsWith('sk_live_') && !apiKey.startsWith('sk_test_'))) {
    console.error('Erro: Chave secreta inválida.');
    rl.close();
    process.exit(1);
  }

  const productionUrl = await question('Digite a URL de produção do seu portal no Vercel (ex: https://meuportal.vercel.app): ');
  if (productionUrl && !productionUrl.startsWith('http')) {
    console.error('Erro: URL inválida. Deve começar com http:// ou https://');
    rl.close();
    process.exit(1);
  }

  const stripe = new Stripe(apiKey);

  try {
    console.log('\n1. Criando Produtos e Preços no Stripe...');

    // Plan 15
    console.log('-> Criando plano de 15 Colaboradores...');
    const prod15 = await stripe.products.create({
      name: 'Precision - 15 Colaboradores',
      description: 'Plano ideal para pequenas empresas e equipes em crescimento.',
    });
    const price15M = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 18999, // R$ 189,99
      currency: 'brl',
      recurring: { interval: 'month' },
    });
    const price15A = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 159999, // R$ 1.599,99
      currency: 'brl',
      recurring: { interval: 'year' },
    });
    const price15MEur = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 9999, // € 99,99
      currency: 'eur',
      recurring: { interval: 'month' },
    });
    const price15AEur = await stripe.prices.create({
      product: prod15.id,
      unit_amount: 83999, // € 839,99
      currency: 'eur',
      recurring: { interval: 'year' },
    });

    // Plan 30
    console.log('-> Criando plano de 30 Colaboradores...');
    const prod30 = await stripe.products.create({
      name: 'Precision - 30 Colaboradores',
      description: 'Controle de ponto completo para médias equipes.',
    });
    const price30M = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 32999, // R$ 329,99
      currency: 'brl',
      recurring: { interval: 'month' },
    });
    const price30A = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 276999, // R$ 2.769,99
      currency: 'brl',
      recurring: { interval: 'year' },
    });
    const price30MEur = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 16999, // € 169,99
      currency: 'eur',
      recurring: { interval: 'month' },
    });
    const price30AEur = await stripe.prices.create({
      product: prod30.id,
      unit_amount: 142999, // € 1.429,99
      currency: 'eur',
      recurring: { interval: 'year' },
    });

    // Plan 50
    console.log('-> Criando plano de 50 Colaboradores...');
    const prod50 = await stripe.products.create({
      name: 'Precision - 50 Colaboradores',
      description: 'Máxima flexibilidade para empresas com alto volume.',
    });
    const price50M = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 49999, // R$ 499,99
      currency: 'brl',
      recurring: { interval: 'month' },
    });
    const price50A = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 419999, // R$ 4.199,99
      currency: 'brl',
      recurring: { interval: 'year' },
    });
    const price50MEur = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 24999, // € 249,99
      currency: 'eur',
      recurring: { interval: 'month' },
    });
    const price50AEur = await stripe.prices.create({
      product: prod50.id,
      unit_amount: 209999, // € 2.099,99
      currency: 'eur',
      recurring: { interval: 'year' },
    });

    console.log('Planos de assinatura e preços criados com sucesso!');

    let webhookSecret = 'whsec_placeholder';
    if (productionUrl) {
      console.log('\n2. Criando Endpoint de Webhook na Stripe...');
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
      webhookSecret = webhook.secret;
      console.log('Webhook criado com sucesso!');
    }

    console.log('\n==================================================');
    console.log('       CONFIGURAÇÕES PRONTAS PARA O VERCEL        ');
    console.log('==================================================\n');
    console.log('Copie as variáveis abaixo e cole nas Environment Variables do Vercel:\n');
    console.log(`STRIPE_SECRET_KEY="${apiKey}"`);
    console.log(`STRIPE_WEBHOOK_SECRET="${webhookSecret}"`);
    console.log('\n# IDs dos preços criados para os planos:');
    console.log(`15_EMPLOYEES_MONTHLY_BRL="${price15M.id}"`);
    console.log(`15_EMPLOYEES_ANNUAL_BRL="${price15A.id}"`);
    console.log(`15_EMPLOYEES_MONTHLY_EUR="${price15MEur.id}"`);
    console.log(`15_EMPLOYEES_ANNUAL_EUR="${price15AEur.id}"`);
    console.log(`30_EMPLOYEES_MONTHLY_BRL="${price30M.id}"`);
    console.log(`30_EMPLOYEES_ANNUAL_BRL="${price30A.id}"`);
    console.log(`30_EMPLOYEES_MONTHLY_EUR="${price30MEur.id}"`);
    console.log(`30_EMPLOYEES_ANNUAL_EUR="${price30AEur.id}"`);
    console.log(`50_EMPLOYEES_MONTHLY_BRL="${price50M.id}"`);
    console.log(`50_EMPLOYEES_ANNUAL_BRL="${price50A.id}"`);
    console.log(`50_EMPLOYEES_MONTHLY_EUR="${price50MEur.id}"`);
    console.log(`50_EMPLOYEES_ANNUAL_EUR="${price50AEur.id}"`);

  } catch (error) {
    console.error('\nErro durante a configuração na Stripe API:', error.message);
  } finally {
    rl.close();
  }
}

run();
