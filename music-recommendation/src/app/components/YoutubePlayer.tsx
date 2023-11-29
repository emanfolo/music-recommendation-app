"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import {
  PlayIcon,
  PauseIcon,
  NextIcon,
  PreviousIcon,
  NewTabIcon,
} from "app/icons";

interface YoutubeObject {
  videoId: string;
  title: string;
  artist: string;
  artwork: string;
}

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
    <div
      className="control-center flex justify-around w-full mt-8"
      role="region"
      aria-label="Media Controls"
    >
      <div
        className=" w-1/12 cursor-pointer"
        aria-label="Previous"
        onClick={onPrevHandler}
      >
        <PreviousIcon />
      </div>
      <div
        className=" w-1/12 cursor-pointer"
        aria-label={playing ? "Pause" : "Play"}
        onClick={onPauseHandler}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </div>
      <div
        className=" w-1/12 cursor-pointer"
        aria-label="Next"
        onClick={onNextHandler}
      >
        <NextIcon />
      </div>
    </div>
  );
};

interface PlaylistProps {
  songs: YoutubeObject[];
  currentSong: string | null;
  playing: boolean;
}

const Playlist = ({ songs, currentSong, playing }: PlaylistProps) => (
  <div className=" rounded-lg border bg-slate-400  bg-opacity-50 p-2 my-6 mx-2">
    <div className="sr-only absolute">Currently playing: {currentSong}</div>

    <div>
      {songs.map((song) => (
        <Link
          key={song.videoId}
          target="_blank"
          href={`https://www.youtube.com/watch?v=${song.videoId}`}
          className={` group h-16 flex items-center cursor-pointer px-2 rounded-lg hover:bg-white`}
        >
          <div
            className={`h-12 w-12 overflow-hidden rounded-full items-center flex  flex-shrink-0 ${
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
            <div className=" text-black">{song.title}</div>
            <div className=" text-black  font-medium">{song.artist}</div>
          </div>
          <div className=" ml-auto flex gap-3">
            <div className={"music-bar"}>
              <span
                className={
                  currentSong === song.videoId && playing
                    ? "music-bar-span"
                    : ""
                }
              />
              <span
                className={
                  currentSong === song.videoId && playing
                    ? "music-bar-span"
                    : ""
                }
              />

              <span
                className={
                  currentSong === song.videoId && playing
                    ? "music-bar-span"
                    : ""
                }
              />
            </div>
            <div className="h-5 w-5 opacity-0 group-hover:opacity-70 mr-3">
              <NewTabIcon />
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

interface YoutubePlayerProps {
  playlist: YoutubeObject[];
  mood: string | null;
}

const YoutubePlayer = ({ playlist, mood }: YoutubePlayerProps) => {
  const [player, setPlayer] = useState<any>();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playlistIds, setPlaylistIds] = useState<string>();
  const [videoIds, setVideoIds] = useState<string[]>([]);

  const onReady = (e) => {
    setPlayer(e.target);
    setCurrentVideoIndex(0);
    setVideoIds(extractVideoIds(playlist));

    e.target.g.style.width = "100%";
    e.target.g.style.height = "100%";
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

  useEffect(() => {
    if (window !== undefined && playlist !== undefined && playlist.length > 0) {
      setPlaylistIds(collateVideoIds(playlist));
    }
  }, [playlist]);

  const opts = {
    height: "420",
    width: "750",
    playerVars: {
      autoplay: 1,
      playlist: playlistIds,
      controls: 1,
      loop: true,
    },
  };
  return (
    <div>
      {playlist.length > 0 && (
        <>
          {mood && <p className="text-center font-bold">{mood}</p>}
          <div
            className={`mx-auto mt-10 max-[410px]:w-[355px] max-[410px]:h-[200px] w-[400px] h-[225px] sm:w-[550px] sm:h-[309px] md:w-[750px] md:h-[420px] lg:w-[850px] lg:h-[478px] ${
              playing && "glow-container"
            }`}
          >
            <YouTube
              style={{ width: "100%", height: "100%" }}
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
