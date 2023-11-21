"use client";

import { useRef, useState, useEffect } from "react";
import { httpsCallable } from "firebase/functions";
import { functions, init } from "../../../firebase";
import { useRouter } from "next/navigation";

const LoadingSpinner: React.FC = () => {
  return <span className="loader"></span>;
};

export const LandingPage = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [validationTriggered, setValidationTriggered] = useState(false);

  useEffect(() => {
    init().then(() => setLoading(false));
  });

  const [mood, setMood] = useState<string>("");
  const [dataLoading, setDataLoading] = useState<Boolean>(false);

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setMood(inputValue);
    validateMoodInput(inputValue);
  };

  const validateMoodInput = (input) => {
    const minLength = 3;
    const maxLength = 20;

    // Check for length
    if (input.length < minLength || input.length > maxLength) {
      setValidationError("Your mood must be between 3 and 20 characters.");
      return
    }
  
    // Check for numbers or special characters
    if (/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(input)) {
      setValidationError("Your mood cannot include numbers or special characters.");
      return
    }
  
    // Check for more than 3 unique characters
    const uniqueCharacters = new Set(input.split(''));
    if (uniqueCharacters.size <= 2) {
      setValidationError("Your mood must have 3 or more unique characters.");
      return
    }

    setValidationError("")
  };



  // Change first response to be something that validates input from the backend maybe

  const handleInputConfirmation = () => {
    console.log(validationError)

    setValidationTriggered(true);
    setDataLoading(true);

    // Later on I can improve this input validation. 

    if (!validationError) {
      localStorage.setItem('moodInput', mood)
      router.push('/genres')
    }
  
    setDataLoading(false);
  }

  const handleDataRequest = async () => {
    if (typeof window === "undefined" || validationError) {
      return;
    }

    setDataLoading(true);

    const requestSpotifyData = httpsCallable(functions, "getSpotifySongs");

    try {
      const response = await requestSpotifyData({ mood });
      console.log(response);
      if (response.data === "No response from OpenAI") {
        setError("There's been an issue with OpenAI, please try again.");
      } else {
        console.log("Successfully received response:", response.data);
        // router.push("/player")
      }

    } catch (error) {
      console.error("Error calling requestParams function:", error);
      setError("There's been an issue with our server, please try again.");
    } finally {
      setDataLoading(false);
      setValidationTriggered(false);
    }
  };

  return (
    <div className="">
      <div
        id="page1"
        className={`h-screen flex flex-col justify-center items-center bg-white text-black`}
      >
        {dataLoading ? (
          <LoadingSpinner /> // Think about removing this loading state if I do not add any backend requests to this
        ) : (
          <>
            {/* Header */}
            <h1 className="text-5xl font-bold mb-8 animate-fadeIn">
              Mood Music App
            </h1>
            {/* Subtitle */}
            <h3
              className="text-center mb-16 animate-fadeIn"
              style={{ paddingTop: "40px" }}
            >
              Discover new music tailored to you. Use AI to create a custom
              Spotify or YouTube playlist.
            </h3>
            {/* Mood input */}
            <div className="flex  h-12 animate-fadeIn">
              <div
                className={`rounded-md border border-black p-3 text-center sm:min-w-[400px] md:min-w-[500px] lg:min-w-[650px] shadow-md ${
                  validationError && validationTriggered
                    ? "shake border-red-500"
                    : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Tell us your mood..."
                  className="w-full focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {validationError && validationTriggered && (
              <div className="text-red-500  text-xs mt-2">
                {validationError}
              </div>
            )}
            {error && <div className="text-red-500  text-xs mt-2">{error}</div>}
            <button
              onClick={handleInputConfirmation}
              className={` bg-blue-100 cursor-pointer  bg-opacity-50 border-black border text-black rounded-full py-2 px-4 mt-8${
                validationError && validationTriggered
                  ? " opacity-20 cursor-not-allowed "
                  : ""
              } `}
            >
              Press Enter
            </button>
          </>
        )}
      </div>
    </div>
  );
};
