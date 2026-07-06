import React from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Abouthome from "../../Components/Abouthome/Abouthome";
import Authority from "../../Components/Authority/Authority";
import Archivement from "../../Components/Archivement/Archivement";
import Contact from "../../Components/Contact/Contact";
import Events from "../../Components/Events/Events";
import TeamManagement from "../../Components/TeamManagement/TeamManagement";

const Home = () => {
  return (
    <div>
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <Abouthome />
      </section>

      <section id="achievements-gallery">
        <Archivement />
      </section>

      <section id="labour-welfare">
        <Authority />
      </section>

      <section id="events">
        <Events />
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