import {NextResponse} from 'next/server'

export async function GET(){
  try{
    // Obtener access token con refresh token
    const tokenRes=await fetch('https://oauth2.googleapis.com/token',{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({
        client_id:'407408718192.apps.googleusercontent.com',
        client_secret:process.env.GA_CLIENT_SECRET||'',
        refresh_token:process.env.GA_REFRESH_TOKEN||'',
        grant_type:'refresh_token'
      })
    })
    const tokenData=await tokenRes.json()
    const accessToken=tokenData.access_token
    if(!accessToken) return NextResponse.json({ok:false,error:'No access token',paises:[]})

    // Llamar a GA4 Data API
    const propertyId=process.env.GA_PROPERTY_ID||'539255389'
    const gaRes=await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${accessToken}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        dateRanges:[{startDate:'30daysAgo',endDate:'today'}],
        dimensions:[{name:'country'}],
        metrics:[{name:'activeUsers'},{name:'sessions'},{name:'screenPageViews'}],
        orderBys:[{metric:{metricName:'activeUsers'},desc:true}],
        limit:50
      })
    })
    const gaData=await gaRes.json()
    if(gaData.error) return NextResponse.json({ok:false,error:gaData.error.message,paises:[]})

    const paises=(gaData.rows||[]).map((row:any)=>({
      pais:row.dimensionValues?.[0]?.value||'Unknown',
      usuarios:parseInt(row.metricValues?.[0]?.value||'0'),
      sesiones:parseInt(row.metricValues?.[1]?.value||'0'),
      vistas:parseInt(row.metricValues?.[2]?.value||'0'),
    }))

    return NextResponse.json({ok:true,paises})
  }catch(e:any){
    return NextResponse.json({ok:false,error:e.message,paises:[]})
  }
}
