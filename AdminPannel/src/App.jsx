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
import ArchivePosting from "./Components/ArchivePosting/ArchivePosting";

import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* PROTECTED ADMIN PANEL */}
        <Route element={<ProtectedRoute />}>
          
          <Route element={<MainLayout />}>

            <Route
              path="/gallery-management"
              element={<GallaryPosting />}
            />

            <Route
              path="/video-management"
              element={<VideoPosting />}
            />

            <Route
              path="/event-management"
              element={<EventManagement />}
            />

            <Route
              path="/team-management"
              element={<TeamManagement />}
            />

            <Route
              path="/contact-management"
              element={<ContactPosting />}
            />

            <Route
              path="/archive-management"
              element={<ArchivePosting />}
            />

          </Route>

        </Route>

        {/* UNKNOWN URL */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;