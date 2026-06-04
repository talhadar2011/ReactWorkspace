import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { TaskProvider } from './context/TasksContext';

const router = createRouter({
  routeTree,
})

function App() {
  return (
    
    <TaskProvider>
     <RouterProvider router={router}/>
    </TaskProvider>
    
  )
}

export default App
