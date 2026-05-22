import { NextRequest, NextResponse } from 'next/server';
import { verifyIpnSignature } from '@/lib/izipay';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('kr-hash') || '';
    if (!verifyIpnSignature(rawBody, signature)) {
      console.error('[Izipay IPN] Firma inválida');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    const ipnData = JSON.parse(rawBody);
    const answer = ipnData.clientAnswer || ipnData;
    const orderId = answer.orderDetails?.orderId;
    const orderStatus = answer.orderDetails?.orderStatus;
    const transactionId = answer.transactions?.[0]?.uuid;
    console.log(`[Izipay IPN] Orden: ${orderId} | Estado: ${orderStatus} | TX: ${transactionId}`);
    if (orderStatus === 'PAID') {
      console.log(`✅ Pago confirmado: ${orderId}`);
    } else {
      console.log(`❌ Pago no completado: ${orderId}`);
    }
    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (error) {
    console.error('[Izipay IPN] Error:', error);
    return NextResponse.json({ status: 'error_logged' }, { status: 200 });
  }
}
