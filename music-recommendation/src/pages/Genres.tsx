import { useRouter } from "next/navigation";
import "../app/globals.css";
import { useState } from "react";
import { Nav } from "app/components";

const spotifySeedGenres = [
  "pop",
  "rock",
  "hip-hop",
  "afrobeat",
  "electronic",
  "dance",
  "country",
  "alternative",

  "dancehall",
  "folk",
  "indie",
  "r-n-b",
  "jazz",
  "blues",
  "gospel",

  "reggae",
  "classical",
  "metal",
  "punk",
  "soul",
  "funk",
  "ambient",
];

const Genres = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string>("");

  const router = useRouter();

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
    if (selectedGenres.length < 3 || selectedGenres.length >= 5) {
      setValidationError("Please select between 3 and 5 genres.");
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
    localStorage.setItem("data", "");
    router.push("/Player");
  };

  return (
    <div className=" flex flex-col justify-center items-center h-screen  bg-white max-sm:h-full">
      <Nav sticky={true} />

      <text className=" mt-40 mb-8 mx-7 text-black text-2xl">
        Select your favourite Genres
      </text>
      <div className=" flex justify-center flex-wrap max-w-md items-center ">
        {spotifySeedGenres.map((genre, index) => (
          <div
            onClick={handleClick}
            id={genre}
            key={index}
            className={`p-6 h-11 mx-1 my-1 flex hover:bg-blue-800 hover:bg-opacity-70 hover:text-white items-center ${
              selectedGenres.includes(genre)
                ? " bg-blue-800 text-white hover:bg-opacity-90"
                : "bg-white"
            }  shadow-md text-black rounded-xl cursor-pointer relative`}
          >
            {genre}
          </div>
        ))}
      </div>
      <div className="h-10 mt-6">
        <div
          className={`text-red-500 text-s  opacity-0 ${
            validationError && "opacity-100"
          }`}
        >
          {validationError}
        </div>
      </div>
      <div className="flex pt-2  max-sm:pt-0">
        <button
          className="m-8 p-4 border    w-36  rounded-lg bg-white text-black  hover:bg-blue-800 hover:text-white"
          onClick={() => router.push("/")}
        >
          Restart Flow
        </button>

        <button
          className="m-8 p-4 border w-36   rounded-lg text-white bg-black hover:bg-blue-800"
          onClick={handleConfirm}
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
};

export default Genres;
