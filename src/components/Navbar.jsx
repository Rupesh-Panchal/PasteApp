import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-300 text-blue-900 shadow-md py-4">
      <div className="flex flex-wrap sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-900 text-white shadow-md"
                : "hover:bg-blue-200"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-5 py-2 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
              isActive
                ? "bg-blue-900 text-white shadow-md"
                : "hover:bg-blue-200"
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
