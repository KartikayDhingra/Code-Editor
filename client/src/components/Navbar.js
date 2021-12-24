import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
  return (
    <nav className="px-12 py-4 border-b bg-white border-gray-200 flex">
      <div className="text-2xl tracking-widest">LOGO</div>
      <ul className="flex justify-between items-center ml-auto w-1/3 text-blue-800 font-light">
        <li>
          <NavLink to="/" exact activeClassName="text-yellow-500" className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500">Home</NavLink>
        </li>
        <li>
          <NavLink to="/codepen" activeClassName="text-yellow-500" className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500">Codepair</NavLink>
        </li>
        <li>
          <NavLink to="/algorithms" activeClassName="text-yellow-500" className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500">Algorithms</NavLink>
        </li>
        <li>
          <NavLink to="/signup" activeClassName="text-yellow-500" className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500">Sign up / Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
