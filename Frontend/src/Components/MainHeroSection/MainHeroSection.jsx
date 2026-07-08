import React, { useEffect, useState } from "react";
import "./MainHeroSection.css";

import slide1 from "../../assets/workers-02.jpg";
import slide2 from "../../assets/workers-01.jpg";
import slide3 from "../../assets/workers-03.jpg";
import slide4 from "../../assets/workers-04.jpg";
import slide5 from "../../assets/workers-05.jpg";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    image: slide1,
    title: "",
  },
  {
    id: 2,
    image: slide2,
    title: "",
  },
  {
    id: 3,
    image: slide3,
    title: "",
  },
  {
    id: 4,
    image: slide4,
    title: "",
  },
  {
    id: 5,
    image: slide5,
    title: "",
  },
];

const MainHeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

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
            className={`heroSlide ${
              index === current ? "active" : ""
            }`}
          >
            <img src={slide.image} alt="" />
          </div>
        ))}

        <button
          className="heroArrow left"
          onClick={prevSlide}
        >
          <FiChevronLeft />
        </button>

        <button
          className="heroArrow right"
          onClick={nextSlide}
        >
          <FiChevronRight />
        </button>

        <div className="heroDots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={current === index ? "active" : ""}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

      </div>

    </section>
  );
};

export default MainHeroSection;