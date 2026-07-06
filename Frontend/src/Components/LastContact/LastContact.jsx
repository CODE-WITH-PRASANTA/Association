import React, { useState, useEffect } from 'react';
import API from "../../api/axios"; // <-- Import configured Axios instance from client config
import './LastContact.css';
import { FaRegComments, FaRegClock, FaGlobeAmericas } from 'react-icons/fa';

const LastContact = () => {
  const [dynamicContacts, setDynamicContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Synchronously download saved database submissions on component mount
  useEffect(() => {
    const loadDynamicCards = async () => {
      try {
        const res = await API.get("/contact");
        setDynamicContacts(res.data);
      } catch (error) {
        console.error("Could not download dynamically assigned office records:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDynamicCards();
  }, []);

  /* Static Fallback default card sets for Core operations if dynamic records are pending layout configurations */
  const fallbackStaticHours = {
    id: 'static-hours',
    icon: <FaRegClock />,
    title: 'WORKING HOURS',
    isPrimary: false,
    content: (
      <div className="cardDetails">
        <p className="subtitleInfo">Find out opening hours and information.</p>
        <p style={{ marginTop: '16px' }}><strong>Mon-Fri:</strong> 8:00 am – 19:00pm</p>
        <p><strong>Saturday:</strong> 8:00 am – 13:00pm</p>
        <p><strong>Sunday:</strong> Closed</p>
      </div>
    )
  };

  return (
    <section className="lastContactSection">
      {/* Background geometric shapes styling */}
      <div className="geometricShape shapeLeft"></div>
      <div className="geometricShape shapeRight"></div>
      
      <div className="cardsContainerGrid">
        
        {/* Render standard Working Hours Card natively first */}
        <div className="contactDisplayCard">
          <div className="iconBadgeTag darkBlueTag">
            {fallbackStaticHours.icon}
          </div>
          <h3 className="cardHeaderTitle">{fallbackStaticHours.title}</h3>
          {fallbackStaticHours.content}
        </div>

        {/* Dynamic User Postings Render Pipeline */}
        {loading ? (
          <div style={{ color: "#fff", gridColumn: "1/-1", textAlign: "center", padding: "2rem" }}>
            Loading Dynamic Office Logs...
          </div>
        ) : dynamicContacts.length === 0 ? (
          <div style={{ color: "#aaa", gridColumn: "1/-1", textAlign: "center", padding: "2rem" }}>
            No administrative contact entries logged in database.
          </div>
        ) : (
          dynamicContacts.map((contact, index) => {
            // Stylistic toggle: Assign primary header design layout properties to first data entry index dynamically
            const isHeadOfficeIdx = index === 0;

            return (
              <div 
                key={contact._id} 
                className={`contactDisplayCard ${isHeadOfficeIdx ? 'primaryHeadOffice' : ''}`}
              >
                <div className={`iconBadgeTag ${isHeadOfficeIdx ? 'greenTag' : 'darkBlueTag'}`}>
                  {isHeadOfficeIdx ? <FaRegComments /> : <FaGlobeAmericas />}
                </div>

                {/* Uses the dynamic database 'subject' field as the main heading designation badge */}
                <h3 className="cardHeaderTitle">{contact.subject ? contact.subject.toUpperCase() : "AICWA CONTACT BRANCH"}</h3>
                
                <div className="cardDetails">
                  <p><strong>Representative:</strong> {contact.name}</p>
                  <p><strong>Mob:</strong> <span className="highlightGreen">{contact.phone}</span></p>
                  <p><strong>Email:</strong> <span className="highlightGreen">{contact.email}</span></p>
                  {contact.message && (
                    <p style={{ marginTop: "10px", borderTop: "1px dashed rgba(255,255,255,0.15)", paddingTop: "8px" }}>
                      <strong>Address Details:</strong> {contact.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default LastContact;