import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getTask } from '../api/ProjectTaskManagerService'

export const TaskDetails = () => {
    const { id, taskId } = useParams<{ id: string; taskId: string }>()
    const { data: task, isLoading } = useQuery({
        queryKey: ['task', id, taskId],
        queryFn: () => getTask(id!, taskId!),
    })

    if (isLoading) return <p className="loading">Loading...</p>

    return (
        <div className="task-details-page">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1>{task.title}</h1>
                <p>
                    <span>Status:</span> {task.status}
                </p>
            </div>
        </div>
    )
}
