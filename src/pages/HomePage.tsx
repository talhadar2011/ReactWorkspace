import React from 'react'
import Button from '../components/ui/button'
import Input from '../components/ui/Input'

function HomePage() {
  
  return (
    <div>HomePage
      <Button label="Click Me" />
      <Input type="text" placeholder="Enter UserName" />
      <Input type="password" placeholder="Enter Password" />
    </div>
  )
}

export default HomePage