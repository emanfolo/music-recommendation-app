import { useRouter } from "next/navigation";
import "../app/globals.css";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.jpeg";

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

  const handleClick = (genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      const isGenreSelected = prevSelectedGenres.includes(genre);

      if (isGenreSelected) {
        return prevSelectedGenres.filter((g) => g !== genre);
      } else {
        return [...prevSelectedGenres, genre];
      }
    });
  };

  // Validation function to check the length of selectedGenres
  const validateGenres = () => {
    if (selectedGenres.length < 3 || selectedGenres.length > 5) {
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

  const genreClass = (isSelected) =>
    `p-6 h-11 mx-1 my-1 flex hover:bg-blue-800 hover:bg-opacity-70 hover:text-white items-center ${
      isSelected ? "bg-blue-800 text-white hover:bg-opacity-90" : "bg-white"
    }  shadow-md text-black rounded-xl cursor-pointer relative`;

  return (
    <div className=" flex flex-col justify-center items-center  min-h-screen  bg-white max-sm:h-full">
      <a
        href="/"
        className="flex items-center space-x-3 rtl:space-x-reverse flex-shrink-0"
      >
        <Image src={logo} alt="Mood Sync Logo" height={160} width={160} />
      </a>
      <text className=" mt-3 mb-8 mx-7 text-black text-2xl text-center">
        Select your favourite Genres
      </text>
      <div className=" flex justify-center flex-wrap max-w-md items-center ">
        {spotifySeedGenres.map((genre, index) => (
          <div
            onClick={() => handleClick(genre)}
            id={genre}
            key={index}
            className={genreClass(selectedGenres.includes(genre))}
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
      <div className="flex pt-2 justify-around mb-4 w-full min-[400px]:max-w-md">
        <button
          className=" p-4 border    w-36  rounded-lg bg-white text-black  hover:bg-blue-800 hover:text-white"
          onClick={() => router.push("/")}
        >
          Restart Flow
        </button>

        <button
          className="p-4 border w-36   rounded-lg text-white bg-black hover:bg-blue-800"
          onClick={handleConfirm}
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
};

export default Genres;
