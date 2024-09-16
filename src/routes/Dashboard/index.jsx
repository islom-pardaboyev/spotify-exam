import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, LikedSongs, Playlist } from "../../pages/Dashboard";
import Navbar from "../../layout/Navbar";
import Panel from "../../layout/Panel";
import HeaderTop from "../../components/HeaderTop";

function DashboardRoutes({ code }) {
  return (
    <div className="grid grid-cols-12">
      <Navbar />
      <main className="col-span-8 h-screen overflow-y-auto">
        
        <Routes>
          <Route path="/" element={<Home code={code} />} />
          <Route path="/liked-songs" element={<LikedSongs />} />
          <Route path="/playlist/:id/:token" element={<Playlist />} />
        </Routes>
      </main>
      <Panel />
    </div>
  );
}

export default DashboardRoutes;
