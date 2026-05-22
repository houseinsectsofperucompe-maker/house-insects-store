'use client'
import { useState } from 'react'
import { useCarrito } from './CarritoContext'
import CarritoCompras from './CarritoCompras'

export default function CarritoBoton() {
  const { items, cantidad, updateItems } = useCarrito()
  const [open, setOpen] = useState(false)
  if (cantidad === 0) return null
  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        position:'fixed', bottom:160, right:24, zIndex:998,
        background:'#C9A84C', color:'#1A1209',
        border:'none', borderRadius:50,
        padding:'14px 22px', cursor:'pointer',
        display:'flex', alignItems:'center', gap:10,
        boxShadow:'0 4px 24px rgba(201,168,76,0.6)',
        fontFamily:'Georgia,serif', fontWeight:700,
        fontSize:'1rem'
      }}>
        <span style={{fontSize:'1.4rem'}}>🛒</span>
        <span>Mi Carrito · {cantidad} items</span>
        <span style={{
          position:'absolute', top:-8, right:-8,
          background:'#e63946', color:'white',
          borderRadius:'50%', width:26, height:26,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'.8rem', fontWeight:700, border:'3px solid #C9A84C'
        }}>{cantidad}</span>
      </button>
      {open && (
        <CarritoCompras
          items={items}
          onClose={() => setOpen(false)}
          onUpdateItems={updateItems}
          onPagar={(d) => { console.log('Pedido:', d); setOpen(false) }}
        />
      )}
    </>
  )
}
