import type { RelationshipField } from 'payload'

type ChangedByOptions = { usersCollection?: string }

/**
 * `createdBy` + `updatedBy` relationship fields (read-only), populated by
 * `populateChangedBy`. Because versions snapshot the whole document, this gives
 * per-version authorship for free.
 */
export const changedByFields = ({
  usersCollection = 'users',
}: ChangedByOptions = {}): [RelationshipField, RelationshipField] => {
  const createdBy: RelationshipField = {
    name: 'createdBy',
    type: 'relationship',
    relationTo: usersCollection,
    admin: { readOnly: true, position: 'sidebar' },
  }
  const updatedBy: RelationshipField = {
    name: 'updatedBy',
    type: 'relationship',
    relationTo: usersCollection,
    admin: { readOnly: true, position: 'sidebar' },
  }
  return [createdBy, updatedBy]
}
