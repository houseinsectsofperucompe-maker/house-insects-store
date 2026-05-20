'use client'
import { useState } from 'react'

const MONEDAS = [
  {code:'USD',symbol:'$',flag:'🇺🇸'},
  {code:'EUR',symbol:'€',flag:'🇪🇺'},
  {code:'CNY',symbol:'¥',flag:'🇨🇳'},
  {code:'AED',symbol:'د.إ',flag:'🇦🇪'},
  {code:'TRY',symbol:'₺',flag:'🇹🇷'},
  {code:'JPY',symbol:'¥',flag:'🇯🇵'},
  {code:'GBP',symbol:'£',flag:'🇬🇧'},
  {code:'BRL',symbol:'R$',flag:'🇧🇷'},
  {code:'SGD',symbol:'S$',flag:'🇸🇬'},
  {code:'PEN',symbol:'S/.',flag:'🇵🇪'},
]

export default function CurrencySelector() {
  const [moneda, setMoneda] = useState('USD')
  const [show, setShow] = useState(false)
  const actual = MONEDAS.find(m=>m.code===moneda)
  return (
    <div style={{position:'relative'}}>
      <button onClick={()=>setShow(s=>!s)} style={{background:'rgba(26,18,9,0.95)',border:'1px solid rgba(201,168,76,0.4)',color:'#C9A84C',padding:'6px 14px',borderRadius:20,cursor:'pointer',fontSize:'.8rem',fontFamily:'Georgia,serif',display:'flex',alignItems:'center',gap:6}}>
        <span>{actual?.flag}</span><span>{moneda}</span><span style={{fontSize:'.6rem'}}>▾</span>
      </button>
      {show&&(
        <div style={{position:'absolute',right:0,top:40,background:'rgba(20,13,5,0.98)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:8,padding:6,maxHeight:320,overflowY:'auto',minWidth:150,boxShadow:'0 8px 32px rgba(0,0,0,0.6)',zIndex:1000}}>
          {MONEDAS.map(m=>(
            <button key={m.code} onClick={()=>{setMoneda(m.code);setShow(false)}}
              style={{display:'flex',alignItems:'center',gap:8,width:'100%',background:moneda===m.code?'rgba(201,168,76,0.12)':'transparent',border:'none',color:moneda===m.code?'#C9A84C':'rgba(232,201,122,0.55)',padding:'7px 12px',cursor:'pointer',fontSize:'.78rem',textAlign:'left',fontFamily:'Georgia,serif',borderRadius:4}}>
              <span>{m.flag}</span><span>{m.code}</span><span style={{color:'rgba(255,255,255,0.3)',fontSize:'.7rem'}}>{m.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
