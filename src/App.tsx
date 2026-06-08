import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { TaskProvider } from './context/TasksContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createRouter({
  routeTree,
})
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <RouterProvider router={router}/>
      </TaskProvider>
    </QueryClientProvider>
  )
}

export default App
