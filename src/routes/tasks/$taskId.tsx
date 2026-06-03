import { createFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from '../../hooks/TaskStorage.hook'
import type { Task } from '../../types/task.type'

export const Route = createFileRoute('/tasks/$taskId')({
  component: TaskComponent,
  loader: async ({ params }) => {
    return { taskId: params.taskId }
  },
})

function TaskComponent() {
  const { taskId } = Route.useParams()
  const data = useLocalStorage<Task[]>("Task",[])
  console.log('Loaded task data:', data[0])
  const task = data[0].find(t => t.id === Number(taskId))
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Task Details</h2>
      <p>Current Task ID from URL: <strong>{taskId}</strong></p>
      <p>Loaded Task ID Data: {task?.title}</p>
    </div>
  )
}