import React, { useState } from "react";
import {
  FaUpload,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./GallaryPosting.css";

const GallaryPosting = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [gallery, setGallery] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const imagesPerPage = 7;

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) return;

    if (editingId !== null) {
      setGallery(
        gallery.map((item) =>
          item.id === editingId
            ? {
                ...item,
                image: preview,
              }
            : item
        )
      );

      setEditingId(null);
    } else {
      const newGallery = {
        id: Date.now(),
        image: preview,
      };

      setGallery([newGallery, ...gallery]);
    }

    setImage(null);
    setPreview("");

    document.getElementById("GallaryPostingImage").value = "";
  };

  const handleEdit = (item) => {
    setPreview(item.image);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setGallery(gallery.filter((item) => item.id !== id));
  };

  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;

  const currentImages = gallery.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(gallery.length / imagesPerPage);

  return (
    <div className="GallaryPosting">

      <div className="GallaryPosting-container">

        {/* ================= FORM ================= */}

        <div className="GallaryPosting-formCard">

          <h2 className="GallaryPosting-heading">
            Gallery Image Upload
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="GallaryPosting-inputGroup">

              <label>
                Upload Image
              </label>

              <input
                id="GallaryPostingImage"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />

            </div>

            {preview && (

              <div className="GallaryPosting-preview">

                <img src={preview} alt="" />

              </div>

            )}

            <button className="GallaryPosting-submit">

              <FaUpload />

              {editingId ? "Update Image" : "Upload Image"}

            </button>

          </form>

        </div>

        {/* ================= TABLE ================= */}

        <div className="GallaryPosting-tableCard">

          <h2 className="GallaryPosting-heading">

            Gallery Images

          </h2>

          <div className="GallaryPosting-tableWrapper">

            <table>

              <thead>

                <tr>

                  <th>Sl No</th>

                  <th>Image</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {currentImages.length === 0 ? (

                  <tr>

                    <td colSpan="3">

                      No Images Found

                    </td>

                  </tr>

                ) : (

                  currentImages.map((item, index) => (

                    <tr key={item.id}>

                      <td>
                        {indexOfFirst + index + 1}
                      </td>

                      <td>

                        <img
                          src={item.image}
                          alt=""
                          className="GallaryPosting-tableImage"
                        />

                      </td>

                      <td>

                        <button
                          className="GallaryPosting-edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="GallaryPosting-delete"
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

          {totalPages > 1 && (

            <div className="GallaryPosting-pagination">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (

                <button
                  key={index}
                  className={
                    currentPage === index + 1
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                >
                  {index + 1}
                </button>

              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
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

export default GallaryPosting;