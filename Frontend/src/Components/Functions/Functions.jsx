import React, { useState } from 'react';
import './Functions.css';
import { FiChevronRight } from 'react-icons/fi';

const Functions = () => {
  const [activeTab, setActiveTab] = useState('functions');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsTransitioning(false);
    }, 250); // Matches smooth fade CSS timing
  };

  const menuItems = [
    { id: 'functions', label: 'FUNCTIONS OF OCWA' },
    { id: 'membership', label: 'MEMBERSHIP' },
    { id: 'benefits', label: 'BENIFITS OF OCWA' },
    { id: 'join', label: 'WHO CAN JOIN OCWA?' },
    { id: 'fees', label: 'FEES & DOCUMENTS' },
    { id: 'contact', label: 'CONTACT OCWA' },
  ];

  const getBreadcrumbLabel = () => {
    switch (activeTab) {
      case 'functions': return 'Functions of OCWA';
      case 'membership': return 'OCWA Membership';
      case 'benefits': return 'Benefits of OCWA';
      case 'join': return 'Who Can Join OCWA';
      case 'fees': return 'Fees & Documents';
      case 'contact': return 'Contact OCWA';
      default: return 'Functions of OCWA';
    }
  };

  return (
    <div className="functionsContainerPage">
      {/* Breadcrumb Navigation Line */}
      <div className="breadcrumbRow">
        <span className="bcLabel">You are here:</span>
        <span className="bcLink">Home</span>
        <span className="bcDivider">♦</span>
        <span className="bcActive">{getBreadcrumbLabel()}</span>
        <span className="bcDivider">♦</span>
      </div>

      <div className="mainContentGridWrapper">
        {/* Left Column Dynamic Content Area */}
        <div className={`dynamicContentContainer ${isTransitioning ? 'transitionHidden' : 'transitionShow'}`}>
          
          {activeTab === 'functions' && (
            <div className="tabContentBlock">
              <h1 className="contentPrimaryTitle">FUNCTIONS OF OCWA</h1>
              <p className="contentMainParagraph">
                OCWA, a cohesive body that perennially looks after the interests and benefits of its members. No less than an amalgamation of bollywood actors, Bollywood lyricists, crew, spot boy, camera man, musicians, singer and script writers who altogether create a bollywood workers association working for the rights of cinema artists.
              </p>
              <p className="contentMainParagraph">
                OCWA aims to nurture a feeling of fellowship and unity among its members and circumvent to establish the professional relations between the employer and the employee.
              </p>

              {/* Hexagon Diagram Layout */}
              <div className="hexagonDiagramWrapper">
                <div className="hexRow topRow">
                  <div className="hexShape orangeHex">
                    <div className="hexInner"><span>Lyricist<br />singers</span></div>
                  </div>
                </div>
                <div className="hexRow middleRow">
                  <div className="hexShape orangeHex">
                    <div className="hexInner"><span>Spot boys<br />Crew</span></div>
                  </div>
                  <div className="hexShape orangeHex centerPrimaryHex">
                    <div className="hexInner"><span>OCWA</span></div>
                  </div>
                  <div className="hexShape orangeHex">
                    <div className="hexInner"><span>Cameraman<br />Cinematography</span></div>
                  </div>
                </div>
                <div className="hexRow bottomRow">
                  <div className="hexShape orangeHex">
                    <div className="hexInner"><span>Debut</span></div>
                  </div>
                  <div className="hexShape orangeHex">
                    <div className="hexInner"><span>Makeup<br />artists</span></div>
                  </div>
                  <div className="hexShape orangeHex">
                    <div className="hexInner"><span>Script<br />writers</span></div>
                  </div>
                </div>
              </div>

              <p className="contentMainParagraph footerNoticeText">
                <strong>OCWA</strong> triggers on bridging the gap between the cinema artists, bollywood production houses, members, producers, directors, studios, TV networks, web networks, employers, lyricist, singers, etc. arising due to infringement or dispute of the terms of their contracts or agreements by providing an apt resolution.
              </p>
            </div>
          )}

          {activeTab === 'membership' && (
            <div className="tabContentBlock">
              <h1 className="contentPrimaryTitle">OCWA MEMBERSHIP</h1>
              <p className="contentMainParagraph largeLineHeight">
                When you’re a part of <strong>OCWA</strong>, you’re part of the strongest, full-service cultural & film association in India. Our strong professionals have got your back as we negotiate with some of the strongest collective agreements for performers in the world and we stand together to make sure engagers deliver the pay and protections that we’ve been promised. We ensure all workers have their voices heard throughout the entertainment industry through our organisation.
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="tabContentBlock">
              <h1 className="contentPrimaryTitle">BENEFITS OF OCWA</h1>
              <p className="contentMainParagraph">
                As a registered member of the All Indian Cine Workers Association, you are granted extensive occupational protection, legal counsel access for contract validation, and health insurance safeguards tailored specifically for entertainment technicians, performers, and production specialists.
              </p>
            </div>
          )}

          {activeTab === 'join' && (
            <div className="tabContentBlock">
              <h1 className="contentPrimaryTitle">WHO CAN JOIN OCWA?</h1>
              <p className="contentMainParagraph">
                Membership extends globally to all Indian citizens actively employed or contracted within Indian Media and Cinema operations. This includes background talents, musicians, technicians, production team members, directors, visual designers, scriptwriters, and media students specializing in creative trades.
              </p>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="tabContentBlock">
              <h1 className="contentPrimaryTitle">FEES & DOCUMENTS</h1>
              <p className="contentMainParagraph">
                Applicants must render standard proof of professional execution (credits or current portfolio references), valid government ID validation documents, current residential tracking forms, alongside normalized processing registration fee receipts. Full documentation packs can be submitted online or directly to regional hub offices.
              </p>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="tabContentBlock">
              <h1 className="contentPrimaryTitle">CONTACT OCWA</h1>
              <p className="contentMainParagraph">
                Our main grievance handling branches run actively nationwide. If you require registration oversight support or need dispute settlement consulting, communicate directly through centralized helplines or coordinate directly with our local regional coordinators.
              </p>
            </div>
          )}

        </div>

        {/* Right Column Interactive Menu Component */}
        <aside className="navigationMenuSidebar">
          <nav className="sidebarMenuBlock">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`sidebarNavItemBtn ${activeTab === item.id ? 'activeSelection' : ''}`}
                onClick={() => handleTabChange(item.id)}
              >
                <span className="navItemLabelText">{item.label}</span>
                <FiChevronRight className="navRightArrowIcon" />
              </button>
            ))}
          </nav>
        </aside>

      </div>
    </div>
  );
};

export default Functions;