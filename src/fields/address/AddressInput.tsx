'use client'
import { Button, FieldLabel, TextInput, useField } from '@payloadcms/ui'
import type { GroupFieldClientProps } from 'payload'
import type React from 'react'
import { useCallback, useState } from 'react'

type PostcodesIOResult = {
  status: number
  result: {
    postcode: string
    postal_town: string
    admin_district: string
    admin_county: string
    country: string
  } | null
}

const toTitleCase = (str: string) => str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

/**
 * Structured address input with a free UK postcode lookup (api.postcodes.io —
 * no API key). Falls back to fully manual entry.
 */
export const AddressInput: React.FC<GroupFieldClientProps> = ({ field, path }) => {
  const { label } = field
  const [lookup, setLookup] = useState('')
  const [loading, setLoading] = useState(false)
  const [lookupError, setLookupError] = useState<string | null>(null)

  const { value: line1, setValue: setLine1 } = useField<string>({ path: `${path}.line1` })
  const { value: line2, setValue: setLine2 } = useField<string>({ path: `${path}.line2` })
  const { value: city, setValue: setCity } = useField<string>({ path: `${path}.city` })
  const { value: county, setValue: setCounty } = useField<string>({ path: `${path}.county` })
  const { value: postcode, setValue: setPostcode } = useField<string>({ path: `${path}.postcode` })
  const { value: country, setValue: setCountry } = useField<string>({ path: `${path}.country` })

  const hasExistingData = Boolean(line1 || line2 || city || county || postcode)
  const [showFields, setShowFields] = useState(hasExistingData)

  const handleLookup = useCallback(async () => {
    const cleaned = lookup.trim()
    if (!cleaned) return
    setLoading(true)
    setLookupError(null)
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`)
      const data: PostcodesIOResult = await res.json()
      if (data.status === 200 && data.result) {
        const { postcode: formatted, postal_town, admin_district, admin_county, country: apiCountry } = data.result
        setPostcode(formatted)
        setCity(toTitleCase(postal_town || admin_district || ''))
        setCounty(toTitleCase(admin_county || admin_district || ''))
        setCountry(apiCountry || 'United Kingdom')
        setLookup('')
        setShowFields(true)
      } else {
        setLookupError('Postcode not found — please check and try again.')
      }
    } catch {
      setLookupError('Lookup failed — please try again or enter the address manually.')
    } finally {
      setLoading(false)
    }
  }, [lookup, setPostcode, setCity, setCounty, setCountry])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        void handleLookup()
      }
    },
    [handleLookup],
  )

  return (
    <div className="field-type group address-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <FieldLabel label={label} />
      <div className="address-field__lookup" style={{ paddingBottom: '0.5rem' }}>
        <div className="field-type text">
          <div className="field-type__wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                disabled={loading}
                onChange={(e) => setLookup(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Find by postcode, e.g. SW1A 1AA"
                type="text"
                value={lookup}
                style={{ width: '100%' }}
              />
              <Button buttonStyle="primary" disabled={loading} onClick={() => void handleLookup()} size="large" className="m-0">
                {loading ? 'Looking up...' : 'Find'}
              </Button>
              {!showFields && (
                <Button buttonStyle="secondary" onClick={() => setShowFields(true)} size="large">
                  Manual
                </Button>
              )}
            </div>
          </div>
        </div>
        {lookupError && <p style={{ color: 'var(--theme-error-500)' }}>{lookupError}</p>}
      </div>

      {showFields && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <TextInput label="Address Line 1" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLine1(e.target.value)} path={`${path}.line1`} value={line1 ?? ''} />
          <TextInput label="Address Line 2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLine2(e.target.value)} path={`${path}.line2`} value={line2 ?? ''} />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <TextInput label="City / Town" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} path={`${path}.city`} value={city ?? ''} />
            <TextInput label="County" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCounty(e.target.value)} path={`${path}.county`} value={county ?? ''} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <TextInput label="Postcode" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostcode(e.target.value)} path={`${path}.postcode`} value={postcode ?? ''} />
            <TextInput label="Country" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} path={`${path}.country`} value={country ?? ''} />
          </div>
        </div>
      )}
    </div>
  )
}
