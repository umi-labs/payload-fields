import type { GroupField } from 'payload'

type DateRangeFieldOptions = {
  name: string
  label?: string
  description?: string
  required?: boolean
  admin?: Partial<GroupField['admin']>
}

/** A from/to date pair rendered as two month pickers side by side. */
export const dateRangeField = ({
  name,
  label,
  description,
  required = false,
  admin = {},
}: DateRangeFieldOptions): GroupField => ({
  name,
  type: 'group',
  label: label ?? false,
  admin: {
    ...admin,
    description,
    components: {
      Field: '@foundrykit/payload-fields/client#DateRangeComponent',
    },
  },
  fields: [
    { name: 'from', type: 'date', required },
    { name: 'to', type: 'date', required },
  ],
})
