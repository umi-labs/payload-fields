'use client'
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui'

type OpeningRow = { opening_time: { day: string } }

export const OpeningTimesRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<OpeningRow>>()
  const label = data?.data?.opening_time?.day
    ? `Opening Time ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.opening_time.day}`
    : 'Row'
  return <div>{label}</div>
}
