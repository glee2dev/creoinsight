'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
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
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary">Projects</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Featured works and technical innovations
        </p>

        <div className="mt-12 grid gap-8">
          {projects.map((project, i) => (
            <article 
              key={project.id} 
              className="project-card animate-in" 
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="glass-card rounded-xl p-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-semibold text-foreground">
                        {project.title}
                      </h2>
                      <span className="text-sm text-primary">{project.duration}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.shortDescription || project.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">{project.role}</span>
                      <span>•</span>
                      <span>{project.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
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
