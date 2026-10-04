import React from "react";
import { useUsers } from "../services/Queries/userQueries";
import type { User } from "../types/user.type";
import { useDebounce } from "../hooks/Debouncing.hook";
import UserCard from "../components/UserCard";
import UserSearch from "../components/UserSearch";
import { useVirtualizer } from "@tanstack/react-virtual";
import { CircleUser, Globe, Mail, MapPinned, Phone, X } from "lucide-react";

function TeamPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [click, setClick] = React.useState(false);
  const [clickedUserdata, setClickedUserdata] = React.useState<{
    email: string;
    id: number;
    firstname: string;
    lastname: string;
    image: string;
    phone: string;
    address:string;
    country:string;
  } | null>(null);
  console.log(clickedUserdata, "Data for clicked user");
  const [clickedUser, setClickedUser] = React.useState(false);
  const { data, isLoading, error } = useUsers();
  const users = data?.users ?? [];
  const handleSearchChange = React.useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const debouncedSearchTerm = useDebounce(searchTerm.toLowerCase());

  const filteredUsers = React.useMemo(() => {
    if (!debouncedSearchTerm) return users;
    console.log("Filtering users with search term:", debouncedSearchTerm);
    return users.filter(
      (user: User) =>
        user.firstname.toLowerCase().includes(debouncedSearchTerm) ||
        user.lastname.toLowerCase().includes(debouncedSearchTerm) ||
        user.email.toLowerCase().includes(debouncedSearchTerm) ||
        user.phone.toLowerCase().includes(debouncedSearchTerm),
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
      {/* <div>ClickedUSerID: {clickedUserId}</div> */}

      <UserSearch
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchChange}
      />
      <div
        className={
          "bg-gray-800 rounded  w-[50%] md:w-[30%] h-screen fixed top-0 right-0 z-40 transition-transform duration-75 ease-in-out" +
          (clickedUser ? " translate-x-0" : " translate-x-full")
        }
      >
        <div
          className=" absolute top-4 right-4 text-white md:text-lg font-bold cursor-pointer border rounded"
          onClick={() => setClickedUser(false)}
        >
          <X />
        </div>
        <div className="flex gap-2 text-white text-md lg:text-2xl font-bold m-4">
          User Details
        </div>
        <hr className="mx-4"></hr>
        <div className=" flex  flex-col gap-6  p-2 m-4 bg-gray-900  h-[90%] border rounded flex-1 text-white font-bold text-md md:text-lg lg:text-xl transition-transform duration-75 ease-in-out">
           <img
            className=" border-2 rounded-full w-20 h-20 md:w-40 md:h-40 lg:w-60 lg:h-60 mx-auto"
            src={clickedUserdata?.image}
            alt="User Image"
          />
          <span className="text-md md:text-lg lg:text-xl font-bold mx-auto">
            {clickedUserdata?.firstname} {clickedUserdata?.lastname}
          </span>
          <span className="flex items-center gap-2  break-all border rounded p-2 text-md md:text-lg lg:text-xl font-bold ">
            <Mail className="shrink-0" />
            <span>:{clickedUserdata?.email}</span>
          </span>
          <span className="flex items-center gap-2  break-all border rounded p-2 text-md md:text-lg lg:text-xl font-bold ">
            <Phone className="shrink-0" />
            <span>:{clickedUserdata?.phone}</span>
          </span>
          <span className="flex items-center gap-2  break-all border rounded p-2 text-md md:text-lg lg:text-xl font-bold ">
            <MapPinned className="shrink-0"/>
            <span>:{clickedUserdata?.address}</span>
          </span> 
          <span className="flex items-center gap-2  break-all border rounded p-2 text-md md:text-lg lg:text-xl font-bold ">
            <Globe className="shrink-0"  />
            <span>:{clickedUserdata?.country}</span>
          </span>  

          {/* <span>  
        ID:{clickedUserdata?.id}
      </span> */}
        </div>
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
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  // Translate row positioning based on dynamic virtualization calculations
                  transform: `translateY(${item.start}px)`,
                }}
              >
                <UserCard
                  setClickedUser={setClickedUser}
                  setClickedUserdata={setClickedUserdata}
                  user={user}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
