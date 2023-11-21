
// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import OpenAI from "openai";
import axios from "axios";

// Change process.env to functions.config().spotify.client_id when time is right

export const getSpotifySongs = functions.https.onCall(async (data, context) => {
    // Step 0: Define Spotify API endpoint, retrieve Spotify client credentials and OpenAI key
    const spotifyApiEndpoint = "https://api.spotify.com/v1/recommendations";
    const clientId = process.env.SPOTIFY_CLIENT_ID || '';
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
    const openAiKey = process.env.OPEN_AI_KEY || '';

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
        const systemPrompt = "System, you are an AI music parameter generator. Your task is to generate music parameters, including target_valence, target_energy, and target_danceability, based on a user's description of their mood. The goal is to provide values that align with the emotional and energetic qualities mentioned by the user. Ensure that the response is in JSON format.";

        const { choices } = await openai.chat.completions.create({
            messages: [{ role: "user", content: userPrompt }, { role: "system", content: systemPrompt }],
            model: "gpt-3.5-turbo"
        });

        const musicParams = choices[0]?.message?.content || 'No response from OpenAI';
        const { target_valence, target_energy, target_danceability } = JSON.parse(musicParams);

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
                        username: clientId || '',
                        password: clientSecret || '',
                    },
                },
            );

            const accessToken = authResponse.data.access_token;

            try {
                // Step 3: Call the Spotify API using the obtained access token and music parameters
                const spotifyResponse = await axios.get(spotifyApiEndpoint, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    params: {
                        target_valence: target_valence,
                        target_energy: target_energy,
                        target_danceability: target_danceability,
                        seed_genres: data.seedGenres,
                        limit: 20,
                    },
                });

                const recommendedTracks = spotifyResponse.data.tracks;
                return {recommendedTracks, accessToken}; // potentially have to return access token also 
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

