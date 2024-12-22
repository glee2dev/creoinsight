import ProjectPage from './ProjectPage'
import { projects } from '@/data/projects'

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProjectPage slug={params.slug} />
}
