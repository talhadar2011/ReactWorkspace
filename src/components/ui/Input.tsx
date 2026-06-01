import React from 'react'

function Input(props: { type: string, placeholder: string }) {
  return (
    <input className='w-full h-12 shadow-md rounded border p-2' type={props.type} placeholder={props.placeholder} />

  )
}

export default Input