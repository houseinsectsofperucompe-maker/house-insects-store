import { defineConfig, defineType, defineField } from 'sanity'
import { structureTool } from 'sanity/structure'

const RUBROS = ['especimenes','diurnas','joyeria','rarezas','artesanias','herramientas','nocturnas','coleoptera','minerales','semillas','frutas','hongos','maderas','textileria','pinturas','esencias','superalimentos']

const PAGOS = ['izipay','stripe','worldfirst','katenos','alipay','wechat','unionpay','1688','xiongshu','kakaopay','naverpay','toss','promptpay','truemoney','linepay','payme_hk','fps_hk','wise','payoneer','western_union','moneygram','google_pay','ebay_payments']

const COURIERS = ['DHL','FedEx','UPS','Aramex','EMS Internacional','Exporta Facil SERPOST','SERPOST Peru','SUNAT Digital']

const PERMISOS = ['SERFOR','CITES','SENASA','DIGESA','DIGEMID','Fitosanitario','ITP','MINCUL','PRODUCE','Aduana SUNAT','Customs Code 9705','DAM Exportacion','SERFOR Amazonia','CITES Apendice II','Certificado Origen']

const ASEGURADORAS = ['Ship Insurance','Insurtech Digital','IATA Cargo','Lloyd\'s of London']

const PARTIDAS: Record<string,string> = {
  especimenes:'9705.00.00',diurnas:'9705.00.00',nocturnas:'9705.00.00',
  coleoptera:'9705.00.00',rarezas:'9705.00.00',joyeria:'7117.90.00',
  artesanias:'9601.90.00',textileria:'6304.99.00',maderas:'4420.90.00',
  minerales:'7103.99.00',esencias:'3301.29.00',superalimentos:'2106.90.00',
  semillas:'1209.99.00',frutas:'0811.90.00',hongos:'0712.39.00',
  herramientas:'9023.00.00',pinturas:'9701.10.00',
}

