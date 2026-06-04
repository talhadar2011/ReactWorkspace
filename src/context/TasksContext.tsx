import {createContext, useContext} from 'react';
import { useLocalStorage } from '../hooks/TaskStorage.hook';
import type { Task } from '../types/task.type';


interface TaskContextType {
  taskslist: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  setTaskslist: React.Dispatch<React.SetStateAction<Task[]>>;
}
export const TaskContext = createContext<TaskContextType | null>(null);


export function TaskProvider({children}: {children: React.ReactNode}) {
    const [taskslist, setTaskslist] = useLocalStorage<Task[]>("Task",[])
    const addTask= (title: string) => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            alert('Task title cannot be empty');
            return;
        }
         setTaskslist(prev => ([...prev, {
        id: Date.now(),
        title: trimmedTitle,
        completed: false,
        createdAt: Date.now(),
    }]))
    }
    const deleteTask = (id: number) => {
        setTaskslist(prev => prev.filter(t => t.id !== id))
    }
    return (
        <TaskContext.Provider value={{taskslist, setTaskslist, addTask, deleteTask}}>
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