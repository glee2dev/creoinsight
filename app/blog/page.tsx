import Link from 'next/link'
import { blogPosts } from '@/data/blog'

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Blog</h1>
        <p className="text-xl text-muted-foreground mb-16">
          Thoughts and insights on technology, AI, and innovation
        </p>

        <div className="space-y-12">
          {blogPosts.map((post, i) => (
            <article 
              key={post.id} 
              className="animate-in border-b border-border pb-12 last:border-0"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Link href={`/blog/${post.id}`} className="group">
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
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-4 flex items-center text-sm">
                    <span className="text-primary group-hover:text-primary/80 transition-colors">
                      Read more →
                    </span>
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
