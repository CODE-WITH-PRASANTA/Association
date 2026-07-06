import React, { useState } from 'react';
import API from "../../api/axios"; // <-- Import configured Axios instance from your client directory
import './MainContact.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const MainContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    
    try {
      // Format structural payload keys to perfectly match backend expected model scheme
      const payload = {
        name: formData.name,
        phone: formData.phoneNumber, // Maps 'phoneNumber' key cleanly to database schema field name
        email: formData.email,
        subject: formData.subject,
        message: formData.comment   // Maps 'comment' field seamlessly into schema message field name
      };

      // Direct POST request payload to backend database router endpoint
      await API.post("/contact", payload);
      
      setSuccessMsg('Your message has been safely saved! An AICWA representative will review it shortly.');
      
      // Reset form fields back to pristine default state
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        subject: '',
        comment: ''
      });
    } catch (error) {
      console.error("Failed to forward communication details to API server cluster:", error);
      alert("Submission encountered an unexpected error. Please check networking conditions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contactSection">
      <div className="contactContainer">
        
        {/* Main Banner Header */}
        <header className="contactHeader">
          <h1 className="mainTitle">ALL INDIAN CINE WORKERS ASSOCIATION-AICWA</h1>
          <h2 className="phoneContactTitle">
            CONTACT TODAY AT <span className="greenHighlightText">+91 7700 999 457</span>
          </h2>
        </header>

        {/* 3-Column Content Layout */}
        <div className="contactMainGrid">
          
          {/* Column 1: Info and Socials */}
          <div className="textInfoColumn">
            <h3 className="sectionSubHeading">SEND AICWA MESSAGE</h3>
            <p className="descriptionParagraph">
              Complete the contact form below and one of our dedicated Business Consultants will be in touch shortly.
            </p>
            <div className="socialIconRow">
              <a href="#" className="socialBox facebook" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="socialBox twitter" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="socialBox instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="socialBox youtube" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Form wrapper wrapping Column 2 and Column 3 */}
          <form className="formFieldWrapperGrid" onSubmit={handleSubmit}>
            
            {/* Column 2: Inputs */}
            <div className="inputFieldsColumn">
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input 
                type="tel" 
                name="phoneNumber"
                placeholder="Phone Number" 
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <input 
                type="text" 
                name="subject"
                placeholder="Subject" 
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Column 3: Textarea and Action Button */}
            <div className="textareaFieldColumn">
              <textarea 
                name="comment"
                placeholder="Comment" 
                value={formData.comment}
                onChange={handleChange}
                required
              />
              <button type="submit" className="mailSubmitBtn" disabled={loading}>
                {loading ? "SENDING..." : "SENT MAIL"}
              </button>

              {successMsg && (
                <div style={{ color: "#2a9d8f", fontSize: "14px", marginTop: "12px", fontWeight: "bold" }}>
                  {successMsg}
                </div>
              )}
            </div>

          </form>

        </div>
      </div>
    </section>
  );
};

export default MainContact;