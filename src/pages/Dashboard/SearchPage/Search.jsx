import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../../../hook/useEnv";
import "./style.css";
import { SearchIcon } from "../../../assets/images/Icons";
import useDebounce from "../../../hook/useDebounce";
import { useNavigate } from "react-router-dom";

function Search({ accessToken }) {
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchTextDebounce = useDebounce(searchText, 1000);
  const navigate = useNavigate();

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken, searchText, searchTextDebounce]);

  useEffect(() => {
    if (searchTextDebounce && accessToken) {
      spotifyApi.searchPlaylists(searchTextDebounce)
        .then((res) => {
          setPlaylist(res.body.playlists.items);
        })
        .catch((err) => {
          console.error('Error fetching playlists:', err);
        });

      spotifyApi.searchTracks(searchTextDebounce)
        .then((res) => {
          
          setTracks(res.body.tracks.items); 
        })
        .catch((err) => {
          console.error('Error fetching tracks:', err);
        });
    }
  }, [searchTextDebounce, tracks, accessToken, searchText]);

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
        <div className="grid grid-cols-12 mt-10 gap-4">
          {playlist.length > 0 ? (
            <div
              onClick={() =>
                navigate(`/playlist/${playlist[0]?.id}/${accessToken}`)
              }
              className="col-span-6 p-5 bg-black rounded-2xl cursor-pointer"
            >
              <img
                src={playlist[0]?.images[0]?.url}
                width={170}
                alt="Playlist"
              />
              <p className="text-3xl mt-5 font-semibold">{playlist[0]?.name}</p>
            </div>
          ) : (
            <div className="col-span-6 p-5 bg-black rounded-2xl">
              <p>No Playlist</p>
            </div>
          )}
          <div className="col-span-6 flex flex-col gap-2 h-[300px] overflow-y-auto p-5 bg-black rounded-2xl">
            {tracks.length > 0 ? (
              tracks.map((track, index) => (
                <div key={track.id} className="flex justify-between items-center p-2 bg-white/40 rounded-md">
                  <img src={track?.album?.images[0]?.url || 'https://placehold.co/70x70?text=No+Image'} width={70} alt="Album cover" />
                  <p>{track?.name}</p>
                </div>
              ))
            ) : (
              <div className="bg-black rounded-2xl">
                <p>No Tracks</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}

export default Search;