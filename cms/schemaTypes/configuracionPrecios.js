import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'configuracionPrecios',
  title: 'Configuración de precios (tramos por cantidad)',
  type: 'document',
  // Documento único: crear solo UNO. Ver GUIA-CMS.md.
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título interno (no se muestra en la web)',
      type: 'string',
      readOnly: true,
      initialValue: 'Configuración de precios',
    }),
    defineField({
      name: 'tramos',
      title: 'Tramos de cantidad',
      type: 'array',
      description:
        'Multiplicador aplicado al precio base según la cantidad pedida. A mayor cantidad, menor multiplicador (descuento por volumen). Deben cubrir de 0 a infinito sin huecos.',
      of: [
        {
          type: 'object',
          name: 'tramo',
          fields: [
            defineField({name: 'minimo', title: 'Cantidad mínima', type: 'number', validation: (Rule) => Rule.required().min(0)}),
            defineField({
              name: 'maximo',
              title: 'Cantidad máxima',
              type: 'number',
              description: 'Dejar vacío para representar "sin límite" (el último tramo).',
            }),
            defineField({
              name: 'multiplicador',
              title: 'Multiplicador',
              type: 'number',
              description: 'Ej: 2.0 = doble del precio base, 1.0 = precio base sin recargo.',
              validation: (Rule) => Rule.required().positive(),
            }),
          ],
          preview: {
            select: {min: 'minimo', max: 'maximo', mult: 'multiplicador'},
            prepare({min, max, mult}) {
              return {title: `${min} – ${max ?? '∞'} unidades`, subtitle: `x${mult}`}
            },
          },
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Configuración de precios'})},
})
