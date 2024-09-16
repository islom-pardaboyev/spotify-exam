import React from 'react'
import SpotifyWebPlayer from 'react-spotify-web-playback'

function Playback({accessToken}) {
  return (
    <SpotifyWebPlayer token={accessToken}/>
  )
}

export default Playback