
import {NextResponse} from 'next/server'
import {BetaAnalyticsDataClient} from '@google-analytics/data'

export async function GET(){
  try{
    const credentials=JSON.parse(process.env.GOOGLE_SA_KEY||'{}')
    const propertyId=process.env.GA_PROPERTY_ID||'14952816129'
    
    const client=new BetaAnalyticsDataClient({credentials})
    
    const [response]=await client.runReport({
      property:`properties/${propertyId}`,
      dateRanges:[{startDate:'30daysAgo',endDate:'today'}],
      dimensions:[{name:'country'}],
      metrics:[{name:'activeUsers'},{name:'sessions'},{name:'screenPageViews'}],
      orderBys:[{metric:{metricName:'activeUsers'},desc:true}],
      limit:20
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
