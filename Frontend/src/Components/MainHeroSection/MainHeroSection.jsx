import React, { useEffect, useState } from "react";
import "./MainHeroSection.css";

import slide1 from "../../assets/Acossiation1.webp";
import slide2 from "../../assets/Acossiation2.webp";
import slide3 from "../../assets/Acossiation3.webp";
import slide4 from "../../assets/Acossiation4.webp";
import slide5 from "../../assets/Acossiation5.webp";
import slide6 from "../../assets/Acossiation6.webp";
import slide7 from "../../assets/Acossiation7.webp";
import slide8 from "../../assets/Acossiation8.webp";
import slide9 from "../../assets/Acossiation9.webp";
import slide10 from "../../assets/Acossiation10.webp";
import slide11 from "../../assets/Acossiation11.webp";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    image: slide1,
    title: "Odisha Cine Workers Association",
    subtitle: "Uniting talents, celebrating cinema, and empowering artists.",
  },
  {
    id: 2,
    image: slide2,
    title: "Community Gatherings & Dignitaries",
    subtitle: "Honoring prominent figures and contributors across regional arts.",
  },
  {
    id: 3,
    image: slide3,
    title: "Vibrant Cultural Performances",
    subtitle: "Showcasing traditional dance, music, and artistic heritage.",
  },
  {
    id: 4,
    image: slide4,
    title: "Awards & Recognition Ceremony",
    subtitle: "Appreciating excellence, dedication, and milestone achievements.",
  },
  {
    id: 5,
    image: slide5,
    title: "Collaborative Events & Conferences",
    subtitle: "Building strong partnerships for the growth of cinema.",
  },
  {
    id: 6,
    image: slide6,
    title: "Annual Cine Awards Gala",
    subtitle: "A grand celebration of cinematic excellence and stardom.",
  },
  {
    id: 7,
    image: slide7,
    title: "Traditional Lamp Lighting",
    subtitle: "Inaugurating sacred ceremonies with auspicious beginnings.",
  },
  {
    id: 8,
    image: slide8,
    title: "Felicitation & Trophies",
    subtitle: "Presenting accolades to exceptional industry workers.",
  },
  {
    id: 9,
    image: slide9,
    title: "Patriotic & Social Celebrations",
    subtitle: "Fostering unity, national pride, and community spirit.",
  },
  {
    id: 10,
    image: slide10,
    title: "Leadership & Panel Discussions",
    subtitle: "Guiding the future and vision of regional entertainment.",
  },
  {
    id: 11,
    image: slide11,
    title: "Leadership & Panel Discussions",
    subtitle: "Guiding the future and vision of regional entertainment.",
  },
];

const MainHeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="mainHero">
      <div className="heroSlider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`heroSlide ${index === current ? "active" : ""}`}
          >
            <img src={slide.image} alt={slide.title || "Event slide"} />
            <div className="heroContentOverlay">
              <div className="heroTextContainer">
                {slide.title && <h2 className="heroTitle">{slide.title}</h2>}
                {slide.subtitle && <p className="heroSubtitle">{slide.subtitle}</p>}
              </div>
            </div>
          </div>
        ))}

        <button
          className="heroArrow left"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <FiChevronLeft />
        </button>

        <button
          className="heroArrow right"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <FiChevronRight />
        </button>

        <div className="heroDots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={current === index ? "active" : ""}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainHeroSection;