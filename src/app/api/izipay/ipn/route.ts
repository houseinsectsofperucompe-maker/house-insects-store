import { NextRequest, NextResponse } from "next/server";
import { verifyIpnSignature } from "@/lib/izipay";

async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
    body: JSON.stringify({ from: "House Insects of Peru <onboarding@resend.dev>", to: [to], subject, html }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("kr-hash") || "";
    if (!verifyIpnSignature(rawBody, signature)) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    const ipnData = JSON.parse(rawBody);
    const answer = ipnData.clientAnswer || ipnData;
    const orderId = answer.orderDetails?.orderId;
    const orderStatus = answer.orderDetails?.orderStatus;
    const amount = ((answer.orderDetails?.orderTotalAmount || 0) / 100).toFixed(2);
    const currency = answer.orderDetails?.orderCurrency || "USD";
    const customerEmail = answer.customer?.email || "";
    const transactionId = answer.transactions?.[0]?.uuid || "";
    if (orderStatus === "PAID") {
      await sendEmail("houseinsectsofperu.com.pe@gmail.com", "NUEVO PAGO " + amount + " " + currency, "<h1>Nuevo Pago Recibido</h1><p>Orden: " + orderId + "</p><p>Monto: " + amount + " " + currency + "</p><p>Cliente: " + customerEmail + "</p><p>TX: " + transactionId + "</p>");
      if (customerEmail) await sendEmail(customerEmail, "Pago confirmado - House Insects of Peru", "<h1>Gracias por tu compra</h1><p>Pago de " + amount + " " + currency + " confirmado.</p><p>Orden: " + orderId + "</p><p>WhatsApp: +51 940 699 405</p>");
    }
    return NextResponse.json({ status: "received" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "error_logged" }, { status: 200 });
  }
}
