import type { Field, GroupField } from 'payload'
import deepMerge from '../../utilities/deepMerge.js'

type TagType = (options?: { overrides?: Partial<GroupField> }) => Field

export const tag: TagType = ({ overrides = {} } = {}) => {
  const tagResult: GroupField = {
    name: 'tag',
    label: 'Tag',
    type: 'group',
    fields: [{ name: 'tag', label: 'Tag', type: 'text' }],
  }
  return deepMerge(tagResult, overrides)
}
