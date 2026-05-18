import { NextResponse } from "next/server"
export async function GET() {
  return NextResponse.json({
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? "OK" : "FALTA",
    make: process.env.MAKE_API_TOKEN ? "OK" : "FALTA",
    hubspot: process.env.HUBSPOT_API_KEY ? "OK" : "FALTA",
    sunat: process.env.SUNAT_RUC ? "OK" : "FALTA",
  })
}