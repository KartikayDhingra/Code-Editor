import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { AiOutlineUser } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  const ctx = useContext(AuthContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onProfileDropdownHandler = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="px-12 py-4 border-b bg-white border-gray-200 flex">
      <div className="text-2xl tracking-widest">LOGO</div>
      <ul className="flex justify-between items-center ml-auto w-1/3 text-blue-800 font-light">
        <li>
          <NavLink
            to="/"
            exact
            activeClassName="text-yellow-500 border-b border-yellow-300"
            className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/codepen"
            activeClassName="text-yellow-500 border-b border-yellow-300"
            className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500"
          >
            Codepair
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/algorithms"
            activeClassName="text-yellow-500 border-b border-yellow-300"
            className="px-1.5 py-1.5 text-gray-800 hover:text-yellow-500"
          >
            Algorithms
          </NavLink>
        </li>
        <li>
          {ctx.userInfo === null ? (
            <NavLink
              to="/signup"
              activeClassName="transform scale-110"
              className="px-4 py-1.5 inline-block rounded-2xl text-sm bg-yellow-400 text-white hover:bg-opacity-80"
            >
              Sign up
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={onProfileDropdownHandler}
                className="px-1.5 py-1.5 font-light text-gray-800 hover:text-yellow-500 flex justify-between active:text-yelow-500 items-center"
              >
                <AiOutlineUser size={24} className="mr-2" />
                {ctx.userInfo.username.split(" ")[0]}
                <RiArrowDropDownLine size={24} />
              </button>
              {dropdownOpen && (
                <div className="w-full rounded-lg flex flex-col border-2 border-gray-300 absolute top-12 shadow-xl">
                  <a
                    href="/"
                    className="px-3 text-sm py-1.5 border-b border-gray-200 text-gray-800 bg-white hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="/"
                    className="px-3 text-sm py-1.5 border-b border-gray-200 text-gray-800 bg-white hover:bg-gray-100"
                  >
                    Saved codes
                  </a>
                  <a
                    href="/"
                    className="px-3 text-sm py-1.5 border-b border-gray-200 text-gray-800 bg-white hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="http://localhost:5000/logout"
                    className="px-3 text-sm py-1.5 border-b border-gray-200 text-gray-800 bg-white hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
