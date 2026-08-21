'use client'
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui'

type TagRow = { tag: { tag: string } }

export const TagsRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<TagRow>>()
  const label = data?.data?.tag?.tag
    ? `Tag ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.tag.tag}`
    : 'Row'
  return <div>{label}</div>
}
