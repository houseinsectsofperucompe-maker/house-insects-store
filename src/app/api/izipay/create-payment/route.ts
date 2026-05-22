import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, customerEmail } = body;
    
    const shopId = process.env.IZIPAY_SHOP_ID;
    const password = process.env.IZIPAY_TEST_PASSWORD;
    const apiUrl = process.env.IZIPAY_API_URL;

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

    const text = await response.text();
    
    return NextResponse.json({ 
      status: response.status, 
      body: text.substring(0, 500)
    });

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
