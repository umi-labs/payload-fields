import type { Field, GroupField } from 'payload'
import deepMerge from '../../utilities/deepMerge.js'

type OpeningTimeType = (options?: { overrides?: Partial<GroupField> }) => Field

export const openingTime: OpeningTimeType = ({ overrides = {} } = {}) => {
  const openingTimeResult: GroupField = {
    name: 'opening_time',
    label: 'Opening Time',
    type: 'group',
    fields: [
      {
        name: 'day',
        label: 'Day',
        type: 'select',
        options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      },
      { name: 'opening_time', label: 'Opening Time', type: 'text' },
      { name: 'closing_time', label: 'Closing Time', type: 'text' },
    ],
  }
  return deepMerge(openingTimeResult, overrides)
}
