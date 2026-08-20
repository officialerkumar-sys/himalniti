export default {
  name: 'research',
  title: 'Research Publication',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
    { name: 'authors', type: 'array', title: 'Authors', of: [{ type: 'string' }] },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'White Paper', value: 'white-paper' },
          { title: 'Policy Brief', value: 'policy-brief' },
          { title: 'Field Report', value: 'field-report' },
          { title: 'Data Report', value: 'data-report' },
          { title: 'Case Study', value: 'case-study' },
        ],
      },
    },
    { name: 'region', type: 'reference', title: 'Region', to: [{ type: 'himalayaRegion' }] },
    { name: 'abstract', type: 'text', title: 'Abstract' },
    { name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }] },
    { name: 'pdfFile', type: 'file', title: 'PDF File' },
    { name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true } },
    { name: 'keyFindings', type: 'array', title: 'Key Findings', of: [{ type: 'string' }] },
    { name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }] },
    { name: 'featured', type: 'boolean', title: 'Featured' },
  ],
}
