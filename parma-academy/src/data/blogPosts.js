import heroImage from '../assets/Heroimageparmaacademy.jpeg'
import infraImage from '../assets/infraimage1.jpeg'
import galleryTour from '../assets/Juniorwingtour2026-1.jpeg'
import seniorTour from '../assets/Seniourwingtour2025-1.jpeg'
import sudhirRai from '../assets/SudhirRai.jpeg'
import { rawBlogPosts, blogCategories } from './blogPostsData'

export { blogCategories }

const assetMap = {
  heroImage,
  infraImage,
  galleryTour,
  seniorTour,
  sudhirRai,
}

export const initialBlogPosts = rawBlogPosts.map((post) => ({
  ...post,
  coverImage: assetMap[post.imageKey] || heroImage,
  author: {
    ...post.author,
    avatar: assetMap[post.author?.avatarKey] || sudhirRai,
  },
}))
