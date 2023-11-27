"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.jpeg";
import Image from "next/image";

export const LandingPage = () => {
  const [validationError, setValidationError] = useState("");
  const [validationTriggered, setValidationTriggered] = useState(false);
  const [mood, setMood] = useState<string>("");

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
      return false;
    }

    // Check for numbers or special characters
    if (/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(input)) {
      setValidationError(
        "Your mood cannot include numbers or special characters.",
      );
      return false;
    }

    // Check for more than 3 unique characters
    const uniqueCharacters = new Set(input.split(""));
    if (uniqueCharacters.size <= 2) {
      setValidationError("Your mood must have 3 or more unique characters.");
      return false;
    }

    setValidationError("");
    return true;
  };

  // Change first response to be something that validates input from the backend maybe

  const handleInputConfirmation = () => {
    setValidationTriggered(true);
    if (!validationError && validateMoodInput(mood)) {
      localStorage.setItem("moodInput", mood);
      router.push("/Genres");
    }
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleInputConfirmation();
    }
  };

  return (
    <div className="">
      <div
        className={`h-full min-h-screen flex flex-col justify-center items-center bg-white text-black`}
      >
        <Image
          src={logo}
          alt="Mood Sync Logo"
          height={400}
          width={400}
          className="animate-fadeIn"
        />
        <h3 className="text-center mb-16 animate-fadeIn">
          Discover new music tailored to you. Use AI to create a custom
          playlist.
        </h3>
        {/* Mood input */}
        <div className="flex flex-col items-center  h-12 animate-fadeIn">
          <div
            className={`rounded-md border border-black p-3 text-center sm:min-w-[400px] md:min-w-[500px] lg:min-w-[650px] shadow-md ${
              validationError && validationTriggered
                ? "shake border-red-500"
                : ""
            }`}
          >
            <label htmlFor="moodInput" className="sr-only">
              Enter your mood (3-20 characters, no numbers or special
              characters)
            </label>
            <input
              type="text"
              placeholder="Tell us your mood..."
              className="w-full focus:outline-none"
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
              aria-invalid={validationError ? "true" : "false"}
              aria-describedby="error-message"
            />
          </div>
          {validationError && validationTriggered && (
            <div
              id="error-message"
              role="alert"
              aria-live="assertive"
              className="text-red-500  text-xs mt-2"
            >
              {validationError}
            </div>
          )}
        </div>
        <button
          onClick={handleInputConfirmation}
          className={` bg-blue-100 cursor-pointer  bg-opacity-50 border-black border text-black rounded-full py-2 px-4 mt-9${
            validationError && validationTriggered
              ? " opacity-20 cursor-not-allowed "
              : ""
          } `}
          aria-label="Submit mood"
        >
          Discover
        </button>
      </div>
    </div>
  );
};
