import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailTo = "contact@aicwa.org"; 
    const emailSubject = encodeURIComponent(formData.subject || "AICWA Message");
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone Number: ${formData.phoneNumber}\n\n` +
      `Comment:\n${formData.comment}`
    );

    window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
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
              <button type="submit" className="mailSubmitBtn">
                SENT MAIL
              </button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
};

export default MainContact;