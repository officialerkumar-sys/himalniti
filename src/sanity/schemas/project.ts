export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Completed', value: 'completed' },
          { title: 'Forthcoming', value: 'forthcoming' },
        ],
      },
    },
    { name: 'region', type: 'reference', title: 'Region', to: [{ type: 'himalayaRegion' }] },
    { name: 'startDate', type: 'date', title: 'Start Date' },
    { name: 'endDate', type: 'date', title: 'End Date' },
    { name: 'summary', type: 'text', title: 'Summary' },
    { name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }] },
    { name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true } },
    { name: 'partners', type: 'array', title: 'Partners', of: [{ type: 'string' }] },
    {
      name: 'outputs',
      type: 'array',
      title: 'Research Outputs',
      of: [{ type: 'reference', to: [{ type: 'research' }] }],
    },
    { name: 'featured', type: 'boolean', title: 'Featured' },
  ],
}
