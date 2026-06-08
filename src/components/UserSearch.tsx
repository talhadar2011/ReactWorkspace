import React from 'react'
import Input from './ui/Input'

const UserSearch=React.memo(({ searchTerm, onSearchTermChange }: { searchTerm: string; onSearchTermChange: (value: string) => void }) => {
 console.log('Rendering UserSearch');
    return (
    <div>
                    <Input type="text" value={searchTerm} name="search" placeholder='' onChange={(e) => onSearchTermChange(e.target.value)} />

    </div>
  )
})

export default UserSearch