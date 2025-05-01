
export const businessSchema = {
    title: 'business schema',
    version: 0,
    description: 'details of a business venture',
    type: 'object',
    primaryKey: 'id',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' }
      },
      required: ['id']
}