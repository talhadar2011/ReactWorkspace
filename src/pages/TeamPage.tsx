import React from 'react'
import { useUsers } from '../services/Queries/userQueries';
import type { User } from '../types/user.type';
import Input from '../components/ui/Input';
import { useDebounce } from '../hooks/Debouncing.hook';
import UserCard from '../components/UserCard';
import UserSearch from '../components/UserSearch';

function TeamPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const { data, isLoading, error } = useUsers();
   const [click, setClick] = React.useState(false);
    const users = data ?? [];
    const handleSearchChange = React.useCallback((value: string) => {
  setSearchTerm(value);
}, []);
    const debouncedSearchTerm = useDebounce(searchTerm.toLowerCase());
    const filteredUsers = React.useMemo(() => {
        return users.filter((user:User) => user.name.toLowerCase().includes(debouncedSearchTerm) ||
         user.email.toLowerCase().includes(debouncedSearchTerm) ||
         user.company.name.toLowerCase().includes(debouncedSearchTerm) || 
         user.website.toLowerCase().includes(debouncedSearchTerm));
    }, [users, debouncedSearchTerm]);
    // console.log(filteredUsers);
    if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error: {error.message}</div>;
    return (
        
        <div>
            <button onClick={() => setClick(prev => !prev)}>Click Me</button>
            clicked: {click.toString()}
            <UserSearch  searchTerm={searchTerm} onSearchTermChange={handleSearchChange} />
        {
       filteredUsers.map(user => (
        <UserCard key={user.id} user={user} />
))  }
        </div>
  )
}

export default TeamPage