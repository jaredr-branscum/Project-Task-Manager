import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/ProjectTaskManagerService'

export const ProjectList = () => {
    const { data: projects, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects })

    if (isLoading) return <p className="loading">Loading...</p>

    return (
        <div className="project-details-page">
            <div className="p-4">
                <h1>Projects</h1>
                <ul>
                    {projects.map((project: any) => (
                        <li
                            key={project.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <Link to={`/projects/${project.id}`}>{project.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
