import React, { useState, useEffect, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { LikeButton } from "../assets/images/Icons";
import { addArray } from "../store/LikeSlice";
import { useDispatch } from "react-redux";
import { Context } from "../context/Context";

function PlayListMusicCard({ index, track }) {
  const [liked, setLiked] = useState(JSON.parse(window.localStorage.getItem(`likedState-${track?.track?.id}`)) || false);
  const dispatch = useDispatch();
  const {setPlay, setPlaying, play, playing} = useContext(Context)

  const handleLike = () => {
    const newLikedState = true;
    setLiked(newLikedState);
    dispatch(addArray(track));
  };

  useEffect(() => {
    window.localStorage.setItem(`likedState-${track?.track?.id}`, JSON.stringify(liked));
  }, [liked, track]);
  

  return (
    <div onClick={() => {
      setPlay(track?.track?.uri)
      setPlaying(true)
    }}
      key={index}
      className="grid grid-cols-12 gap-4 items-center hover:bg-gray-800 p-2 rounded-lg"
    >
      <div className="flex items-center gap-4 col-span-5">
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
            <p className="line-clamp-1">{track?.track?.name}</p>
            <p className="text-xs text-gray-400 line-clamp-1">
              {track?.track?.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <p className="line-clamp-2 col-span-4 text-primary-5">{track?.track?.album?.name}</p>
      <div className="flex items-center">
        <p onClick={handleLike}>
          {liked ? (
            <button className="text-green-500 mr-2">
              <FaHeart />
            </button>
          ) : (
            <button className="scale-[.5] text-green-500">
              <LikeButton />
            </button>
          )}
        </p>
        <p>{!track.isLiked ? new Date(track?.added_at).toLocaleDateString() : ""}</p>
      </div>
    </div>
  );
}

export default PlayListMusicCard;