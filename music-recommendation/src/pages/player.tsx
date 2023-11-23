"use client";
import { YoutubePlayer } from "app/components";
import "../app/globals.css";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions, init } from "../../firebase";

const LoadingSpinner: React.FC = () => {
  return <span className="loader"></span>;
};

const PlayerPage = () => {
  const [playlist, setPlaylist] = useState<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    init().then(() => setLoading(false));
  });

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      const mood = localStorage.getItem("moodInput");
      const seedGenres = localStorage.getItem("seedGenres");

      const requestSpotifyData = httpsCallable(functions, "getSpotifySongs");

      try {
        setDataLoading(true);

        const response = await requestSpotifyData({ mood, seedGenres });

        if (response.data === "No response from OpenAI") {
          setError("There's been an issue with OpenAI, please try again.");
        } else {
          console.log("Successfully received response:", response.data);
          setPlaylist(response.data); // add type checks soon
          localStorage.setItem("data", JSON.stringify(response.data));
          return response.data;
        }
      } catch (error) {
        console.error("Error calling getSpotifySongs function:", error);
        setError("There's been an issue with our server, please try again.");
      } finally {
        setDataLoading(false);
      }
    };

    const localData = JSON.parse(localStorage.getItem("data") || "{}");
    if (typeof localData.responseData[0].videoId === "string") {
      setPlaylist(localData.responseData);
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className=" h-full w-screen flex justify-center items-center bg-gray-200">
      {dataLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className=" h-full flex flex-col justify-center items-center">
            <h1 className="text-xl text-black my-12">
              Curated Playlist based on your mood
            </h1>
            <div>
              <YoutubePlayer playlist={playlist} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerPage;
