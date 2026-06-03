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
  const data = useLocalStorage<Task[]>("Task",[]).find(task => task.id === Number(taskId)) || { taskId: 'Not found' }
  console.log('Loaded task data:', data)
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Task Details</h2>
      <p>Current Task ID from URL: <strong>{taskId}</strong></p>
      <p>Loaded Task ID Data: {data.title}</p>
    </div>
  )
}