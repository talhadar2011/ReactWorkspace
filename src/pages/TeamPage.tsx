import React from 'react'
import { useUsers } from '../services/Queries/userQueries';
import type { User } from '../types/user.type';
import Input from '../components/ui/Input';

function TeamPage() {
  const { data: users, isLoading, error } = useUsers();
  console.log(users, isLoading, error);
   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error: {error.message}</div>;
   const usersArray = Array.isArray(users) ? users : [];
    const [searchTerm, setSearchTerm] = React.useState('');
    const filteredUsers = usersArray.filter((user:User) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.website.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        
        <div>
            <Input type="text" value={searchTerm} name="search" placeholder='' onChange={(e) => setSearchTerm(e.target.value)} />
        {
        filteredUsers.map((user:User) => (
            <>
            <div key={user.id}>Name:{user.name}</div>
            <div>Email:{user.email}</div>
            <div >Company:{user.company.name}</div>
            <div >Website:{user.website}</div>
            </>
            

        ))  }
        </div>
  )
}

export default TeamPage