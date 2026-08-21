import type { ArrayField, Field } from 'payload'
import deepMerge from '../../utilities/deepMerge.js'
import { openingTime } from './opening-time.js'

type OpeningTimesType = (options?: { sidebar?: boolean; overrides?: Partial<ArrayField> }) => Field

/** A repeatable day/open/close list for venue opening hours. */
export const openingTimes: OpeningTimesType = ({ sidebar = false, overrides = {} } = {}) => {
  const openingTimesResult: Field = {
    name: 'opening_times',
    label: 'Opening Times',
    type: 'array',
    fields: [openingTime()],
    admin: {
      initCollapsed: true,
      position: sidebar ? 'sidebar' : undefined,
      components: { RowLabel: '@foundrykit/payload-fields/client#OpeningTimesRowLabel' },
    },
  }
  return deepMerge(openingTimesResult, overrides)
}
