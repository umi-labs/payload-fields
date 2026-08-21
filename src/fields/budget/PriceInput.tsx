'use client'
import { FieldError, FieldLabel, useField } from '@payloadcms/ui'
import type { NumberFieldClientProps } from 'payload'
import type React from 'react'
import { useCallback, useState } from 'react'

const formatPrice = (value: number): string =>
  value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const PriceInput: React.FC<NumberFieldClientProps> = ({ field, path, readOnly }) => {
  const { label, required, admin: { placeholder } = {} } = field
  const { value, setValue, showError } = useField<number>({ path })
  const [focused, setFocused] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = parseFloat(e.target.value)
      setValue(isNaN(raw) ? null : raw)
    },
    [setValue],
  )

  const displayValue = focused
    ? typeof value === 'number' ? value : ''
    : typeof value === 'number' ? formatPrice(value) : ''

  return (
    <div
      className={['field-type', 'number', showError && 'error', readOnly && 'read-only'].filter(Boolean).join(' ')}
      style={(field.admin as Record<string, unknown>)?.style as React.CSSProperties}
    >
      <FieldLabel label={label} path={path} required={required} />
      <div className="field-type__wrap">
        <FieldError path={path} showError={showError} />
        <input
          disabled={readOnly}
          id={`field-${path.replace(/\./g, '__')}`}
          min={0}
          name={path}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          placeholder={placeholder as string | undefined}
          step="0.01"
          type={focused ? 'number' : 'text'}
          value={displayValue}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  )
}
