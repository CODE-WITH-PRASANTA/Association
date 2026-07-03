import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

import "./Footer.css";
import Logo from "../../assets/logo-3.png"; // Import Your Logo

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="Footer">

      <div className="Footer-container">

        {/* Left */}

        <div className="Footer-about">

          <img src={Logo} alt="logo" className="Footer-logo" />

          <p>
            Building excellence through innovation, dedication and quality
            education. We are committed to creating opportunities that inspire
            students, families and communities to grow together.
          </p>

          <div className="Footer-socials">

            <a href="/">
              <FaFacebookF />
            </a>

            <a href="/">
              <FaInstagram />
            </a>

            <a href="/">
              <FaLinkedinIn />
            </a>

            <a href="/">
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="Footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/association">Association</Link>
          <Link to="/achievement">Achievement</Link>
          <Link to="/gallery">Gallery</Link>

        </div>

        {/* Useful */}

        <div className="Footer-links">

          <h3>Useful Links</h3>

          <Link to="/awards">Awards</Link>
          <Link to="/events">Events</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/buy-now">Buy Now</Link>
          <Link to="/">Privacy Policy</Link>

        </div>

        {/* Contact */}

        <div className="Footer-contact">

          <h3>Contact Us</h3>

          <p>
            <FaMapMarkerAlt />
            Bhubaneswar, Odisha, India
          </p>

          <p>
            <FaPhoneAlt />
            +91 98765 43210
          </p>

          <p>
            <FaEnvelope />
            support@yourwebsite.com
          </p>

        </div>

      </div>

      {/* Bottom */}

      <div className="Footer-bottom">

        <p>
         © 2026 Developed by PR WEBSTOCK
        </p>

        <button
          className="Footer-scrollTop"
          onClick={scrollTop}
        >
          <FaArrowUp />
        </button>

      </div>

    </footer>
  );
};

export default Footer;