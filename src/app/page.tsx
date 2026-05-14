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
      <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🦋</div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '10px' }}>
        House Insects of Peru
      </h1>
      <p style={{ fontSize: '1rem', opacity: 0.6, marginBottom: '30px' }}>
        E.I.R.L. · RUC 20447397804 · Ley Amazonía N°27037
      </p>
      <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '500px', lineHeight: 1.8 }}>
        Especímenes biológicos · Joyería · Artesanías · Rarezas
      </p>
      <div style={{
        marginTop: '40px',
        padding: '14px 32px',
        background: '#C9A84C',
        color: '#1A1209',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 700,
      }}>
        Próximamente — Coming Soon
      </div>
    </main>
  )
}
