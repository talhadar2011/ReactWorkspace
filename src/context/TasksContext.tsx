import {createContext, useContext} from 'react';
import { useLocalStorage } from '../hooks/TaskStorage.hook';
import type { Task } from '../types/task.type';


interface TaskContextType {
  taskslist: Task[];
  setTaskslist: React.Dispatch<React.SetStateAction<Task[]>>;
}
export const TaskContext = createContext<TaskContextType | null>(null);


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