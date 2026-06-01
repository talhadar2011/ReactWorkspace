import React from 'react'

function Button(props: { label: string }) {
    console.log('Button rendered', props.label)
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">{props.label}</button>
  )
}

export default Button