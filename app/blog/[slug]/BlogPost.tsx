'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { blogPosts } from '@/data/blog'

interface BlogPostProps {
  slug: string
}

export default function BlogPost({ slug }: BlogPostProps) {
  const post = blogPosts.find(p => p.id === slug)
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
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

  if (!post) return <div>Post not found</div>

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

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
              <span className="text-primary font-medium">{post.category}</span>
              <span>•</span>
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div 
            className="prose dark:prose-invert prose-lg max-w-none
              prose-headings:text-foreground 
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:marker:text-primary"
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
