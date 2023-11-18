"use client"
import { useState } from "react";

export const MoodForm = () => {
    const [mood, setMood] = useState('');
    const [genreInput, setGenreInput] = useState('');

    const [genres, setGenres] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const addGenre = () => {
      if (genreInput.trim() !== '') {
        setGenres((prevGenres) => [...prevGenres, genreInput]);
        setGenreInput('');
      }
    };
  
    const removeGenre = (index: number) => {
      const updatedGenres = [...genres];
      updatedGenres.splice(index, 1);
      setGenres(updatedGenres);
    };
  
    return (
      <div className="max-w-xl h-full mx-auto bg-transparent p-6 rounded-md my-auto">
        <div className="mb-4">
            <label htmlFor="mood" className="block text-sm font-medium text-white">
              Describe your mood
            </label>
            <input
              type="text"
              id="mood"
              name="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
        </div>
        <div className="md:bg-red-700 h-96 w-96 lg:bg-blue-50">

            <div>
                <text>
                    Upbeat
                </text>
            </div>
            <div>
                <text>
                    Energetic
                </text>
            </div>
            <div>
                <text>
                    Downbeat
                </text>
            </div>
            <div>
                <text>
                    Mellow
                </text>
            </div>

        </div>


       
      </div>
    );
};

{/* <form>  
Genres Input with Remove Option
<div className="mb-4">
  <label htmlFor="genres" className="block text-sm font-medium text-gray-700">
    Select some of your favour genres
  </label>
  <div className="flex items-center space-x-2 mt-1">
    {genres.map((genre, index) => (
      <div key={index} className="relative">
        <input
          type="text"
          value={genre}
          readOnly
          className="p-2 border rounded-md"
        />
        <button
          type="button"
          onClick={() => removeGenre(index)}
          className="absolute top-0 right-0 p-2 text-red-500 cursor-pointer"
        >
          x
        </button>
      </div>
    ))}
    <input
      type="text"
      value={genreInput}
      onChange={(e) => setGenreInput(e.target.value)}
      className="p-2 border rounded-md"
    />
    <button
      type="button"
      onClick={addGenre}
      className="p-2 bg-green-500 text-white rounded-md"
    >
      Add
    </button>
  </div>
</div>

{/* Time Selection
<div>
  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
    Time
  </label>
  <select
    id="time"
    name="time"
    value={selectedTime}
    onChange={(e) => setSelectedTime(e.target.value)}
    className="mt-1 p-2 w-full border rounded-md"
  >
    <option value="15">15 minutes</option>
    <option value="30">30 minutes</option>
    <option value="45">45 minutes</option>
    <option value="60">60 minutes</option>
  </select>
</div>

{/* Submit Button *
<button
  type="submit"
  className="mt-4 p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
>
  Submit
</button>
</form> */}
