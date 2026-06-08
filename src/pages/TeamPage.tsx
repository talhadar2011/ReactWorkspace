import React from 'react'
import { useUsers } from '../services/Queries/userQueries';

function TeamPage() {
  const { data: users, isLoading, error } = useUsers();
  console.log(users, isLoading, error);
    return (
    <div>TeamPage</div>
  )
}

export default TeamPage