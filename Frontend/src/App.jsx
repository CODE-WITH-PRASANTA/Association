import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import EventDetails from "./Components/EventDetails/EventDetails";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";




function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

       <Route path="/" element={<Home />} />
       <Route path="/eventdetails" element={<EventDetails/>}/>

      </Routes>
      <FloatingIcons/>

      <Footer />

    </BrowserRouter>
  );
}

export default App;