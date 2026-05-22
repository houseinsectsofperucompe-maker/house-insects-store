'use client'
import { useEffect, useRef } from 'react'

interface Props {
  formToken: string
  publicKey: string
  onSuccess: () => void
  onError: (msg: string) => void
}

export default function IzipayForm({ formToken, publicKey, onSuccess, onError }: Props) {
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    const script = document.createElement('script')
    script.src = 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js'
    script.setAttribute('kr-public-key', publicKey)
    script.setAttribute('kr-language', 'es-PE')
    script.onload = () => {
      const KR = (window as any).KR
      if (!KR) return
      KR.setFormConfig({ formToken, 'kr-language': 'es-PE' })
      KR.onSubmit((resp: any) => {
        if (resp.clientAnswer?.orderStatus === 'PAID') onSuccess()
        else onError('Pago no completado')
        return false
      })
    }
    document.head.appendChild(script)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/classic-reset.css'
    document.head.appendChild(link)

    const link2 = document.createElement('link')
    link2.rel = 'stylesheet'
    link2.href = 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/classic.css'
    document.head.appendChild(link2)
  }, [formToken, publicKey])

  return (
    <div style={{ marginTop: 12 }}>
      <div className="kr-smart-form" kr-form-token={formToken}></div>
    </div>
  )
}
