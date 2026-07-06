import React, { useRef, useState, useEffect, useCallback } from "react";
import "./Archivement.css";

const ClapperIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="19" width="38" height="24" rx="3" fill="url(#clapperBody)" />
    <path d="M5 19l4-9h6l-4 9H5z" fill="url(#clapperStripe)" />
    <path d="M17 19l4-9h6l-4 9h-6z" fill="url(#clapperBody)" />
    <path d="M29 19l4-9h6l-4 9h-6z" fill="url(#clapperStripe)" />
    <rect x="5" y="10" width="38" height="9" rx="2" fill="url(#clapperTop)" />
    <path d="M5 10l4-2 6 2-4 2-6-2z" fill="#1c1b18" opacity="0.15" />
    <path d="M17 10l4-2 6 2-4 2-6-2z" fill="#1c1b18" opacity="0.15" />
    <path d="M29 10l4-2 6 2-4 2-6-2z" fill="#1c1b18" opacity="0.15" />
    <circle cx="24" cy="31" r="7" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" />
    <path d="M24 27v4l3 2" stroke="#fff" strokeOpacity="0.75" strokeWidth="1.4" strokeLinecap="round" />
    <defs>
      <linearGradient id="clapperBody" x1="5" y1="19" x2="43" y2="43" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2a2622" />
        <stop offset="1" stopColor="#151311" />
      </linearGradient>
      <linearGradient id="clapperTop" x1="5" y1="10" x2="43" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#d9a53d" />
        <stop offset="1" stopColor="#b8892b" />
      </linearGradient>
      <linearGradient id="clapperStripe" x1="5" y1="10" x2="43" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#efd08a" />
        <stop offset="1" stopColor="#d9a53d" />
      </linearGradient>
    </defs>
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 4h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 13v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8.5 20h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M9.5 20c0-1.8.6-2.6 1-3h3c.4.4 1 1.2 1 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GalleryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="7.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M3 15l4-4 3 3 4-5 4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20 8v10a2 2 0 0 1-2 2H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const FilmstripIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9 4v16" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 8h6M3 12h6M3 16h6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" />
  </svg>
);