const especieSchema = defineType({
  name:'especie',title:'Especies',type:'document',
  fields:[
    defineField({name:'ordenCategoria',title:'1. Orden / Categoria',type:'string',options:{list:[
      {title:'🦋 Lepidoptera Diurnae',value:'Lepidoptera Diurnae'},
      {title:'🌙 Moths Nocturnas',value:'Moths Nocturnas'},
      {title:'🪲 Coleoptera',value:'Coleoptera'},
      {title:'🕷️ Arthropoda',value:'Arthropoda'},
    ]},validation:r=>r.required()}),
    defineField({name:'familia',title:'2. Familia',type:'string',validation:r=>r.required()}),
    defineField({name:'subfamilia',title:'3. Subfamilia',type:'string'}),
    defineField({name:'nombre',title:'4. Nombre Cientifico',type:'string',validation:r=>r.required()}),
    defineField({name:'precio',title:'5. Precio USD',type:'number',validation:r=>r.required().min(0)}),
    defineField({name:'precioMayorista',title:'5b. Precio Mayorista USD',type:'number'}),
    defineField({name:'precioVIP',title:'5c. Precio VIP USD',type:'number'}),
    defineField({name:'stock',title:'6. Stock',type:'number',validation:r=>r.required().min(0)}),
    defineField({name:'stockMinimo',title:'6b. Stock minimo alerta',type:'number',initialValue:5}),
    defineField({name:'calidad',title:'7. Calidad',type:'string',options:{list:[
      {title:'A1 - Perfecto',value:'A1'},
      {title:'A1- - Pequeños defectos',value:'A1-'},
      {title:'VGA2 - Segunda buena',value:'VGA2'},
      {title:'A2 - Segunda',value:'A2'},
    ]},initialValue:'A1'}),
    defineField({name:'sexo',title:'8. Sexo',type:'string',options:{list:[
      {title:'M - Macho',value:'M'},
      {title:'F - Hembra',value:'F'},
      {title:'P - Par',value:'P'},
      {title:'EP - Ex-pupae',value:'EP'},
      {title:'S - Set',value:'S'},
      {title:'M or F',value:'M or F'},
    ]},initialValue:'M or F'}),
    defineField({name:'tamano',title:'9. Tamaño',type:'string',options:{list:[
      {title:'S (3-5 cm)',value:'S'},
      {title:'M (5-8 cm)',value:'M'},
      {title:'L (8-12 cm)',value:'L'},
      {title:'XL (12-15 cm)',value:'XL'},
      {title:'XXL (15-20 cm)',value:'XXL'},
      {title:'XXXL (20+ cm)',value:'XXXL'},
    ]}}),
    defineField({name:'montaje',title:'10. Tipo de montaje',type:'string',options:{list:[
      {title:'Sin montar / alas cerradas',value:'sin_montar'},
      {title:'Montado / alas abiertas',value:'montado'},
      {title:'Enmarcado',value:'enmarcado'},
      {title:'Par enmarcado',value:'par_enmarcado'},
      {title:'Enmarcado fondo negro',value:'fondo_negro'},
    ]}}),
    defineField({name:'localidad',title:'11. Localidad',type:'string',initialValue:'Tingo Maria, Huanuco, Peru'}),
    defineField({name:'procedenciaAmazonica',title:'11b. Procedencia amazonica',type:'boolean',initialValue:true}),
    defineField({name:'codigoQR',title:'12. SKU / Codigo QR',type:'string'}),
    defineField({name:'partidaArancelaria',title:'13. Partida arancelaria',type:'string',initialValue:'9705.00.00'}),
    defineField({name:'pesoGramos',title:'14. Peso en gramos',type:'number'}),
    defineField({name:'fotoFrente',title:'15. Foto Frente (URL Bunny)',type:'url'}),
    defineField({name:'fotoLado',title:'16. Foto Lado (URL Bunny)',type:'url'}),
    defineField({name:'fotoReverso',title:'17. Foto Reverso (URL Bunny)',type:'url'}),
    defineField({name:'video',title:'18. Video URL',type:'url'}),
    defineField({name:'descripcion',title:'19. Descripcion (ES)',type:'text',rows:3}),
    defineField({name:'descripcionEN',title:'20. Description (EN)',type:'text',rows:3}),
    defineField({name:'descripcionZH',title:'21. 描述 (ZH)',type:'text',rows:3}),
    defineField({name:'metaTitulo',title:'22. Meta titulo SEO',type:'string'}),
    defineField({name:'metaDescripcion',title:'23. Meta descripcion SEO',type:'text'}),
    defineField({name:'precioLujo',title:'24. Precio Lujo USD',type:'number'}),
    defineField({name:'activo',title:'Activo en catalogo',type:'boolean',initialValue:true}),
  ],
  preview:{select:{title:'nombre',subtitle:'familia'},prepare({title,subtitle}){return{title,subtitle}}},
  orderings:[
    {title:'Nombre A-Z',name:'nombreAsc',by:[{field:'nombre',direction:'asc'}]},
    {title:'Precio Mayor',name:'precioDesc',by:[{field:'precio',direction:'desc'}]},
    {title:'Stock Mayor',name:'stockDesc',by:[{field:'stock',direction:'desc'}]},
  ]
})

