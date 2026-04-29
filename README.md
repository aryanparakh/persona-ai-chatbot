# Persona-Based AI Chatbot

A production-ready full-stack chatbot where users can chat with three distinct personas: Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra. The project uses a React + Tailwind frontend, an Express backend, and the OpenAI API for persona-grounded responses.

## Project Structure

```text
.
|-- client/
|-- server/
|-- .env.example
|-- prompts.md
|-- reflection.md
`-- README.md
```

## Features

- Persona-based conversations with strong system prompts
- Clean, responsive chat UI with typing indicator and timestamps
- Persona switcher with unique suggestion chips
- Session-based browser history for the active persona
- Express API with persona prompt injection and friendly error handling
- Deploy-ready setup for Vercel (frontend) and Railway/Render (backend)

## Setup

### 1. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

Copy `.env.example` into `server/.env` and `client/.env.local`, then set values as needed.

Server environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_MODEL`: Model name, such as `gpt-4.1-mini`
- `PORT`: Backend port, default `4000`
- `CLIENT_ORIGIN`: Comma-separated allowed frontend origins for CORS, for example `http://localhost:5173,https://persona-ai-chatbot-six.vercel.app`

Client environment variables:

- `VITE_API_URL`: Backend base URL, default `http://localhost:4000`

### 3. Run locally

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173`.

## Commands

Server:

- `npm run dev`: Start backend in watch mode
- `npm start`: Start backend in production mode

Client:

- `npm run dev`: Start Vite dev server
- `npm run build`: Build production frontend
- `npm run preview`: Preview production build

## Deployment

### Frontend on Vercel

1. Import the `client` directory as a Vercel project.
2. Set `VITE_API_URL` to your deployed backend URL.
3. Use the default Vite build settings:
   - Build command: `npm run build`
   - Output directory: `dist`

### Backend on Railway or Render

1. Import the `server` directory as a Node service.
2. Set the following environment variables:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
   - `PORT` if your platform requires one
   - `CLIENT_ORIGIN` to your allowed frontend origins, for example `http://localhost:5173,https://persona-ai-chatbot-six.vercel.app`
3. Start command: `npm start`

## API

### `POST /chat`

Request body:

```json
{
  "message": "How should I think about starting a startup in college?",
  "persona": "anshuman-singh"
}
```

Response body:

```json
{
  "reply": "..."
}
```

## Screenshots

- `[Placeholder] Home chat screen`
- `[Placeholder] Persona switcher active state`
- `[Placeholder] Mobile responsive chat view`

## Notes

- Persona prompts are stored centrally in the backend and also documented in [prompts.md](./prompts.md).
- A short build reflection is included in [reflection.md](./reflection.md).
