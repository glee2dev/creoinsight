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

        <div className="space-y-8">
          {blogPosts.map((post, i) => (
            <article 
              key={post.id} 
              className="animate-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Link href={`/blog/${post.id}`}>
                <div className="blog-item">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-primary font-medium">{post.category}</span>
                    <span className="text-muted-foreground">•</span>
                    <time className="text-muted-foreground">{post.date}</time>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mt-4 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
