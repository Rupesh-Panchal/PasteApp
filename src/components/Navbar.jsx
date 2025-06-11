import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  if (
    location.pathname.startsWith("/pastes/") &&
    location.pathname.split("/").length === 3
  ) {
    return null; // Hide navbar on ViewPaste page
  }

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-center z-50 py-4 h-28  ">
      <div className="w-full max-w-screen-sm bg-blue-200 text-blue-900 shadow-md rounded-xl px-2 flex justify-center">
        <div className="flex flex-wrap sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <>
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
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
