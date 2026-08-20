export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'role', type: 'string', title: 'Role' },
    { name: 'bio', type: 'text', title: 'Bio' },
    { name: 'photo', type: 'image', title: 'Photo', options: { hotspot: true } },
    { name: 'isFounder', type: 'boolean', title: 'Is Founder' },
    { name: 'linkedinUrl', type: 'url', title: 'LinkedIn URL' },
    { name: 'order', type: 'number', title: 'Display Order' },
  ],
}
