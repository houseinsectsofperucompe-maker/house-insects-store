'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ResultContent() {
  const params = useSearchParams();
  const status = params.get('status');
  const orderId = params.get('orderId');
  const amount = params.get('amount');
  const isSuccess = status === 'success';
  return (
    <main style={{ maxWidth: '480px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>{isSuccess ? '✅' : '❌'}</div>
      <h1 style={{ fontSize: '28px', fontWeight: '700', color: isSuccess ? '#2d6a4f' : '#e63946', marginBottom: '12px' }}>
        {isSuccess ? '¡Pago exitoso!' : 'Pago no procesado'}
      </h1>
      {isSuccess && orderId && (
        <div style={{ backgroundColor: '#f0fff4', border: '1px solid #b7e4c7', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ color: '#555', marginBottom: '4px' }}>Número de orden</p>
          <p style={{ fontWeight: '700', fontSize: '18px' }}>{orderId}</p>
          {amount && <p style={{ color: '#2d6a4f', fontWeight: '600', marginTop: '8px' }}>S/ {parseFloat(amount).toFixed(2)} pagado</p>}
        </div>
      )}
      <p style={{ color: '#555', marginBottom: '24px', fontSize: '14px' }}>
        {isSuccess ? 'Recibirás confirmación en tu correo.' : 'Intenta nuevamente o contáctanos.'}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/" style={{ backgroundColor: '#2d6a4f', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          Volver a la tienda
        </Link>
        {!isSuccess && (
          <Link href="/checkout" style={{ backgroundColor: '#e63946', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Reintentar
          </Link>
        )}
      </div>
    </main>
  );
}

export default function ResultadoPagoPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '60px' }}>Cargando...</div>}>
      <ResultContent />
    </Suspense>
  );
}
