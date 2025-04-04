import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '../api/ProjectTaskManagerService'

export const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>()
    const { data: project, isLoading } = useQuery({ queryKey: ['project', id], queryFn: () => getProject(id!) })

    if (isLoading) return <p className="loading">Loading...</p>

    if (!project || !project.tasks || project.tasks.length === 0) {
        return (
            <div className="project-details-page">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">{project?.name}</h1>
                    <p>{project?.description}</p>

                    <h2>Tasks</h2>

                    <p className="no-tasks">No tasks available for this project.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="project-details-page">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
                <p>{project.description}</p>

                <h2>Tasks</h2>

                <ul>
                    {project.tasks.map((task: any) => (
                        <li key={task.id}>
                            <Link to={`/projects/${id}/tasks/${task.id}`}>{task.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
