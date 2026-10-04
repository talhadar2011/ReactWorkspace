import React from 'react';
import type { User } from '../types/user.type';
const UserCard=React.memo(({user, setClickedUserId,setClickedUser}: { user: User; setClickedUserId: (id: string | null) => void; setClickedUser: (clicked: boolean) => void })=> {
    console.log(`////////////////////Rendering UserCard `);
  return (
    <div onClick={() => { setClickedUserId(user.email); setClickedUser(true); }} className="bg-white max-w-md mx-auto mt-4 border border-gray-200 shadow-lg rounded-lg p-4">
      <div className="font-bold text-lg">{user.name}</div>
      <div>{user.email}</div>
      <div>{user.company.name}</div>
      <div>{user.website}</div>
    </div>
  )
})

export default UserCard