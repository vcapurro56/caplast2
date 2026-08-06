import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tapaOpcion',
  title: 'Tapa (opción)',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: "Tapa lisa", "Tapa cápsula dispensadora"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clave',
      title: 'Clave interna',
      type: 'slug',
      description: 'Identificador único, sin espacios. Ej: "lisa", "estriada". No cambiar una vez creado.',
      options: {source: 'nombre', maxLength: 40},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'precioBase',
      title: 'Precio base (CLP, por unidad, a volumen máximo)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {select: {title: 'nombre', subtitle: 'precioBase'}},
})
