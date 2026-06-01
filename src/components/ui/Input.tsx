import React from 'react'

function Input(props: { type: string, placeholder: string }) {
  return (
    <input type={props.type} placeholder={props.placeholder} />
    
  )
}

export default Input