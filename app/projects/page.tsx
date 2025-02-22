import { Metadata } from 'next'
import ProjectList from '../../components/project-list'
import { getAllProjects } from '../../utils/projects'

export const metadata: Metadata = {
  title: "Projects | CreoInsight",
  description: "Featured works and technical innovations across web development, mobile apps, and machine learning.",
}

export const revalidate = 3600 // Revalidate every hour

export default async function ProjectsPage() {
  const projects = await getAllProjects()
  
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectList projects={projects} />
      </div>
    </div>
  )
}
