import type { CheckboxField, TextField } from 'payload'
import { formatSlugHook } from './formatSlug.js'

type Overrides = {
  slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

/**
 * A slug text field that auto-formats from a source field (default `title`),
 * with a lock toggle so editors can override it. Returns `[slugField, lockField]`.
 */
export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: { hidden: true, position: 'sidebar' },
    ...checkboxOverrides,
  }

  // @ts-expect-error - ts mismatch Partial<TextField> with TextField
  const slug: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    ...(slugOverrides || {}),
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: '@foundrykit/payload-fields/client#SlugComponent',
          clientProps: { fieldToUse, checkboxFieldPath: checkBoxField.name },
        },
      },
    },
  }

  return [slug, checkBoxField]
}
