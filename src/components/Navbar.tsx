import React from 'react'
import {Link} from '@tanstack/react-router'
export default function Navbar() {
  return (
    <nav>
      <Link activeProps={{ className: 'active' }}  to="/">
        Home
      </Link>
      <Link activeProps={{ className: 'active' }}  to="/tasks">
        Tasks
      </Link>
      <Link activeProps={{ className: 'active' }}  to="/team">
        Team
      </Link>
      <Link activeProps={{ className: 'active' }} to="/register">
        Register
      </Link>
      <Link activeProps={{ className: 'active' }} to="/login">
        Login
      </Link>
    </nav>
  )
}
