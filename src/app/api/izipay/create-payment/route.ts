import { NextRequest, NextResponse } from 'next/server';
import { createFormToken, solesToCentimos, generateOrderId } from '@/lib/izipay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, customerEmail, customerName, orderId, description } = body;
    if (!amount || amount <= 0) return NextResponse.json({ error: 'Monto inválido' }, { status: 400 });
    if (!customerEmail) return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    const result = await createFormToken({
      amount: solesToCentimos(amount),
      currency: 'PEN',
      orderId: orderId || generateOrderId(),
      customerEmail,
      customerName,
      description,
    });
    return NextResponse.json({ success: true, formToken: result.formToken, publicKey: result.publicKey });
  } catch (error) {
    console.error('[Izipay] Error:', error);
    return NextResponse.json({ error: 'Error al procesar el pago.' }, { status: 500 });
  }
}
