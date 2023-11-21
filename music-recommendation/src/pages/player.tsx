import { EmbeddedYoutubePlayer } from "app/components";
import "../app/globals.css";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions, init } from "../../firebase";

const LoadingSpinner: React.FC = () => {
  return <span className="loader"></span>;
}; 

const PlayerPage = () => {
  const [playlist, setPlaylist] = useState<any>()
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
const [is_active, setActive] = useState(false);
const [current_track, setTrack] = useState(undefined);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true)


  useEffect(() => {
    init().then(() => setLoading(false));
  });


  useEffect(() => {
    const fetchData = async () => {

   
    const mood = localStorage.getItem('moodInput')
    const seedGenres = localStorage.getItem('seedGenres')

    const requestSpotifyData = httpsCallable(functions, "getSpotifySongs");


    try {
      setDataLoading(true)

      const response = await requestSpotifyData({ mood, seedGenres });

      if (response.data === "No response from OpenAI") {
        setError("There's been an issue with OpenAI, please try again.");
      } else {
        console.log("Successfully received response:", response.data);
        setPlaylist(response)
        localStorage.setItem('data', JSON.stringify(response))
        const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    

      }

    } catch (error) {
      console.error("Error calling getSpotifySongs function:", error);
      setError("There's been an issue with our server, please try again.");
      // Cover errors properly 
    } finally {
      setDataLoading(false);
    }
  }
  fetchData()

  }, [])


  
  return (
    <div className=" h-full min-h-screen w-screen flex justify-center items-center bg-gray-200">
      {dataLoading ? (<LoadingSpinner />) : (
      <div className=" flex justify-center items-center h-40">
        <h1 className="text-xl text-black">Curated Playlist based on your mood</h1>
      </div>

      )}
    </div>
  );
};

export default PlayerPage;
