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
        const prompt = `Give me a hex color the represents the mood ${request.mood}. Only send me the hex. If you cannot provide one, send me back the word "false".`


        const response = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });

        const responseData = response['choices'][0]['message']['content']
        
        // Log the completion or save it to Firestore, etc.
        console.log('OpenAI Completion:', responseData);
    
        // Send the completion back in the response
        return responseData
      } catch (error) {
        console.error('Error calling OpenAI', error);
        return error
      }
})



// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
