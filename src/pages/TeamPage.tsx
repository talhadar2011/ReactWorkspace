import React from "react";
import { useUsers } from "../services/Queries/userQueries";
import type { User } from "../types/user.type";
import { useDebounce } from "../hooks/Debouncing.hook";
import UserCard from "../components/UserCard";
import UserSearch from "../components/UserSearch";
import { useVirtualizer } from "@tanstack/react-virtual";

function TeamPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [click, setClick] = React.useState(false);
  
  const { data, isLoading, error } = useUsers();
  const users = data ?? [];

  const handleSearchChange = React.useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const debouncedSearchTerm = useDebounce(searchTerm.toLowerCase());

  // 1. Calculate filtered users first
  const filteredUsers = React.useMemo(() => {
    if (!debouncedSearchTerm) return users;
    
    return users.filter(
      (user: User) =>
        user.name.toLowerCase().includes(debouncedSearchTerm) ||
        user.email.toLowerCase().includes(debouncedSearchTerm) ||
        user.company?.name?.toLowerCase().includes(debouncedSearchTerm) ||
        user.website?.toLowerCase().includes(debouncedSearchTerm)
    );
  }, [users, debouncedSearchTerm]);

  const parentRef = React.useRef<HTMLDivElement>(null);

  // 2. Initialize Virtualizer based on filtered lists data length
  const virtualizer = useVirtualizer({
    count: filteredUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Balanced baseline height guess for a user card profile
    overscan: 3,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => setClick((prev) => !prev)}>Click Me</button>
      <span> clicked: {click.toString()}</span>
      
      <UserSearch
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchChange}
      />

      {/* Outer Scroll Container */}
      <div
      className="h-96 overflow-auto border border-gray-300 mt-4" 
        ref={parentRef} 
        
      >
        {/* Inner Tracking Wrapper - Keeps track of full canvas scroll height */}
        <div 
          ref={virtualizer.containerRef} 
          className="relative h-full w-full"
        
        >
          {virtualizer.getVirtualItems().map((item) => {
            // Extract genuine user node using row positional pointer index mapping
            const user = filteredUsers[item.index];
            
            if (!user) return null;

            return (
              <div
                key={item.key}
                ref={virtualizer.measureElement}
                data-index={item.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  // Translate row positioning based on dynamic virtualization calculations
                  transform: `translateY(${item.start}px)`,
                }}
              >
                {/* Correctly passing the user entity object data to the card item */}
                <UserCard user={user} />
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;