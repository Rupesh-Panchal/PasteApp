import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-6 justify-center items-center py-4 shadow-md">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
            isActive
              ? "bg-blue-900 text-white shadow"
              : "text-blue-900 hover:bg-blue-100"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
            isActive
              ? "bg-blue-900 text-white shadow"
              : "text-blue-900 hover:bg-blue-100"
          }`
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
