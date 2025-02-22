'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { BlogPost as BlogPostType, getBlogPostBySlug } from '@/utils/blog'

interface BlogPostProps {
  slug: string
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [activeHeading, setActiveHeading] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      const postData = await getBlogPostBySlug(slug)
      setPost(postData)
      setLoading(false)
    }
    loadPost()
  }, [slug])

  useEffect(() => {
    if (!post) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    const headings = document.querySelectorAll('h2, h3')
    headings.forEach(heading => observer.observe(heading))

    return () => headings.forEach(heading => observer.unobserve(heading))
  }, [post])

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-xl p-8">
            <div className="animate-pulse">
              <div className="h-8 w-1/3 bg-muted rounded mb-4"></div>
              <div className="h-4 w-1/4 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-xl p-8">
            <h1 className="text-2xl font-bold">Post not found</h1>
            <Link 
              href="/blog" 
              className="mt-4 inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article className="glass-card rounded-xl p-8">
          <header className="mb-12">
            <div className="flex items-center gap-3 text-sm mb-6">
              <span className="text-primary font-medium">{post.category}</span>
              <span className="text-muted-foreground">•</span>
              <time className="text-muted-foreground">{post.date}</time>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div 
            className="blog-content prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/<h([23])>(.*?)<\/h\1>/g, (_, level, content) => {
                const id = content.toLowerCase().replace(/\s+/g, '-')
                return `<h${level} id="${id}">${content}</h${level}>`
              })
            }}
          />
        </article>
      </div>
    </div>
  )
}
