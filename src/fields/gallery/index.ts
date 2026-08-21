import type { ArrayField, Field } from 'payload'
import deepMerge from '../../utilities/deepMerge.js'

type GalleryType = (options?: {
  sidebar?: boolean
  relationTo?: string
  overrides?: Partial<ArrayField>
}) => Field

/** A `hasMany` upload field for image galleries. `relationTo` defaults to `media`. */
export const gallery: GalleryType = ({ sidebar = false, relationTo = 'media', overrides = {} } = {}) => {
  const galleryResult: Field = {
    name: 'gallery',
    label: 'Gallery',
    type: 'upload',
    relationTo,
    hasMany: true,
    admin: {
      position: sidebar ? 'sidebar' : undefined,
      components: {
        Label: '@foundrykit/payload-fields/client#GalleryLabel',
      },
    },
  }
  return deepMerge(galleryResult, overrides)
}
