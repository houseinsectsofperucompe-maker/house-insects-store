export default function Loading() {
  const G = 'rgba(201,168,76,0.06)'
  const B = 'rgba(201,168,76,0.08)'
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <div style={{textAlign:'center',marginBottom:32}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:B,margin:'0 auto 10px'}}/>
        <div style={{width:200,height:24,background:B,borderRadius:4,margin:'0 auto 8px'}}/>
        <div style={{width:300,height:14,background:G,borderRadius:4,margin:'0 auto'}}/>
      </div>
      <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:24,flexWrap:'wrap'}}>
        {[1,2,3,4].map(i=><div key={i} style={{width:120,height:32,background:B,borderRadius:6}}/>)}
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8}}>
        {Array(21).fill(0).map((_,i)=>(
          <div key={i} style={{background:G,border:'1px solid rgba(201,168,76,0.08)',borderRadius:9,padding:10}}>
            <div style={{width:'100%',height:160,background:B,borderRadius:6,marginBottom:8}}/>
            <div style={{width:'80%',height:12,background:B,borderRadius:4,marginBottom:6}}/>
            <div style={{width:'40%',height:12,background:G,borderRadius:4}}/>
          </div>
        ))}
      </div>
    </div>
  )
}
