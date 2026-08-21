import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    // Transliterate accented Latin characters to ASCII (á→a, é→e, ñ→n, …) by
    // decomposing to base char + combining mark, then dropping the marks.
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }
    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback]
      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }
    return value
  }
