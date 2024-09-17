import React from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";

function Playback({ play, setPlaying, playing, accessToken }) {
  return (
    <SpotifyWebPlayer
      play={playing}
      token={accessToken}
      uris={play ? [play] : []}
      callback={(state) => {
        if (!state.isPlaying) {
          setPlaying(false);
        }
      }}
    />
  );
}

export default Playback;