'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { projects } from '@/data/projects'
import ImageSlider from '@/components/image-slider'

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

        <article className="space-y-12">
          {/* Header */}
          <header>
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

          {/* Image Slider */}
          {project.images && project.images.length > 0 && (
            <div className="glass-card p-4 animate-in">
              <ImageSlider images={project.images} />
            </div>
          )}

          {/* Project Overview */}
          <div className="glass-card rounded-xl p-8 animate-in">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-lg text-muted-foreground">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="glass-card rounded-xl p-8 animate-in">
            <h2 className="text-2xl font-semibold mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Tasks */}
          <div className="glass-card rounded-xl p-8 animate-in">
            <h2 className="text-2xl font-semibold mb-6">Key Tasks & Achievements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.tasks.map((task, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-muted/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                    <span className="text-muted-foreground">{task}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
