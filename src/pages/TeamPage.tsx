import React from 'react'
import { useUsers } from '../services/Queries/userQueries';
import type { User } from '../types/user.type';
import Input from '../components/ui/Input';
import { useDebounce } from '../hooks/Debouncing.hook';

function TeamPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
  const { data, isLoading, error } = useUsers();
   
    const users = data ?? [];
    const debouncedSearchTerm = useDebounce(searchTerm.toLowerCase());
    const filteredUsers = React.useMemo(() => {
        return users.filter((user:User) => user.name.toLowerCase().includes(debouncedSearchTerm) ||
         user.email.toLowerCase().includes(debouncedSearchTerm) ||
         user.company.name.toLowerCase().includes(debouncedSearchTerm) || 
         user.website.toLowerCase().includes(debouncedSearchTerm));
    }, [users, debouncedSearchTerm]);
    console.log(filteredUsers);
    if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error: {error.message}</div>;
    return (
        
        <div>
            <Input type="text" value={searchTerm} name="search" placeholder='' onChange={(e) => setSearchTerm(e.target.value)} />
        {
       filteredUsers.map(user => (
  <div key={user.id}>
    <div>Name: {user.name}</div>
    <div>Email: {user.email}</div>
    <div>Company: {user.company.name}</div>
    <div>Website: {user.website}</div>
  </div>
))  }
        </div>
  )
}

export default TeamPage