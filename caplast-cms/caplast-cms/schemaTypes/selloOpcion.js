import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'selloOpcion',
  title: 'Sello (opción)',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: "Con sello", "Sin sello"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clave',
      title: 'Clave interna',
      type: 'slug',
      description: 'Identificador único, sin espacios. Ej: "con", "none". No cambiar una vez creado.',
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
