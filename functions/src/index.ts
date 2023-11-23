// import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import OpenAI from "openai";
import axios from "axios";

const getYoutubeId = async (track: any, index: any) => {
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${`${track.title} - ${track.artist}`}&type=video&key=${youtubeApiKey}`;
  try {
    const result = await fetch(url);
    const data = await result.json();
    const videoId = data.items.find((e: any, i: number) => i === 0).id.videoId;
    console.log(videoId);
    track.videoId = videoId;
    return track;
  } catch (error) {
    console.error(`Error fetching Youtube API for track ${index + 1}`, error);
    track.videoId = undefined;
    return track;
  }
};

export const getSpotifySongs = functions.https.onCall(async (data, context) => {
  // Step 0: Define Spotify API endpoint, retrieve Spotify client credentials and OpenAI key
  const spotifyApiEndpoint = "https://api.spotify.com/v1/recommendations";
  const clientId = process.env.SPOTIFY_CLIENT_ID || "";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
  const openAiKey = process.env.OPEN_AI_KEY || "";
  // Change process.env to functions.config().spotify.client_id when time is right

  if (!clientId || !clientSecret || !openAiKey) {
    console.error("Missing required environment variable.");
    return { error: "Internal Server Error" };
  }

  // Step 0.1: Initialize OpenAI with API key
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });

  try {
    // Step 1: Request music parameters from OpenAI based on user's mood
    const userPrompt = `Generate music parameters (target_valence, target_energy, target_danceability) that match the mood of: ${data.mood}. Provide values that represent the desired emotional and energetic qualities of the music. Keep the response in JSON format.`;
    const systemPrompt =
      "System, you are an AI music parameter generator. Your task is to generate music parameters, including target_valence, target_energy, and target_danceability, based on a user's description of their mood. The goal is to provide values that align with the emotional and energetic qualities mentioned by the user. Ensure that the response is in JSON format.";

    const { choices } = await openai.chat.completions.create({
      messages: [
        { role: "user", content: userPrompt },
        { role: "system", content: systemPrompt },
      ],
      model: "gpt-3.5-turbo",
    });

    const musicParams =
      choices[0]?.message?.content || "No response from OpenAI";
    const { target_valence, target_energy, target_danceability } =
      JSON.parse(musicParams);
    try {
      // Step 2: Obtain Client Credentials Access Token from Spotify
      const authResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
          params: {
            grant_type: "client_credentials",
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: clientId || "",
            password: clientSecret || "",
          },
        },
      );

      const accessToken = authResponse.data.access_token;

      try {
        // Step 3: Call the Spotify API using the obtained access token and music parameters
        const spotifyResponse = await axios.get(spotifyApiEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            target_valence: target_valence,
            target_energy: target_energy,
            target_danceability: target_danceability,
            seed_genres: data.seedGenres,
            limit: 5,
          },
        });
        const recommendedTracks = spotifyResponse.data.tracks;
        const parsedData = recommendedTracks.map((item: any) => {
          return {
            title: item.name,
            artist: item.album.artists[0].name, 
            artwork: item.album.images[0].url,
          };
        });

        const responseData = await Promise.all(
          parsedData.map((track: any, index: any) =>
            getYoutubeId(track, index),
          ),
        );

        return { responseData };
      } catch (spotifyError) {
        console.error("Error calling Spotify API:", spotifyError);
        return { error: "Error calling Spotify API" };
      }
    } catch (authError) {
      console.error("Error obtaining Spotify access token:", authError);
      return { error: "Error obtaining Spotify access token" };
    }
  } catch (openaiError) {
    console.error("Error calling OpenAI:", openaiError);
    return { error: "Error calling OpenAI" };
  }
});
