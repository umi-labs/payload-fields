'use client'
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui'
import type React from 'react'

type BudgetRow = {
  durationValue: number
  durationUnit: 'nights' | 'days' | 'weeks'
  price: number
  per: 'person' | 'couple' | 'group' | 'family'
}

export const BudgetRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<BudgetRow>()
  const fallback = `Budget ${(rowNumber ?? 0) + 1}`
  if (!data?.durationValue || !data?.price) return <div>{fallback}</div>
  const duration = `${data.durationValue} ${data.durationUnit ?? ''}`
  const price = `£${Number(data.price).toLocaleString('en-GB')}`
  const per = data.per ? `per ${data.per}` : ''
  return <div>{[duration, price, per].filter(Boolean).join(' · ')}</div>
}
