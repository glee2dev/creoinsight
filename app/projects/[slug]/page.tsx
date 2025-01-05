'use client'

import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ImageSlider from '@/components/image-slider'

interface ProjectPageProps {
  params: { slug: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.slug)

  if (!project) {
    return notFound()
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/projects"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>

        <article className="space-y-12">
          {/* Header Section */}
          <header>
            <h1 className="text-4xl font-bold text-primary mb-4">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="text-sm">{project.duration}</span>
              <span>•</span>
              <span className="text-sm">{project.role}</span>
              <span>•</span>
              <span className="text-sm">{project.category}</span>
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
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="glass-card rounded-xl p-8 animate-in">
            <h2 className="text-xl font-semibold mb-6">Technologies Used</h2>
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

          {/* Key Tasks & Achievements */}
          <div className="glass-card rounded-xl p-8 animate-in">
            <h2 className="text-xl font-semibold mb-6">Key Tasks & Achievements</h2>
            <div className="grid gap-4">
              {project.tasks.map((task, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-muted/50 backdrop-blur-sm animate-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                    <span className="text-muted-foreground">{task}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Navigation */}
          <nav className="flex justify-between items-center pt-8 border-t border-border">
            {projects.map((p, i) => {
              if (p.id === project.id) {
                const prevProject = projects[i - 1];
                const nextProject = projects[i + 1];

                return (
                  <div key={p.id} className="flex justify-between w-full">
                    {prevProject ? (
                      <Link
                        href={`/projects/${prevProject.id}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        ← {prevProject.title}
                      </Link>
                    ) : <div />}

                    {nextProject && (
                      <Link
                        href={`/projects/${nextProject.id}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {nextProject.title} →
                      </Link>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </nav>
        </article>
      </div>
    </div>
  )
}
