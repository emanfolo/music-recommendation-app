"use client";

import React, { useState } from "react";
import YouTube from "react-youtube";

const sampleBackgroundColor = {
  backgroundColor: "bg-gradient-to-r from-yellow-300 to-orange-500",
};

const extractYouTubeId = (link: string): string | null => {
  const regex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
  const match = link.match(regex);

  return match ? match[1] : null;
};

interface YoutubeObject {
  videoId: string;
  title: string;
  artist: string;
  thumbnail: string;
}

const mockData: YoutubeObject[] = [
  {
    title: "Stronger",
    artist: "Kanye West",
    videoId: "PsO6ZnUZI0g",
    thumbnail: "https://i.ytimg.com/vi/EMnQwBTJnMM/hqdefault.jpg",
  },
  {
    title: "Last Name",
    artist: "Kanye West",
    videoId: "yDVwi4XKwhY",
    thumbnail: "https://i.ytimg.com/vi/EMnQwBTJnMM/hqdefault.jpg",
  },
  {
    title: "Come to life",
    artist: "Kanye West",
    videoId: "jV2aDh8hCeI",
    thumbnail: "https://i.ytimg.com/vi/EMnQwBTJnMM/hqdefault.jpg",
  },
  {
    title: "Champagne Coast",
    artist: "Blood Orange",
    videoId: "nO6y1-erVEw",
    thumbnail: "https://i.ytimg.com/vi/EMnQwBTJnMM/hqdefault.jpg",
  },
];

const PauseIcon = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      image-rendering="optimizeQuality"
      fill-rule="evenodd"
      clip-rule="evenodd"
      viewBox="0 0 122.88 122.88"
    >
      <g>
        <path d="M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18 C29.11,6.88,44.47,0,61.44,0L61.44,0z M42.3,39.47h13.59v43.95l-13.59,0V39.47L42.3,39.47L42.3,39.47z M66.99,39.47h13.59v43.95 l-13.59,0V39.47L66.99,39.47L66.99,39.47z M97.42,25.46c-9.21-9.21-21.93-14.9-35.98-14.9c-14.05,0-26.78,5.7-35.98,14.9 c-9.21,9.21-14.9,21.93-14.9,35.98s5.7,26.78,14.9,35.98c9.21,9.21,21.93,14.9,35.98,14.9c14.05,0,26.78-5.7,35.98-14.9 c9.21-9.21,14.9-21.93,14.9-35.98S106.63,34.66,97.42,25.46L97.42,25.46z" />
      </g>
    </svg>
  </>
);

const NextIcon = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      image-rendering="optimizeQuality"
      fill-rule="evenodd"
      clip-rule="evenodd"
      viewBox="0 0 512 512"
    >
      <path
        fill-rule="nonzero"
        d="M255.99 0c70.68 0 134.7 28.66 181.02 74.98C483.33 121.3 512 185.31 512 256c0 70.68-28.67 134.69-74.99 181.01C390.69 483.33 326.67 512 255.99 512S121.3 483.33 74.98 437.01C28.66 390.69 0 326.68 0 256c0-70.67 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 255.99 0zm53.25 163.2h29.85c5.65 0 10.27 4.66 10.27 10.28v165.04c0 5.62-4.65 10.28-10.27 10.28h-29.85c-5.63 0-10.28-4.63-10.28-10.28V173.48c0-5.65 4.63-10.28 10.28-10.28zm-41.69 106.6c10.29-9.17 10.01-17.33 0-26.62l-82.3-76.78c-11.21-7.03-22.9-2.9-22.59 11.73l.44 154.47c.97 15.86 10.01 20.21 23.37 12.87l81.08-75.67zM412.74 99.25c-40.1-40.1-95.54-64.92-156.75-64.92-61.21 0-116.63 24.82-156.74 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.22 24.82 116.64 64.92 156.74 40.11 40.11 95.53 64.93 156.74 64.93 61.21 0 116.65-24.82 156.75-64.93 40.11-40.1 64.93-95.52 64.93-156.74 0-61.22-24.82-116.64-64.93-156.75z"
      />
    </svg>{" "}
  </>
);

