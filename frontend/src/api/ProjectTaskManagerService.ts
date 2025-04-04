const BASE_URL = import.meta.env.BASE_URL || 'http://localhost:5000'

export const getProject = async (id: string) => {
    console.log('The base url:' + BASE_URL)
    const res = await fetch(`${BASE_URL}/projects/${id}`)
    return res.json()
}

export const getProjects = async () => {
    console.log('The base url:' + BASE_URL)
    const res = await fetch(`${BASE_URL}/projects`)
    return res.json()
}

export const getTask = async (projectId: string, taskId: string) => {
    console.log('The base url:' + BASE_URL)
    const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`)
    return res.json()
}
