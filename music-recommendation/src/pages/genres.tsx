import { useRouter } from "next/navigation";
import "../app/globals.css";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions, init } from "../../firebase";

const LoadingSpinner: React.FC = () => {
  return <span className="loader"></span>;
};

const spotifySeedGenres = [
  "pop",
  "rock",
  "hip-hop",
  "rap",
  "electronic",
  "dance",
  "country",
  "folk",
  "indie",
  "alternative",
  "R&B",
  "jazz",
  "blues",
  "reggae",
  "classical",
  "metal",
  "punk",
  "soul",
  "funk",
  "ambient",
];

const Tick = () => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 457.57"
  >
    <defs></defs>
    <path
      className="cls-1"
      fillRule="evenodd"
      d="M0,220.57c100.43-1.33,121-5.2,191.79,81.5,54.29-90,114.62-167.9,179.92-235.86C436-.72,436.5-.89,512,.24,383.54,143,278.71,295.74,194.87,457.57,150,361.45,87.33,280.53,0,220.57Z"
    />
  </svg>
);

const Genres = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [validationError, setValidationError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    init().then(() => setLoading(false));
  });

  const handleClick = (e) => {
    setSelectedGenres((prevSelectedGenres) => {
      const genreId = e.target.id;
      const isGenreSelected = prevSelectedGenres.includes(genreId);

      if (isGenreSelected) {
        return prevSelectedGenres.filter((genre) => genre !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };

  // Validation function to check the length of selectedGenres
  const validateGenres = () => {
    if (selectedGenres.length < 3 || selectedGenres.length > 5) {
      setValidationError(
        "Please select between 3 and 5 of your favorite genres",
      );
      return false;
    } else {
      setValidationError("");
      return true;
    }
  };

  const handleConfirm = async () => {
    if (!validateGenres()) {
      // Validation failed, return without proceeding
      return;
    }

    const seedGenres = selectedGenres.join(", ");

    localStorage.setItem("seedGenres", seedGenres);
    router.push("/player");
  };

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen min-w-full bg-gray-200">
      <text className="my-10 text-black text-4xl">
        Select your favourite Genres
      </text>
      <div className=" flex justify-center flex-wrap max-w-md items-center ">
        {spotifySeedGenres.map((genre, index) => (
          <div
            onClick={handleClick}
            id={genre}
            key={index}
            className={`p-6 pl-5 h-11 mx-1 my-1 flex justify-center items-center ${
              selectedGenres.includes(genre) ? " bg-blue-500" : "bg-white"
            }  shadow-md text-black  rounded-xl cursor-pointer`}
          >
            <div
              className={`w-3 h-3 opacity-0 ${
                selectedGenres.includes(genre) && "opacity-100"
              }`}
            >
              <Tick />
            </div>
            {genre}
          </div>
        ))}
      </div>
      <div>
        <button
          className="m-8 p-4 border  rounded-full bg-white text-black"
          onClick={() => router.push("/")}
        >
          Restart
        </button>
        <button
          className="m-8 p-4 border  rounded-full bg-blue-500 text-black"
          onClick={handleConfirm}
        >
          Create Playlist
        </button>
        {validationError && (
          <div className="text-red-500 text-xs mt-2">{validationError}</div>
        )}
      </div>
    </div>
  );
};

export default Genres;
