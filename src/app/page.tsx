import Image from 'next/image'

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#1A1209',
      color: '#E8C97A',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px',
    }}>
      <Image
        src="/logo.png"
        alt="House Insects of Peru"
        width={300}
        height={300}
        loading="eager"
        style={{ marginBottom: '30px' }}
      />
      <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '10px' }}>
        House Insects of Peru
      </h1>
      <p style={{ fontSize: '1rem', opacity: 0.6 }}>
        E.I.R.L. · RUC 20447397804 · Ley Amazonía N°27037
      </p>
    </main>
  )
}