import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { PiFilmReelFill } from "react-icons/pi";
import "./Topbar.css";

import AdminImage from "../../assets/main.jpeg";

const Topbar = ({ collapsed, toggleSidebar, toggleMobileSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleToggle = () => {
    if (window.innerWidth <= 992) {
      toggleMobileSidebar();
    } else {
      toggleSidebar();
    }
  };

  return (
    <motion.header
      className="Topbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Left Section: Hamburger & Search Box */}
      <div className="Topbar-left">
        <motion.button
          className="Topbar-toggle"
          onClick={handleToggle}
          whileHover={{ rotate: 180, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle Navigation"
        >
          <FaBars />
        </motion.button>

        <div className="Topbar-searchBox">
          <motion.div
            className="Topbar-searchIcon"
            whileHover={{ rotate: 20, scale: 1.2 }}
          >
            <FaSearch />
          </motion.div>
          <input
            type="text"
            placeholder="Search movies, projects, directors..."
            className="Topbar-searchInput"
          />
        </div>
      </div>

      {/* Right Section: Reel Icon, Notifications, Director Profile */}
      <div className="Topbar-right">
        {/* Animated Movie Reel Accent */}
        <div className="Topbar-reelWrapper" title="Production Studio Mode">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <PiFilmReelFill className="Topbar-reelIcon" />
          </motion.div>
        </div>

        {/* Notifications */}
        <motion.button
          className="Topbar-notification"
          whileHover={{ rotate: 20, scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Notifications"
        >
          <IoNotifications />
          <motion.span
            className="Topbar-badge"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            5
          </motion.span>
        </motion.button>

        {/* Profile Card / Dropdown */}
        <div className="Topbar-profile" ref={profileRef}>
          <motion.div
            className="Topbar-profileInfo"
            onClick={() => setProfileOpen(!profileOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="Topbar-avatarWrapper">
              <img
                src={AdminImage}
                alt="Director Profile"
                className="Topbar-profileImage"
              />
            </div>

            <div className="Topbar-profileText">
              <h4>Administrator</h4>
              <span>Super Admin</span>
            </div>
          </motion.div>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                className="Topbar-dropdown"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <button className="Topbar-dropdownItem">
                  <FaUserCircle className="dropdown-icon" />
                  Profile
                </button>

                <button className="Topbar-dropdownItem">
                  <FaCog className="dropdown-icon" />
                  Settings
                </button>

                <button className="Topbar-dropdownItem logout">
                  <FaSignOutAlt className="dropdown-icon" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;