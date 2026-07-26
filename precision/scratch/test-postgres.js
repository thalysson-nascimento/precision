const { Client } = require('pg');

const connectionString = "postgres://582ff0ff2409bc9cf420b8e86421e4ed33c1d737248d2956bd611d158d811820:sk_v-w_Qgp7da7QCClOSBL54@db.prisma.io:5432/postgres?sslmode=require";

const client = new Client({
  connectionString: connectionString,
});

async function main() {
  try {
    await client.connect();
    console.log("Conectado com sucesso!");
    const res = await client.query('SELECT NOW()');
    console.log("Resultado da consulta:", res.rows[0]);
    await client.end();
  } catch (err) {
    console.error("Erro na conexão:", err.message);
    console.error(err);
  }
}

main();
