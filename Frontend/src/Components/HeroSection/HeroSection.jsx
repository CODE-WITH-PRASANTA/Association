import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPlay,
  FaTimes,
} from "react-icons/fa";
import "./HeroSection.css";

// Import Your Images
import HeroImage from "../../assets/main.jpeg"; // <-- Change Path if needed

const DESIGNATIONS = [
  "Ministry of Labour, Govt. of India",
  "AICWA, Odisha",
  "MESC, Govt. of India",
];

const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleTilt = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - card.left) / card.width - 0.5;
    const py = (e.clientY - card.top) / card.height - 0.5;
    setTilt({ x: py * -10, y: px * 12 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <>
      <section className="HeroSection">
        {/* Ambient floating particles */}
        <div className="HeroSection-particles" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className={`HeroSection-particle HeroSection-particle-${i}`} />
          ))}
        </div>

        <div className="HeroSection-container">

          {/* LEFT SIDE - CONTENT */}
          <div className="HeroSection-left">
            <span className="HeroSection-subtitle">
              <span className="HeroSection-subtitleDash" />
              Welcome to my world
            </span>

            <h1 className="HeroSection-title">
              Hi, I'm{" "}
              <span className="HeroSection-nameWrap">
                Dr Purna Chandra Behera
                <svg
                  className="HeroSection-underline"
                  viewBox="0 0 320 14"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M4 9 C 80 2, 240 2, 316 9" />
                </svg>
              </span>
            </h1>

            {/* Designations — one by one, small, refined */}
            <ul className="HeroSection-designationList">
              {DESIGNATIONS.map((d, i) => (
                <li
                  key={d}
                  className="HeroSection-designationItem"
                  style={{ animationDelay: `${0.35 + i * 0.12}s` }}
                >
                  <span className="HeroSection-designationMark" />
                  {d}
                </li>
              ))}
            </ul>

            <p className="HeroSection-description">
              <span className="HeroSection-leadText">
                Dr Purna Chandra Behera is an Indian producer, music
                director, singer, writer, actor, and social worker from
                Khordha, Odisha.
              </span>{" "}
              He serves as Secretary of the Odisha Cine Workers Association
              and General Secretary of the All Indian Cine Workers
              Association (AICWA), Mumbai, Maharashtra. He is active across
              film, television, music albums, and YouTube content
              production, and works as a professional in Folk Culture, Folk
              Dance, and Folk Song with the Odisha Culture Department.
              Rising from a childhood marked by severe poverty, he has
              become a widely recognized figure in Odia folk music and
              regional cultural organization.
            </p>

            {/* Bottom Section */}
            <div className="HeroSection-bottom">
              <div className="HeroSection-social">
                <h5>Find with me</h5>
                <div className="HeroSection-socialIcons">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <FaFacebookF />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - MEDIA */}
          <div className="HeroSection-right">
            <div className="HeroSection-imageWrapper">
              <span className="HeroSection-ring" aria-hidden="true" />
              <div
                className="HeroSection-imageCard"
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <img
                  src={HeroImage}
                  alt="Dr Purna Chandra Behera"
                  className="HeroSection-image"
                />

                <button
                  className="HeroSection-playButton"
                  onClick={() => setVideoOpen(true)}
                  aria-label="Play Introduction Video"
                >
                  <FaPlay />
                </button>

                <span className="HeroSection-imageCaption">
                  Folk Music &nbsp;•&nbsp; Odisha
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll cue */}
        <div className="HeroSection-scrollCue" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* VIDEO MODAL */}
      {videoOpen && (
        <div
          className="HeroSection-videoModal"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="HeroSection-videoBox"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="HeroSection-closeButton"
              onClick={() => setVideoOpen(false)}
              aria-label="Close Video"
            >
              <FaTimes />
            </button>

            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/umAS--d0zpI?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;