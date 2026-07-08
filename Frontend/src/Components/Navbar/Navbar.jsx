import React, { useState } from 'react';
import './Navbar.css';

import LeftLogo from "../../assets/logo-1.png";
import RightLogo from "../../assets/ManLogo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
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

      </div>
    </nav>
  );
};

export default Navbar;