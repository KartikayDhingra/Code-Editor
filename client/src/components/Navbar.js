import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const ctx = useContext(AuthContext);

  return (
    <nav className="px-12 py-4 border-b bg-white border-gray-200 flex">
      <div className="text-2xl tracking-widest">LOGO</div>
      <ul className="flex justify-between items-center ml-auto w-1/3 text-blue-800 font-light">
        <li>
          <NavLink
            to="/"
            exact
            activeClassName="text-yellow-500"
            className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/codepen"
            activeClassName="text-yellow-500"
            className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500"
          >
            Codepair
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/algorithms"
            activeClassName="text-yellow-500"
            className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500"
          >
            Algorithms
          </NavLink>
        </li>
        <li>
          {ctx.userInfo === null ? (
            <NavLink
              to="/signup"
              // activeClassName="text-yellow-500"
              className="px-4 py-1.5 rounded-2xl text-sm bg-yellow-400 text-white hover:bg-opacity-80"
            >
              Sign up
            </NavLink>
          ) : (
            <a
              href="/"
              // activeClassName="text-yellow-500"
              className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500 flex justify-between items-center"
            >
              <AiOutlineUser size={24} className="mr-2" />
              {ctx.userInfo.username.split(" ")[0]}
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
