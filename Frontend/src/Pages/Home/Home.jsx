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
        <MainHeroSection />
        <HeroSection />
        <Abouthome/>
        <Authority/>
        <Archivement/>
        {/* <Contact/> */}
       
        <Events/>
        <Functions/>
        <NationalCommitteeMember />
    </div>
  )
}

export default Home