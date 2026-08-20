export default {
  name: 'himalayaRegion',
  title: 'Himalaya Region',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' } },
    { name: 'state', type: 'string', title: 'State' },
    { name: 'country', type: 'string', title: 'Country' },
    { name: 'altitudeRange', type: 'string', title: 'Altitude Range' },
    {
      name: 'phase',
      type: 'string',
      title: 'Phase',
      options: {
        list: [
          { title: 'Phase 1 — Active', value: 'phase-1' },
          { title: 'Phase 2 — Planned', value: 'phase-2' },
        ],
      },
    },
  ],
}
