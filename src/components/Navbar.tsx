import React from "react";
import { Link } from "@tanstack/react-router";
export default function Navbar() {
   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <nav className=" py-2 bg-gray-800  text-white font-extrabold ">
      <div className="hidden md:flex gap-4 w-full justify-center">
        <Link activeProps={{ className: "active" }} to="/">
          Home
        </Link>
        <Link activeProps={{ className: "active" }} to="/tasks">
          Tasks
        </Link>
        <Link activeProps={{ className: "active" }} to="/team">
          Team
        </Link>
        <Link activeProps={{ className: "active" }} to="/register">
          Register
        </Link>
        <Link activeProps={{ className: "active" }} to="/login">
          Login
        </Link>
      </div>
      <div className="md:hidden flex gap-4 w-full  justify-end px-4">
      <button className="bg-gray-700 px-2 py-1 rounded" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        Menu
      </button>
      </div>
        <div className={"md:hidden flex flex-col gap-2  z-50 fixed inset-0 bg-gray-800 transition-transform duration-300 ease-in-out " + (isMenuOpen ? "translate-x-0" : "translate-x-full")}>

          <div className="flex justify-end p-2 font-bold text-2xl m-2" onClick={()=>setIsMenuOpen(!isMenuOpen)}> X</div>

          <Link activeProps={{ className: "active" }} to="/"> 
            Home
          </Link>
          <Link activeProps={{ className: "active" }} to="/tasks">
            Tasks
          </Link>
          <Link activeProps={{ className: "active" }} to="/team">
            Team
          </Link>
          <Link activeProps={{ className: "active" }} to="/register">
            Register
          </Link>
          <Link activeProps={{ className: "active" }} to="/login">
            Login
          </Link>
        </div>
      
    </nav>
  );
}
