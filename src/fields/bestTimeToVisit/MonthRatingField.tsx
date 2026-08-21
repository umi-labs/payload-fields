'use client'

import { FieldError, FieldLabel, useAllFormFields, useForm, useFormSubmitted } from '@payloadcms/ui'
import type { ArrayFieldClientProps } from 'payload'
import type React from 'react'
import { useCallback } from 'react'

type MonthValue =
  | 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun'
  | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec'
type RatingValue = 'best' | 'good' | 'ok'

const months: { label: string; value: MonthValue }[] = [
  { label: 'Jan', value: 'jan' }, { label: 'Feb', value: 'feb' }, { label: 'Mar', value: 'mar' },
  { label: 'Apr', value: 'apr' }, { label: 'May', value: 'may' }, { label: 'Jun', value: 'jun' },
  { label: 'Jul', value: 'jul' }, { label: 'Aug', value: 'aug' }, { label: 'Sep', value: 'sep' },
  { label: 'Oct', value: 'oct' }, { label: 'Nov', value: 'nov' }, { label: 'Dec', value: 'dec' },
]

// Brand-neutral defaults; override the CSS custom properties
// (--btv-best / --btv-good / --btv-ok) in your admin CSS to rebrand.
const ratings: { label: string; value: RatingValue; colour: string }[] = [
  { label: 'Best', value: 'best', colour: 'var(--btv-best, #0ea5b7)' },
  { label: 'Good', value: 'good', colour: 'var(--btv-good, #7dd3e8)' },
  { label: 'OK', value: 'ok', colour: 'var(--btv-ok, #dbeef5)' },
]

export const MonthRatingField: React.FC<ArrayFieldClientProps> = ({ field, path, readOnly }) => {
  const { label, required } = field
  const [fields, dispatchFields] = useAllFormFields()
  const submitted = useFormSubmitted()
  const { setModified } = useForm()

  const arrayField = fields?.[path]
  const rows = (arrayField?.rows as Array<{ id: string }> | undefined) || []
  const showError = arrayField?.valid === false && submitted

  const monthData = months.map(({ value: month, label: monthLabel }) => {
    const rowIndex = rows.findIndex((_, i) => fields?.[`${path}.${i}.month`]?.value === month)
    const rating: RatingValue =
      rowIndex >= 0 ? ((fields?.[`${path}.${rowIndex}.rating`]?.value as RatingValue) ?? 'ok') : 'ok'
    return { month, label: monthLabel, rating, rowIndex }
  })

  const updateRating = useCallback(
    (month: MonthValue, rating: RatingValue) => {
      if (readOnly) return
      const item = monthData.find((d) => d.month === month)
      if (!item || item.rowIndex < 0) return
      dispatchFields({ type: 'UPDATE', path: `${path}.${item.rowIndex}.rating`, value: rating })
      setModified(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatchFields, path, readOnly, setModified, JSON.stringify(monthData)],
  )

  return (
    <div className={['field-type', 'array', showError && 'error', readOnly && 'read-only'].filter(Boolean).join(' ')}>
      <FieldLabel label={label} path={path} required={required} />
      <FieldError path={path} showError={showError} />
      <div
        style={{
          display: 'grid',
          gap: '0.75rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))',
          marginTop: '0.75rem',
        }}
      >
        {monthData.map((item) => {
          const activeRating = ratings.find((r) => r.value === item.rating) ?? ratings[2]
          return (
            <div
              key={item.month}
              style={{
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: '0.375rem',
                padding: '0.75rem',
              }}
            >
              <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <strong style={{ fontSize: '0.875rem', textTransform: 'uppercase' }}>{item.label}</strong>
                <span
                  aria-hidden="true"
                  style={{
                    background: activeRating.colour,
                    border: '1px solid var(--theme-elevation-150)',
                    borderRadius: '999px',
                    display: 'block',
                    height: '1rem',
                    width: '1rem',
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {ratings.map((rating) => {
                  const isActive = item.rating === rating.value
                  return (
                    <button
                      key={rating.value}
                      disabled={readOnly}
                      onClick={(event) => {
                        event.preventDefault()
                        updateRating(item.month, rating.value)
                      }}
                      type="button"
                      style={{
                        background: isActive ? rating.colour : 'var(--theme-elevation-0)',
                        border: isActive ? '1px solid var(--theme-text)' : '1px solid var(--theme-elevation-200)',
                        color: isActive && rating.value !== 'ok' ? '#ffffff' : 'var(--theme-text)',
                        fontSize: '0.75rem',
                        padding: '0.4rem 0.3rem',
                      }}
                    >
                      {rating.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
