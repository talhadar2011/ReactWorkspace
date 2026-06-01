import React from 'react'

function Input(props: { type: string, placeholder: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <input className='w-full h-12 shadow-md rounded border p-2' type={props.type} placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange} />

  )
}

export default Input