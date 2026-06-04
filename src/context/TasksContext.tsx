import {createContext, useContext} from 'react';
import { useLocalStorage } from '../hooks/TaskStorage.hook';
import type { Task } from '../types/task.type';



export const TaskContext = createContext(null);


export function TaskProvider({children}: {children: React.ReactNode}) {
    const [taskslist, setTaskslist] = useLocalStorage<Task[]>("Task",[])
    return (
        <TaskContext.Provider value={{taskslist, setTaskslist}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
  const context =
    useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTasks must be used inside TaskProvider"
    );
  }

  return context;
}