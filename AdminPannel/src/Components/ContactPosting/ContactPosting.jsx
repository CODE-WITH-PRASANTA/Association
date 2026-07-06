import React, { useState, useEffect } from "react";

import API from "../../api/axios";
import { FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";
import "./ContactPosting.css";

const ContactPosting = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contacts, setContacts] = useState([]);
 const [editingId, setEditingId] = useState(null);

const [loading, setLoading] = useState(false);

useEffect(() => {
  fetchContacts();
}, []);

const fetchContacts = async () => {
  try {

    const res = await API.get("/contact");

    setContacts(res.data);

  } catch (error) {

    console.log(error);

  }
};

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form Submission
 const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    if (editingId) {

      await API.put(`/contact/${editingId}`, formData);

    }

    else {

      await API.post("/contact", formData);

    }

    fetchContacts();

    setEditingId(null);

    setFormData({

      name: "",

      phone: "",

      email: "",

      subject: "",

      message: "",

    });

  }

  catch (error) {

    console.log(error);

  }

  finally {

    setLoading(false);

  }

};

  // Populate form for editing
 const handleEdit = (contact) => {

  setEditingId(contact._id);

  setFormData({

    name: contact.name,

    phone: contact.phone,

    email: contact.email,

    subject: contact.subject,

    message: contact.message,

  });

};

  // Delete Record
  const handleDelete = async (id) => {

  if (!window.confirm("Delete this contact?"))
    return;

  try {

    await API.delete(`/contact/${id}`);

    fetchContacts();

  }

  catch (error) {

    console.log(error);

  }

};

  return (
    <div className="ContactPosting">
      <div className="ContactPosting-container">
        
        {/* ================= Left Side: Form (50%) ================= */}
        <div className="ContactPosting-formCard">
          <h2 className="ContactPosting-heading">
            {editingId ? "Update Contact" : "Create Contact"}
          </h2>
          <form onSubmit={handleSubmit} className="ContactPosting-form">
            
            <div className="ContactPosting-inputGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ContactPosting-inputGroup">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ContactPosting-inputGroup">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ContactPosting-inputGroup">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ContactPosting-inputGroup">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="ContactPosting-submitBtn">
             <FaPaperPlane />

{loading
  ? "Saving..."
  : editingId
  ? "Update Message"
  : "Submit Contact"}
            </button>
          </form>
        </div>

        {/* ================= Right Side: Table (50%) ================= */}
        <div className="ContactPosting-tableCard">
          <h2 className="ContactPosting-heading">Contact Submissions</h2>
          <div className="ContactPosting-tableWrapper">
            <table className="ContactPosting-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Details</th>
                  <th>Subject & Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="ContactPosting-noData">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  contacts.map((item, index) => (
                   <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="ContactPosting-cellMeta">
                          <strong>{item.name}</strong>
                          <span>{item.phone}</span>
                          <span>{item.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="ContactPosting-cellMessage">
                          <strong>{item.subject}</strong>
                          <p>{item.message}</p>
                        </div>
                      </td>
                      <td>
                        <div className="ContactPosting-actions">
                          <button
                            type="button"
                            className="ContactPosting-actionBtn edit"
                            onClick={() => handleEdit(item)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="ContactPosting-actionBtn delete"
                           onClick={() => handleDelete(item._id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPosting;