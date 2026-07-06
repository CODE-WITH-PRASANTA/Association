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
        <span className="bcMuted">You are here:</span>
        <span className="bcHome">Home</span>
        <span className="bcArrow">♦</span>
        <span className="bcCurrent">AICWA National Committee Member</span>
      </div>

      {/* Primary Decorative Dark Teal Banner Block */}
      <div className="nationalTitleRibbon">
        <div className="titleBadgeInner">NATIONAL COMMITTEE MEMBER</div>
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
        </div>
        <div className="presidentLabelMeta">
          <div className="presDesignation">President, AICWA</div>
          <div className="presContactNum">9820 982 111</div>
        </div>

        <h2 className="presidentFullIdentity">
          ER. SURESH SHYAMLAL GUPTA <br />
          <span className="subTitleOffice">
            EMPLOYEES REPRESENTATIVE FILM, T.V. <br />
            SERIAL, FIELD WORKERS & ARTISTS <br />
            (GOVERNMENT OF MAHARASHTRA)
          </span>
        </h2>
      </div>

      {/* Responsive Matrix Grid of Dynamic Database Members */}
      {loading ? (
        <div style={{ textAlign: "center", color: "#005f73", margin: "3rem 0", fontSize: "1.2rem", fontWeight: "bold" }}>
          Loading Committee Hierarchy Data...
        </div>
      ) : members.length === 0 ? (
        <div style={{ textAlign: "center", color: "#666", margin: "3rem 0" }}>
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
              </div>
              
              <div className="memberCardDetailsText">
                <span className="memberRoleTitle">{member.designation || '\u00A0'}</span>
                <h4 className="memberActualName">{member.name}</h4>
                {member.mobile && (
                  <span className="memberMobileString">MOB: {member.mobile}</span>
                )}
                {member.regdNo && (
                  <span style={{ fontSize: "11px", color: "#888", display: "block", marginTop: "2px" }}>
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