const Archivement = () => {
  const achievementRef = useRef(null);
  const galleryRef = useRef(null);
  const videoRef = useRef(null);

  const [revealedSections, setRevealedSections] = useState({});
  const [activeSection, setActiveSection] = useState("achievements");
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Scroll-triggered reveal + active nav tracking for each section
  useEffect(() => {
    const sections = [
      { ref: achievementRef, key: "achievements" },
      { ref: galleryRef, key: "gallery" },
      { ref: videoRef, key: "videos" },
    ];

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = sections.find((s) => s.ref.current === entry.target);
            if (found) {
              setRevealedSections((prev) => ({ ...prev, [found.key]: true }));
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });
        if (best) {
          const found = sections.find((s) => s.ref.current === best.target);
          if (found) setActiveSection(found.key);
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    sections.forEach((s) => {
      if (s.ref.current) {
        revealObserver.observe(s.ref.current);
        activeObserver.observe(s.ref.current);
      }
    });
    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  // Close any open overlay on Escape
  const closeOverlays = useCallback(() => {
    setActiveAchievement(null);
    setActiveImageIndex(null);
    setActiveVideo(null);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeOverlays();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeOverlays]);

  const achievementData = [
    {
      seal: "🎬",
      eyebrow: "Ref. AICWA/118/2021",
      title: "Appointed General Secretary — Odisha",
      text: "Named General Secretary of the All Indian Cine Workers Association, entrusted with coordinating the state's cine workers, artists, and associates within the wider film fraternity.",
      detail:
        "The appointment letter, issued by AICWA's President on 26 August 2021, formally recognizes this role as part of the association's mission to become a global voice for cine workers and artists across the industry.",
    },
    {
      seal: "📜",
      eyebrow: "Reg. No. 8442-22 · 2016–17",
      title: "Society Registered Under Act XXI of 1860",
      text: "Successfully registered the Odisha Cine Workers Association (OCWA) under the Societies Registration Act, granting it formal legal standing in the state of Odisha.",
      detail:
        "Certified by the Additional Registrar of Societies, Khordha, on 1 September 2016 — establishing OCWA as a recognized body based in Sanabad, Bolagarh, Khordha.",
    },
    {
      seal: "🤝",
      eyebrow: "Film Fraternity",
      title: "Statewide Coordination",
      text: "Built and maintained working relationships across Odisha's film community, aligning cine workers, artists, and association members under one banner.",
      detail:
        "Ongoing coordination work spans outreach, membership support, and representation of cine workers' interests at the state level.",
    },
    {
      seal: "🌍",
      eyebrow: "Vision",
      title: "Toward a Global Standard",
      text: "Contributed to AICWA's broader ambition of becoming a global leader in advocating for cine workers, artists, and associates industry-wide.",
      detail:
        "This work supports the association's long-term goal of raising standards and representation for cine workers beyond state borders.",
    },
    {
      seal: "🏛️",
      eyebrow: "Governance",
      title: "Association Leadership",
      text: "Took on a governing role within OCWA's structure, helping steer the organization's mission since its founding in 2016.",
      detail:
        "Leadership responsibilities include upholding the association's registered objectives and supporting its members across the district.",
    },
    {
      seal: "🎖️",
      eyebrow: "Recognition",
      title: "Trusted by the Association",
      text: "Recognized by AICWA's leadership as a valued contributor to the film fraternity, welcomed formally into the association's ranks.",
      detail:
        "The role reflects confidence placed by AICWA's President and governing body in continued, mutually beneficial collaboration.",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1494526585095-c41746248156",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  ];

  const videos = [
    {
      title: "Conference Highlights",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      id: "dQw4w9WgXcQ",
    },
    {
      title: "Achievement Ceremony",
      thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
      id: "ysz5S6PUM-U",
    },
    {
      title: "Workshop Moments",
      thumbnail: "https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
      id: "M7lc1UVf-VE",
    },
    {
      title: "Seminar Recording",
      thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
      id: "aqz-KE-bpKQ",
    },
  ];

  return (
    <div className="Archivement">
      <div className="Archivement_sidebar">
        <div className="Archivement_sidebarGlow" />

        <div className="Archivement_brand">
          <span className="Archivement_brandCrest">
            <ClapperIcon />
          </span>
          <div className="Archivement_brandText">
            <strong>AICWA</strong>
            <span>Cine Workers Association</span>
          </div>
        </div>

        <span className="Archivement_sidebarLabel">
          <i /> Explore <i />
        </span>

        <nav className="Archivement_nav">
          <button
            className={activeSection === "achievements" ? "is-active" : ""}
            onClick={() => scrollToSection(achievementRef)}
          >
            <span className="Archivement_navIconBadge">
              <TrophyIcon />
            </span>
            <span className="Archivement_navText">
              <strong>Achievements</strong>
              <em>Honors &amp; certificates</em>
            </span>
            <span className="Archivement_navGlow" />
          </button>

          <button
            className={activeSection === "gallery" ? "is-active" : ""}
            onClick={() => scrollToSection(galleryRef)}
          >
            <span className="Archivement_navIconBadge">
              <GalleryIcon />
            </span>
            <span className="Archivement_navText">
              <strong>Gallery</strong>
              <em>Moments captured</em>
            </span>
            <span className="Archivement_navGlow" />
          </button>

          <button
            className={activeSection === "videos" ? "is-active" : ""}
            onClick={() => scrollToSection(videoRef)}
          >
            <span className="Archivement_navIconBadge">
              <FilmstripIcon />
            </span>
            <span className="Archivement_navText">
              <strong>Videos</strong>
              <em>Watch highlights</em>
            </span>
            <span className="Archivement_navGlow" />
          </button>
        </nav>

        <div className="Archivement_sidebarFooter">
          <span className="Archivement_sidebarFooterLine" />
          <span>Est. 2016 · Odisha</span>
        </div>
      </div>

      <div className="Archivement_content">
        {/* Achievements */}
        <section
          ref={achievementRef}
          className={`Archivement_section ${
            revealedSections.achievements ? "is-revealed" : ""
          }`}
        >
          <div className="Archivement_curtainHeader">
            <span className="Archivement_curtainPanel left" />
            <span className="Archivement_curtainPanel right" />
            <h2>
              Achievements <span className="Archivement_headline_gold">&amp; Honors</span>
            </h2>
          </div>

          <div className="Archivement_cardGrid">
            {achievementData.map((item, index) => (
              <button
                type="button"
                className="Archivement_card"
                key={index}
                style={{ "--delay": `${index * 0.08}s` }}
                onClick={() => setActiveAchievement(index)}
              >
                <span className="Archivement_cardSeal">{item.seal}</span>
                <span className="Archivement_cardEyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="Archivement_cardCta">View certificate details →</span>
              </button>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section
          ref={galleryRef}
          className={`Archivement_section ${
            revealedSections.gallery ? "is-revealed" : ""
          }`}
        >
          <h2>Gallery</h2>

          <div className="Archivement_gallery">
            {galleryImages.map((img, index) => (
              <div
                className="Archivement_galleryCard"
                key={index}
                style={{ "--delay": `${index * 0.06}s` }}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={`${img}?auto=format&fit=crop&w=800&q=80`} alt="" loading="lazy" />
                <div className="Archivement_galleryOverlay">
                  <span>🔍 View</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Videos */}
        <section
          ref={videoRef}
          className={`Archivement_section ${
            revealedSections.videos ? "is-revealed" : ""
          }`}
        >
          <h2>Videos</h2>

          <div className="Archivement_videoGrid">
            {videos.map((video, index) => (
              <div
                className="Archivement_videoCard"
                key={index}
                style={{ "--delay": `${index * 0.08}s` }}
              >
                <div
                  className="Archivement_videoThumbWrap"
                  onClick={() => setActiveVideo(video)}
                >
                  <img src={video.thumbnail} alt="" loading="lazy" />
                  <span className="Archivement_playButton">▶</span>
                </div>

                <div className="Archivement_videoContent">
                  <h3>{video.title}</h3>
                  <button onClick={() => setActiveVideo(video)}>▶ Watch Video</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Achievement detail overlay */}
      {activeAchievement !== null && (
        <div className="Archivement_overlay" onClick={closeOverlays}>
          <div
            className="Archivement_overlayCard"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="Archivement_overlayClose" onClick={closeOverlays}>
              ✕
            </button>
            <span className="Archivement_overlaySeal">
              {achievementData[activeAchievement].seal}
            </span>
            <span className="Archivement_cardEyebrow">
              {achievementData[activeAchievement].eyebrow}
            </span>
            <h3>{achievementData[activeAchievement].title}</h3>
            <p>{achievementData[activeAchievement].text}</p>
            <p className="Archivement_overlayDetail">
              {achievementData[activeAchievement].detail}
            </p>
          </div>
        </div>
      )}

      {/* Gallery lightbox */}
      {activeImageIndex !== null && (
        <div className="Archivement_overlay" onClick={closeOverlays}>
          <div
            className="Archivement_lightbox"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="Archivement_overlayClose" onClick={closeOverlays}>
              ✕
            </button>
            <div className="Archivement_lightboxFrame">
              <img
                src={`${galleryImages[activeImageIndex]}?auto=format&fit=crop&w=900&q=85`}
                alt=""
              />
            </div>
            <span className="Archivement_lightboxCaption">
              {activeImageIndex + 1} / {galleryImages.length}
            </span>
          </div>
        </div>
      )}

      {/* Video modal */}
      {activeVideo && (
        <div className="Archivement_overlay" onClick={closeOverlays}>
          <div
            className="Archivement_videoModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="Archivement_overlayClose" onClick={closeOverlays}>
              ✕
            </button>
            <div className="Archivement_videoFrameWrap">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h3>{activeVideo.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archivement;