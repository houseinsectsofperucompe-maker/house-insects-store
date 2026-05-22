import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, customerEmail } = body;
    
    const shopId = process.env.IZIPAY_SHOP_ID;
    const password = process.env.IZIPAY_TEST_PASSWORD;
    const apiUrl = process.env.IZIPAY_API_URL;
    
    console.log('[Izipay] Config:', { shopId, apiUrl, hasPassword: !!password });
    
    if (!shopId || !password) {
      return NextResponse.json({ error: 'Variables de entorno faltantes', shopId, apiUrl }, { status: 500 });
    }

    const credentials = Buffer.from(`${shopId}:${password}`).toString('base64');
    const payload = {
      amount: Math.round(amount * 100),
      currency: 'PEN',
      orderId: `HIP-${Date.now()}`,
      customer: { email: customerEmail },
    };

    const response = await fetch(`${apiUrl}/api-payment/V1/Charge/CreatePayment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${credentials}` },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('[Izipay] Response:', JSON.stringify(data));

    if (data.status !== 'SUCCESS') {
      return NextResponse.json({ error: data.answer?.errorMessage || 'Error Izipay', raw: data }, { status: 500 });
    }

    return NextResponse.json({ success: true, formToken: data.answer.formToken });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[Izipay] Error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