const familiaSchema = defineType({
  name:'familia',title:'Familias',type:'document',
  fields:[
    defineField({name:'nombre',title:'Nombre',type:'string',validation:r=>r.required()}),
    defineField({name:'orden',title:'Orden',type:'string',options:{list:['Lepidoptera Diurnae','Moths Nocturnas','Coleoptera','Arthropoda']}}),
    defineField({name:'descripcion',title:'Descripcion',type:'text'}),
    defineField({name:'imagen',title:'Imagen URL',type:'url'}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
    defineField({name:'ordenDisplay',title:'Orden display',type:'number',initialValue:0}),
  ],
  preview:{select:{title:'nombre',subtitle:'orden'}}
})

const ordenSchema = defineType({
  name:'orden',title:'Ordenes',type:'document',
  fields:[
    defineField({name:'nombre',title:'Nombre',type:'string',validation:r=>r.required()}),
    defineField({name:'icono',title:'Icono emoji',type:'string'}),
    defineField({name:'descripcion',title:'Descripcion',type:'text'}),
    defineField({name:'imagen',title:'Imagen URL',type:'url'}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
    defineField({name:'ordenDisplay',title:'Orden display',type:'number',initialValue:0}),
  ],
  preview:{select:{title:'nombre',subtitle:'icono'}}
})

const categoriaSchema = defineType({
  name:'categoria',title:'Categorias',type:'document',
  fields:[
    defineField({name:'nombre',title:'Nombre',type:'string',validation:r=>r.required()}),
    defineField({name:'slug',title:'Slug URL',type:'slug',options:{source:'nombre'}}),
    defineField({name:'rubro',title:'Rubro',type:'string',options:{list:RUBROS.map(r=>({title:r,value:r}))}}),
    defineField({name:'descripcion',title:'Descripcion',type:'text'}),
    defineField({name:'imagen',title:'Imagen URL',type:'url'}),
    defineField({name:'parent',title:'Categoria padre',type:'reference',to:[{type:'categoria'}],weak:true}),
    defineField({name:'orden',title:'Orden display',type:'number',initialValue:0}),
    defineField({name:'metaTitulo',title:'Meta titulo SEO',type:'string'}),
    defineField({name:'metaDescripcion',title:'Meta descripcion SEO',type:'text'}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
  ],
  preview:{select:{title:'nombre',subtitle:'rubro'}}
})

const atributoSchema = defineType({
  name:'atributo',title:'Atributos',type:'document',
  fields:[
    defineField({name:'nombre',title:'Nombre del atributo',type:'string',validation:r=>r.required()}),
    defineField({name:'tipo',title:'Tipo',type:'string',options:{list:[
      'tamano','sexo','calidad','montaje','color','material','talla','peso','volumen','dimension','presentacion','variedad','tecnica'
    ]}}),
    defineField({name:'rubro',title:'Aplica a',type:'string',options:{list:[{title:'Todos',value:'todos'},...RUBROS.map(r=>({title:r,value:r}))]}}),
    defineField({name:'valores',title:'Valores posibles',type:'array',of:[{type:'object',fields:[
      {name:'valor',title:'Valor',type:'string'},
      {name:'codigo',title:'Codigo',type:'string'},
      {name:'precioExtra',title:'Precio extra USD',type:'number',initialValue:0},
    ]}]}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
  ],
  preview:{select:{title:'nombre',subtitle:'rubro'}}
})

const combinacionSchema = defineType({
  name:'combinacion',title:'Combinaciones',type:'document',
  fields:[
    defineField({name:'especie',title:'Producto / Especie',type:'reference',to:[{type:'especie'}]}),
    defineField({name:'sku',title:'SKU unico',type:'string'}),
    defineField({name:'atributos',title:'Atributos',type:'array',of:[{type:'object',fields:[
      {name:'atributo',title:'Atributo',type:'string'},
      {name:'valor',title:'Valor',type:'string'},
    ]}]}),
    defineField({name:'precio',title:'Precio USD',type:'number',validation:r=>r.required().min(0)}),
    defineField({name:'precioMayorista',title:'Precio mayorista USD',type:'number'}),
    defineField({name:'precioVIP',title:'Precio VIP USD',type:'number'}),
    defineField({name:'stock',title:'Stock',type:'number',validation:r=>r.required().min(0)}),
    defineField({name:'stockMinimo',title:'Stock minimo alerta',type:'number',initialValue:5}),
    defineField({name:'foto',title:'Foto URL',type:'url'}),
    defineField({name:'pesoGramos',title:'Peso gramos',type:'number'}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
  ],
  preview:{select:{title:'sku',subtitle:'precio'}}
})

const pedidoSchema = defineType({
  name:'pedido',title:'Pedidos',type:'document',
  fields:[
    defineField({name:'numero',title:'# Pedido',type:'string'}),
    defineField({name:'origen',title:'Origen',type:'string',options:{list:[
      {title:'Web',value:'web'},{title:'WhatsApp',value:'whatsapp'},
      {title:'Instagram',value:'instagram'},{title:'Facebook',value:'facebook'},
      {title:'TikTok',value:'tiktok'},{title:'1688 China',value:'1688'},
      {title:'eBay',value:'ebay'},{title:'Xiongshu',value:'xiongshu'},
      {title:'Email',value:'email'},{title:'Manual',value:'manual'},
    ]},initialValue:'web'}),
    defineField({name:'cliente',title:'Cliente',type:'string',validation:r=>r.required()}),
    defineField({name:'email',title:'Email',type:'string'}),
    defineField({name:'telefono',title:'Telefono',type:'string'}),
    defineField({name:'whatsapp',title:'WhatsApp',type:'string'}),
    defineField({name:'wechat',title:'WeChat ID',type:'string'}),
    defineField({name:'pais',title:'Pais',type:'string'}),
    defineField({name:'ciudad',title:'Ciudad',type:'string'}),
    defineField({name:'direccion',title:'Direccion completa',type:'text'}),
    defineField({name:'codigoPostal',title:'Codigo postal',type:'string'}),
    defineField({name:'items',title:'Productos',type:'array',of:[{type:'object',fields:[
      {name:'nombre',type:'string',title:'Nombre'},
      {name:'sku',type:'string',title:'SKU'},
      {name:'cantidad',type:'number',title:'Cantidad'},
      {name:'precio',type:'number',title:'Precio USD'},
      {name:'familia',type:'string',title:'Familia'},
      {name:'atributos',type:'string',title:'Atributos'},
      {name:'foto',type:'string',title:'Foto URL'},
      {name:'partida',type:'string',title:'Partida arancelaria'},
      {name:'pesoGramos',type:'number',title:'Peso gramos'},
    ]}]}),
    defineField({name:'subtotal',title:'Subtotal USD',type:'number'}),
    defineField({name:'costoEnvio',title:'Costo envio USD',type:'number'}),
    defineField({name:'seguro',title:'Costo seguro USD',type:'number',initialValue:0}),
    defineField({name:'descuento',title:'Descuento USD',type:'number',initialValue:0}),
    defineField({name:'total',title:'Total USD',type:'number'}),
    defineField({name:'drawback',title:'Drawback 3% USD (MYPE)',type:'number'}),
    defineField({name:'estado',title:'Estado',type:'string',options:{list:[
      {title:'⏳ Pendiente',value:'pendiente'},
      {title:'✅ Confirmado',value:'confirmado'},
      {title:'💳 Pago recibido',value:'pagado'},
      {title:'📦 Preparando',value:'preparando'},
      {title:'🚚 Enviado',value:'enviado'},
      {title:'🎉 Entregado',value:'entregado'},
      {title:'↩️ Devuelto',value:'devuelto'},
      {title:'❌ Cancelado',value:'cancelado'},
    ]},initialValue:'pendiente'}),
    defineField({name:'metodoPago',title:'Metodo de pago',type:'string',options:{list:PAGOS.map(p=>({title:p,value:p}))}}),
    defineField({name:'courier',title:'Courier',type:'string',options:{list:COURIERS.map(c=>({title:c,value:c}))}}),
    defineField({name:'aseguradora',title:'Aseguradora',type:'string',options:{list:ASEGURADORAS.map(a=>({title:a,value:a}))}}),
    defineField({name:'tracking',title:'Tracking #',type:'string'}),
    defineField({name:'urlTracking',title:'URL de rastreo',type:'url'}),
    defineField({name:'qrTracking',title:'QR tracking generado',type:'string'}),
    defineField({name:'factura',title:'Numero factura',type:'string'}),
    defineField({name:'drawbackCodigo',title:'Codigo drawback SUNAT',type:'string'}),
    defineField({name:'permisos',title:'Permisos requeridos',type:'array',of:[{type:'string'}],options:{list:PERMISOS.map(p=>({title:p,value:p}))}}),
    defineField({name:'certificados',title:'Certificados URLs',type:'array',of:[{type:'url'}]}),
    defineField({name:'notas',title:'Notas internas',type:'text'}),
    defineField({name:'notasCliente',title:'Notas del cliente',type:'text'}),
    defineField({name:'fecha',title:'Fecha pedido',type:'datetime'}),
    defineField({name:'fechaEnvio',title:'Fecha envio',type:'datetime'}),
    defineField({name:'fechaEntrega',title:'Fecha entrega estimada',type:'date'}),
  ],
  preview:{select:{title:'numero',subtitle:'cliente'},prepare({title,subtitle}){return{title:title||'Sin numero',subtitle}}}
})

const clienteSchema = defineType({
  name:'cliente',title:'Clientes',type:'document',
  fields:[
    defineField({name:'nombre',title:'Nombre completo',type:'string',validation:r=>r.required()}),
    defineField({name:'email',title:'Email',type:'string'}),
    defineField({name:'telefono',title:'Telefono',type:'string'}),
    defineField({name:'whatsapp',title:'WhatsApp',type:'string'}),
    defineField({name:'instagram',title:'Instagram',type:'string'}),
    defineField({name:'wechat',title:'WeChat ID',type:'string'}),
    defineField({name:'pais',title:'Pais',type:'string'}),
    defineField({name:'ciudad',title:'Ciudad',type:'string'}),
    defineField({name:'direccion',title:'Direccion',type:'text'}),
    defineField({name:'codigoPostal',title:'Codigo postal',type:'string'}),
    defineField({name:'grupo',title:'Grupo',type:'string',options:{list:[
      {title:'Minorista',value:'minorista'},
      {title:'Mayorista 10-49',value:'mayorista'},
      {title:'Mayorista+ 50-99',value:'mayoristaMas'},
      {title:'VIP 100+',value:'vip'},
      {title:'Distribuidor',value:'distribuidor'},
      {title:'Museo / Institucion',value:'museo'},
      {title:'Investigador / Universidad',value:'investigador'},
    ]},initialValue:'minorista'}),
    defineField({name:'descuento',title:'Descuento especial %',type:'number',initialValue:0}),
    defineField({name:'totalCompras',title:'Total compras USD',type:'number',initialValue:0}),
    defineField({name:'numeroPedidos',title:'Numero de pedidos',type:'number',initialValue:0}),
    defineField({name:'ultimaCompra',title:'Ultima compra',type:'date'}),
    defineField({name:'notas',title:'Notas',type:'text'}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
    defineField({name:'fecha',title:'Fecha registro',type:'datetime'}),
  ],
  preview:{select:{title:'nombre',subtitle:'email'}}
})

const transportistaSchema = defineType({
  name:'transportista',title:'Transportistas',type:'document',
  fields:[
    defineField({name:'nombre',title:'Nombre',type:'string',validation:r=>r.required()}),
    defineField({name:'codigo',title:'Codigo',type:'string'}),
    defineField({name:'logo',title:'Logo URL',type:'url'}),
    defineField({name:'tiempoEntrega',title:'Tiempo entrega',type:'string'}),
    defineField({name:'tarifaBase',title:'Tarifa base USD',type:'number'}),
    defineField({name:'pesoMaxKg',title:'Peso maximo kg',type:'number'}),
    defineField({name:'seguimiento',title:'URL rastreo',type:'url'}),
    defineField({name:'zonas',title:'Zonas y tarifas',type:'array',of:[{type:'object',fields:[
      {name:'zona',type:'string',title:'Zona / Pais'},
      {name:'tarifa',type:'number',title:'Tarifa USD'},
      {name:'dias',type:'number',title:'Dias entrega'},
      {name:'pesoExtra',type:'number',title:'Cargo por kg extra USD'},
    ]}]}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
  ],
  preview:{select:{title:'nombre',subtitle:'codigo'}}
})

const aseguradoraSchema = defineType({
  name:'aseguradora',title:'Aseguradoras',type:'document',
  fields:[
    defineField({name:'nombre',title:'Nombre',type:'string',validation:r=>r.required()}),
    defineField({name:'tipo',title:'Tipo',type:'string',options:{list:[
      {title:"Ship Insurance",value:'ship'},
      {title:"Insurtech Digital",value:'insurtech'},
      {title:"IATA Cargo",value:'iata'},
      {title:"Lloyd's of London",value:'lloyds'},
    ]}}),
    defineField({name:'cobertura',title:'Cobertura maxima USD',type:'number'}),
    defineField({name:'porcentaje',title:'Porcentaje sobre valor %',type:'number'}),
    defineField({name:'coberturaAmazonica',title:'Cubre productos amazonicos',type:'boolean',initialValue:true}),
    defineField({name:'instrucciones',title:'Instrucciones',type:'text'}),
    defineField({name:'contacto',title:'Contacto / URL',type:'url'}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
  ],
  preview:{select:{title:'nombre',subtitle:'tipo'}}
})

const pagoConfigSchema = defineType({
  name:'pagoConfig',title:'Metodos de Pago',type:'document',
  fields:[
    defineField({name:'nombre',title:'Nombre',type:'string',validation:r=>r.required()}),
    defineField({name:'tipo',title:'Tipo',type:'string',options:{list:PAGOS.map(p=>({title:p,value:p}))}}),
    defineField({name:'region',title:'Region',type:'string',options:{list:[
      {title:'Global',value:'global'},
      {title:'Peru / Latam',value:'latam'},
      {title:'China',value:'china'},
      {title:'Korea',value:'korea'},
      {title:'Thailand',value:'thailand'},
      {title:'Taiwan / Hong Kong',value:'taiwan_hk'},
      {title:'Europa',value:'europa'},
      {title:'USA',value:'usa'},
      {title:'Asia Pacific',value:'apac'},
    ]}}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
    defineField({name:'instrucciones',title:'Instrucciones para cliente',type:'text'}),
    defineField({name:'comision',title:'Comision %',type:'number',initialValue:0}),
    defineField({name:'monedas',title:'Monedas aceptadas',type:'array',of:[{type:'string'}]}),
    defineField({name:'logoUrl',title:'Logo URL',type:'url'}),
    defineField({name:'cuentaDatos',title:'Datos de cuenta',type:'text'}),
    defineField({name:'minimoUSD',title:'Minimo USD',type:'number',initialValue:0}),
  ],
  preview:{select:{title:'nombre',subtitle:'tipo'}}
})

const seoConfigSchema = defineType({
  name:'seoConfig',title:'SEO por Rubro',type:'document',
  fields:[
    defineField({name:'rubro',title:'Rubro / Pagina',type:'string',validation:r=>r.required()}),
    defineField({name:'titulo',title:'Meta titulo',type:'string'}),
    defineField({name:'descripcion',title:'Meta descripcion',type:'text'}),
    defineField({name:'keywords',title:'Keywords',type:'array',of:[{type:'string'}]}),
    defineField({name:'ogImage',title:'OG Image URL',type:'url'}),
    defineField({name:'slug',title:'URL slug',type:'string'}),
    defineField({name:'canonicalUrl',title:'URL canonical',type:'url'}),
    defineField({name:'robotsIndex',title:'Indexar en Google',type:'boolean',initialValue:true}),
    defineField({name:'schemaMarkup',title:'Schema.org JSON-LD',type:'text'}),
  ],
  preview:{select:{title:'rubro',subtitle:'titulo'}}
})

const bannerSchema = defineType({
  name:'banner',title:'Banners Publicitarios',type:'document',
  fields:[
    defineField({name:'cliente',title:'Cliente / Empresa',type:'string',validation:r=>r.required()}),
    defineField({name:'pais',title:'Pais',type:'string'}),
    defineField({name:'email',title:'Email',type:'string'}),
    defineField({name:'url',title:'URL destino',type:'url'}),
    defineField({name:'posicion',title:'Posicion',type:'string',options:{list:['header','catalogo','sidebar','footer']}}),
    defineField({name:'plan',title:'Plan',type:'string',options:{list:['mensual','trimestral','semestral','anual']}}),
    defineField({name:'precio',title:'Precio USD',type:'number'}),
    defineField({name:'vence',title:'Fecha vencimiento',type:'date'}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
    defineField({name:'imagenUrl',title:'URL imagen',type:'url'}),
  ],
  preview:{select:{title:'cliente',subtitle:'plan'}}
})

const avisoSchema = defineType({
  name:'aviso',title:'Avisos & Publicidad',type:'document',
  fields:[
    defineField({name:'titulo',title:'Titulo',type:'string',validation:r=>r.required()}),
    defineField({name:'subtitulo',title:'Subtitulo',type:'string'}),
    defineField({name:'mercado',title:'Mercado objetivo',type:'string',options:{list:['asia','japon','europa','usa','dubai','latam','global','china','korea']}}),
    defineField({name:'formato',title:'Formato',type:'string',options:{list:['instagram','facebook','whatsapp','banner_web','tiktok','wechat','xiongshu']}}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
    defineField({name:'fecha',title:'Fecha',type:'date'}),
  ],
  preview:{select:{title:'titulo',subtitle:'mercado'}}
})

export default defineConfig({
  name:'house-insects-peru',
  title:'House Insects of Peru 🦋',
  projectId:'lyty7d3g',
  dataset:'production',
  plugins:[
    structureTool({
      structure:(S)=>
        S.list()
          .title('Panel de Administracion')
          .items([
            S.listItem().title('📋 Ordenes').child(S.documentTypeList('orden').title('Ordenes')),
            S.listItem().title('📁 Familias').child(S.documentTypeList('familia').title('Familias')),
            S.listItem().title('🗂️ Categorias').child(S.documentTypeList('categoria').title('Categorias')),
            S.listItem().title('🗂️ Subcategorias').child(S.documentTypeList('subcategoria').title('Subcategorias')),
            S.listItem().title('📋 Subordendes').child(S.documentTypeList('suborden').title('Subordendes')),
            S.divider(),
            S.listItem().title('🦋 Especies').child(S.documentTypeList('especie').title('Especies')),
            S.listItem().title('🦋 Subespecies').child(S.documentTypeList('subespecie').title('Subespecies')),
            S.listItem().title('📁 Subfamilias').child(S.documentTypeList('subfamilia').title('Subfamilias')),
            S.listItem().title('🎨 Atributos').child(S.documentTypeList('atributo').title('Atributos')),
            S.listItem().title('🔀 Combinaciones').child(S.documentTypeList('combinacion').title('Combinaciones')),
            S.divider(),
            S.listItem().title('🛒 Pedidos').child(S.documentTypeList('pedido').title('Pedidos')),
            S.listItem().title('👥 Clientes').child(S.documentTypeList('cliente').title('Clientes')),
            S.divider(),
            S.listItem().title('🚚 Transportistas').child(S.documentTypeList('transportista').title('Transportistas')),
            S.listItem().title('🛡️ Aseguradoras').child(S.documentTypeList('aseguradora').title('Aseguradoras')),
            S.listItem().title('💳 Metodos de Pago').child(S.documentTypeList('pagoConfig').title('Pagos')),
            S.divider(),
            S.listItem().title('🔍 SEO').child(S.documentTypeList('seoConfig').title('SEO')),
            S.divider(),
            S.listItem().title('📢 Banners').child(S.documentTypeList('banner').title('Banners')),
            S.listItem().title('📣 Avisos').child(S.documentTypeList('aviso').title('Avisos')),
          ])
    })
  ],
  schema:{
    types:[especieSchema,familiaSchema,ordenSchema,categoriaSchema,atributoSchema,combinacionSchema,pedidoSchema,clienteSchema,transportistaSchema,aseguradoraSchema,pagoConfigSchema,seoConfigSchema,bannerSchema,avisoSchema],
  },
})
