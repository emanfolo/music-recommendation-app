"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

interface YoutubeObject {
  videoId: string;
  title: string;
  artist: string;
  artwork: string;
}

const NewTabIcon = () => (
  <>
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 122.6 122.88"
    >
      <g>
        <path d="M110.6,72.58c0-3.19,2.59-5.78,5.78-5.78c3.19,0,5.78,2.59,5.78,5.78v33.19c0,4.71-1.92,8.99-5.02,12.09 c-3.1,3.1-7.38,5.02-12.09,5.02H17.11c-4.71,0-8.99-1.92-12.09-5.02c-3.1-3.1-5.02-7.38-5.02-12.09V17.19 C0,12.48,1.92,8.2,5.02,5.1C8.12,2,12.4,0.08,17.11,0.08h32.98c3.19,0,5.78,2.59,5.78,5.78c0,3.19-2.59,5.78-5.78,5.78H17.11 c-1.52,0-2.9,0.63-3.91,1.63c-1.01,1.01-1.63,2.39-1.63,3.91v88.58c0,1.52,0.63,2.9,1.63,3.91c1.01,1.01,2.39,1.63,3.91,1.63h87.95 c1.52,0,2.9-0.63,3.91-1.63s1.63-2.39,1.63-3.91V72.58L110.6,72.58z M112.42,17.46L54.01,76.6c-2.23,2.27-5.89,2.3-8.16,0.07 c-2.27-2.23-2.3-5.89-0.07-8.16l56.16-56.87H78.56c-3.19,0-5.78-2.59-5.78-5.78c0-3.19,2.59-5.78,5.78-5.78h26.5 c5.12,0,11.72-0.87,15.65,3.1c2.48,2.51,1.93,22.52,1.61,34.11c-0.08,3-0.15,5.29-0.15,6.93c0,3.19-2.59,5.78-5.78,5.78 c-3.19,0-5.78-2.59-5.78-5.78c0-0.31,0.08-3.32,0.19-7.24C110.96,30.94,111.93,22.94,112.42,17.46L112.42,17.46z" />
      </g>
    </svg>
  </>
);

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

const PlayIcon = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 122.88"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <g>
        <path d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44s-27.51,61.44-61.44,61.44S0,95.37,0,61.44S27.51,0,61.44,0L61.44,0z M83.31,65.24c3.13-2.02,3.12-4.27,0-6.06L50.98,40.6c-2.55-1.6-5.21-0.66-5.14,2.67l0.1,37.55c0.22,3.61,2.28,4.6,5.32,2.93 L83.31,65.24L83.31,65.24z M61.44,12.48c27.04,0,48.96,21.92,48.96,48.96c0,27.04-21.92,48.96-48.96,48.96S12.48,88.48,12.48,61.44 C12.48,34.4,34.4,12.48,61.44,12.48L61.44,12.48z" />
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

interface ControlCenterProps {
  onPauseHandler: () => void;
  onNextHandler: () => void;
  onPrevHandler: () => void;
  playing: boolean;
}

const ControlCenter = ({
  onPauseHandler,
  onNextHandler,
  onPrevHandler,
  playing,
}: ControlCenterProps) => {
  return (
    <div className="control-center flex justify-around w-full mt-8">
      <div className=" w-1/12 cursor-pointer" onClick={onPrevHandler}>
        <PreviousIcon />
      </div>
      <div className=" w-1/12 cursor-pointer" onClick={onPauseHandler}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </div>
      <div className=" w-1/12 cursor-pointer" onClick={onNextHandler}>
        <NextIcon />
      </div>
    </div>
  );
};

// change this to extend YoutubePlayerProps
interface PlaylistProps {
  songs: YoutubeObject[];
  currentSong: string | null;
  playing: boolean;
}

// Add conditional to add extra css if song is currently playing
const Playlist = ({ songs, currentSong, playing }: PlaylistProps) => (
  <div className=" rounded-lg border bg-slate-400  bg-opacity-50 p-2 my-6">
    <div>
      {songs.map((song) => (
        <Link
          key={song.videoId}
          target="_blank"
          href={`https://www.youtube.com/watch?v=${song.videoId}`}
          className={` group h-16 flex items-center cursor-pointer px-2 rounded-lg hover:bg-white`}
        >
          <div
            className={`h-12 w-12 overflow-hidden rounded-full items-center flex ${
              currentSong === song.videoId && playing ? "animate-rotate" : ""
            }`}
          >
            <img
              className="h-12 w-12 object-cover rounded-full"
              src={song.artwork}
              alt={`${song.title}-${song.artist}-thumbnail`}
            />
          </div>
          <div className="flex flex-col text-sm pl-4">
            <div>{song.title}</div>
            <div>{song.artist}</div>
          </div>
          <div className="h-5 w-5  ml-auto opacity-0 group-hover:opacity-70 mr-3">
            <NewTabIcon />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

interface YoutubePlayerProps {
  playlist: YoutubeObject[];
}

const YoutubePlayer = ({ playlist }: YoutubePlayerProps) => {
  const [player, setPlayer] = useState<any>();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // use this to switch between songs
  const [playlistIds, setPlaylistIds] = useState<string>();
  const [videoIds, setVideoIds] = useState<string[]>([]);

  const onReady = (e) => {
    setPlayer(e.target);
    setCurrentVideoIndex(0);
    setVideoIds(extractVideoIds(playlist));
  };

  const [playing, setPlaying] = useState(false);

  const onPauseHandler = () => {
    playing ? player.pauseVideo() : player.playVideo();
  };

  const onStateChange = (e) => {
    const newIndex = player.getPlaylistIndex();
    setCurrentVideoIndex(newIndex);
    if (e.data === 1) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  const collateVideoIds = (array: { videoId: string }[]): string => {
    return array.map((item) => item.videoId).join(",");
  };

  const extractVideoIds = (array: { videoId: string }[]) => {
    return array.map((item) => item.videoId);
  };

  const selectIndex = (index: number) => {
    setCurrentVideoIndex(index);
  };

  const changeIndex = (
    index: number,
    setIndex: (newIndex: number) => void,
    direction: "prev" | "next",
    maxIndex = 4,
  ) => {
    let newIndex;

    if (direction === "next") {
      // Increment index and loop back to 0 if it reaches maxIndex
      newIndex = (index + 1) % (maxIndex + 1);
    } else if (direction === "prev") {
      // Decrement index and loop back to maxIndex if it reaches 0
      newIndex = index === 0 ? maxIndex : index - 1;
    } else {
      throw new Error("Invalid direction");
    }
    setIndex(newIndex);
  };

  useEffect(() => {
    if (window !== undefined && playlist !== undefined && playlist.length > 0) {
      setPlaylistIds(collateVideoIds(playlist));
      // setVideoIds(playlist.map((item) => item.videoId))
    }
  });

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      playlist: playlistIds,
      controls: 0,
      loop: true,
    },
  };

  return (
    <div>
      {playlist.length > 0 && (
        <>
          <div className="glow-container mt-3">
            <YouTube
              onReady={onReady}
              opts={opts}
              onStateChange={onStateChange}
            />
          </div>
          <div className="flex flex-col justify-center">
            <ControlCenter
              onPrevHandler={() => player.previousVideo()}
              onNextHandler={() => player.nextVideo()}
              onPauseHandler={onPauseHandler}
              playing={playing}
            />
            <Playlist
              songs={playlist}
              currentSong={videoIds[currentVideoIndex]}
              playing={playing}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default YoutubePlayer;
