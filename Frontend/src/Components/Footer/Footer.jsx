import React from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

import "./Footer.css";
import Logo from "../../assets/mainlogo.webp"; // Import Your Logo

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
            {/* WhatsApp */}
            <a
              href="https://wa.me/919937468228"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="Footer-social-whatsapp"
            >
              <FaWhatsapp />
            </a>

            {/* Calling */}
            <a
              href="tel:+919937468228"
              aria-label="Call Us"
              className="Footer-social-call"
            >
              <FaPhoneAlt />
            </a>

            {/* YouTube Channel */}
            <a
              href="https://www.youtube.com/@nanditacreation-h8s"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="Footer-social-youtube"
            >
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

        {/* Useful Links */}
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
            At-Sanabad, P.O.-Pichukuli, Tahasil-Begunia, District-Khordha,
            Odisha - 752064, India.
          </p>

          <p>
            <FaPhoneAlt />
            <a href="tel:+919937468228" className="Footer-contact-link">
              +91 99374 68228
            </a>
          </p>

          <p>
            <FaEnvelope />
            <a href="mailto:ocwa@yahoo.com" className="Footer-contact-link">
              ocwa@yahoo.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="Footer-bottom">
        <p>
          © 2026 Developed by{" "}
          <a
            href="https://prwebstock.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer-developer-link"
          >
            PR WEBSTOCK
          </a>
        </p>

        <button className="Footer-scrollTop" onClick={scrollTop} aria-label="Scroll to top">
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;