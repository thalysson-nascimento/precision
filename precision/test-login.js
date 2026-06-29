const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const Database = require('better-sqlite3');

const dbUrl = 'file:./prisma/dev.db';
const adapter = new PrismaBetterSqlite3({
  url: dbUrl,
});
const prisma = new PrismaClient({ adapter });

async function run() {
  try {
    const email = 'owner@precisiontech.com';
    const password = '123456';

    console.log('1. Fetching employee...');
    const employee = await prisma.employee.findFirst({
      where: { email },
      include: { company: true },
    });

    console.log('Employee found:', !!employee);
    if (employee) {
      console.log('Password matches:', employee.password === password);
    }

    console.log('2. Encrypting session...');
    // Simulate encryptSession using node crypto or globalThis
    const DEFAULT_SECRET = '3d2f9a7e6b8c4d5e2f9a7e6b8c4d5e2f';
    const sessionPayload = {
      userId: employee.id,
      email: employee.email,
      name: employee.name,
      userRole: employee.userRole,
      companyId: employee.companyId,
      role: employee.role,
      subscriptionEndsAt: employee.company?.subscriptionEndsAt || null,
      subscriptionStatus: employee.company?.subscriptionStatus || 'ACTIVE',
    };

    const encoder = new TextEncoder();
    const jsonStr = JSON.stringify(sessionPayload);
    const data = encoder.encode(jsonStr);
    const keyData = encoder.encode(DEFAULT_SECRET);
    
    const key = await globalThis.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify']
    );
    const signatureBuffer = await globalThis.crypto.subtle.sign('HMAC', key, data);
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const base64Payload = globalThis.btoa(unescape(encodeURIComponent(jsonStr)));
    const token = `${base64Payload}.${signatureHex}`;
    
    console.log('Token encrypted successfully:', token.substring(0, 30) + '...');
  } catch (error) {
    console.error('CRASH ERROR:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
