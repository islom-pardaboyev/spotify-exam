import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Playlist.css";
import HeaderTop from "../../../components/HeaderTop";
import { GoDotFill } from "react-icons/go";
import {
  ClockIcon,
  DownButton,
  DownloadButton,
  LikeButton,
  OptionButton,
  PLayMusicButton,
  SearchIcon,
} from "../../../assets/images/Icons";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addArray } from "../../../store/LikeSlice";

function Playlist() {
  const { id, token } = useParams();
  const [singlePlaylist, setSingePlaylist] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    axios(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        res.data.tracks.items.map((item) => {
          item.isLiked = false;
        });
        setSingePlaylist(res.data);
      })
      .catch((err) => console.error("Error fetching playlist data:", err));
  }, [id, token]);
  console.log(singlePlaylist);

  return (
    <section
      id="playlist"
      className="text-white bg-gradient-to-b from-gray-900 to-black px-[41px] h-screen overflow-y-auto"
    >
      {/* Header */}
      <HeaderTop />

      {/* Playlist Info */}
      <div className="mt-[28px] flex flex-wrap md:flex-nowrap gap-6">
        <img
          className="w-[297px] rounded-lg shadow-lg"
          src={
            singlePlaylist?.images?.[0]?.url ||
            "https://placehold.co/297x297?text=No+Image"
          }
          alt="Playlist cover"
        />
        <div className="flex-1">
          <p className="uppercase text-sm tracking-wider font-medium">
            Public Playlist
          </p>
          <h1 className="text-6xl font-bold line-clamp-1 mt-2">
            {singlePlaylist?.name}
          </h1>

          {/* Artists Summary */}
          <div className="flex items-center gap-2 mt-3">
            {singlePlaylist?.tracks?.items.slice(0, 2).map((item, index) => (
              <span key={index} className="text-white">
                {item?.track?.artists[0]?.name || "Unknown Artist"},
              </span>
            ))}
            <p>and more</p>
          </div>

          {/* Playlist Creator */}
          <div className="flex items-center text-gray-400 mt-2">
            Made for{" "}
            <span className="text-white font-medium ml-1">
              {singlePlaylist?.owner?.display_name}
            </span>
            <GoDotFill className="mx-2" />
            <span>{singlePlaylist?.tracks?.items?.length} songs</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-4">
          <PLayMusicButton className="w-14 h-14 rounded-full bg-green-500 text-black hover:bg-green-400 transition" />
          <LikeButton className="w-10 h-10 hover:scale-105 transition-transform" />
          <DownloadButton className="w-10 h-10 hover:scale-105 transition-transform" />
          <OptionButton className="w-10 h-10 hover:scale-105 transition-transform" />
        </div>
        <div className="flex items-center gap-4">
          <SearchIcon className="w-8 h-8" />
          <div className="flex items-center gap-2">
            <p>Custom Order</p>
            <DownButton className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="mt-8">
        <div className="grid grid-cols-5 gap-4 border-b border-gray-600 pb-2 text-sm text-gray-400 uppercase">
          <div className="flex gap-4 items-center col-span-2">
            <p className="min-w-[24px]">#</p>
            <p>Title</p>
          </div>
          <p>Album</p>
          <ClockIcon />
          <p>Actions</p>
        </div>

        {/* Tracks */}
        <div className="flex flex-col mt-4">
          {singlePlaylist?.tracks?.items?.map((track, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 items-center hover:bg-gray-800 p-2 rounded-lg"
            >
              <div className="flex items-center gap-4 col-span-2">
                <p className="text-gray-400">{index + 1}</p>
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-md"
                    src={
                      track?.track?.album?.images[0]?.url ||
                      "https://placehold.co/40x40?text=No+Image"
                    }
                    alt="Album cover"
                  />
                  <div>
                    <p>{track?.track?.name}</p>
                    <p className="text-xs text-gray-400">
                      {track?.track?.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
              <p className="line-clamp-2">{track?.track?.album?.name}</p>
              <p>{new Date(track?.added_at).toLocaleDateString()}</p>
              <p onClick={() => dispatch(addArray())}>
                {!track.isLiked ? (
                  <button className="scale-[.5]">
                    <LikeButton />
                  </button>
                ) : (
                  <FaHeart />
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Playlist;
