import type { ArrayField } from 'payload'

const MONTHS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
] as const

const MONTH_LABELS: Record<string, string> = {
  jan: 'January', feb: 'February', mar: 'March', apr: 'April',
  may: 'May', jun: 'June', jul: 'July', aug: 'August',
  sep: 'September', oct: 'October', nov: 'November', dec: 'December',
}

/**
 * A fixed 12-row array rating each month best/good/ok — rendered as a compact
 * month grid with a custom Field component (not the default array UI).
 */
export const bestTimeToVisitMonths = (name = 'months'): ArrayField => ({
  name,
  label: 'Monthly Ratings',
  type: 'array',
  minRows: 12,
  maxRows: 12,
  defaultValue: MONTHS.map((month) => ({ month, rating: 'ok' })),
  admin: {
    description: 'Choose whether each month is best, good, or OK for visiting.',
    initCollapsed: true,
    components: { Field: '@foundrykit/payload-fields/client#MonthRatingField' },
  },
  fields: [
    {
      name: 'month',
      type: 'select',
      required: true,
      options: MONTHS.map((value) => ({ label: MONTH_LABELS[value], value })),
    },
    {
      name: 'rating',
      type: 'select',
      required: true,
      defaultValue: 'ok',
      options: [
        { label: 'Best Time to Visit', value: 'best' },
        { label: 'Good Time to Visit', value: 'good' },
        { label: 'OK Time to Visit', value: 'ok' },
      ],
    },
  ],
})
