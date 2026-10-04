import React from 'react';
import type { User } from '../types/user.type';

const UserCard=React.memo(({user, setClickedUserdata,setClickedUser}: { user: User; setClickedUserdata: (userdata: { email: string; id: number; firstname: string; lastname: string ,image: string, phone: string, address: string, country: string } | null) => void; setClickedUser: (clicked: boolean) => void })=> {
    console.log(`////////////////////Rendering UserCard `);
  return (
    <div onClick={() => { setClickedUserdata({email:user.email, id: user.id,firstname: user.firstName, lastname: user.lastName, image: user.image,phone: user.phone, address: user.address.address, country: user.address.country }); setClickedUser(true); }} className="bg-white max-w-md mx-auto mt-4 border border-gray-200 shadow-lg rounded-lg p-4">
      <div className="font-bold text-lg">{user.firstName} {user.lastName}</div>
      
      {/* <div>{user.company.name}</div>
      <div>{user.website}</div> */}
    </div>
  )
})

export default UserCard