'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'

function CheckoutForm() {
  const params = useSearchParams()
  const token = params.get('token') || ''
  const key = params.get('key') || ''
  const total = params.get('total') || '0'

  useEffect(() => {
    if (!token || !key) return
    const style = document.createElement('style')
    style.innerHTML = ".kr-field-wrapper { background: #f5f0e8 !important; border: 2px solid #C9A84C !important; border-radius: 8px !important; margin-bottom: 12px !important; padding: 4px 8px !important; } .kr-field-wrapper input { color: #1A1209 !important; font-size: 1rem !important; } .kr-label { color: #5a4a2a !important; font-size: .8rem !important; font-weight: 700 !important; } .kr-payment-button { background: #C9A84C !important; color: #1A1209 !important; font-weight: 700 !important; border-radius: 8px !important; }"