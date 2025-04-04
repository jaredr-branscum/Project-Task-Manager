const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000
const DATA_FILE = './projects.json'

app.use(express.json())
app.use(cors())

const readProjects = () => {
    if (!fs.existsSync(DATA_FILE)) return []
    return JSON.parse(fs.readFileSync(DATA_FILE))
}

const writeProjects = (projects) => fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2))

// Get all projects
app.get('/projects', (req, res) => res.json(readProjects()))

// Get a single project with tasks
app.get('/projects/:id', (req, res) => {
    const project = readProjects().find((p) => p.id === req.params.id)
    project ? res.json(project) : res.status(404).json({ message: 'Project not found' })
})

// Create a project with input validation
app.post('/projects', (req, res) => {
    const { name, description } = req.body
    if (!name || typeof name !== 'string' || (description && typeof description !== 'string')) {
        return res
            .status(400)
            .json({ message: 'Invalid input: name must be a string and description (if provided) must be a string' })
    }

    const projects = readProjects()
    const newProject = { id: Date.now().toString(), name, description: description || '', tasks: [] }
    projects.push(newProject)
    writeProjects(projects)
    res.status(201).json(newProject)
})

// Add a task to a project with input validation
app.post('/projects/:id/tasks', (req, res) => {
    const { title, status } = req.body
    if (!title || typeof title !== 'string' || (status && typeof status !== 'string')) {
        return res
            .status(400)
            .json({ message: 'Invalid input: title must be a string and status (if provided) must be a string' })
    }

    const projects = readProjects()
    const project = projects.find((p) => p.id === req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })

    const newTask = { id: Date.now().toString(), title, status: status || 'pending' }
    project.tasks.push(newTask)
    writeProjects(projects)
    res.status(201).json(newTask)
})

// Get all tasks in a project
app.get('/projects/:id/tasks', (req, res) => {
    const project = readProjects().find((p) => p.id === req.params.id)
    project ? res.json(project.tasks) : res.status(404).json({ message: 'Project not found' })
})

// Get a specific task in a project
app.get('/projects/:id/tasks/:taskId', (req, res) => {
    const project = readProjects().find((p) => p.id === req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })

    const task = project.tasks.find((t) => t.id === req.params.taskId)
    task ? res.json(task) : res.status(404).json({ message: 'Task not found' })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
