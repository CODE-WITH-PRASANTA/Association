import React from 'react';
import './LastContact.css';
import { FaRegComments, FaRegClock, FaGlobeAmericas } from 'react-icons/fa';

const LastContact = () => {
  const cardData = [
    {
      id: 1,
      type: 'call',
      icon: <FaRegComments />,
      title: 'MAKE A CALL TO AICWA',
      isPrimary: false,
      content: (
        <div className="cardDetails">
          <p><strong>Mob:</strong> <span className="highlightGreen">+91 7700 999 457</span></p>
          <p><strong>Email:</strong> <span className="highlightGreen">aicwaofficial@gmail.com</span></p>
        </div>
      )
    },
    {
      id: 2,
      type: 'hours',
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
    },
    {
      id: 3,
      type: 'office',
      icon: <FaGlobeAmericas />,
      title: 'AICWA HEAD OFFICE ADDRESS',
      isPrimary: true, // Special styling matching Head office
      content: (
        <div className="cardDetails">
          <p><strong>Street:</strong> 5, Sunheights Building, Near Shyamlal Sohanlal Gupta Chowk, JVLR, Powai,</p>
          <p><strong>City & State:</strong> Mumbai, Maharastra</p>
          <p><strong>Country:</strong> India-400076</p>
          <p><strong>Get Direction on Google Map:</strong> <a href="#" className="mapLink">Click Here</a></p>
        </div>
      )
    },
    {
      id: 4,
      type: 'office',
      icon: <FaGlobeAmericas />,
      title: 'UTTAR PRADESH OFFICE',
      isPrimary: false,
      content: (
        <div className="cardDetails">
          <p><strong>Street:</strong> T-1, Flat No: 503, Mandakini Enclave, Awadh Vihar Yojna, Near Medanta Hospital, Shaheed Path,</p>
          <p><strong>City & State:</strong> Lucknow, Uttar Pradesh</p>
          <p><strong>Country:</strong> India-226030</p>
        </div>
      )
    },
    {
      id: 5,
      type: 'office',
      icon: <FaGlobeAmericas />,
      title: 'MADHYA PRADESH OFFICE',
      isPrimary: false,
      content: (
        <div className="cardDetails">
          <p><strong>Street:</strong> 205, Napier Town,</p>
          <p><strong>City & State:</strong> Jabalpur, Madhya Pradesh</p>
          <p><strong>Country:</strong> India-482002</p>
        </div>
      )
    },
    {
      id: 6,
      type: 'office',
      icon: <FaGlobeAmericas />,
      title: 'RAJASTHAN OFFICE',
      isPrimary: false,
      content: (
        <div className="cardDetails">
          <p><strong>Street:</strong> 250/36, Gandhi colony, Gaitore Road, Brahmpuri,</p>
          <p><strong>City & State:</strong> Jaipur, Rajasthan</p>
          <p><strong>Country:</strong> India-302002</p>
          <p><strong>Tel:</strong> +91 9799 432 954, +91 9414 459 222</p>
        </div>
      )
    },
    {
      id: 7,
      type: 'office',
      icon: <FaGlobeAmericas />,
      title: 'JAMMU & KASHMIR OFFICE',
      isPrimary: false,
      content: (
        <div className="cardDetails">
          <p><strong>Street:</strong> H.No 60, Wasser Kishtwar Near New DC Complex Kishtwar,</p>
          <p><strong>City & State:</strong> Tashil & Dist. Kishtwar, J&K</p>
          <p><strong>Country:</strong> India-182204</p>
          <p><strong>Tel:</strong> +91 9796 232 351,</p>
        </div>
      )
    },
    {
      id: 8,
      type: 'office',
      icon: <FaGlobeAmericas />,
      title: 'CHANDIGARH OFFICE',
      isPrimary: false,
      content: (
        <div className="cardDetails">
          <p><strong>Street:</strong> Grewal Associate, Scf 44, 1st floor, Back side Gopal ji Restaurant, above Katani Dhaba, Sunny Enclave, Sector 125,</p>
          <p><strong>City & State:</strong> Mohali, Punjab</p>
          <p><strong>Country:</strong> India</p>
        </div>
      )
    }
  ];

  return (
    <section className="lastContactSection">
      {/* Background geometric shapes styling */}
      <div className="geometricShape shapeLeft"></div>
      <div className="geometricShape shapeRight"></div>
      
      <div className="cardsContainerGrid">
        {cardData.map((card) => (
          <div 
            key={card.id} 
            className={`contactDisplayCard ${card.isPrimary ? 'primaryHeadOffice' : ''}`}
          >
            {/* Top aligned hanging decorative badge tag */}
            <div className={`iconBadgeTag ${card.isPrimary ? 'greenTag' : 'darkBlueTag'}`}>
              {card.icon}
            </div>

            <h3 className="cardHeaderTitle">{card.title}</h3>
            {card.content}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LastContact;