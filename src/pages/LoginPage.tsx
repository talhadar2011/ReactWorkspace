import React from 'react'
import Button from '../components/ui/button'
import Input from '../components/ui/Input'

function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <Input type="text" placeholder="Enter your username" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <Input  type="password" placeholder="Enter your password" />
        </div>
        <Button label="Login" />
      </form>
    </div>
  )
}

export default LoginPage