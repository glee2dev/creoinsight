'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { projects } from '@/data/projects'

interface ProjectPageProps {
  slug: string
}

export default function ProjectPage({ slug }: ProjectPageProps) {
  const project = projects.find(p => p.id === slug)

  if (!project) return <div>Project not found</div>

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        <article className="glass-card rounded-xl p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="text-primary">{project.role}</span>
              <span>•</span>
              <span>{project.duration}</span>
              <span>•</span>
              <span>{project.category}</span>
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.features && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-primary mb-6">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="glass-card rounded-xl p-6"
                    >
                      <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
