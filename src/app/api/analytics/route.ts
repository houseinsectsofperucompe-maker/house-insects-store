import {NextResponse} from 'next/server'

export async function GET(){
  try{
    // Usar Measurement Protocol de GA4 para obtener datos
    const propertyId=process.env.GA_PROPERTY_ID||'539255389'
    const credentials=JSON.parse(process.env.GOOGLE_SA_KEY||'{}')
    
    const {BetaAnalyticsDataClient}=await import('@google-analytics/data')
    const client=new BetaAnalyticsDataClient({credentials})
    
    const [response]=await client.runReport({
      property:`properties/${propertyId}`,
      dateRanges:[{startDate:'30daysAgo',endDate:'today'}],
      dimensions:[{name:'country'}],
      metrics:[{name:'activeUsers'},{name:'sessions'},{name:'screenPageViews'}],
      orderBys:[{metric:{metricName:'activeUsers'},desc:true}],
      limit:50
    })
    
    const paises=(response.rows||[]).map(row=>({
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
