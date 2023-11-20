import { EmbeddedYoutubePlayer } from "app/components";
import "../app/globals.css";

const sampleBackgroundColor = {
  backgroundColor: "bg-gradient-to-r from-yellow-300 to-orange-500",
};
const PlayerPage = () => {
  return (
    <div className=" h-full min-h-screen w-screen bg-gradient-to-r from-yellow-300 to-orange-500">
      <div className=" flex justify-center items-center h-40">
        <h1 className="text-xl">Curated Playlist based on your mood</h1>
      </div>
      <div className=" flex justify-center items-center h-auto">
        <EmbeddedYoutubePlayer />
      </div>
    </div>
  );
};

export default PlayerPage;
