import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./MainLayout.css";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebar(!mobileSidebar);
  };

  return (
    <div className="MainLayout">

      <Sidebar
        collapsed={collapsed}
        mobileSidebar={mobileSidebar}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      <div
        className={`MainLayout-content ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <Topbar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
        />

        <div className="MainLayout-page">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default MainLayout;