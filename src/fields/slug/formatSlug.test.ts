import { describe, expect, it } from 'vitest'
import { formatSlug } from './formatSlug.js'

describe('formatSlug', () => {
  it('transliterates accented Latin characters to ASCII instead of stripping them', () => {
    expect(formatSlug('discover-yucatán')).toBe('discover-yucatan')
    expect(formatSlug('Réunion')).toBe('reunion')
    expect(formatSlug('São Tomé')).toBe('sao-tome')
    expect(formatSlug('Zürich')).toBe('zurich')
    expect(formatSlug('Peñíscola')).toBe('peniscola')
  })
  it('converts spaces to hyphens and lowercases', () => {
    expect(formatSlug('Constance Moofushi')).toBe('constance-moofushi')
  })
  it('leaves already-ASCII slugs unchanged', () => {
    expect(formatSlug('discover-yucatan')).toBe('discover-yucatan')
    expect(formatSlug('some_slug-123')).toBe('some_slug-123')
  })
})
