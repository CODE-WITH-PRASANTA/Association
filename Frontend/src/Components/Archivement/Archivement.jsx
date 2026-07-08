import React, { useRef, useState, useEffect, useCallback } from "react";
import API, { IMG_URL } from "../../api/axios";
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

// ================= YouTube helpers (thumbnail extraction only — no logic removed elsewhere) =================
// Pulls the 11-character YouTube video id out of either an embed URL or a normal watch/share URL.
const getYouTubeId = (video) => {
  const url = video?.embedUrl || video?.youtubeUrl || "";
  const patterns = [
    /embed\/([a-zA-Z0-9_-]{11})/,
    /v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Returns a real static thumbnail image for the card view instead of loading a live iframe.
const getYouTubeThumbnail = (video) => {
  const id = getYouTubeId(video);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
};

const Archivement = () => {
  const achievementRef = useRef(null);
  const galleryRef = useRef(null);
  const videoRef = useRef(null);

  const [revealedSections, setRevealedSections] = useState({});
  const [activeSection, setActiveSection] = useState("achievements");
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const [galleryImages, setGalleryImages] = useState([]);

  // ================= Gallery API =================

  useEffect(() => {
    fetchAchievements();
    fetchGallery();
    fetchVideos();
  }, []);

  const [achievementData, setAchievementData] = useState([]);

  const fetchAchievements = async () => {
    try {
      const res = await API.get("/archive");

      console.log("Achievements API:", res.data);

      if (res.data.success && Array.isArray(res.data.archives)) {
        setAchievementData(res.data.archives);
      } else {
        setAchievementData([]);
      }
    } catch (error) {
      console.error("Error fetching achievements:", error);
      setAchievementData([]);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await API.get("/gallery");

      setGalleryImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await API.get("/videos");

      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // ================= Existing Function =================

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Rest of your code...

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

  const [videos, setVideos] = useState([]);

  const activeAchievementData =
    activeAchievement !== null ? achievementData[activeAchievement] : null;

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
            {achievementData.length > 0 && (
              <span className="Archivement_navCount">{achievementData.length}</span>
            )}
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
            {galleryImages.length > 0 && (
              <span className="Archivement_navCount">{galleryImages.length}</span>
            )}
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
            {videos.length > 0 && (
              <span className="Archivement_navCount">{videos.length}</span>
            )}
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
            <span className="Archivement_curtainEyebrow">Honor Roll</span>
            <h2>
              Achievements <span className="Archivement_headline_gold">&amp; Honors</span>
            </h2>
            {achievementData.length > 0 && (
              <span className="Archivement_curtainMeta">
                {achievementData.length} entries in the archive
              </span>
            )}
          </div>

          {achievementData.length === 0 ? (
            <div className="Archivement_emptyState">
              <span className="Archivement_emptyGlyph">🏆</span>
              <p>No achievements have been archived yet.</p>
            </div>
          ) : (
            <div className="Archivement_cardGrid">
              {Array.isArray(achievementData) &&
                achievementData.map((item, index) => (
                  <button
                    type="button"
                    className="Archivement_card"
                    key={item._id}
                    style={{ "--delay": `${index * 0.08}s` }}
                    onClick={() => setActiveAchievement(index)}
                  >
                    <span className="Archivement_cardEyebrowRow">
                      <span className="Archivement_cardEyebrow">
                        Archive #{item.count}
                      </span>
                      <span className="Archivement_cardSeal">🏆</span>
                    </span>

                    {/* Achievement Image */}
                    <span className="Archivement_cardImageFrame">
                      {item.image ? (
                        <img
                          className="Archivement_cardImage"
                          src={
                            item.image?.startsWith("http")
                              ? item.image
                              : `${IMG_URL}/${item.image}`
                          }
                          alt={item.title}
                          loading="lazy"
                          onError={(e) => {
                            console.log("Image URL:", e.target.src);
                            e.target.src = "/no-image.png";
                          }}
                        />
                      ) : (
                        <span className="Archivement_cardImageFallback">
                          <TrophyIcon />
                        </span>
                      )}
                    </span>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <span className="Archivement_cardCta">
                      View Details
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                ))}
            </div>
          )}
        </section>

        {/* Gallery */}
        <section
          ref={galleryRef}
          className={`Archivement_section ${
            revealedSections.gallery ? "is-revealed" : ""
          }`}
        >
          <div className="Archivement_sectionHeader">
            <span className="Archivement_sectionEyebrow">Visual Archive</span>
            <h2>Gallery</h2>
          </div>

          {galleryImages.length === 0 ? (
            <div className="Archivement_emptyState">
              <span className="Archivement_emptyGlyph">🖼️</span>
              <p>No gallery photos have been uploaded yet.</p>
            </div>
          ) : (
            <div className="Archivement_gallery">
              {galleryImages.map((item, index) => (
                <div
                  className="Archivement_galleryCard"
                  key={item._id}
                  style={{ "--delay": `${index * 0.06}s` }}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <div className="Archivement_galleryCardFrame">
                    <img
                      src={`${IMG_URL}/uploads/${item.image}`}
                      alt="Gallery"
                      loading="lazy"
                    />
                  </div>

                  <div className="Archivement_galleryOverlay">
                    <span>🔍 View</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Videos */}
        <section
          ref={videoRef}
          className={`Archivement_section ${
            revealedSections.videos ? "is-revealed" : ""
          }`}
        >
          <div className="Archivement_sectionHeader">
            <span className="Archivement_sectionEyebrow">On Screen</span>
            <h2>Videos</h2>
          </div>

          {videos.length === 0 ? (
            <div className="Archivement_emptyState">
              <span className="Archivement_emptyGlyph">🎬</span>
              <p>No videos have been added yet.</p>
            </div>
          ) : (
            <div className="Archivement_videoGrid">
              {videos.map((video, index) => (
                <div
                  className="Archivement_videoCard"
                  key={video._id}
                  style={{ "--delay": `${index * 0.08}s` }}
                >
                  <div
                    className="Archivement_videoThumbWrap"
                    onClick={() => setActiveVideo(video)}
                  >
                    <img
                      src={getYouTubeThumbnail(video)}
                      alt={video.title || "YouTube video thumbnail"}
                      className="Archivement_videoThumb"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://i.ytimg.com/vi/${getYouTubeId(
                          video
                        )}/mqdefault.jpg`;
                      }}
                    />

                    <span className="Archivement_videoBadge">YouTube</span>

                    <span className="Archivement_playButton">▶</span>
                  </div>

                  <div className="Archivement_videoContent">
                    <h3>{video.title || "YouTube Video"}</h3>

                    <button onClick={() => setActiveVideo(video)}>
                      ▶ Watch Video
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Achievement detail overlay */}
      {activeAchievementData && (
        <div className="Archivement_overlay" onClick={closeOverlays}>
          <div
            className="Archivement_overlayCard"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="Archivement_overlayClose" onClick={closeOverlays}>
              ✕
            </button>

            {activeAchievementData.image && (
              <div className="Archivement_overlayImageFrame">
                <img
                  src={
                    activeAchievementData.image?.startsWith("http")
                      ? activeAchievementData.image
                      : `${IMG_URL}/${activeAchievementData.image}`
                  }
                  alt={activeAchievementData.title}
                  onError={(e) => {
                    e.target.src = "/no-image.png";
                  }}
                />
              </div>
            )}

            <span className="Archivement_overlaySeal">🏆</span>

            <span className="Archivement_cardEyebrow">
              Archive #{activeAchievementData.count}
            </span>

            <h3>{activeAchievementData.title}</h3>

            <p>{activeAchievementData.description}</p>

            {activeAchievementData.notes && (
              <p className="Archivement_overlayDetail">
                {activeAchievementData.notes}
              </p>
            )}
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
                src={`${IMG_URL}/uploads/${galleryImages[activeImageIndex]?.image}`}
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
                src={`${activeVideo.embedUrl}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h3>{activeVideo.title || "YouTube Video"}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archivement;