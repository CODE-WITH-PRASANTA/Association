import React, { useState, useEffect } from 'react';
import API, { IMG_URL } from "../../api/axios"; 
import './NationalCommitteeMember.css';

// 1. Import your saved photo file here
import presidentPhoto from '../../assets/main.jpeg'; 

const NationalCommitteeMember = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team array dynamically from your backend API
  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const res = await API.get("/team");
        setMembers(res.data);
      } catch (error) {
        console.error("Failed to load national committee members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommittee();
  }, []);

  return (
    <div className="committeeContainerLayout">
      {/* Top Breadcrumb String Bar Component */}
      <div className="headerBreadcrumbRow">
       
       
      </div>

      {/* Primary Decorative Dark Teal Banner Block */}
      <div className="nationalTitleRibbon">
        <span className="ribbonAccentDot" />
        <div className="titleBadgeInner">Odisha Committee Member</div>
      </div>

      {/* Centered Top Tier Core Head Executive Structure (President Block) */}
      <div className="presidentShowcaseSection">
        <div className="presidentAvatarRing">
          <div className="gradientBorderCircle">
            {/* 2. Fixed Image tag syntax to use your imported president local photo */}
            <img 
              src={presidentPhoto} 
              alt="President ER. SURESH SHYAMLAL GUPTA" 
              className="presidentImgProfile" 
            />
          </div>
          <span className="presidentBadgeSeal">President</span>
        </div>
        <div className="presidentLabelMeta">
          <div className="presDesignation">President, OCWA</div>
          <div className="presContactNum">+91 99374 68228</div>
        </div>

        <h2 className="presidentFullIdentity">
          ER. SURESH SHYAMLAL GUPTA <br />
          <span className="subTitleOffice">
            EMPLOYEES REPRESENTATIVE FILM, T.V. <br />
            SERIAL, FIELD WORKERS &amp; ARTISTS <br />
            (GOVERNMENT OF ODISHA)
          </span>
        </h2>
      </div>

      {/* Responsive Matrix Grid of Dynamic Database Members */}
      {loading ? (
        <div className="committeeStateNotice committeeStateNotice--loading">
          <span className="committeeSpinner" />
          Loading Committee Hierarchy Data...
        </div>
      ) : members.length === 0 ? (
        <div className="committeeStateNotice committeeStateNotice--empty">
          No dynamic registry items found. Populate via administrative dashboard panel.
        </div>
      ) : (
        <div className="committeeMembersGrid">
          {members.map((member) => (
            <div key={member._id} className="committeeProfileCard">
              <div className="memberThumbnailContainer">
                <img 
                  src={`${IMG_URL}/uploads/${member.photo}`} 
                  alt={member.name} 
                  className="memberThumbnailImage" 
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60";
                  }}
                />
                <span className="memberThumbnailOverlay" />
              </div>
              
              <div className="memberCardDetailsText">
                <span className="memberRoleTitle">{member.designation || '\u00A0'}</span>
                <h4 className="memberActualName">{member.name}</h4>
                {member.mobile && (
                  <span className="memberMobileString">MOB: {member.mobile}</span>
                )}
                {member.regdNo && (
                  <span className="memberRegdString">
                    REG: {member.regdNo}
                  </span>
                )}
              </div>
              <div className="hoverHighlightBarSlider" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NationalCommitteeMember;