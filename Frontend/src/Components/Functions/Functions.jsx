import React, { useState } from 'react';
import './Functions.css';

export default function FunctionsPage() {
  const [activeTab, setActiveTab] = useState('functions');

  // Sidebar navigation menu options
  const menuItems = [
    { id: 'functions', label: 'FUNCTIONS OF OCWA' },
    { id: 'membership', label: 'MEMBERSHIP' },
    { id: 'benefits', label: 'BENIFITS OF OCWA' },
    { id: 'join', label: 'WHO CAN JOIN OCWA?' },
    { id: 'fees', label: 'FEES & DOCUMENTS' },
    { id: 'contact', label: 'CONTACT OCWA' }
  ];

  return (
    <div className="functionsContainerPage">
      {/* Breadcrumb Trail */}
      <nav className="breadcrumbRow" aria-label="Breadcrumb">
        <span className="bcLabel">You are here:</span>
        <span className="bcLink">Home</span>
        <span className="bcDivider">◆</span>
        <span className="bcActive">Functions of OCWA</span>
      </nav>

      {/* Main Grid Wrapper */}
      <div className="mainContentGridWrapper">
        
        {/* Left Column Content Area */}
        <main className="dynamicContentContainer transitionShow">
          <div className="tabContentBlock">
            <h1 className="contentPrimaryTitle">FUNCTIONS OF OCWA</h1>
            
            <p className="contentMainParagraph">
              OCWA, a cohesive body that perennially looks after the interests and benefits of its members. 
              No less than an amalgamation of bollywood actors, Bollywood lyricists, crew, spot boy, camera man, 
              musicians, singer and script writers who altogether create a bollywood workers association working 
              for the rights of cinema artists.
            </p>
            
            <p className="contentMainParagraph">
              OCWA aims to nurture a feeling of fellowship and unity among its members and circumvent to establish 
              the professional relations between the employer and the employee.
            </p>

            {/* Hexagonal Diagram Component Matrix */}
            <div className="hexagonDiagramWrapper">
              {/* Row 1 */}
              <div className="hexRow">
                <div className="hexShape">
                  <div className="hexInner"><span>Lyricist<br/>Singers</span></div>
                </div>
              </div>
              
              {/* Row 2 (Middle Overlap Layer) */}
              <div className="hexRow middleRow">
                <div className="hexShape">
                  <div className="hexInner"><span>Spot Boys<br/>Crew</span></div>
                </div>
                <div className="hexShape centerPrimaryHex">
                  <div className="hexInner"><span>OCWA</span></div>
                </div>
                <div className="hexShape">
                  <div className="hexInner"><span>Cameraman<br/>Cinematography</span></div>
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="hexRow">
                <div className="hexShape">
                  <div className="hexInner"><span>Debut</span></div>
                </div>
                <div className="hexShape">
                  <div className="hexInner"><span>Makeup<br/>Artists</span></div>
                </div>
                <div className="hexShape">
                  <div className="hexInner"><span>Script<br/>Writers</span></div>
                </div>
              </div>
            </div>

            <p className="contentMainParagraph footerNoticeText">
              <strong>OCWA</strong> triggers on bridging the gap between the cinema artists, bollywood production houses, 
              members, producers, directors, studios, TV networks, web networks, employers, lyricist, singers, etc. 
              arising due to infringement or dispute of the terms of their contracts or agreements by providing an apt resolution.
            </p>
          </div>
        </main>

        {/* Right Column Sidebar Menu */}
        <aside className="navigationMenuSidebar">
          <div className="sidebarMenuBlock">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`sidebarNavItemBtn ${activeTab === item.id ? 'activeSelection' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="navItemLabelText">{item.label}</span>
                <span className="navRightArrowIcon" aria-hidden="true">›</span>
              </button>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}

