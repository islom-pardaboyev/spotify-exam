import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hook/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../../../hook/useEnv";
import "./style.css";
import { SearchIcon } from "../../../assets/images/Icons";
import useDebounce from "../../../hook/useDebounce";

function Search({ accessToken }) {
 
  const [playlist, setPlaylist] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchTextDebounce = useDebounce(searchText, 1000);

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, searchText]);

  useEffect(() => {
    if (searchText && accessToken) {
      spotifyApi
        .searchTracks(searchText)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchText]);
    
  return (
    <section id="search" className="h-screen overflow-y-auto text-white">
      <main className="px-[40px]">
        <div className="rounded-full flex gap-3 items-center p-3 mt-3 bg-black">
          <p className="scale-[.6]">
            <SearchIcon />
          </p>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="bg-transparent w-full outline-none"
            placeholder="Enter playlist name..."
          />
        </div>
      </main>
    </section>
  );
}

export default Search;
