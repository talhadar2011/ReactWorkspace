import React from 'react'
import type { Task } from '../types/task.type'
import Input from '../components/ui/Input'

function TaskPage() {
  const [taskslist, setTaskslist] = React.useState<Task[]>([])
  const [task,setTask] = React.useState({})
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed', e.target.name, e.target.value)
    setTask(
        {title: e.target.value}
        
    )
  }
  const handlesubmit = (e: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    console.log('Button clicked', task)
    setTaskslist(prev=>([...prev,{
        id: Math.random(),
        title: task.title,
        completed: false,
        createdAt: new Date(),
    }]))
}
  console.log('TaskPage rendered', task,taskslist)
    return (
    <div className='max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-4'>Tasks</h1>
        <Input type="text" placeholder="Task title" name="title" value={task?.title } onChange={(e)=>handleInputChange(e)} />
        <button onClick={(e)=>handlesubmit(e)} className='bg-blue-500 text-white px-4 py-2 rounded mt-2'>Add Task</button>
        <ul className='mt-4'>
            {taskslist.map((task)=><li key={task.id} className='border-b py-2'>{task.title}</li>)}
        </ul>
    </div>
  )
}

export default TaskPage