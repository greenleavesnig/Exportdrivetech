import type { Access, CollectionConfig } from 'payload'

const isPayloadAdmin: Access = ({ req }) => req.user?.collection === 'admins'

const canUpdateOwnAccount: Access = ({ req, id }) => {
  // Allow if user is an admin and updating their own account
  if (req.user?.collection === 'admins' && req.user?.id === id) {
    return true
  }
  // Also allow if user is a Payload admin (can update any admin)
  return isPayloadAdmin({ req })
}

export const Admins: CollectionConfig = {
  slug: 'admins',
  access: {
    create: () => false,
    delete: isPayloadAdmin,
    read: isPayloadAdmin,
    update: canUpdateOwnAccount,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
  versions: false,
}
