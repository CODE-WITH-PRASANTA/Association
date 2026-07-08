import React, { useState, useEffect } from "react";
import API, { IMG_URL } from "../../api/axios";
import "./EventManagement.css";
import { Editor } from "@tinymce/tinymce-react";
import {
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaImage,
} from "react-icons/fa";

const EventManagement = () => {

  // ==========================
  // States
  // ==========================

  const [events, setEvents] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  useEffect(() => {
  fetchEvents();
}, []);

const fetchEvents = async () => {
  try {
    const res = await API.get("/events");

    setEvents(res.data);

  } catch (error) {
    console.log(error);
  }
};

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
    preview: "",
  });

  // ==========================
  // Input Change
  // ==========================

  const handleInputChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================
  // Image Upload
  // ==========================

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      image: file,
      preview: URL.createObjectURL(file),
    });

  };

  // ==========================
  // TinyMCE
  // ==========================

  const handleEditorChange = (content) => {

    setFormData({
      ...formData,
      description: content,
    });

  };

  // ==========================
  // Save Event
  // ==========================

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const data = new FormData();

    data.append("title", formData.title);

    data.append("category", formData.category);

    data.append("description", formData.description);

    if (formData.image) {

      data.append("image", formData.image);

    }

    if (editingId) {

      await API.put(`/events/${editingId}`, data, {

        headers: {

          "Content-Type":"multipart/form-data",

        }

      });

    }

    else {

      await API.post("/events", data, {

        headers:{

          "Content-Type":"multipart/form-data"

        }

      });

    }

    fetchEvents();

    setEditingId(null);

    setFormData({

      title:"",

      category:"",

      description:"",

      image:null,

      preview:""

    });

  }

  catch(error){

    console.log(error);

  }

  finally{

    setLoading(false);

  }

};

  // ==========================
  // Edit Event
  // ==========================

const handleEdit = (event) => {

  setEditingId(event._id);

  setFormData({

    title:event.title,

    category:event.category,

    description:event.description,

    image:null,

    preview:`${IMG_URL}/uploads/${event.image}`

  });

};

  // ==========================
  // Delete Event
  // ==========================

 const handleDelete = async (id) => {

  if(!window.confirm("Delete this Event?"))
    return;

  try{

    await API.delete(`/events/${id}`);

    fetchEvents();

  }

  catch(error){

    console.log(error);

  }

};

  // ==========================
  // Pagination
  // ==========================

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentEvents = events.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    events.length / itemsPerPage
  );

  const paginate = (page) => {

    setCurrentPage(page);

  };

  return (
    <div className="EventManagement">

  <div className="EventManagement-wrapper">

    {/* =====================================
            LEFT SIDE FORM
    ====================================== */}

    <div className="EventManagement-formCard">

      <div className="EventManagement-cardHeader">

        <FaCalendarAlt />

        <h2>
          {editingId ? "Update Event" : "Create Event"}
        </h2>

      </div>

      <form
        className="EventManagement-form"
        onSubmit={handleSubmit}
      >

        {/*========================
              EVENT TITLE
        =========================*/}

        <div className="EventManagement-formGroup">

          <label>
            Event Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter Event Title"
            value={formData.title}
            onChange={handleInputChange}
          />

        </div>

        {/*========================
              CATEGORY
        =========================*/}

        <div className="EventManagement-formGroup">

          <label>
            Event Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >

            <option value="">
              Select Category
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Cultural">
              Cultural
            </option>

            <option value="Seminar">
              Seminar
            </option>

            <option value="Workshop">
              Workshop
            </option>

            <option value="Competition">
              Competition
            </option>

            <option value="Educational">
              Educational
            </option>

            <option value="Festival">
              Festival
            </option>

            <option value="Annual Function">
              Annual Function
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        {/*========================
              IMAGE UPLOAD
        =========================*/}

        <div className="EventManagement-formGroup">

         
          <div className="EventManagement-formGroup">

    <label>Event Image</label>

    <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="EventManagement-fileInput"
    />

</div>

        </div>

        {/*========================
            IMAGE PREVIEW
        =========================*/}

        

        {/*========================
            DESCRIPTION
        =========================*/}

        <div className="EventManagement-formGroup">

          <label>
            Event Description
          </label>

          <Editor
  apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
  value={formData.description}
  onEditorChange={handleEditorChange}
  init={{
    height: 250,
    menubar: false,
    branding: false,
    resize: false,
    toolbar_mode: "sliding",

    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "table",
      "code",
      "fullscreen",
      "preview",
      "wordcount",
    ],

    toolbar:
      "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code preview",
  }}
/>

        </div>

        {/*========================
              SUBMIT
        =========================*/}

        <button
          type="submit"
          className="EventManagement-submitBtn"
        >

          <FaPlus />

         {loading
? "Saving..."
: editingId
? "Update Event"
: "Save Event"}
        </button>

      </form>

    </div>

    {/* =====================================
            RIGHT SIDE TABLE
    ====================================== */}

    <div className="EventManagement-tableCard">
              <div className="EventManagement-cardHeader">

        <FaCalendarAlt />

        <h2>Event List</h2>

      </div>

      <div className="EventManagement-tableWrapper">

        <table className="EventManagement-table">

          <thead>

            <tr>

              <th>#</th>

              <th>Image</th>

              <th>Title</th>

              <th>Category</th>

              <th>Description</th>

              <th>Date</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {currentEvents.length > 0 ? (

              currentEvents.map((item, index) => (

               <tr key={item._id}>

                  <td>{firstIndex + index + 1}</td>

                  <td>

                    <img
                     src={`${IMG_URL}/uploads/${item.image}`}
                      alt={item.title}
                      className="EventManagement-tableImage"
                    />

                  </td>

                  <td>{item.title}</td>

                  <td>

                    <span className="EventManagement-categoryBadge">

                      {item.category}

                    </span>

                  </td>

                  <td>

                    <div
                      className="EventManagement-description"
                      dangerouslySetInnerHTML={{
                        __html:
                          item.description.length > 180
                            ? item.description.substring(0, 180) + "..."
                            : item.description,
                      }}
                    />

                  </td>

                  <td>{item.date}</td>

                  <td>

                    <div className="EventManagement-actionButtons">

                      <button
                        type="button"
                        className="editBtn"
                        onClick={() => handleEdit(item)}
                        title="Edit"
                      >

                        <FaEdit />

                      </button>

                      <button
                        type="button"
                        className="deleteBtn"
                        onClick={() => handleDelete(item._id)}
                        title="Delete"
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="EventManagement-noData"
                >

                  No Events Available

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* =============================
              Pagination
      ============================== */}

      {totalPages > 1 && (

        <div className="EventManagement-pagination">

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >

            Previous

          </button>

          {Array.from({ length: totalPages }, (_, index) => (

            <button
              type="button"
              key={index}
              className={
                currentPage === index + 1
                  ? "active"
                  : ""
              }
              onClick={() => paginate(index + 1)}
            >

              {index + 1}

            </button>

          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >

            Next

          </button>

        </div>

      )}

    </div>

  </div>

</div>

);

};

export default EventManagement;
    
    