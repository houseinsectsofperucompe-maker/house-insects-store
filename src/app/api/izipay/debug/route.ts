import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({
    IZIPAY_SHOP_ID: process.env.IZIPAY_SHOP_ID || 'NO EXISTE',
    IZIPAY_TEST_PASSWORD: process.env.IZIPAY_TEST_PASSWORD ? 'OK' : 'NO EXISTE',
    IZIPAY_API_URL: process.env.IZIPAY_API_URL || 'NO EXISTE',
    IZIPAY_MODE: process.env.IZIPAY_MODE || 'NO EXISTE',
  })
}
