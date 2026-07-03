import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPlay,
  FaTimes,
  
} from "react-icons/fa";

import { FaFigma } from "react-icons/fa6";

import ReactPlayer from "react-player";

import "./HeroSection.css";

// Import Your Images
import HeroImage from "../../assets/main.jpeg"; // <-- Change Path

const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section className="HeroSection">

        <div className="HeroSection-container">

          {/* LEFT SIDE */}

          <div className="HeroSection-left">

            <span className="HeroSection-subtitle">
              WELCOME TO MY WORLD
            </span>

            <h1 className="HeroSection-title">
              Hi, I'm
              <span> Jone Lee</span>
            </h1>

            <h2 className="HeroSection-designation">
              UI/UX Designer.
            </h2>

            <p className="HeroSection-description">
              I use animation as a third dimension by which to simplify
              experiences and guiding through each and every interaction.
              I'm not adding motion just to spruce things up, but doing it
              in ways that create meaningful and delightful user experiences.
            </p>

            {/* Bottom */}

            <div className="HeroSection-bottom">

              {/* Social */}

              <div className="HeroSection-social">

                <h5>FIND WITH ME</h5>

                <div className="HeroSection-socialIcons">

                  <a href="/">
                    <FaFacebookF />
                  </a>

                  <a href="/">
                    <FaInstagram />
                  </a>

                  <a href="/">
                    <FaLinkedinIn />
                  </a>

                </div>

              </div>

              {/* Skills */}

             

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="HeroSection-right">

            <div className="HeroSection-imageWrapper">

              <div className="HeroSection-imageCard">

                <img
                  src={HeroImage}
                  alt="Hero"
                  className="HeroSection-image"
                />

                {/* Play Button */}

                <button
                  className="HeroSection-playButton"
                  onClick={() => setVideoOpen(true)}
                >
                  <FaPlay />
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Floating Demos */}

        
      </section>

      {/* ===========================
            VIDEO MODAL
      ============================ */}

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