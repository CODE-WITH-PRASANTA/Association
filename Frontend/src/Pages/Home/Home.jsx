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

      {/* REMOVED # FROM IDs BELOW */}
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
      </section>
    </div>
  );
};
export default Home;