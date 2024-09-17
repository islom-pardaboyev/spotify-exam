import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { Home, LikedSongs, Playlist, Search } from "../../pages/Dashboard";
import Navbar from "../../layout/Navbar";
import Panel from "../../layout/Panel";
import {CLIENT_ID} from "../../hook/useEnv"
import { useAuth } from "../../hook/useAuth";
import Playback from "../../components/Playback";

function DashboardRoutes({ code }) {
  const [play, setPlay] = useState()
  const [playing, setPlaying] = useState(false)
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });
  const accessToken = useAuth(code);
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  return (
    <div className="grid grid-cols-12">
      <Navbar />
      <main className="col-span-8 h-screen overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home setPlay={setPlay} setPlaying={setPlaying} accessToken={accessToken} />} />
          <Route path="/search" element={<Search accessToken={accessToken}/>}/>
          <Route path="/liked-songs" element={<LikedSongs />} />
          <Route path="/playlist/:id/:token" element={<Playlist />} />
        </Routes>
       <Playback play={play} setPlaying={setPlaying} playing={playing} accessToken={accessToken}/>
      </main>
      <Panel />
    </div>
  );
}

export default DashboardRoutes;
