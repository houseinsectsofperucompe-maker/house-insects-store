import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, customerEmail, currency = 'USD' } = body;
    const shopId = process.env.IZIPAY_SHOP_ID;
    const isProd = process.env.IZIPAY_MODE === "PRODUCTION"
    const password = isProd ? process.env.IZIPAY_PROD_PASSWORD : process.env.IZIPAY_TEST_PASSWORD;
    const credentials = Buffer.from(`${shopId}:${password}`).toString('base64');
    const payload = { amount: Math.round(amount * 100), currency, orderId: `HIP-${Date.now()}`, customer: { email: customerEmail } };
    const response = await fetch('https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${credentials}` },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.status !== 'SUCCESS') {
      return NextResponse.json({ error: data.answer?.errorMessage, code: data.answer?.errorCode }, { status: 500 });
    }
    const publicKey = isProd ? process.env.NEXT_PUBLIC_IZIPAY_PROD_PUBLIC_KEY : process.env.NEXT_PUBLIC_IZIPAY_TEST_PUBLIC_KEY;
    return NextResponse.json({ success: true, formToken: data.answer.formToken, publicKey });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
