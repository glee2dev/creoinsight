'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/data/projects'

interface ProjectListProps {
  projects: Project[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(projects.map(p => p.category)))

  // Set initial selected category
  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0])
    }
  }, [categories, selectedCategory])

  // Filter projects by selected category
  const filteredProjects = selectedCategory
    ? projects.filter(p => p.category === selectedCategory)
    : []

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.project-card')
      cards.forEach(card => {
        const rect = card.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
      {/* Sidebar */}
      <div className="lg:w-1/4">
        <div className="sticky top-24 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">Projects</h1>
            <p className="mt-4 text-muted-foreground">
              Featured works and technical innovations
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
        <div className="grid gap-8">
          {filteredProjects.map((project, i) => (
            <article 
              key={project.id} 
              className="project-card animate-in" 
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="glass-card rounded-xl p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Project Image */}
                    {project.images && project.images.length > 0 && (
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={project.images[0].src}
                          alt={project.images[0].alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Project Info */}
                    <div className="flex flex-col gap-6">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-2xl font-semibold text-foreground">
                            {project.title}
                          </h2>
                          <span className="text-sm text-primary">{project.duration}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.shortDescription || project.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">{project.role}</span>
                        <span>•</span>
                        <span>{project.category}</span>
                      </div>

                      {/* Tasks Preview */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Key Tasks</h3>
                        <div className="grid gap-2">
                          {project.tasks.slice(0, 3).map((task, index) => (
                            <div 
                              key={index}
                              className="p-3 rounded-lg bg-muted/50 backdrop-blur-sm"
                            >
                              <div className="flex items-center gap-2 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                <span className="text-muted-foreground">{task}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
