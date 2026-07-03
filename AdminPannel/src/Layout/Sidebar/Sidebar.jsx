import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaImages,
  FaVideo,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaTimes
} from "react-icons/fa";
import "./Sidebar.css";

import Logo from "../../assets/logo-3.png";

const Sidebar = ({
  collapsed,
  mobileSidebar,
  toggleMobileSidebar,
}) => {
  const menuItems = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/dashboard",
  },
  {
    title: "Gallery Management",
    icon: <FaImages />,
    path: "/gallery-management",
  },
  {
    title: "Video Management",
    icon: <FaVideo />,
    path: "/video-management",
  },
  {
    title: "Event Management",
    icon: <FaCalendarAlt />,
    path: "/event-management",
  },
  {
    title: "Team Management",
    icon: <FaUsers />,
    path: "/team-management",
  },
  {
    title: "Contact Management",
    icon: <FaEnvelope />,
    path: "/contact-management",
  },
];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`Sidebar-overlay ${
          mobileSidebar ? "show" : ""
        }`}
        onClick={toggleMobileSidebar}
      />

      <aside
        className={`Sidebar
        ${collapsed ? "collapsed" : ""}
        ${mobileSidebar ? "mobile-open" : ""}
        `}
      >
        {/* Logo */}
        <div className="Sidebar-logoSection">

          <img
            src={Logo}
            alt="logo"
            className="Sidebar-logo"
          />

          {!collapsed && (
            <h2 className="Sidebar-logoTitle">
              Admin Panel
            </h2>
          )}

          <button
            className="Sidebar-close"
            onClick={toggleMobileSidebar}
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}

        <div className="Sidebar-menu">

          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "Sidebar-link active"
                  : "Sidebar-link"
              }
            >
              <div className="Sidebar-icon">
                {item.icon}
              </div>

              {!collapsed && (
                <span className="Sidebar-title">
                  {item.title}
                </span>
              )}
            </NavLink>
          ))}

        </div>
      </aside>
    </>
  );
};

export default Sidebar;