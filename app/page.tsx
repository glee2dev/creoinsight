import Link from 'next/link'
import { getAllBlogPosts } from '@/utils/blog'
import { getAllProjects } from '@/utils/projects'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const allPosts = await getAllBlogPosts()
  const allProjects = await getAllProjects()
  const recentPosts = allPosts.slice(0, 3)
  const featuredProjects = allProjects.slice(0, 3)

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="animate-in">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            CreoInsight
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Innovative Insights & Creative Solutions
          </p>
        </section>

        {/* Blog Section */}
        <section className="mt-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold">Blog</h2>
                <p className="mt-2 text-muted-foreground">Latest thoughts and insights</p>
                <Link href="/blog" className="mt-4 inline-block text-primary hover:opacity-80">
                  View all posts →
                </Link>
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <div className="space-y-8">
                {recentPosts.map((post, i) => (
                  <article 
                    key={post.id} 
                    className="animate-in border-b border-border pb-8 last:border-0"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="text-primary font-medium">{post.category}</span>
                          <span>•</span>
                          <time>{post.date}</time>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="my-24 divider" />

        {/* Projects Section */}
        <section>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold">Projects</h2>
                <p className="mt-2 text-muted-foreground">Featured works and experiments</p>
                <Link href="/projects" className="mt-4 inline-block text-primary hover:opacity-80">
                  View all projects →
                </Link>
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <div className="grid gap-6">
                {featuredProjects.map((project, i) => (
                  <article key={project.id} className="project-card animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <Link href={`/projects/${project.id}`}>
                      <div className="glass-card rounded-xl p-6">
                        <h3 className="text-xl font-semibold">
                          {project.title}
                        </h3>
                        <p className="mt-4 text-muted-foreground">
                          {project.shortDescription || project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span 
                              key={tech} 
                              className="text-xs px-2 py-1 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
