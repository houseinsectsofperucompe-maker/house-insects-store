const MAKE_TOKEN = '455ffa68-cc73-4c00-a388-e10b4b8a3940'
const TEAM_ID = 'HOUSE INSECTS OF PERU'

async function crearEscenario() {
  console.log('Conectando a Make.com...')
  
  // Obtener organizaciones
  const orgsRes = await fetch('https://us1.make.com/api/v2/organizations', {
    headers: { 'Authorization': `Token ${MAKE_TOKEN}` }
  })
  const orgs = await orgsRes.json()
  console.log('Organizaciones:', JSON.stringify(orgs, null, 2))
}

crearEscenario()
