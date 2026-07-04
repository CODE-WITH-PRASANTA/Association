import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Abouthome from '../../Components/Abouthome/Abouthome'
import Authority from '../../Components/Authority/Authority'
import Archivement from '../../Components/Archivement/Archivement'
import Contact from '../../Components/Contact/Contact'
import Events from '../../Components/Events/Events'
import TeamManagement from '../../Components/TeamManagement/TeamManagement'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <Abouthome/>
        <Authority/>
        <Archivement/>
        <Contact/>
        <TeamManagement/>
        <Events/>
    </div>
  )
}

export default Home