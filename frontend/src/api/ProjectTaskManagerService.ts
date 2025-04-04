const BASE_URL = import.meta.env.BASE_URL || 'http://localhost:5000'

export const getProject = async (id: string) => {
    const res = await fetch(`${BASE_URL}/projects/${id}`)
    return res.json()
}

export const getProjects = async () => {
    const res = await fetch(`${BASE_URL}/projects`)
    return res.json()
}

export const getTask = async (projectId: string, taskId: string) => {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`)
    return res.json()
}
