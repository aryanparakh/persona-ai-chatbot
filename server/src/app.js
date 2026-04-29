import cors from "cors";
import express from "express";
import chatRouter from "./routes/chat.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    }),
  );
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/chat", chatRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

