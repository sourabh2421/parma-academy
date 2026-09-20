export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    },
    {
      name: 'leadSummary',
      title: 'AEO Direct Answer Summary',
      description:
        'First 1-2 sentence direct factual answer to the core user search query for Answer Engine Optimization',
      type: 'text',
      rows: 3,
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'ICSE Curriculum', value: 'ICSE Curriculum' },
          { title: 'Admissions', value: 'Admissions' },
          { title: 'Student Life', value: 'Student Life' },
          { title: 'Parent Guides', value: 'Parent Guides' },
        ],
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      placeholder: 'e.g. 5 min read',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'name', title: 'Author Name', type: 'string' },
        { name: 'role', title: 'Author Role / Department', type: 'string' },
        { name: 'image', title: 'Author Avatar', type: 'image' },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'updatedAt',
      title: 'Last Updated at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    // Dedicated SEO Fields
    {
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      validation: (Rule) => Rule.max(70),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'focusKeyword',
      title: 'Focus Keyword (e.g. ICSE school Ayodhya)',
      type: 'string',
    },
    {
      name: 'faqs',
      title: 'Frequently Asked Questions (FAQ Schema)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'answer', title: 'Direct Answer', type: 'text', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    },
  ],
}
