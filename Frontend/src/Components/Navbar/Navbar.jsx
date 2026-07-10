<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

import Logo from "../../assets/logo-3.png";
=======
import React, { useState } from 'react';
import './Navbar.css';

import LeftLogo from "../../assets/logo-1.png";
import RightLogo from "../../assets/ManLogo.png"; 
>>>>>>> 9e067f78f74b4fd3820753695afd5d0c74b1ea76

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
=======
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
>>>>>>> 9e067f78f74b4fd3820753695afd5d0c74b1ea76

  const closeMenu = () => setMobileMenu(false);

  return (
<<<<<<< HEAD
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
=======
    <nav className="custom-navbar">
      <div className="navbar-container">
        
        {/* Left Side: Association Logo */}
        <div className="navbar-logo-left">
          <img src={LeftLogo} alt="Odisha Cine Workers Association Logo" />
        </div>

        {/* Hamburger / Close Icon for Mobile */}
        <div className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links Menu Drawer */}
        <ul className={`navbar-links ${isOpen ? 'mobile-open' : ''}`}>
          <li><a href="#home" className="nav-item active-link" onClick={() => setIsOpen(false)}>HOME</a></li>
          <li><a href="#about" className="nav-item" onClick={() => setIsOpen(false)}>ABOUT</a></li>
          <li><a href="#association" className="nav-item" onClick={() => setIsOpen(false)}>ASSOCIATION</a></li>
          <li><a href="#achievement" className="nav-item" onClick={() => setIsOpen(false)}>ACHIEVEMENT</a></li>
          <li><a href="#membership" className="nav-item" onClick={() => setIsOpen(false)}>MEMBERSHIP</a></li>
          <li><a href="#gallery" className="nav-item" onClick={() => setIsOpen(false)}>GALLERY</a></li>
          <li><a href="#awards" className="nav-item" onClick={() => setIsOpen(false)}>AWARDS</a></li>
          <li><a href="#events" className="nav-item" onClick={() => setIsOpen(false)}>EVENTS</a></li>
          
          {/* Contact Button locked inside dropdown for mobile layout */}
          <li className="mobile-contact-li">
            <a href="#contact" className="navbar-contact-btn mobile-contact-btn" onClick={() => setIsOpen(false)}>Contact Us</a>
          </li>
        </ul>

        {/* Right Side Control: Desktop Contact Button & Man Logo */}
        <div className="navbar-right-group">
          <a href="#contact" className="navbar-contact-btn desktop-contact-btn">Contact Us</a>
          <div className="navbar-logo-right">
            <img src={RightLogo} alt="Profile Logo" />
          </div>
        </div>
>>>>>>> 9e067f78f74b4fd3820753695afd5d0c74b1ea76

      </div>
    </nav>
  );
};

export default Navbar;