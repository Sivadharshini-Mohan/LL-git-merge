import { Router, Route, RootRoute } from '@tanstack/react-router'
import { Projects } from './components/projects/Projects'
import CodeAnalyseCompleted from './components/code-analysis/CodeAnalyseCompleted'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const rootRoute = new RootRoute()

// You should implement this function to fetch projects from your API
const fetchProjects = async () => {
  // Replace this with your actual API call
  return []
}

const ProjectsWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  return (
    <Projects 
      projects={projects}
      openModal={() => setIsModalOpen(true)}
    />
  )
}

const projectsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ProjectsWrapper,
})

const codeAnalysisRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/code-analysis/$projectId',
  component: CodeAnalyseCompleted,
})

const routeTree = rootRoute.addChildren([projectsRoute, codeAnalysisRoute])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
} 