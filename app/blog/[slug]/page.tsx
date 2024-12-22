import BlogPost from './BlogPost'
import { blogPosts } from '@/data/blog'

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />
}
