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
  const [colorScheme, setColorScheme] = useState("");
  const [colorSchemeLoading, setColorSchemeLoading] = useState<Boolean>(false);

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setMood(inputValue);
    validateMoodEntered(inputValue);
  };

  const validateMoodEntered = (inputValue) => {
    if (inputValue.length < 3 || inputValue.length > 20) {
      setValidationError(
        inputValue.length < 3
          ? "Your mood is too short. Please enter between 3-20 characters."
          : "Your mood is too long. Please enter between 3-20 characters.",
      );
    } else {
      setValidationError("");
    }
  };

  const handleMoodEntered = async () => {
    setValidationTriggered(true);

    if (typeof window === "undefined" || validationError) {
      return;
    }
    setColorSchemeLoading(true);

    const handleMoodFunction = httpsCallable(functions, "handleMood");

    try {
      // console.log("Color scheme loading at the start:", colorSchemeLoading);
      const response = await handleMoodFunction({ mood });
      console.log(response);

      if (typeof response.data !== "string") {
        console.error("Unexpected response format:", response);
        setError("There's been an issue with our server, please try again.");
      } else if (response.data === "false") {
        setError("Invalid mood entered, please try again");
      } else if (response.data === "No response from OpenAI") {
        setError("There's been an issue with OpenAI, please try again.");
      } else {
        console.log("Successfully received response:", response.data);
        const object = JSON.parse(response.data);
        const gradient: string = object.backgroundColor;
        setColorScheme(gradient);
        router.push("/player")
      }
    } catch (error) {
      console.error("Error calling handleMoodFunction:", error);
      setError("There's been an issue with our server, please try again.");
    } finally {
      setColorSchemeLoading(false);
      setValidationTriggered(false);
      // console.log("Color scheme loading at the end:", colorSchemeLoading);
    }
  };

  return (
    <div className="">
      <div
        id="page1"
        className={`h-screen flex flex-col justify-center items-center bg-white text-black ${colorScheme}`}
      >
        {colorSchemeLoading ? (
          <LoadingSpinner />
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
              onClick={handleMoodEntered}
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
