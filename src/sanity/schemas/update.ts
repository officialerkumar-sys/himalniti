export default {
  name: 'update',
  title: 'Update',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
    { name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }] },
  ],
}
