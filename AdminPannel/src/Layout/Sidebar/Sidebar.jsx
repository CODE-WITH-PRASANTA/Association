import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import {
  FaImages,
  FaVideo,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import { PiFilmReelFill } from "react-icons/pi";
import "./Sidebar.css";

import Logo from "../../assets/logo-3.png";

const Sidebar = ({ collapsed, mobileSidebar, toggleMobileSidebar }) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <RiDashboardHorizontalFill />,
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
    {
      title: "Archivment Posting ",
      icon: <FaEnvelope />,
      path: "/archive-management",
    },
  ];

  // Animation Variants
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const menuItemVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`Sidebar-overlay ${mobileSidebar ? "show" : ""}`}
            onClick={toggleMobileSidebar}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        className={`Sidebar ${collapsed ? "collapsed" : ""} ${
          mobileSidebar ? "mobile-open" : ""
        }`}
      >
        {/* Background Film Strip Overlay */}
        <div className="Sidebar-filmStrip" />

        {/* Ambient Floating Dust Particles */}
        <div className="Sidebar-particles">
          <span className="p1"></span>
          <span className="p2"></span>
          <span className="p3"></span>
        </div>

        {/* Logo Section */}
        <div className="Sidebar-logoSection">
          <motion.div
            className="Sidebar-logoWrapper"
            animate={{ rotate: 360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <img src={Logo} alt="logo" className="Sidebar-logo" />
          </motion.div>

          {!collapsed && (
            <motion.h2
              className="Sidebar-logoTitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Admin Panel
            </motion.h2>
          )}

          <button
            className="Sidebar-close"
            onClick={toggleMobileSidebar}
            aria-label="Close Sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu Items */}
        <div className="Sidebar-menu">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path + index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={menuItemVariants}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "Sidebar-link active" : "Sidebar-link"
                }
              >
                <motion.div
                  className="Sidebar-linkInner"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <div className="Sidebar-icon">{item.icon}</div>
                  {!collapsed && (
                    <span className="Sidebar-title">{item.title}</span>
                  )}
                </motion.div>
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Footer Accent Decoration */}
        <div className="Sidebar-footerDecoration">
          <PiFilmReelFill className="Sidebar-reelIcon" />
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;