'use client'
import { useState, useEffect } from 'react'

type Especie = {
  _id: string
  n: string
  p: number
  s: number
  foto?: string
  fotoLado?: string
  fotoReverso?: string
  familia: string
  activo: boolean
}

const G = '#C9A84C'
const BG = '#0A0A05'
const CARD = '#1A1209'
const BD = 'rgba(201,168,76,0.2)'

export default function EspecimenesManager() {
  const [especies, setEspecies] = useState<Especie[]>([])
  const [loading, setLoading] = useState(true)
  const [famSel, setFamSel] = useState('')
  const [busq, setBusq] = useState('')
  const [editando, setEditando] = useState<Record<string, Partial<Especie>>>({})
  const [guardando, setGuardando] = useState<Record<string, boolean>>({})
  const [nuevaEsp, setNuevaEsp] = useState({ nombre: '', precio: '', stock: '' })
  const [nuevaFam, setNuevaFam] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/sanity-read')
      const data = await res.json()
      setEspecies(data)
      if (data.length > 0 && !famSel) setFamSel(data[0].familia)
    } catch (e) {
      setMsg('Error cargando datos')
    }
    setLoading(false)
  }

  const familias = Array.from(new Set(especies.map(e => e.familia))).sort()
  const filtrados = especies.filter(e => e.familia === famSel && e.n.toLowerCase().includes(busq.toLowerCase()))
  const total = especies.length
  const sinPrecio = especies.filter(e => e.p === 0).length

  const editar = (id: string, campo: string, val: string | boolean) => {
    setEditando(prev => ({ ...prev, [id]: { ...prev[id], [campo]: val } }))
  }

  const guardar = async (esp: Especie) => {
    setGuardando(prev => ({ ...prev, [esp._id]: true }))
    const cambios = editando[esp._id] || {}
    const data = {
      _id: esp._id,
      precio: cambios.p !== undefined ? Number(cambios.p) : esp.p,
      stock: cambios.s !== undefined ? Number(cambios.s) : esp.s,
      fotoFrente: cambios.foto !== undefined ? cambios.foto : esp.foto,
      fotoLado: cambios.fotoLado !== undefined ? cambios.fotoLado : esp.fotoLado,
      fotoReverso: cambios.fotoReverso !== undefined ? cambios.fotoReverso : esp.fotoReverso,
      activo: cambios.activo !== undefined ? cambios.activo : esp.activo,
    }
    const res = await fetch('/api/sanity-write', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', data })
    })
    const result = await res.json()
    if (result.ok) {
      setMsg('✅ Guardado')
      setEditando(prev => { const n = { ...prev }; delete n[esp._id]; return n })
      cargar()
    } else {
      setMsg('❌ Error: ' + result.error)
    }
    setGuardando(prev => ({ ...prev, [esp._id]: false }))
    setTimeout(() => setMsg(''), 3000)
  }

  const eliminar = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return
    await fetch('/api/sanity-write', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', data: { _id: id } })
    })
    setMsg('🗑️ Eliminado')
    cargar()
    setTimeout(() => setMsg(''), 3000)
  }

  const crearEspecie = async () => {
    if (!nuevaEsp.nombre || !famSel) return
    await fetch('/api/sanity-write', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create', data: {
        nombre: nuevaEsp.nombre,
        familia: famSel,
        precio: parseFloat(nuevaEsp.precio) || 0,
        stock: parseInt(nuevaEsp.stock) || 0,
      }})
    })
    setNuevaEsp({ nombre: '', precio: '', stock: '' })
    setMsg('✅ Especie creada')
    cargar()
    setTimeout(() => setMsg(''), 3000)
  }

  const crearFamilia = async () => {
    if (!nuevaFam) return
    await fetch('/api/sanity-write', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'createFamilia', data: { nombre: nuevaFam } })
    })
    setNuevaFam('')
    setMsg('✅ Familia creada')
    cargar()
    setTimeout(() => setMsg(''), 3000)
  }

  const inp = { background: 'rgba(201,168,76,0.08)', border: `1px solid ${BD}`, color: '#E8C97A', padding: '5px 8px', borderRadius: 4, fontSize: '.78rem', fontFamily: 'Georgia,serif' }

  if (loading) return <div style={{ color: G, padding: 40, textAlign: 'center' }}>Cargando especies desde Sanity...</div>

  return (
    <div style={{ fontFamily: 'Georgia,serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h2 style={{ color: '#E8C97A', fontSize: '1.3rem', fontWeight: 300, marginBottom: 4 }}>🦋 Gestor de Especímenes</h2>
          <p style={{ color: 'rgba(201,168,76,0.4)', fontSize: '.68rem' }}>{total} especies · <span style={{ color: sinPrecio > 0 ? '#ff9966' : '#25D366' }}>{sinPrecio} sin precio</span></p>
        </div>
        <button onClick={cargar} style={{ ...inp, cursor: 'pointer', padding: '8px 16px' }}>🔄 Recargar</button>
      </div>

      {msg && <div style={{ background: 'rgba(201,168,76,0.1)', border: `1px solid ${BD}`, borderRadius: 6, padding: '8px 14px', marginBottom: 12, color: G, fontSize: '.8rem' }}>{msg}</div>}

      {/* Nueva familia */}
      <div style={{ background: CARD, border: `1px solid ${BD}`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
        <p style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.65rem', marginBottom: 6 }}>NUEVA FAMILIA</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={nuevaFam} onChange={e => setNuevaFam(e.target.value)} placeholder="Nombre de la familia" style={{ ...inp, flex: 1 }} />
          <button onClick={crearFamilia} style={{ background: G, color: CARD, border: 'none', padding: '6px 14px', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: '.8rem' }}>+ Crear</button>
        </div>
      </div>

      {/* Tabs familias */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
        {familias.map(f => (
          <button key={f} onClick={() => { setFamSel(f); setBusq('') }} style={{ padding: '5px 12px', borderRadius: 16, fontSize: '.65rem', cursor: 'pointer', fontFamily: 'Georgia,serif', border: `1px solid ${famSel === f ? G : BD}`, background: famSel === f ? G : 'transparent', color: famSel === f ? CARD : G, fontWeight: famSel === f ? 700 : 400 }}>
            {f} ({especies.filter(e => e.familia === f).length})
          </button>
        ))}
      </div>

      {/* Buscar */}
      <input value={busq} onChange={e => setBusq(e.target.value)} placeholder="Buscar especie..." style={{ ...inp, width: '100%', marginBottom: 12, boxSizing: 'border-box' as const }} />

      {/* Nueva especie */}
      <div style={{ background: CARD, border: `1px solid rgba(201,168,76,0.15)`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
        <p style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.65rem', marginBottom: 6 }}>NUEVA ESPECIE EN {famSel}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input value={nuevaEsp.nombre} onChange={e => setNuevaEsp(p => ({ ...p, nombre: e.target.value }))} placeholder="Nombre científico" style={{ ...inp, flex: 2, minWidth: 200 }} />
          <input value={nuevaEsp.precio} onChange={e => setNuevaEsp(p => ({ ...p, precio: e.target.value }))} placeholder="Precio USD" style={{ ...inp, width: 90 }} type="number" />
          <input value={nuevaEsp.stock} onChange={e => setNuevaEsp(p => ({ ...p, stock: e.target.value }))} placeholder="Stock" style={{ ...inp, width: 80 }} type="number" />
          <button onClick={crearEspecie} style={{ background: G, color: CARD, border: 'none', padding: '6px 14px', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: '.8rem' }}>+ Agregar</button>
        </div>
      </div>

      <p style={{ color: 'rgba(201,168,76,0.4)', fontSize: '.65rem', marginBottom: 8 }}>{filtrados.length} especies en {famSel}</p>

      {/* Lista especies */}
      {filtrados.map(esp => {
        const cam = editando[esp._id] || {}
        const modificado = Object.keys(cam).length > 0
        return (
          <div key={esp._id} style={{ background: modificado ? 'rgba(201,168,76,0.08)' : CARD, border: `1px solid ${modificado ? G : BD}`, borderRadius: 8, padding: '10px 12px', marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ color: '#E8C97A', fontSize: '.8rem', fontStyle: 'italic', flex: 1 }}>{esp.n}</span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                  <input type="checkbox" checked={cam.activo !== undefined ? cam.activo as boolean : esp.activo} onChange={e => editar(esp._id, 'activo', e.target.checked)} />
                  <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.6rem' }}>Activo</span>
                </label>
                {modificado && (
                  <button onClick={() => guardar(esp)} disabled={guardando[esp._id]} style={{ background: '#25D366', color: '#0A0A05', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '.7rem', fontWeight: 700 }}>
                    {guardando[esp._id] ? '...' : '💾 Guardar'}
                  </button>
                )}
                <button onClick={() => eliminar(esp._id, esp.n)} style={{ background: 'rgba(255,80,80,0.15)', color: '#ff5050', border: '1px solid rgba(255,80,80,0.3)', padding: '4px 8px', borderRadius: 4, cursor: 'pointer', fontSize: '.65rem' }}>🗑️</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div>
                <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.6rem', display: 'block', marginBottom: 2 }}>PRECIO USD</span>
                <input type="number" value={cam.p !== undefined ? cam.p : esp.p} onChange={e => editar(esp._id, 'p', e.target.value)} style={{ ...inp, width: 80 }} />
              </div>
              <div>
                <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.6rem', display: 'block', marginBottom: 2 }}>STOCK</span>
                <input type="number" value={cam.s !== undefined ? cam.s : esp.s} onChange={e => editar(esp._id, 's', e.target.value)} style={{ ...inp, width: 80 }} />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.6rem', display: 'block', marginBottom: 2 }}>FOTO FRENTE (URL)</span>
                <input value={cam.foto !== undefined ? cam.foto as string : (esp.foto || '')} onChange={e => editar(esp._id, 'foto', e.target.value)} placeholder="https://HouseInsects1967.b-cdn.net/..." style={{ ...inp, width: '100%', boxSizing: 'border-box' as const }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
