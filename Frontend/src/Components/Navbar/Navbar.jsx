import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

import Logo from "../../assets/logo-3.png";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenu(false);

  return (
    <nav className={`Navbar ${sticky ? "Navbar-sticky" : ""}`}>
      <div className="Navbar-container">

        {/* Logo */}
        <a href="#home" className="Navbar-logo" onClick={closeMenu}>
          <img src={Logo} alt="Logo" />
        </a>

        {/* Navigation Menu */}
        <ul className={`Navbar-menu ${mobileMenu ? "Navbar-menu-open" : ""}`}>

          <li>
            <a href="#home" onClick={closeMenu}>
              Home
            </a>
          </li>

          <li>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>

          <li>
            <a href="#achievements-gallery" onClick={closeMenu}>
              Achievements & Gallery
            </a>
          </li>

          <li>
            <a href="#labour-welfare" onClick={closeMenu}>
              Labour Welfare Organisation
            </a>
          </li>

          <li>
            <a href="#team-members" onClick={closeMenu}>
              Team Members
            </a>
          </li>

          <li>
            <a href="#events" onClick={closeMenu}>
              Events
            </a>
          </li>

          <li className="Navbar-mobile-btn">
            <a
              href="#contact"
              className="Navbar-buyBtn"
              onClick={closeMenu}
            >
              Contact Us
            </a>
          </li>

        </ul>

        {/* Desktop Contact Button */}
        <a href="#contact" className="Navbar-buyBtn Navbar-desktop-btn">
          Contact Us
        </a>

        {/* Mobile Toggle */}
        <button
          className="Navbar-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FiX /> : <FiMenu />}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;