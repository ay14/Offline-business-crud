
export const businessSchema = {
    title: 'business schema',
    version: 0,
    description: 'details of a business venture',
    type: 'object',
    properties: {
        id: { type: 'string', primary: true },
        name: { type: 'string' }
      },
      required: ['id', 'name']
}