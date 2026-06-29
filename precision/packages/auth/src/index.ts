const DEFAULT_SECRET = '3d2f9a7e6b8c4d5e2f9a7e6b8c4d5e2f'; // 32 characters
export const SESSION_COOKIE_NAME = 'precision_session';

const encoder = new TextEncoder();

async function getCryptoKey(secret?: string): Promise<any> {
  const s = secret || process.env.SESSION_SECRET || DEFAULT_SECRET;
  const keyData = encoder.encode(s);
  return globalThis.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Encrypts (signs and encodes) a session payload using HMAC-SHA-256.
 * Supported in both Node.js and Next.js Edge Runtime without native Node modules.
 */
export async function encryptSession(payload: any, secret?: string): Promise<string> {
  try {
    const jsonStr = JSON.stringify(payload);
    const data = encoder.encode(jsonStr);
    const key = await getCryptoKey(secret);
    const signatureBuffer = await globalThis.crypto.subtle.sign('HMAC', key, data);
    
    // Convert signature ArrayBuffer to hex string
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Base64 encode JSON to ensure safe cookie characters
    // Using global btoa (supported in both browser/edge and modern node)
    const base64Payload = globalThis.btoa(unescape(encodeURIComponent(jsonStr)));
    
    return `${base64Payload}.${signatureHex}`;
  } catch (error) {
    console.error('Error encrypting session:', error);
    return '';
  }
}

/**
 * Decrypts (decodes and verifies) an HMAC-SHA-256 session token.
 */
export async function decryptSession(token: string, secret?: string): Promise<any> {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    
    const [base64Payload, signatureHex] = parts;
    const jsonStr = decodeURIComponent(escape(globalThis.atob(base64Payload)));
    const data = encoder.encode(jsonStr);
    
    // Parse signature hex back to Uint8Array
    const signatureBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );
    
    const key = await getCryptoKey(secret);
    const isValid = await globalThis.crypto.subtle.verify('HMAC', key, signatureBytes, data);
    
    if (!isValid) return null;
    return JSON.parse(jsonStr);
  } catch (error) {
    // Return null if verification fails or token is tampered
    return null;
  }
}

/**
 * Helper to retrieve session payload from Next.js request cookies.
 * Works with `cookies()` from `next/headers` or `request.cookies` in middleware.
 */
export async function getSessionFromCookies(cookieStore: any): Promise<any> {
  if (!cookieStore) return null;
  
  let token = '';
  if (typeof cookieStore.get === 'function') {
    // Next.js ReadonlyRequestCookies API
    token = cookieStore.get(SESSION_COOKIE_NAME)?.value || '';
  } else if (cookieStore[SESSION_COOKIE_NAME]) {
    // Plain key-value object
    token = cookieStore[SESSION_COOKIE_NAME];
  }
  
  if (!token) return null;
  return decryptSession(token);
}
