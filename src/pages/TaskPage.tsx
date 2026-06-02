import React, { useEffect } from 'react'
import type { Task } from '../types/task.type'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function TaskPage() {
  const [taskslist, setTaskslist] = React.useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [task,setTask] = React.useState({title: ''})
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed', e.target.name, e.target.value)
    setTask(
        {title: e.target.value}
        
    )
  }
  
useEffect(() => {
    console.log('Taskslist changed', taskslist,localStorage.getItem('tasks'))
  localStorage.setItem(
    'tasks',
    JSON.stringify(taskslist)
  )
}, [taskslist])
  const handlesubmit = () => {
    console.log('Button clicked', task)
    const trimmedTitle = task.title.trim()

if (!trimmedTitle) {
  alert('Task title cannot be empty')
  return
}
    setTaskslist(prev=>([...prev,{
        id: Math.random(),
        title: trimmedTitle,
        completed: false,
        createdAt: new Date(),
    }]))
    setTask({title: ''})
}
useEffect(() => {
    console.log('Task Page Mounted', )
}, [])
const handleDelete = (id: number) => {
    setTaskslist(prev => prev.filter(t => t.id !== id))
}
  console.log('TaskPage rendered', task,taskslist)
    return (
    <div className='max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-4'>Tasks</h1>
        <h1 className='text-3xl font-bold mb-4'>Total Tasks: {taskslist.length}</h1>
        <Input type="text" placeholder="Task title" name="title" value={task?.title } onChange={(e)=>handleInputChange(e)} />
        <button onClick={handlesubmit} className='bg-blue-500 text-white px-4 py-2 rounded mt-2'>Add Task</button>
        {taskslist.length === 0 && <p className='mt-4 text-gray-500'>No tasks added yet.</p>}
        <ul className='mt-4'>
            {taskslist.map((task)=>
            < React.Fragment key={task.id}>
            <li  className='border-b py-2'>
                {task.title}
                {task.completed ? <span className='text-green-500 ml-2'>(Completed)</span> : <span className='text-red-500 ml-2'>(Pending)</span>}
            </li>
            <Button label="Delete" onClick={()=>{handleDelete(task.id)}} />
            <Button label="Complete" onClick={()=>{setTaskslist(prev=>prev.map(t=>t.id === task.id ? {...t, completed: !t.completed} : t))}} />

            </React.Fragment>)}
        </ul>
    </div>
  )
}

export default TaskPage