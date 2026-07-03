import React, { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaUserCircle
} from "react-icons/fa";
import "./Topbar.css";

import AdminImage from "../../assets/main.jpeg";

const Topbar = ({
  collapsed,
  toggleSidebar,
  toggleMobileSidebar,
}) => {

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {

    const closeDropdown = (e) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }

    };

    document.addEventListener("click", closeDropdown);

    return () =>
      document.removeEventListener("click", closeDropdown);

  }, []);

  const handleToggle = () => {

    if (window.innerWidth <= 992) {
      toggleMobileSidebar();
    } else {
      toggleSidebar();
    }

  };

  return (

    <header className="Topbar">

      <div className="Topbar-left">

        <button
          className="Topbar-toggle"
          onClick={handleToggle}
        >
          <FaBars />
        </button>

      </div>

      <div className="Topbar-right">

        <button className="Topbar-notification">

          <FaBell />

          <span className="Topbar-badge">
            3
          </span>

        </button>

        <div
          className="Topbar-profile"
          ref={profileRef}
        >

          <div
            className="Topbar-profileInfo"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
          >

            <img
              src={AdminImage}
              alt="Admin"
              className="Topbar-profileImage"
            />

            <div className="Topbar-profileText">

              <h4>Administrator</h4>

              <span>Super Admin</span>

            </div>

          </div>

          <div
            className={`Topbar-dropdown ${
              profileOpen ? "show" : ""
            }`}
          >

            <button className="Topbar-dropdownItem">

              <FaUserCircle />

              Profile

            </button>

            <button className="Topbar-dropdownItem">

              <FaCog />

              Settings

            </button>

            <button className="Topbar-dropdownItem logout">

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        </div>

      </div>

    </header>

  );
};

export default Topbar;