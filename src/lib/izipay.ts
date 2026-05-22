import crypto from 'crypto';

export function getIzipayConfig() {
  const mode = process.env.IZIPAY_MODE || 'TEST';
  const isProduction = mode === 'PRODUCTION';
  return {
    mode,
    isProduction,
    shopId: process.env.IZIPAY_SHOP_ID!,
    password: isProduction ? process.env.IZIPAY_PROD_PASSWORD! : process.env.IZIPAY_TEST_PASSWORD!,
    hmacKey: isProduction ? process.env.IZIPAY_HMAC_PROD! : process.env.IZIPAY_HMAC_TEST!,
    apiUrl: process.env.IZIPAY_API_URL || 'https://api.micuentaweb.pe',
  };
}
export async function createFormToken(params: any) {
  const config = getIzipayConfig();
  const credentials = Buffer.from(`${config.shopId}:${config.password}`).toString('base64');
  const response = await fetch(`${config.apiUrl}/api-payment/V1/Charge/CreatePayment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${credentials}` },
    body: JSON.stringify({ amount: params.amount, currency: params.currency || 'PEN', orderId: params.orderId, customer: { email: params.customerEmail } }),
  });
  if (!response.ok) throw new Error(`Izipay error: ${response.status}`);
  const data = await response.json();
  if (data.status !== 'SUCCESS') throw new Error(data.answer?.errorMessage);
  const publicKey = config.isProduction ? process.env.NEXT_PUBLIC_IZIPAY_PROD_PUBLIC_KEY! : process.env.NEXT_PUBLIC_IZIPAY_TEST_PUBLIC_KEY!;
  return { formToken: data.answer.formToken, publicKey };
}
export function verifyIpnSignature(rawBody: string, sig: string): boolean {
  const config = getIzipayConfig();
  const expected = crypto.createHmac('sha256', config.hmacKey).update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}
export const solesToCentimos = (s: number) => Math.round(s * 100);
export const generateOrderId = (p = 'HIP') => `${p}-${Date.now()}-${Math.random().toString(36).substring(2,7).toUpperCase()}`;
