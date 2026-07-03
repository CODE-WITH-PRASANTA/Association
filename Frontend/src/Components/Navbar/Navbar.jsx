import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

import Logo from "../../assets/logo-3.png"; // Change path

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

  return (
    <>
      <nav className={`Navbar ${sticky ? "Navbar-sticky" : ""}`}>

        <div className="Navbar-container">

          {/* Logo */}

          <NavLink to="/" className="Navbar-logo">

            <img src={Logo} alt="logo" />

          </NavLink>

          {/* Desktop Menu */}

          <ul className={`Navbar-menu ${mobileMenu ? "Navbar-menu-open" : ""}`}>

            <li>
              <NavLink to="/" onClick={()=>setMobileMenu(false)}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" onClick={()=>setMobileMenu(false)}>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/association" onClick={()=>setMobileMenu(false)}>
                Association
              </NavLink>
            </li>

            <li>
              <NavLink to="/achievement" onClick={()=>setMobileMenu(false)}>
                Achievement
              </NavLink>
            </li>

            <li>
              <NavLink to="/gallery" onClick={()=>setMobileMenu(false)}>
                Gallery
              </NavLink>
            </li>

            <li>
              <NavLink to="/awards" onClick={()=>setMobileMenu(false)}>
                Awards
              </NavLink>
            </li>

            <li>
              <NavLink to="/events" onClick={()=>setMobileMenu(false)}>
                Events
              </NavLink>
            </li>

            

            <li className="Navbar-mobile-btn">

              <NavLink
                to="/contact"
                className="Navbar-buyBtn"
                onClick={()=>setMobileMenu(false)}
              >
               Contact us
              </NavLink>

            </li>

          </ul>

          {/* Desktop Button */}

          <NavLink to="/contact" className="Navbar-buyBtn Navbar-desktop-btn">
           Contact Us
          </NavLink>

          {/* Mobile */}

          <button
            className="Navbar-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>

        </div>

      </nav>
    </>
  );
};

export default Navbar;