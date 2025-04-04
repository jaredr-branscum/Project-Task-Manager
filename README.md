# Project Task Manager Project
Just a little side project using Vite React frontend + Express backend to explore Tanstack Query, Breadcrumbs, & Zustand state management

## Local Setup instructions
### Backend
1. **Build & Run Docker image**:
```bash
cd backend
docker build -t project-task-manager .
docker run -p 8080:8080 -e PORT=8080 project-task-manager
```

### Frontend
1. **Build & Run Docker image**:
2. **Set your Environment Variables in .env file**
```bash
cd frontend
docker build -t task-ui .
docker run -p 3000:80 task-ui 
```