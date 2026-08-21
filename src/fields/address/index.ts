import type { Field, GroupField } from 'payload'
import deepMerge from '../../utilities/deepMerge.js'

type AddressType = (options?: { sidebar?: boolean; overrides?: Partial<GroupField> }) => Field

/** A structured UK address group with a postcode-lookup helper in the admin. */
export const address: AddressType = ({ sidebar = false, overrides = {} } = {}) => {
  const addressResult: Field = {
    name: 'address',
    type: 'group',
    fields: [
      { name: 'line1', label: 'Address Line 1', type: 'text', admin: { placeholder: 'Building name / number and street' } },
      { name: 'line2', label: 'Address Line 2', type: 'text', admin: { placeholder: 'Apartment, suite, unit etc. (optional)' } },
      {
        type: 'row',
        fields: [
          { name: 'city', label: 'City / Town', type: 'text', admin: { width: '50%' } },
          { name: 'county', label: 'County', type: 'text', admin: { width: '50%' } },
        ],
      },
      {
        type: 'row',
        fields: [
          { name: 'postcode', label: 'Postcode', type: 'text', admin: { width: '40%' } },
          { name: 'country', label: 'Country', type: 'text', defaultValue: 'United Kingdom', admin: { width: '60%' } },
        ],
      },
    ],
    admin: {
      position: sidebar ? 'sidebar' : undefined,
      components: { Field: '@foundrykit/payload-fields/client#AddressInput' },
    },
  }
  return deepMerge(addressResult, overrides)
}
