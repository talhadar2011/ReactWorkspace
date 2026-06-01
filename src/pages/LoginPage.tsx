import { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      // Handle form submission logic here
      console.log('Form submitted', formData)
    }
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <Input 
            type="text" 
            placeholder="Enter your username" 
            name="username"
            value={formData.username}
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
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
          <Button onClick={(e) => handleSubmit(e)} label="Login" disabled={formData.username === '' || formData.password === ''} />
        
      </form>
      <ul>
        <li>Username: {formData.username}</li>
        <li>Password: {formData.password}</li>
      </ul>
    </div>
  )
}

export default LoginPage