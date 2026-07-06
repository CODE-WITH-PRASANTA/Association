import React, { useEffect, useState } from "react";

import API, { IMG_URL } from "../../api/axios";

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
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const imagesPerPage = 7;

  useEffect(() => {
  fetchGallery();
}, []);

const fetchGallery = async () => {
  try {
    const res = await API.get("/gallery");

    setGallery(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!image) {
    alert("Please select an image.");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("image", image);

    if (editingId) {
      await API.put(`/gallery/${editingId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await API.post("/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    fetchGallery();

    setImage(null);

    setPreview("");

    setEditingId(null);

    document.getElementById("GallaryPostingImage").value = "";

  } catch (error) {
    console.log(error);

    alert("Upload Failed");
  } finally {
    setLoading(false);
  }
};

 const handleEdit = (item) => {
  setEditingId(item._id);

  setPreview(`${IMG_URL}/uploads/${item.image}`);
};

 const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this image?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/gallery/${id}`);

    fetchGallery();
  } catch (error) {
    console.log(error);
  }
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

             {loading
  ? "Uploading..."
  : editingId
  ? "Update Image"
  : "Upload Image"}

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

                    <tr key={item._id}>

                      <td>
                        {indexOfFirst + index + 1}
                      </td>

                      <td>

                        <img
  src={`${IMG_URL}/uploads/${item.image}`}
  alt="Gallery"
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
                      onClick={() => handleDelete(item._id)}
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