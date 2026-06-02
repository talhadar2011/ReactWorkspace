import { createFileRoute } from '@tanstack/react-router'
import TaskPage from '../pages/TaskPage'

export const Route = createFileRoute('/tasks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TaskPage />
}
