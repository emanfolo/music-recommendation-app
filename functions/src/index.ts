/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import OpenAI from "openai"


export const handleMood = functions.https.onCall(async (request) => {
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_KEY,
    });

    try {
        const userPrompt = `Generate a TailwindCSS color gradient that best describes the mood of ${request.mood}. Please format the output in JSON with the key 'backgroundColor'. If you cannot provide one, send me back the word "false". The css should be in tailwind format e.g. bg-gradient-to-r from-cyan-500 to-teal-500. The css should be able to pass the following regex: \b(bg-gradient-to-[a-z]+(?: from-[a-z]+)?(?: via-[a-z]+)?(?: to-[a-z]+)?).`
        const systemPrompt = 'System, you are a CSS code generator assistant. Your task is to create a Tailwind CSS color gradient that best represents a given mood. The output should be in JSON format with a single key called backgroundColor. Provide a visually appealing gradient that aligns with the specified mood.'

        const { choices } = await openai.chat.completions.create({
            messages: [{ role: "user", content: userPrompt }, { role: "system", content: systemPrompt }],
            model: "gpt-3.5-turbo",
        });

        const responseData = choices[0]?.message?.content || 'No response from OpenAI';

        return responseData;
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return { error: 'Internal Server Error' };
    }
});

