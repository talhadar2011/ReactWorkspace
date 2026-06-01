import React from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

function RegisterPage() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
  })
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted', formData)
  }
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <Input 
          type="text"
          value={formData.username}
          name="username"
          onChange={handleInputChange} 
          placeholder="Enter your username" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <Input 
            type="email" 
            placeholder="Enter your email" 
            value={formData.email}
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password  
          </label>
          <Input 
            type="password" 
            placeholder="Enter your password" 
            value={formData.password}
            name="password"
            onChange={handleInputChange}
          />
        </div>
       
        <Button  onClick={handleSubmit} label="Register" disabled={formData.username === '' || formData.email === '' || formData.password === '' ? true : false} />
      </form>
      <ul>
        <li>Username: {formData.username}</li>
        <li>Email: {formData.email}</li>
        <li>Password: {formData.password}</li>
      </ul>
    </div>
  )
}

export default RegisterPage