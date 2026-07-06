import React from 'react';
import './NationalCommitteeMember.css';
 
const NationalCommitteeMember = () => {
  // Exact layout datasets scraped precisely from your image files
  const membersData = [
    {
      id: 1,
      role: 'Vice President- PR & Media',
      name: 'MR. VIJAY PRATAP SINGH',
      mob: '+91 9198 303 198',
      imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      role: 'General Secretary',
      name: 'MR. RAVI MAINI',
      mob: '+91 7718 849 499',
      imgUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      role: 'General Secretary-Organisation Incharge',
      name: 'ER. RAMAN PRATAP SINGH',
      mob: '+91 9473700976',
      imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      role: 'Principal Advisor',
      name: 'MR. RAHUL SHARMA',
      mob: '+91 9167 157 821',
      imgUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 5,
      role: 'Working President',
      name: 'MR. RAJESH SINGH',
      mob: '+91 9892 387743',
      imgUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 6,
      role: 'North-West India Organization Incharge',
      name: 'MR. ANIRUDH PRATAP SINGH',
      mob: '+91 9799 432 954',
      imgUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 7,
      role: 'Vice President- Strategic Planning',
      name: 'MR. RONAK SURESH JAIN',
      mob: '+91 8652485848',
      imgUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 8,
      role: '',
      name: 'MR. HRISHIKESH TAYDE',
      mob: '+91 9773 897 858',
      imgUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 9,
      role: 'Secretary',
      name: 'MS. KHUSHBOO BHAGAT',
      mob: '+91 9004 566 660',
      imgUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 10,
      role: 'Solicitor AICWA',
      name: 'MS. DHRUTI KAPADIA',
      mob: '',
      imgUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 11,
      role: 'Legal Advisor',
      name: 'ADV. VIJAY PANDEY',
      mob: '',
      imgUrl: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 12,
      role: 'Legal Advisor',
      name: 'ADV. RAVI JADHAV',
      mob: '+91 9833 604 902',
      imgUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 13,
      role: 'Legal Advisor',
      name: 'ADV. SUBHASH MACHARE',
      mob: '',
      imgUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 14,
      role: 'Legal Advisor',
      name: 'ADV. JASMINE KHURANA',
      mob: '+91 8860 603 594',
      imgUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 15,
      role: '',
      name: 'MR. VICKY SANDHU',
      mob: '+91 7009 578380',
      imgUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=60'
    }
  ];

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
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60" 
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

      {/* Responsive Matrix Grid of National Committee Associates */}
      <div className="committeeMembersGrid">
        {membersData.map((member) => (
          <div key={member.id} className="committeeProfileCard">
            <div className="memberThumbnailContainer">
              <img src={member.imgUrl} alt={member.name} className="memberThumbnailImage" />
            </div>
            
            <div className="memberCardDetailsText">
              <span className="memberRoleTitle">{member.role || '\u00A0'}</span>
              <h4 className="memberActualName">{member.name}</h4>
              {member.mob && (
                <span className="memberMobileString">MOB: {member.mob}</span>
              )}
            </div>
            {/* Sliding line highlighter layer deployed exactly relative to card bounds */}
            <div className="hoverHighlightBarSlider" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NationalCommitteeMember;