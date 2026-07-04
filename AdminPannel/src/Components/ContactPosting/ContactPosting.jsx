import React, { useState } from "react";
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

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      // Update existing record
      setContacts(
        contacts.map((contact) =>
          contact.id === editingId ? { ...contact, ...formData } : contact
        )
      );
      setEditingId(null);
    } else {
      // Add new record
      const newContact = {
        id: Date.now(),
        ...formData,
      };
      setContacts([newContact, ...contacts]);
    }

    // Reset Form
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  // Populate form for editing
  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
    });
    setEditingId(contact.id);
  };

  // Delete Record
  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
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
              <FaPaperPlane /> {editingId ? "Update Message" : "Submit Contact"}
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
                    <tr key={item.id}>
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
                            onClick={() => handleDelete(item.id)}
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