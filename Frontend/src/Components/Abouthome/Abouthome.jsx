import React, { useRef, useState } from "react";
import "./Abouthome.css";

import HeroImage from "../../assets/Cine (1).webp";

const credentials = [
  { label: "Reference No.", value: "AICWA/118/2021" },
  { label: "Date Issued", value: "26 August 2021" },
  { label: "Position", value: "General Secretary — Odisha" },
  { label: "Issuing Body", value: "All Indian Cine Workers Association" },
];

const Abouthome = ({ src = HeroImage }) => {
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="abouthome" id="about">
      <div className="abouthome__backdrop" aria-hidden="true">
        <span className="abouthome__spotlight" />
        <div className="abouthome__reel abouthome__reel--top" />
        <div className="abouthome__reel abouthome__reel--bottom" />
      </div>

      <div className="abouthome__container">
        {/* LEFT — visual showcase of the appointment letter */}
        <div className="abouthome__visual">
          <span className="abouthome__eyebrow abouthome__eyebrow--mobile">
            Certified &amp; On Record
          </span>

          <div
            className="abouthome__frame"
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            <span className="abouthome__frame-glow" />
            <div className="abouthome__frame-inner">
              <img
                src={src}
                alt="AICWA Appointment Letter — Mr. Purna Bahera, General Secretary, Odisha"
                className="abouthome__image"
              />
              <span className="abouthome__sheen" />
            </div>
            <span className="abouthome__corner abouthome__corner--tl" />
            <span className="abouthome__corner abouthome__corner--tr" />
            <span className="abouthome__corner abouthome__corner--bl" />
            <span className="abouthome__corner abouthome__corner--br" />
          </div>

          <div className="abouthome__seal">
            <span className="abouthome__seal-ring">
              <span className="abouthome__seal-text">AICWA · VERIFIED</span>
            </span>
          </div>
        </div>

        {/* RIGHT — content about the letter / appointment */}
        <div className="abouthome__content">
          <span className="abouthome__eyebrow">Official Appointment</span>

          <h2 className="abouthome__title">
            Recognised by the <span>All Indian Cine&nbsp;Workers</span>{" "}
            Association
          </h2>

          <p className="abouthome__desc">
            On <strong>26th August 2021</strong>, the All Indian Cine Workers
            Association (AICWA) formally appointed{" "}
            <strong>Mr. Purna Bahera</strong> as{" "}
            <strong>General Secretary — Odisha</strong>, entrusting him with
            coordinating and representing the interests of cine workers,
            artists, and associates across the state within India's film
            fraternity.
          </p>

          <p className="abouthome__desc abouthome__desc--muted">
            The appointment reflects a continued commitment to strengthening
            the association's presence at the grassroots level, and building
            a fair, organised, and supportive ecosystem for every cine
            worker under the AICWA banner.
          </p>

          <ul className="abouthome__credentials">
            {credentials.map((item, i) => (
              <li
                className="abouthome__credential-item"
                key={item.label}
                style={{ animationDelay: `${0.15 * i + 0.2}s` }}
              >
                <span className="abouthome__credential-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="abouthome__credential-text">
                  <span className="abouthome__credential-label">
                    {item.label}
                  </span>
                  <span className="abouthome__credential-value">
                    {item.value}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="abouthome__signature">
            <div className="abouthome__signature-line" />
            <div className="abouthome__signature-meta">
              <span className="abouthome__signature-name">
                Er. Suresh Shyamlal Gupta
              </span>
              <span className="abouthome__signature-role">
                President, AICWA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Abouthome;