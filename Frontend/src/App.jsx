import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import EventDetails from "./Components/EventDetails/EventDetails";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";
import ContactSection from "./Pages/ContactSection/ContactSection";
import TopBar from "./Components/TopBar/TopBar";



function App() {
  return (
    <BrowserRouter>
<TopBar/>
      <Navbar />

      <Routes>

       <Route path="/" element={<Home />} />
       <Route path="/eventdetails" element={<EventDetails/>}/>
       <Route path="/contact" element={<ContactSection />} />
       

      </Routes>
      <FloatingIcons/>

      <Footer />

    </BrowserRouter>
  );
}

export default App;