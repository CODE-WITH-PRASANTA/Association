<<<<<<< HEAD
import React from "react";

import MainHeroSection from "../../Components/MainHeroSection/MainHeroSection";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Abouthome from "../../Components/Abouthome/Abouthome";
import Authority from "../../Components/Authority/Authority";
import Archivement from "../../Components/Archivement/Archivement";
import Events from "../../Components/Events/Events";
import Functions from "../../Components/Functions/Functions";
import NationalCommitteeMember from "../../Components/NationalCommitteeMember/NationalCommitteeMember";
import TeamManagement from "../../Components/TeamManagement/TeamManagement";
import Contact from "../../Components/Contact/Contact";
=======
import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Abouthome from '../../Components/Abouthome/Abouthome'
import Authority from '../../Components/Authority/Authority'
import Archivement from '../../Components/Archivement/Archivement'
import Contact from '../../Components/Contact/Contact'
import Events from '../../Components/Events/Events'
import TeamManagement from '../../Components/TeamManagement/TeamManagement'
import MainHeroSection from '../../Components/MainHeroSection/MainHeroSection'
import Functions from '../../Components/OCWA/OCWA'
import NationalCommitteeMember from '../../Components/NationalCommitteeMember/NationalCommitteeMember'
>>>>>>> 9e067f78f74b4fd3820753695afd5d0c74b1ea76

const Home = () => {
  return (
    <div>
      <section id="home">
        <MainHeroSection />
        <HeroSection />
      </section>

      <section id="about">
        <Abouthome />
      </section>

      <section id="labour-welfare">
        <Authority />
      </section>

      <section id="achievements-gallery">
        <Archivement />
      </section>

      <section id="events">
        <Events />
      </section>

      <section id="functions">
        <Functions />
      </section>

      <section id="national-committee-member">
        <NationalCommitteeMember />
      </section>

      <section id="team-members">
        <TeamManagement />
      </section>

      <section id="contact">
        <Contact />
        {/* If you don't want Contact, comment the line above */}
      </section>
    </div>
  );
};

export default Home;