'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/utils/blog'

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(posts.map(post => post.category)))

  // Set initial selected category
  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0])
    }
  }, [categories, selectedCategory])

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : []

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
      {/* Sidebar */}
      <div className="lg:w-1/4">
        <div className="sticky top-24 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">Blog</h1>
            <p className="mt-4 text-muted-foreground">
              Insights and articles on technology and development
            </p>
          </div>

          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  w-full px-4 py-3 rounded-lg text-left
                  transition-colors text-sm font-medium
                  ${selectedCategory === category
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4">
        <div className="space-y-8">
          {filteredPosts.map((post, i) => (
            <article 
              key={post.id} 
              className="animate-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Link href={`/blog/${post.slug}`} className="group">
                <div className="glass-card rounded-xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-primary font-medium">{post.category}</span>
                      <span>•</span>
                      <time>{post.date}</time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="pt-4">
                      <span className="text-sm text-primary group-hover:opacity-70 transition-opacity">
                        Read more →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
