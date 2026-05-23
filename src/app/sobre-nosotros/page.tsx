'use client'
export default function SobreNosotros() {
  return (
    <div style={{background:'#1A1209',minHeight:'100vh',fontFamily:'Georgia,serif',color:'#E8C97A',padding:'40px 20px'}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <img src="https://res.cloudinary.com/dv3mvukmq/image/upload/v1779570739/sobre-nosotros-local.png" style={{width:"100%",height:280,objectFit:"cover",borderRadius:12,border:"1px solid rgba(201,168,76,0.3)",marginBottom:24,display:"block"}} alt="Local House Insects of Peru Tingo Maria"/>
          <img src="/logo-house-insects-peru.png" style={{width:100,height:100,objectFit:'contain',borderRadius:'50%',border:'2px solid rgba(201,168,76,0.4)',marginBottom:16}} alt="House Insects of Peru"/>
          <h1 style={{fontSize:'1.6rem',fontWeight:300,letterSpacing:'.08em',marginBottom:6}}>House Insects of Peru E.I.R.L.</h1>
          <p style={{fontSize:'.7rem',color:'rgba(201,168,76,0.4)',letterSpacing:'.12em'}}>RUC 20447397804 · TINGO MARÍA, HUÁNUCO, PERÚ · EST. 2002</p>
          <div style={{width:60,height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'16px auto'}}/>
        </div>

        {[
          {title:'Perfil Corporativo',content:'House Insects of Peru E.I.R.L. es una empresa peruana formalmente constituida con RUC 20447397804, con domicilio fiscal y operaciones en Tingo María, Huánuco. Desde el año 2002, operamos de manera legalizada en el sector de la entomología y la exportación de especímenes biológicos, respaldados por una trayectoria técnica y comercial de 45 años de experiencia en taxidermia y preservación científica.'},
          {title:'Actividad Comercial',content:'Nuestra actividad principal es el biocomercio internacional. Nos dedicamos a la preparación, catalogación y exportación global de colecciones científicas y piezas de arte biológico — lepidópteros y coleópteros exóticos de la Amazonía peruana. Conectamos nuestra producción local con museos, universidades y coleccionistas privados en mercados internacionales de alta gama a través de canales de comercio electrónico modernos.'},
          {title:'Mercados Internacionales',content:'Exportamos a más de 15 países incluyendo USA, Alemania, Japón, China, Reino Unido, Francia, Australia, Canadá, Corea del Sur, Singapur, Emiratos Árabes y toda América Latina. Nuestros clientes incluyen museos de historia natural, universidades, galerías de arte y coleccionistas privados de alto nivel.'},
          {title:'Canales de Venta',content:'Operamos a través de nuestra tienda online houseinsectsofperu.com, así como en marketplaces internacionales como Etsy, eBay y Alibaba. Todas las transacciones son procesadas con facturación electrónica SUNAT y documentación de exportación completa.'},
        ].map((s,i)=>(
          <div key={i} style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:10,padding:24,marginBottom:16}}>
            <h2 style={{fontSize:'1rem',fontWeight:700,color:'#C9A84C',marginBottom:12,letterSpacing:'.06em'}}>{s.title}</h2>
            <p style={{fontSize:'.82rem',lineHeight:1.8,color:'rgba(232,201,122,0.8)'}}>{s.content}</p>
          </div>
        ))}

        <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:10,padding:24,marginBottom:16}}>
          <h2 style={{fontSize:'1rem',fontWeight:700,color:'#C9A84C',marginBottom:16,letterSpacing:'.06em'}}>Cumplimiento Normativo</h2>
          {[
            ['🏛️ SUNAT','RUC 20447397804 · Registro tributario y aduanero activo · Facturación electrónica'],
            ['🌿 SERFOR','Guías de Transporte de Fauna Silvestre · Exportación legal certificada'],
            ['🌱 SENASA','Certificados fitosanitarios · Sanidad y manejo sostenible de recursos'],
            ['🌍 CITES','Apéndice II · Convenio internacional comercio legal de especies · Washington'],
            ['🇵🇪 PROMPERU','Exportador certificado · Programa de promoción de exportaciones del Perú'],
          ].map(([k,v],i)=>(
            <div key={i} style={{display:'flex',gap:12,padding:'10px 0',borderBottom:'1px solid rgba(201,168,76,0.08)'}}>
              <span style={{fontSize:'.82rem',fontWeight:700,color:'#C9A84C',minWidth:120}}>{k}</span>
              <span style={{fontSize:'.78rem',color:'rgba(232,201,122,0.7)',lineHeight:1.6}}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:10,padding:24,marginBottom:32}}>
          <h2 style={{fontSize:'1rem',fontWeight:700,color:'#C9A84C',marginBottom:12,letterSpacing:'.06em'}}>Propósito Bancario</h2>
          <p style={{fontSize:'.82rem',lineHeight:1.8,color:'rgba(232,201,122,0.8)'}}>La empresa requiere y utiliza servicios financieros con el fin exclusivo de recibir transferencias internacionales de clientes globales, gestionar pasarelas de pago electrónicas y procesar el flujo de caja necesario para sus operaciones logísticas de exportación desde el Perú hacia mercados internacionales.</p>
        </div>

        <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:32}}>
          {[['https://e-consultaruc.sunat.gob.pe','🏛️ Verificar RUC SUNAT'],['https://www.gob.pe/serfor','🌿 Portal SERFOR'],['https://www.senasa.gob.pe','🌱 Portal SENASA'],['https://cites.org','🌍 Portal CITES']].map(([url,label])=>(
            <a key={String(url)} href={String(url)} target="_blank" style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:6,padding:'8px 14px',color:'#C9A84C',textDecoration:'none',fontSize:'.72rem'}}>{String(label)}</a>
          ))}
        </div>

        <div style={{textAlign:'center',marginBottom:24}}>
          <a href="https://wa.me/51940699405" target="_blank" style={{background:'#25D366',color:'white',padding:'12px 28px',borderRadius:6,fontWeight:700,textDecoration:'none',fontSize:'.85rem',marginRight:10}}>💬 +51 940 699 405</a>
          <a href="https://wa.me/51920644433" target="_blank" style={{background:'#25D366',color:'white',padding:'12px 28px',borderRadius:6,fontWeight:700,textDecoration:'none',fontSize:'.85rem'}}>💬 +51 920 644 433</a>
        </div>

        <div style={{textAlign:'center'}}>
          <a href="/" style={{display:'inline-block',background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',borderRadius:8,padding:'10px 24px',color:'#C9A84C',fontSize:'.82rem',textDecoration:'none',fontWeight:700}}>← Volver al Escritorio Principal</a>
        </div>
      </div>
    </div>
  )
}
