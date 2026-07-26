const Stripe = require('stripe');

// Use the user's secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeSecretKey);

const plans = [
  {
    limit: 15,
    name: 'Precision - 15 Colaboradores',
    description: 'Plano com suporte para até 15 colaboradores ativos, relatórios de ponto e geolocalização.',
    prices: [
      { idSuffix: '15_EMPLOYEES_MONTHLY', amount: 18999, currency: 'brl', interval: 'month' },
      { idSuffix: '15_EMPLOYEES_ANNUAL', amount: 159999, currency: 'brl', interval: 'year' },
      { idSuffix: '15_EMPLOYEES_MONTHLY', amount: 9999, currency: 'eur', interval: 'month' },
      { idSuffix: '15_EMPLOYEES_ANNUAL', amount: 83999, currency: 'eur', interval: 'year' }
    ]
  },
  {
    limit: 30,
    name: 'Precision - 30 Colaboradores',
    description: 'Plano com suporte para até 30 colaboradores ativos, relatórios de ponto e geolocalização.',
    prices: [
      { idSuffix: '30_EMPLOYEES_MONTHLY', amount: 32999, currency: 'brl', interval: 'month' },
      { idSuffix: '30_EMPLOYEES_ANNUAL', amount: 276999, currency: 'brl', interval: 'year' },
      { idSuffix: '30_EMPLOYEES_MONTHLY', amount: 16999, currency: 'eur', interval: 'month' },
      { idSuffix: '30_EMPLOYEES_ANNUAL', amount: 142999, currency: 'eur', interval: 'year' }
    ]
  },
  {
    limit: 50,
    name: 'Precision - 50 Colaboradores',
    description: 'Plano com suporte para até 50 colaboradores ativos, relatórios de ponto e geolocalização.',
    prices: [
      { idSuffix: '50_EMPLOYEES_MONTHLY', amount: 49999, currency: 'brl', interval: 'month' },
      { idSuffix: '50_EMPLOYEES_ANNUAL', amount: 419999, currency: 'brl', interval: 'year' },
      { idSuffix: '50_EMPLOYEES_MONTHLY', amount: 24999, currency: 'eur', interval: 'month' },
      { idSuffix: '50_EMPLOYEES_ANNUAL', amount: 209999, currency: 'eur', interval: 'year' }
    ]
  }
];

async function setup() {
  console.log('Iniciando provisionamento do catálogo de produtos no Stripe...');
  
  const priceMapping = {};

  for (const plan of plans) {
    console.log(`Criando/Verificando produto: ${plan.name}`);
    
    // Check if product already exists
    let product;
    const existingProducts = await stripe.products.list({ limit: 100 });
    product = existingProducts.data.find(p => p.name === plan.name);

    if (!product) {
      product = await stripe.products.create({
        name: plan.name,
        description: plan.description,
        tax_code: 'txcd_10103000', // SaaS Product Tax Code
        metadata: {
          limit: plan.limit.toString()
        }
      });
      console.log(`Produto criado com ID: ${product.id}`);
    } else {
      console.log(`Produto existente encontrado com ID: ${product.id}`);
    }

    // Provision prices
    for (const priceConfig of plan.prices) {
      const planId = `${priceConfig.idSuffix}_${priceConfig.currency.toUpperCase()}`;
      console.log(`  Criando/Verificando preço para ${planId} (${priceConfig.amount} ${priceConfig.currency.toUpperCase()} / ${priceConfig.interval})...`);
      
      const existingPrices = await stripe.prices.list({
        product: product.id,
        currency: priceConfig.currency,
        limit: 100
      });

      let price = existingPrices.data.find(p => 
        p.recurring && 
        p.recurring.interval === priceConfig.interval && 
        p.unit_amount === priceConfig.amount
      );

      if (!price) {
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: priceConfig.amount,
          currency: priceConfig.currency,
          tax_behavior: 'exclusive', // exclusive behavior for Stripe Tax calculation
          recurring: {
            interval: priceConfig.interval
          },
          metadata: {
            planId: planId
          }
        });
        console.log(`  Preço criado com ID: ${price.id}`);
      } else {
        console.log(`  Preço existente encontrado com ID: ${price.id}`);
        // Ensure planId metadata is present
        if (!price.metadata || price.metadata.planId !== planId) {
          await stripe.prices.update(price.id, {
            metadata: { planId }
          });
        }
      }

      priceMapping[planId] = price.id;
    }
  }

  // Write priceMapping to apps/portal-admin/src/lib/stripe-prices.json
  const fs = require('fs');
  const path = require('path');
  const targetPath = path.join(__dirname, '../apps/portal-admin/src/lib/stripe-prices.json');
  
  // Ensure directory exists
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(targetPath, JSON.stringify(priceMapping, null, 2));
  console.log(`Mapeamento de preços Stripe salvo com sucesso em: ${targetPath}`);
  console.log(priceMapping);
}

setup().catch(err => {
  console.error('Erro no provisionamento do Stripe:', err);
  process.exit(1);
});
