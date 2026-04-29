import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is missing. Add it to server/.env before starting the API.");
}

export const openai = new OpenAI({
  apiKey,
});

