export default {
  name: 'indicator',
  title: 'Ecosystem Indicator',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'region', type: 'reference', title: 'Region', to: [{ type: 'himalayaRegion' }] },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Ecosystem', value: 'ecosystem' },
          { title: 'Tourism Pressure', value: 'tourism-pressure' },
          { title: 'Economic', value: 'economic' },
          { title: 'Social', value: 'social' },
        ],
      },
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Stable', value: 'stable' },
          { title: 'At Risk', value: 'at-risk' },
          { title: 'Critical', value: 'critical' },
        ],
      },
    },
    { name: 'currentValue', type: 'string', title: 'Current Value' },
    {
      name: 'trend',
      type: 'string',
      title: 'Trend',
      options: {
        list: [
          { title: 'Improving', value: 'improving' },
          { title: 'Stable', value: 'stable' },
          { title: 'Declining', value: 'declining' },
        ],
      },
    },
    { name: 'updatedAt', type: 'date', title: 'Updated At' },
    { name: 'note', type: 'text', title: 'Note' },
  ],
}
