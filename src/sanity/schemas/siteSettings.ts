export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'tagline', type: 'string', title: 'Tagline' },
    { name: 'missionStatement', type: 'text', title: 'Mission Statement' },
    {
      name: 'featuredResearch',
      type: 'reference',
      title: 'Featured Research',
      to: [{ type: 'research' }],
    },
    {
      name: 'featuredProject',
      type: 'reference',
      title: 'Featured Project',
      to: [{ type: 'project' }],
    },
    { name: 'contactEmail', type: 'string', title: 'Contact Email' },
    { name: 'linkedinUrl', type: 'url', title: 'LinkedIn URL' },
    { name: 'eklahimalUrl', type: 'url', title: 'Eklahimal URL' },
    {
      name: 'keyStats',
      type: 'array',
      title: 'Key Statistics',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'figure', type: 'string', title: 'Figure' },
            { name: 'label', type: 'string', title: 'Label' },
            {
              name: 'color',
              type: 'string',
              title: 'Color',
              options: {
                list: [
                  { title: 'Gold', value: 'accent' },
                  { title: 'Green', value: 'green' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}
