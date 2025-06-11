import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Check if current path matches /pastes/:id
  const isViewingPaste =
    location.pathname.startsWith("/pastes/") &&
    location.pathname.split("/").length === 3;

  return (
    <nav className="fixed top-0 h-24 left-0 right-0 flex justify-center z-50 bg-blue-200 text-blue-900 shadow-md py-4">
      <div className="flex flex-wrap sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-lg mx-auto px-4">
        {isViewingPaste ? (
          <span className="text-xl font-bold text-blue-900">
            Viewing the Paste
          </span>
        ) : (
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
