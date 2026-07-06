import React, { useState } from "react";
import {
  FaUpload,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaYoutube,
} from "react-icons/fa";
import "./VideoPosting.css";

const VideoPosting = () => {
  // Switched 'video' state to hold string URL instead of file object
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const videosPerPage = 7;

  // Helper function to extract and format YouTube Embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    
    // Match standard, share links, and embed links
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      videoId = match[2];
    } else {
      return null; // Invalid YouTube URL
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const embedUrl = getEmbedUrl(videoUrl);
    if (!embedUrl) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    if (editingId !== null) {
      setVideos(
        videos.map((item) =>
          item.id === editingId
            ? {
                ...item,
                video: embedUrl,
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newVideo = {
        id: Date.now(),
        video: embedUrl,
      };
      setVideos([newVideo, ...videos]);
    }

    // Reset input state
    setVideoUrl("");
  };

  const handleEdit = (item) => {
    // Populate the input with the item's video link
    setVideoUrl(item.video);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((item) => item.id !== id));
    // Fallback page adjust if last item on current page is deleted
    if (currentVideos.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination Logic
  const indexOfLast = currentPage * videosPerPage;
  const indexOfFirst = indexOfLast - videosPerPage;
  const currentVideos = videos.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(videos.length / videosPerPage);

  return (
    <div className="VideoPosting">
      <div className="VideoPosting-container">

        {/* ================= Upload Form ================= */}
        <div className="VideoPosting-formCard">
          <h2 className="VideoPosting-heading">Video Management</h2>

          <form onSubmit={handleSubmit}>
            <div className="VideoPosting-inputGroup">
              <label htmlFor="VideoPostingUrl">Paste YouTube URL</label>
              <input
                id="VideoPostingUrl"
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            {/* Live Preview using Iframe */}
            {getEmbedUrl(videoUrl) && (
              <div className="VideoPosting-preview">
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title="YouTube video preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="VideoPosting-previewVideo"
                  style={{ width: "100%", height: "200px", borderRadius: "8px" }}
                />
              </div>
            )}

            <button className="VideoPosting-submit" type="submit">
              {editingId ? <FaEdit /> : <FaUpload />}
              {editingId ? " Update Video" : " Post Video"}
            </button>
          </form>
        </div>

        {/* ================= Table ================= */}
        <div className="VideoPosting-tableCard">
          <h2 className="VideoPosting-heading">Posted Videos</h2>

          <div className="VideoPosting-tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Video</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentVideos.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No Videos Found
                    </td>
                  </tr>
                ) : (
                  currentVideos.map((item, index) => (
                    <tr key={item.id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>
                        <iframe
                          src={item.video}
                          title={`YouTube video ${item.id}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="VideoPosting-tableVideo"
                          style={{ width: "160px", height: "90px", borderRadius: "4px" }}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="VideoPosting-edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="VideoPosting-delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="VideoPosting-pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VideoPosting;