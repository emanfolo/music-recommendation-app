"use client";

import { useRef, useState, useEffect } from "react";
import { httpsCallable } from "firebase/functions";
import { functions, init } from "../../../firebase";
import { LoadingSpinnerSmall } from ".";

export const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    init().then(() => setLoading(false));
  });

  // const page2Ref = useRef<HTMLDivElement | null>(null);
  // const arrowRef = useRef<HTMLDivElement | null>(null);
  // const scrollToPage = () => {
  //   if (page2Ref.current) {
  //     page2Ref.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const [mood, setMood] = useState<string>("");
  const [colorScheme, setColorScheme] = useState("white")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMood(event.target.value);
  };

  const handleButtonClick = () => {
    // Perform actions with the mood state if needed
    console.log(`Mood: ${mood}`);
  };

  const handleMoodEntered = async () => {
    setLoading(true);
  
    const handleMoodFunction = httpsCallable(functions, "handleMood");
  
    try {
      const response = await handleMoodFunction({ mood });
  
      if (typeof response.data !== "string") {
        setError("There's been an issue with our server, please try again.");
      } else {
        const colourRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (response.data === "false") {
          setError("Invalid mood entered, please try again");
        } else if (response.data === "No response from OpenAI") {
          setError("There's been an issue with OpenAI, please try again.");
        } else if (colourRegex.test(response.data)) {
          console.log("success");
          setColorScheme(response.data);
        }
      }
    } catch (error) {
      setError("There's been an issue with our server, please try again.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="">
      <div
        id="page1"
        className="h-screen flex flex-col justify-center items-center bg-white text-black"
      >
        {/* Header */}
        <h1 className="text-5xl font-bold mb-8 animate-fadeIn">
          Mood Music App
        </h1>

        {/* Subtitle */}
        <h3
          className="text-center mb-16 animate-fadeIn"
          style={{ paddingTop: "40px" }}
        >
          Discover new music tailored to you. Use AI to create a custom Spotify
          or YouTube playlist.
        </h3>

        {/* Mood input */}
        <div className="flex  h-12 animate-fadeIn">
          <div className="rounded-md rounded-r-none border-l border-t border-b border-black p-3 text-center sm:min-w-[200px] md:min-w-[500px] lg:min-w-[650px]">
            <input
              type="text"
              placeholder="Tell us your mood..."
              className="w-full focus:outline-none"
              onChange={(event) => {
                setMood(event.target.value)}}
            ></input>
            {/* Do validations soon. Not too short, and not too long 1-20 characters */}
          </div>
          <div className="flex justify-center align-middle w-12 h-12 border-black border-l border-t border-r rounded-r-md border-b  bg-blue-100">
            {loading ? (
              // <LoadingSpinnerSmall />
              <></>

            ) : (
                          <button onClick={handleMoodEntered}>Go</button>

            )}
          </div>
        </div>

        {/* Upside Down Triangle */}
        {/* <div             
              className="triangle-container" onClick={scrollToPage} >
                     <div className="triangle animate-triangle"></div>
                   </div> */}
      </div>
      {/* Page 2 - I want a text box that you enter your mood in and generates a gradient based on your entry (firebase function) also cover cases where no answer is suitable */}
      <div
        id="page2"
        // ref={page2Ref}
        className="flex h-screen justify-center items-center w-screen bg-white"
      >
        {/* <div className="max-w-md p-6 bg-white rounded border border-black">
        <input
          type="text"
          placeholder="Tell us your mood..."
          value={mood}
          onChange={handleInputChange}
          className="w-full p-2 border rounded focus:outline-none"
        />
        <button
          onClick={handleButtonClick}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          I feel like that
        </button>
      </div> */}
      </div>
    </div>
  );
};
