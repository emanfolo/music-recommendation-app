# Mood Sync

Mood Sync is a web application that utilizes OpenAI's 3.5 turbo natural language processor to provide users playlists based on their current mood. Users provide a short description of their mood, and the application generates variables such as valence, energy, and danceability. These variables are then used to recommend a playlist using the Spotify emotional categorization system. The project's main goals are to reinforce concepts in language models, serverless functions, and server-side rendering.

## Features

- Server-side rendering with Next.js for optimal speed.
- Firebase Cloud Functions as a lightweight backend, providing a single endpoint for playlist recommendations.
- Asynchronous data retrieval from external APIs (OpenAI and Spotify) for efficient and speedy responses.

## Usage

The usage of Mood Sync is straightforward. Users provide a short description of their mood, and the application generates a playlist recommendation. Note that there are rate limits, so it's advised not to request too many new playlists in a short period.

## Dependencies

- next
- firebase
- react
- react-youtube
- tailwindcss
- axios
- openai

## Contact

For any inquiries or feedback, you can reach out on [LinkedIn](https://www.linkedin.com/in/emmanuel-f-056057100/).

