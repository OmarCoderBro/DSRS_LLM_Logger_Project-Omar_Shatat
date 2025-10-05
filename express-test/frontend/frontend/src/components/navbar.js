import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css"; // Import the CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">EchoLog</div>
      <div className="navbar-links">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/test"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          Test LLMs
        </NavLink>
        <NavLink
          to="/logs"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          Logs
        </NavLink>
        <NavLink
          to="/visualizations"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          Visualize
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;