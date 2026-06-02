import React from 'react'
import type { Task } from '../types/task.type'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function TaskPage() {
  const [taskslist, setTaskslist] = React.useState<Task[]>([])
  const [task,setTask] = React.useState({title: ''})
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed', e.target.name, e.target.value)
    setTask(
        {title: e.target.value}
        
    )
  }
  const handlesubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        {taskslist.length === 0 && <p className='mt-4 text-gray-500'>No tasks added yet.</p>}
        <ul className='mt-4'>
            {taskslist.map((task)=>
            < React.Fragment key={task.id}>
            <li key={task.id} className='border-b py-2'>
                {task.title}
                {task.completed ? <span className='text-green-500 ml-2'>(Completed)</span> : <span className='text-red-500 ml-2'>(Pending)</span>}
            </li>
            <Button label="Delete" onClick={()=>{setTaskslist(prev=>prev.filter(t=>t.id !== task.id))}} />
            <Button label="Complete" onClick={()=>{setTaskslist(prev=>prev.map(t=>t.id === task.id ? {...t, completed: !t.completed} : t))}} />

            </React.Fragment>)}
        </ul>
    </div>
  )
}

export default TaskPage