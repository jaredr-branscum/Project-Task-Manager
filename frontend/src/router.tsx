import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProjectList } from './pages/ProjectList'
import { ProjectDetails } from './pages/ProjectDetails'
import { TaskDetails } from './pages/TaskDetails'

const queryClient = new QueryClient()
const nonClickableSegments = ['tasks']
const segmentLabels: Record<string, string> = {
    tasks: 'Tasks',
}

const Breadcrumbs = () => {
    const location = useLocation()
    const pathSegments = location.pathname.split('/').filter(Boolean)

    const breadcrumbMap: Record<string, string> = {
        projects: 'Projects',
        tasks: 'Tasks',
    }

    return (
        <nav style={{ marginBottom: '10px' }}>
            <strong>Breadcrumbs: </strong>
            {pathSegments.length === 0 ? (
                <span>Home</span>
            ) : (
                pathSegments.map((segment, index) => {
                    const path = `/${pathSegments.slice(0, index + 1).join('/')}`
                    const isNonClickable = nonClickableSegments.includes(segment)
                    const label = segmentLabels[segment] || segment
                    return (
                        <span key={path}>
                            {index > 0 && ' / '}
                            {isNonClickable ? (
                                <span className="text-gray-600 cursor-default">
                                    <b>{label}</b>
                                </span>
                            ) : (
                                <Link to={path}>{segment}</Link>
                            )}
                        </span>
                    )
                })
            )}
        </nav>
    )
}

export const AppRouter = () => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Breadcrumbs />
            <Routes>
                <Route path="/" element={<Navigate to="/projects" replace />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/projects/:id/tasks/:taskId" element={<TaskDetails />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
)
