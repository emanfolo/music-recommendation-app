"use client";
import dynamic from "next/dynamic";
import { Nav } from "app/components";
import "../app/globals.css";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { init, functions } from "../../firebase";
const DynamicYoutubePlayer = dynamic(
  () => import("../app/components/YoutubePlayer"),
  { ssr: false, loading: () => <p>Loading...</p> },
);

interface YoutubeObject {
  videoId: string; //change soon
  title: string;
  artist: string;
  artwork: string;
}

const LoadingSpinner: React.FC = () => {
  return <span className="loader"></span>;
};

const PlayerPage = () => {
  const [playlist, setPlaylist] = useState<YoutubeObject[]>([]); // Add type checks
  const [error, setError] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const mood = localStorage.getItem("moodInput");
      const seedGenres = localStorage.getItem("seedGenres");
      const requestData = httpsCallable<
        { mood: string | null; seedGenres: string | null },
        { responseData: YoutubeObject[] }
      >(functions, "getYoutubeData");

      try {
        const response = await requestData({ mood, seedGenres });
        setPlaylist([...response.data.responseData, ...playlist]);
        localStorage.setItem("data", JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        setDataLoading(false);
        console.error("Error calling getYoutubeData function:", error);
        setError("There's been an issue with our server, please try again.");
      } finally {
        setDataLoading(false);
      }
    };

    const localData = JSON.parse(localStorage.getItem("data") || "{}");
    if (
      Object.keys(localData).length > 0 &&
      localData.responseData &&
      localData.responseData.length > 0
    ) {
      setPlaylist([...localData.responseData, ...playlist]);
      setDataLoading(false);
    } else {
      setDataLoading(true);
      init().then(() => fetchData());
    }
  }, []);

  return (
    <div className=" h-full min-h-screen w-screen flex flex-col justify-center items-center bg-white">
      {dataLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Nav sticky={false} />
          <DynamicYoutubePlayer playlist={playlist} />
        </>
      )}
    </div>
  );
};

export default PlayerPage;