const PreviousIcon = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      image-rendering="optimizeQuality"
      fill-rule="evenodd"
      clip-rule="evenodd"
      viewBox="0 0 512 512"
    >
      <path
        fill-rule="nonzero"
        d="M256.01 512c-70.68 0-134.7-28.66-181.03-74.98C28.66 390.7 0 326.69 0 256.01c0-70.69 28.66-134.7 74.98-181.03C121.31 28.66 185.33 0 256.01 0S390.7 28.66 437.02 74.98C483.34 121.31 512 185.33 512 256.01s-28.66 134.69-74.98 181.01C390.7 483.34 326.69 512 256.01 512zm-11.55-242.2c-10.29-9.17-10.01-17.33 0-26.62l82.3-76.78c11.21-7.03 22.9-2.9 22.59 11.73l-.43 154.47c-.98 15.86-10.02 20.21-23.38 12.87l-81.08-75.67zm-41.69 78.99h-29.85c-5.65 0-10.27-4.65-10.27-10.28V173.47c0-5.62 4.65-10.27 10.27-10.27h29.85c5.63 0 10.28 4.62 10.28 10.27v165.04c0 5.66-4.62 10.28-10.28 10.28zM99.26 412.75c40.1 40.1 95.54 64.92 156.75 64.92 61.21 0 116.63-24.82 156.74-64.92 40.1-40.11 64.92-95.53 64.92-156.74 0-61.21-24.82-116.65-64.92-156.76-40.11-40.1-95.53-64.92-156.74-64.92-61.21 0-116.65 24.82-156.75 64.92-40.11 40.11-64.93 95.53-64.93 156.76 0 61.21 24.82 116.63 64.93 156.74z"
      />
    </svg>
  </>
);

const ControlCenter = () => {
  return (
    <div className="control-center flex justify-around w-full mt-8">
      <div className=" w-1/12">
        <PreviousIcon />
      </div>
      <div className=" w-1/12">
        <PauseIcon />
      </div>
      <div className=" w-1/12">
        <NextIcon />
      </div>
    </div>
  );
};

interface PlaylistProps {
  songs: YoutubeObject[];
  currentlyPlaying: string | null;
}

// Add conditional to add extra css if song is currently playing

const Playlist = ({ songs, currentlyPlaying }: PlaylistProps) => (
  <div className=" rounded-lg border bg-slate-400  bg-opacity-50 px-4 py-2 my-6">
    <div>
      {songs.map((song) => (
        <div key={song.videoId} className={`h-16 flex items-center`}>
          <div
            className={`h-12 w-12 overflow-hidden rounded-full items-center flex ${
              currentlyPlaying === song.videoId ? "animate-rotate" : "" // Apply rotation animation if currentlyPlaying is true
            }`}
          >
            <img
              className="h-16 w-16 object-cover rounded-full"
              src={song.thumbnail}
              alt={`${song.title}-${song.artist}-thumbnail`}
            />
          </div>
          <div className="flex flex-col text-sm pl-4">
            <div>{song.title}</div>
            <div>{song.artist}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const EmbeddedYoutubePlayer = () => {
  const videoId = "PsO6ZnUZI0g"; // Replace with the actual YouTube video ID

  const [player, setPlayer] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(mockData[0].videoId);
  const onReady = (e) => {
    setPlayer(e.target);
  };

  // const onPlayPauseHandler = () => {
  //     player.playVideo()
  // }

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      playlist: "PsO6ZnUZI0g,yDVwi4XKwhY,jV2aDh8hCeI,nO6y1-erVEw",
      controls: 0,
    },
  };

  return (
    <div>
      <div className="glow-container">
        <YouTube onReady={onReady} opts={opts} />
      </div>
      <div className="flex flex-col justify-center">
        <ControlCenter />

        <Playlist songs={mockData} currentlyPlaying={mockData[0].videoId} />
      </div>
    </div>
  );
};
