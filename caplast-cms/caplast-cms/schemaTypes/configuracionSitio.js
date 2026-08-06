import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'configuracionSitio',
  title: 'Configuración general del sitio',
  type: 'document',
  // Documento único: crear solo UNO. Ver GUIA-CMS.md.
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título interno (no se muestra en la web)',
      type: 'string',
      readOnly: true,
      initialValue: 'Configuración del sitio',
    }),
    defineField({
      name: 'whatsappNumero',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Formato internacional sin "+" ni espacios. Ej: 56986071957',
      validation: (Rule) => Rule.required().regex(/^\d+$/, {name: 'solo números'}),
    }),
    defineField({name: 'email', title: 'Email de contacto', type: 'string'}),
    defineField({name: 'direccion', title: 'Dirección / zona de despacho', type: 'string'}),
    defineField({name: 'instagram', title: 'URL de Instagram', type: 'url'}),
  ],
  preview: {prepare: () => ({title: 'Configuración del sitio'})},
})
