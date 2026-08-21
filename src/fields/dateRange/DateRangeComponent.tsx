'use client'
import { DatePicker, FieldDescription, FieldError, FieldLabel, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type React from 'react'

export const DateRangeComponent: React.FC<GroupFieldClientProps> = ({ field, path, readOnly }) => {
  const { label, admin: { description } = {} } = field
  const fromPath = `${path}.from`
  const toPath = `${path}.to`

  const { value: fromValue, setValue: setFromValue, showError: showFromError } = useField<string>({ path: fromPath })
  const { value: toValue, setValue: setToValue, showError: showToError } = useField<string>({ path: toPath })

  return (
    <div className="field-type group date-range-field">
      <FieldLabel label={label} />
      <div className="date-range-field__inputs" style={{ display: 'flex', gap: '1rem' }}>
        <div className="date-range-field__input" style={{ width: '100%' }}>
          <FieldLabel label="From" />
          {showFromError && <FieldError path={fromPath} />}
          <DatePicker
            pickerAppearance="monthOnly"
            onChange={(date: Date) => setFromValue(date ? date.toISOString() : null)}
            value={fromValue ? new Date(fromValue) : undefined}
            readOnly={readOnly}
          />
        </div>
        <div className="date-range-field__input" style={{ width: '100%' }}>
          <FieldLabel label="To" />
          {showToError && <FieldError path={toPath} />}
          <DatePicker
            pickerAppearance="monthOnly"
            onChange={(date: Date) => setToValue(date ? date.toISOString() : null)}
            value={toValue ? new Date(toValue) : undefined}
            readOnly={readOnly}
          />
        </div>
      </div>
      {description && <FieldDescription description={description as string} path={path} />}
    </div>
  )
}
