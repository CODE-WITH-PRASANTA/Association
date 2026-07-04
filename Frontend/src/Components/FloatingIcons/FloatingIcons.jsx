import React, { useEffect, useState } from "react";
import "./FloatingIcons.css";

import { FaWhatsapp, FaPhoneAlt, FaArrowUp } from "react-icons/fa";

const RADIUS = 33;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const FloatingIcons = () => {
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // ================= MOUNT (for entrance animation) =================
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  // ================= SCROLL PROGRESS + SHOW BUTTON =================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(pct);
      setShowTop(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================= SCROLL TO TOP =================
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <div className={`fx-container ${mounted ? "fx-mounted" : ""}`}>
      {/* ================= WHATSAPP ================= */}
      <a
        href="https://wa.me/919937468228?text=Hi, I'm Dr Purna Chandra Behera "
        target="_blank"
        rel="noopener noreferrer"
        className="fx-icon fx-emerald"
        data-tooltip="Chat on WhatsApp"
        style={{ transitionDelay: "0.05s" }}
      >
        <span className="fx-icon-inner">
          <FaWhatsapp />
        </span>
        <span className="fx-ping" aria-hidden="true">
          <span className="fx-ping-dot" />
        </span>
      </a>

      {/* ================= CALL ================= */}
      <a
        href="tel:+919937468228"
        className="fx-icon fx-sapphire"
        data-tooltip="Call the school"
        style={{ transitionDelay: "0.17s" }}
      >
        <span className="fx-icon-inner">
          <FaPhoneAlt />
        </span>
      </a>

      {/* ================= SCROLL TO TOP ================= */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
        data-tooltip="Back to top"
        className={`fx-icon fx-amber fx-top ${showTop ? "fx-visible" : ""}`}
        style={{ transitionDelay: "0.29s" }}
      >
        <svg className="fx-orbit" viewBox="0 0 76 76">
          <circle className="fx-orbit-track" cx="38" cy="38" r={RADIUS} />
          <circle
            className="fx-orbit-fill"
            cx="38"
            cy="38"
            r={RADIUS}
            style={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: dashOffset,
            }}
          />
        </svg>
        <span className="fx-icon-inner">
          <FaArrowUp />
        </span>
      </button>
    </div>
  );
};

export default FloatingIcons;