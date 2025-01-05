import { getAllBlogPosts } from '../../utils/blog'
import { Metadata } from 'next'
import BlogList from '../../components/blog-list'

export const metadata: Metadata = {
  title: "Blog Posts | CreoInsight",
  description: "Explore our latest articles on AI, blockchain, web development and more.",
}

export const revalidate = 3600 // Revalidate every hour

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogList posts={posts} />
      </div>
    </div>
  )
}
