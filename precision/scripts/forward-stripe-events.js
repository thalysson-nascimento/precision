const fs = require('fs');
const path = require('path');
const http = require('http');

// Load environment variables manually to avoid dependency issues
function loadEnv() {
  const envPath = path.resolve(__dirname, '../apps/portal-admin/.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('Erro: STRIPE_SECRET_KEY não encontrada no arquivo .env.');
  process.exit(1);
}

// Dynamically load stripe package from node_modules of portal-admin
const stripePath = path.resolve(__dirname, '../apps/portal-admin/node_modules/stripe');
let Stripe;
try {
  Stripe = require(stripePath);
} catch (e) {
  try {
    Stripe = require('stripe');
  } catch (err) {
    console.error('Erro: Biblioteca "stripe" não encontrada. Execute npm install na pasta do portal-admin.');
    process.exit(1);
  }
}

const stripe = new Stripe(stripeSecretKey);

console.log('--------------------------------------------------');
console.log('Iniciando Emulador de Webhooks Stripe para Localhost');
console.log('Monitorando eventos da Stripe API e encaminhando...');
console.log('--------------------------------------------------');

let processedEventIds = new Set();
let lastPollTime = Math.floor(Date.now() / 1000) - 7200; // Começa buscando eventos das últimas 2 horas

async function forwardEvent(event) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(event);
    const req = http.request({
      hostname: 'localhost',
      port: 3002,
      path: '/api/webhooks/stripe',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        // Sent placeholder signature to bypass middleware signature check if webhook secret is placeholder
        'stripe-signature': 't=123,v1=mock_sig'
      }
    }, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        console.log(`[Encaminhado] Evento ${event.id} (${event.type}) -> Status: ${res.statusCode}`);
        resolve();
      });
    });

    req.on('error', (err) => {
      console.error(`[Erro de Rede] Não foi possível conectar ao localhost:3002: ${err.message}`);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

async function pollEvents() {
  try {
    // Fetch events created after lastPollTime
    const events = await stripe.events.list({
      created: { gte: lastPollTime },
      limit: 20
    });

    // Process from oldest to newest
    const sortedEvents = events.data.reverse();

    for (const event of sortedEvents) {
      if (!processedEventIds.has(event.id)) {
        processedEventIds.add(event.id);
        
        // Update lastPollTime to avoid retrieving old events
        if (event.created > lastPollTime) {
          lastPollTime = event.created;
        }

        await forwardEvent(event);
      }
    }
  } catch (err) {
    console.error(`[Erro na API Stripe] Falha ao consultar eventos: ${err.message}`);
  }
}

// Poll every 3 seconds
setInterval(pollEvents, 3000);
pollEvents();
