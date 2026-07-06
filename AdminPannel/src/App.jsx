import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import GallaryPosting from "./Components/GallaryPosting/GallaryPosting";
import VideoPosting from "./Components/VideoPosting/VideoPosting";
import EventManagement from "./Components/EventManagement/EventManagement";
import TeamManagement from "./Components/TeamManagement/TeamManagement";
import ContactPosting from "./Components/ContactPosting/ContactPosting";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>

        <Route path="/gallery-management" element={<GallaryPosting />} />
        <Route path="/video-management" element={<VideoPosting />} />
        <Route path="/event-management" element={<EventManagement />} />
        <Route path="/team-management" element={<TeamManagement />} />
        <Route path="/contact-management" element={<ContactPosting />} />

         
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;