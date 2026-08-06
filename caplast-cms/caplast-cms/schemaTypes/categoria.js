import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'categoria',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: "Potes de cápsula", "Potes apilables"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'nombre', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Texto que aparece bajo el título de la categoría en la página de Productos.',
    }),
    defineField({
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número más bajo aparece primero (0, 1, 2...).',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {title: 'nombre', subtitle: 'descripcion'},
  },
})
