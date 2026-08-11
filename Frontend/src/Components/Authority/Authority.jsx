import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Authority.css";


import Auth6 from "../../assets/Auth6.webp";
import Auth7 from "../../assets/Auth7.webp";
import Auth8 from "../../assets/Auth8.webp";
import Auth9 from "../../assets/Auth9.webp";
import Auth10 from "../../assets/Auth10.webp";
import Auth11 from "../../assets/Auth11.webp";
import Auth12 from "../../assets/Auth12.webp";
import Auth13 from "../../assets/Auth13.webp";
import Auth14 from "../../assets/Auth14.webp";

const DEFAULT_IMAGES = [
  
  { src: Auth6, caption: "Special Medical Financial Assistance" },
  { src: Auth7, caption: "Educational Grant Details" },
  { src: Auth8, caption: "Housing Scheme & Subsidy" },
  { src: Auth9, caption: "Maternity & Family Planning Benefits" },
  { src: Auth10, caption: "Application Process & Forms" },
  { src: Auth11, caption: "Eligibility Criteria & Terms" },
  { src: Auth12, caption: "Identity Card Issuance Rules" },
  { src: Auth13, caption: "Regional Welfare Offices Network" },
  { src: Auth14, caption: "Important Contacts & Helpdesk" },
];

const highlights = [
  {
    label: "Health Scheme",
    detail: "Medical, maternity, spectacles & disease-treatment support",
  },
  {
    label: "Educational Scheme",
    detail: "Financial assistance for wards, Class I through professional degrees",
  },
  {
    label: "Social Security Scheme",
    detail: "Group insurance, funeral aid & family welfare benefits",
  },
];

// Same underlying facts as the original copy, presented as two
// certificate-style reference badges instead of an office footer block.
const credentials = [
  {
    id: "01",
    label: "Governing Act",
    value: "Cess Act, 1981",
  },
  {
    id: "02",
    label: "Administering Office",
    value: "Welfare & Cess Commissioner",
  },
];

const AUTO_SCROLL_MS = 3800;

const Authority = ({ images = DEFAULT_IMAGES }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const active = images[activeIndex];

  const goTo = useCallback(
    (index, dir = "next") => {
      const total = images.length;
      const wrapped = (index + total) % total;
      setDirection(dir);
      setActiveIndex(wrapped);
    },
    [images.length]
  );

  const handlePrev = () => goTo(activeIndex - 1, "prev");
  const handleNext = () => goTo(activeIndex + 1, "next");

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return undefined;
    timerRef.current = setInterval(() => {
      setDirection("next");
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(timerRef.current);
  }, [isPaused, images.length]);

  return (
    <section className="authority" id="authority">
      <div className="authority__backdrop" aria-hidden="true">
        <div className="authority__chakra" />
        <span className="authority__glow" />
      </div>

      <div className="authority__container">
        {/* LEFT — certified document frame */}
        <div className="authority__left">
          <span className="authority__tag">
            <i className="authority__tag-line" />
            Certified &amp; On Record
          </span>

          <div
            className="authority__gallery"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button
              type="button"
              className="authority__gallery-arrow authority__gallery-arrow--prev"
              onClick={handlePrev}
              aria-label="Previous page"
            >
              ‹
            </button>

            <div className="authority__frame">
              <span className="authority__corner authority__corner--tl" />
              <span className="authority__corner authority__corner--tr" />
              <span className="authority__corner authority__corner--bl" />
              <span className="authority__corner authority__corner--br" />

              <div className="authority__frame-inner">
                <img
                  key={activeIndex}
                  src={active.src}
                  alt={active.caption || `Booklet page ${activeIndex + 1}`}
                  className={`authority__frame-image authority__frame-image--${direction}`}
                  draggable="false"
                />
              </div>
            </div>

            <button
              type="button"
              className="authority__gallery-arrow authority__gallery-arrow--next"
              onClick={handleNext}
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          {active.caption && (
            <p className="authority__frame-caption">
              <span className="authority__frame-index">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              {active.caption}
            </p>
          )}

          <div className="authority__frame-dots">
            {images.map((_, i) => (
              <button
                type="button"
                key={i}
                className={`authority__frame-dot${
                  i === activeIndex ? " authority__frame-dot--active" : ""
                }`}
                onClick={() => goTo(i, i > activeIndex ? "next" : "prev")}
                aria-label={`Show page ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — narrative content */}
        <div className="authority__right">
          <span className="authority__tag">
            <i className="authority__tag-line" />
            Government of India · Ministry of Labour &amp; Employment
          </span>

          <h2 className="authority__title">
            Authority Supported by the{" "}
            <span>Ministry of Labour, Govt. of India</span>
          </h2>

          <p className="authority__desc">
            This booklet, <em>“A Birds Eye View on Various Welfare Schemes,”</em>{" "}
            is published by the <strong>Labour Welfare Organisation</strong>,
            Government of India, under the Ministry of Labour &amp;
            Employment — Bhubaneswar Region. It outlines every welfare
            measure extended to <strong>Cine Workers and their
            dependants</strong>, as devised under the Cine Workers Welfare
            &amp; Cess Act, 1981, and Rules, 1984.
          </p>

          <p className="authority__desc authority__desc--muted">
            A worker is recognised under this framework if employed —
            directly, through a contractor, or otherwise — in connection
            with the production of not less than five feature films, in
            any capacity: Actor, Musician, Dancer, or any skilled,
            unskilled, technical, or artistic role.
          </p>

          <ul className="authority__chips">
            {highlights.map((item) => (
              <li className="authority__chip" key={item.label}>
                <span className="authority__chip-label">{item.label}</span>
                <span className="authority__chip-detail">{item.detail}</span>
              </li>
            ))}
          </ul>

          <div className="authority__badges">
            {credentials.map((c) => (
              <div className="authority__badge" key={c.id}>
                <span className="authority__badge-id">{c.id}</span>
                <span className="authority__badge-text">
                  <span className="authority__badge-label">{c.label}</span>
                  <span className="authority__badge-value">{c.value}</span>
                </span>
              </div>
            ))}
          </div>

          <p className="authority__office-address">
            Labour Welfare Organisation, Plot No. 449, Nageswar Tangi,
            Bhubaneswar–2
          </p>
        </div>
      </div>
    </section>
  );
};

export default Authority;