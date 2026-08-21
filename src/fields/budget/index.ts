import type { ArrayField } from 'payload'

type BudgetFieldOptions = {
  name?: string
  admin?: Partial<ArrayField['admin']>
}

/** Repeatable pricing rows: duration + price + per-unit, with conditional clarifications. */
export const budgetField = ({ name = 'budget', admin = {} }: BudgetFieldOptions = {}): ArrayField => ({
  name,
  type: 'array',
  minRows: 1,
  admin: {
    ...admin,
    components: { RowLabel: '@foundrykit/payload-fields/client#BudgetRowLabel' },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'durationValue',
          type: 'number',
          label: 'Duration',
          required: true,
          min: 1,
          admin: { width: '25%', placeholder: 'e.g. 10' },
        },
        {
          name: 'durationUnit',
          type: 'select',
          label: 'Unit',
          required: true,
          defaultValue: 'nights',
          admin: { width: '35%' },
          options: [
            { label: 'Nights', value: 'nights' },
            { label: 'Days', value: 'days' },
            { label: 'Weeks', value: 'weeks' },
          ],
        },
        {
          name: 'price',
          type: 'number',
          label: 'Price (£)',
          required: true,
          min: 0,
          admin: {
            width: '40%',
            placeholder: 'e.g. 12,352.00',
            components: { Field: '@foundrykit/payload-fields/client#PriceInput' },
          },
        },
      ],
    },
    {
      name: 'per',
      type: 'select',
      label: 'Per',
      required: true,
      options: [
        { label: 'Person', value: 'person' },
        { label: 'Couple', value: 'couple' },
        { label: 'Group', value: 'group' },
        { label: 'Family', value: 'family' },
      ],
    },
    {
      name: 'groupDescription',
      type: 'text',
      label: 'Group clarification',
      admin: {
        placeholder: 'e.g. Groups of 6 or more',
        condition: (_, siblingData) => siblingData?.per === 'group',
      },
    },
    {
      name: 'familyDescription',
      type: 'text',
      label: 'Family clarification',
      admin: {
        placeholder: 'e.g. 2 adults and up to 3 children under 12',
        condition: (_, siblingData) => siblingData?.per === 'family',
      },
    },
  ],
})
