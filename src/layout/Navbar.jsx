import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  LibraryIcon,
  LikedSongs,
  SearchIcon,
  SubstractIcon,
} from "../assets/images/Icons";

function Navbar() {
  return (
    <aside className="col-span-2 h-screen bg-black overflow-y-auto">
      <nav className="flex flex-col gap-5 text-primary px-[30px] pt-[70px]">
        <NavLink to={'/'} className={"flex items-center gap-[20px]"}>
          <HomeIcon />
          <p className="nav-text">Home</p>
        </NavLink>
        <NavLink to={'/search'} className={"flex items-center gap-[20px]"}>
          <SearchIcon />
          <p className="nav-text">Search</p>
        </NavLink>
        <div className={"flex items-center gap-[20px]"}>
          <LibraryIcon />
          <p className="nav-text">Your Library</p>
        </div>
      </nav>
      <nav className="mt-[49px] flex flex-col gap-5 text-primary px-[30px]">
        <div className={"flex items-center gap-[20px]"}>
          <SubstractIcon />
          <p className="nav-text">Create Playlist</p>
        </div>
        <NavLink to={'/liked-songs'} className={"flex items-center gap-[20px] text-white"}>
          <LikedSongs/>
          <p className="nav-text">Liked Songs</p>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Navbar;
