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
  const [clickedUserId, setClickedUserId] = React.useState<string | null>(null);  
  const [clickedUser, setClickedUser] = React.useState(false);
  const { data, isLoading, error } = useUsers();
  const users = data ?? [];

  const handleSearchChange = React.useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const debouncedSearchTerm = useDebounce(searchTerm.toLowerCase());

  const filteredUsers = React.useMemo(() => {
    if (!debouncedSearchTerm) return users;
    console.log("Filtering users with search term:", debouncedSearchTerm);
    return users.filter(
      (user: User) =>
        user.name.toLowerCase().includes(debouncedSearchTerm) ||
        user.email.toLowerCase().includes(debouncedSearchTerm) ||
        user.company?.name?.toLowerCase().includes(debouncedSearchTerm) ||
        user.website?.toLowerCase().includes(debouncedSearchTerm)
    );
  }, [users, debouncedSearchTerm]);

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: filteredUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, 
    overscan: 3,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => setClick((prev) => !prev)}>Click Me</button>
      <span> clicked: {click.toString()}</span>
      <div>ClickedUSerID: {clickedUserId}</div>
      
      <UserSearch
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchChange}
      />
      <div className={"bg-gray-800 w-[30%] h-screen fixed top-0 right-0 z-40 transition-transform duration-75 ease-in-out" + (clickedUser ? " translate-x-0" : " translate-x-full")}>
  <div className="absolute top-4 right-4 text-white text-2xl font-bold cursor-pointer" onClick={() => setClickedUser(false)}>X</div>
  <div className="text-white text-2xl font-bold m-4">User Details</div>
  {clickedUserId}
</div>
      <div
      ref={parentRef}
      className="h-96 overflow-auto border border-gray-300 mt-4" 
        
      >
        <div 
          ref={virtualizer.containerRef} 
          style={{
    height: `${virtualizer.getTotalSize()}px`,
    position: "relative",
  }}
        
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
                <UserCard setClickedUser={setClickedUser} setClickedUserId={setClickedUserId} user={user} />
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;