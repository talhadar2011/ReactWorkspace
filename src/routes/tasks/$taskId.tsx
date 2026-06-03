import { createFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from '../../hooks/TaskStorage.hook'
import type { Task } from '../../types/task.type'

export const Route = createFileRoute('/tasks/$taskId')({
  component: TaskComponent,
  
})

function TaskComponent() {
  const { taskId } = Route.useParams()
  const [taskslist] = useLocalStorage<Task[]>("Task",[])
  const task = taskslist.find(t => t.id === Number(taskId))
  return (
    <div className="p-4">
      {!task ? (
        <p className="text-red-500">Task not found</p>
      ) : (
      <>
      <h2 className="text-xl font-bold">Task Details</h2>
      <p>Current Task ID from URL: <strong>{taskId}</strong></p>
      <p>Loaded Task ID Data: {task?.title}</p>
      </>)}
      
    </div>
  )
}