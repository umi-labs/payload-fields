import type { CollectionBeforeChangeHook } from 'payload'

/** Stamps `req.user` onto `createdBy` (create) and `updatedBy` (every write). Pairs with `changedByFields()`. */
export const populateChangedBy: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (!req.user) return data
  return {
    ...data,
    ...(operation === 'create' ? { createdBy: req.user.id } : {}),
    updatedBy: req.user.id,
  }
}
