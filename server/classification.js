import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Ensure API key is set
console.log('OpenAI API Key is set.'); // Log a message indicating the API key is set
console.log('OpenAI client initialized successfully.'); // Log a message indicating the OpenAI client is initialized
const userPrompt = `${process.env.USER_PROMPT}`;
// Function to classify the image using OpenAI
export const classify = async (base64ImageUrl, surveyAnswers) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18", // Ensure the model is correct
      messages: [
        {
          role: "user",
          content: [
            { type: "text",
                text: `${userPrompt} ${surveyAnswers}`,
            },
            {
              type: "image_url",
              image_url: {
                url: base64ImageUrl, // Use the Base64 image URL
              },
            },
          ],
        },
      ],
      max_tokens: 1000, // Set maximum tokens for the response
    });
    console.log('Classification response received:', response); // Log the response from the classification
    return response.choices[0]; // Return the first choice from the response
  } catch (error) {
    console.error('Error during classification:', error); // Debug log for error
    throw new Error('Classification failed'); // Throw an error if classification fails
  }
};