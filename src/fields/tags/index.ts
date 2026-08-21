import type { ArrayField, Field } from 'payload'
import deepMerge from '../../utilities/deepMerge.js'
import { tag } from './tag.js'

type TagsType = (options?: {
  sidebar?: boolean
  name?: string
  label?: string
  overrides?: Partial<ArrayField>
}) => Field

/** A repeatable array of free-text tags. */
export const tags: TagsType = ({ sidebar = false, name = 'tags', label = 'Tags', overrides = {} } = {}) => {
  const tagsResult: Field = {
    name,
    label,
    type: 'array',
    fields: [tag()],
    admin: {
      initCollapsed: true,
      position: sidebar ? 'sidebar' : undefined,
      components: {
        RowLabel: '@foundrykit/payload-fields/client#TagsRowLabel',
      },
    },
  }
  return deepMerge(tagsResult, overrides)
}
