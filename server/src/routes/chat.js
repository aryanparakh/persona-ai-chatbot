import { Router } from "express";
import { getPersona } from "../config/personas.js";
import { openai } from "../lib/openai.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { message, persona } = req.body ?? {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Please send a valid message so the chatbot has something to respond to.",
      });
    }

    const selectedPersona = getPersona(persona);

    if (!selectedPersona) {
      return res.status(400).json({
        error: "That persona is not available. Please choose one of the listed personas.",
      });
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: 0.85,
      messages: [
        {
          role: "system",
          content: selectedPersona.systemPrompt,
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("The language model returned an empty response.");
    }

    return res.json({ reply });
  } catch (error) {
    return next(error);
  }
});

export default router;

