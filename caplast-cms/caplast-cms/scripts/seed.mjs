import {getCliClient} from 'sanity/cli'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_IMG = path.resolve(__dirname, '../../../assets/img')

const client = getCliClient({apiVersion: '2024-01-01'})

async function uploadImage(filename) {
  const filePath = path.join(SITE_IMG, filename)
  const stream = fs.createReadStream(filePath)
  const asset = await client.assets.upload('image', stream, {filename})
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function main() {
  console.log('Subiendo imágenes...')
  const img = {
    capsula200: await uploadImage('capsula200.jpg'),
    negro250: await uploadImage('negro250.jpg'),
    pote250: await uploadImage('pote250.jpg'),
    pote500: await uploadImage('pote500.jpg'),
    pote650: await uploadImage('pote650.jpg'),
    litro1: await uploadImage('litro1.jpg'),
  }

  console.log('Creando categorías...')
  const catCapsula = await client.createIfNotExists({
    _id: 'categoria-potes-de-capsula',
    _type: 'categoria',
    nombre: 'Potes de cápsula',
    slug: {_type: 'slug', current: 'potes-de-capsula'},
    orden: 0,
  })
  const catApilable = await client.createIfNotExists({
    _id: 'categoria-potes-apilables',
    _type: 'categoria',
    nombre: 'Potes apilables',
    slug: {_type: 'slug', current: 'potes-apilables'},
    orden: 1,
  })

  console.log('Creando tapas...')
  const tapas = {
    lisa: await client.createIfNotExists({
      _id: 'tapa-lisa',
      _type: 'tapaOpcion',
      nombre: 'Tapa lisa',
      clave: {_type: 'slug', current: 'lisa'},
      precioBase: 122,
    }),
    estriada: await client.createIfNotExists({
      _id: 'tapa-estriada',
      _type: 'tapaOpcion',
      nombre: 'Tapa estriada',
      clave: {_type: 'slug', current: 'estriada'},
      precioBase: 122,
    }),
    segurodenino: await client.createIfNotExists({
      _id: 'tapa-segurodenino',
      _type: 'tapaOpcion',
      nombre: 'Tapa seguro de niño',
      clave: {_type: 'slug', current: 'segurodenino'},
      precioBase: 94,
    }),
    dispensadora: await client.createIfNotExists({
      _id: 'tapa-dispensadora',
      _type: 'tapaOpcion',
      nombre: 'Tapa cápsula dispensadora',
      clave: {_type: 'slug', current: 'dispensadora'},
      precioBase: 78,
    }),
  }

  console.log('Creando sello...')
  await client.createIfNotExists({
    _id: 'sello-con',
    _type: 'selloOpcion',
    nombre: 'Con sello',
    clave: {_type: 'slug', current: 'con'},
    precioBase: 71,
  })

  console.log('Creando configuración de precios...')
  await client.createIfNotExists({
    _id: 'configuracion-precios',
    _type: 'configuracionPrecios',
    titulo: 'Configuración de precios',
    tramos: [
      {_key: 't1', minimo: 0, maximo: 100, multiplicador: 2.0},
      {_key: 't2', minimo: 101, maximo: 500, multiplicador: 1.5},
      {_key: 't3', minimo: 501, maximo: 1000, multiplicador: 1.25},
      {_key: 't4', minimo: 1001, maximo: 4990, multiplicador: 1.15},
      {_key: 't5', minimo: 4991, multiplicador: 1.0},
    ],
  })

  console.log('Creando configuración del sitio...')
  await client.createIfNotExists({
    _id: 'configuracion-sitio',
    _type: 'configuracionSitio',
    titulo: 'Configuración del sitio',
    whatsappNumero: '56986071957',
  })

  console.log('Creando productos...')
  const productos = [
    {
      _id: 'producto-envase-hdpe-200cc',
      slug: 'envase-hdpe-200cc',
      nombre: 'Pote de Cápsula 200cc',
      categoria: catCapsula,
      orden: 0,
      capacidadMl: 200,
      imagen: img.capsula200,
      descripcionCorta:
        'Ideal para cápsulas, suplementos, muestras o productos compactos que necesitan una presentación práctica y profesional.',
      descripcionLarga:
        'El envase HDPE 200cc es la opción perfecta para quienes están comenzando a vender: cápsulas, muestras de producto, cremas concentradas o formatos de prueba.',
      usos: ['Cápsulas', 'Cremas', 'Muestras', 'Cosmetica'],
      precioBase: 144,
      esCapsula: true,
      permiteSello: false,
      tapasCompatibles: [tapas.segurodenino, tapas.dispensadora],
    },
    {
      _id: 'producto-pote-capsula-250cc',
      slug: 'pote-capsula-250cc',
      nombre: 'Pote de Cápsula 250cc',
      categoria: catCapsula,
      orden: 1,
      capacidadMl: 250,
      imagen: img.negro250,
      colores: [{_key: 'c1', nombre: 'Negro'}],
      descripcionCorta:
        'Formato práctico para cápsulas y productos pequeños, con una presentación diferenciada y compacta en color negro.',
      descripcionLarga:
        'Formato práctico para cápsulas y productos pequeños, con una presentación diferenciada y compacta en color negro. Ideal para emprendedores que necesitan un formato distintivo, sólido y con buena presencia frente al cliente final.',
      usos: ['Cápsulas', 'Suplementos', 'Muestras'],
      precioBase: 144,
      esCapsula: true,
      permiteSello: false,
      tapasCompatibles: [tapas.segurodenino, tapas.dispensadora],
    },
    {
      _id: 'producto-envase-hdpe-250cc',
      slug: 'envase-hdpe-250cc',
      nombre: 'Pote Apilable 250cc',
      categoria: catApilable,
      orden: 0,
      capacidadMl: 250,
      imagen: img.pote250,
      descripcionCorta: 'Ideal para cremas, cosmética, alimentos secos y productos de menor tamaño.',
      descripcionLarga:
        'El envase HDPE 250cc es uno de los formatos más versatiles de nuestro catálogo. Práctico para emprendedores que están lanzando su primera linea de productos.',
      usos: ['Cosmetica', 'Peluqueria', 'Cremas', 'Marcas propias'],
      precioBase: 221,
      esCapsula: false,
      permiteSello: true,
      tapasCompatibles: [tapas.lisa, tapas.estriada],
    },
    {
      _id: 'producto-envase-hdpe-500cc',
      slug: 'envase-hdpe-500cc',
      nombre: 'Pote Apilable 500cc',
      categoria: catApilable,
      orden: 1,
      capacidadMl: 500,
      imagen: img.pote500,
      descripcionCorta: 'Versátil para cosmética, suplementos, alimentos secos y productos capilares.',
      descripcionLarga:
        'Un formato versatil para emprendedores y empresas que necesitan una presentación resistente, práctica y profesional. Ideal para cosmetica, suplementos, productos capilares, alimentos secos, proteínas y productos de limpieza.',
      usos: ['Cosmetica', 'Suplementos', 'Alimentos secos', 'Limpieza', 'Capilares'],
      precioBase: 292,
      esCapsula: false,
      permiteSello: true,
      tapasCompatibles: [tapas.lisa, tapas.estriada],
    },
    {
      _id: 'producto-envase-hdpe-650cc',
      slug: 'envase-hdpe-650cc',
      nombre: 'Pote Apilable 650cc',
      categoria: catApilable,
      orden: 2,
      capacidadMl: 650,
      imagen: img.pote650,
      descripcionCorta: 'Buena opción para productos de mayor volumen con presentación profesional.',
      descripcionLarga:
        'Cuando tu producto necesita más espacio sin perder practicidad, el envase HDPE 650cc es la eleccion adecuada. Pensado para marcas que ya validaron su producto y buscan ofrecer formatos de mayor rendimiento.',
      usos: ['Suplementos', 'Proteínas', 'Alimentos secos', 'Limpieza'],
      precioBase: 298,
      esCapsula: false,
      permiteSello: true,
      tapasCompatibles: [tapas.lisa, tapas.estriada],
    },
    {
      _id: 'producto-envase-hdpe-1000cc',
      slug: 'envase-hdpe-1000cc',
      nombre: 'Pote Apilable 1000cc',
      categoria: catApilable,
      orden: 3,
      capacidadMl: 1000,
      imagen: img.litro1,
      descripcionCorta: 'Formato ideal para reposición, venta mayorista o productos de alto consumo.',
      descripcionLarga:
        'El envase HDPE de 1 litro esta pensado para venta mayorista, reposición frecuente o productos de alto consumo. Resistente, apilable y con una presentación que transmite volumen y valor al cliente final.',
      usos: ['Proteínas', 'Suplementos', 'Alimentos secos', 'Marcas propias'],
      precioBase: 320,
      esCapsula: false,
      permiteSello: true,
      tapasCompatibles: [tapas.lisa, tapas.estriada],
    },
  ]

  for (const p of productos) {
    await client.createIfNotExists({
      _id: p._id,
      _type: 'producto',
      nombre: p.nombre,
      slug: {_type: 'slug', current: p.slug},
      categoria: {_type: 'reference', _ref: p.categoria._id},
      material: 'HDPE',
      capacidadMl: p.capacidadMl,
      colores: p.colores || [],
      imagenes: [p.imagen],
      precioBase: p.precioBase,
      stock: 0,
      disponible: true,
      esCapsula: p.esCapsula,
      tapasCompatibles: p.tapasCompatibles.map((t) => ({_type: 'reference', _ref: t._id, _key: t._id})),
      permiteSello: p.permiteSello,
      descripcionCorta: p.descripcionCorta,
      descripcionLarga: p.descripcionLarga,
      usos: p.usos,
      destacado: false,
      orden: p.orden,
    })
    console.log(' ✔', p.nombre)
  }

  console.log('Listo.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
