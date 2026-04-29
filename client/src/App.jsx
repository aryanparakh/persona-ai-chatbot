import { useEffect, useMemo, useRef, useState } from "react";
import ChatComposer from "./components/ChatComposer";
import MessageBubble from "./components/MessageBubble";
import PersonaTabs from "./components/PersonaTabs";
import SuggestionChips from "./components/SuggestionChips";
import TypingIndicator from "./components/TypingIndicator";
import { PERSONAS, WELCOME_MESSAGES } from "./data/personas";
import { loadChatSession, saveChatSession } from "./lib/storage";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function createWelcomeMessage(personaId) {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content: WELCOME_MESSAGES[personaId],
    timestamp: new Date().toISOString(),
  };
}

export default function App() {
  const [activePersonaId, setActivePersonaId] = useState(PERSONAS[0].id);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionByPersona, setSessionByPersona] = useState(() => {
    const session = loadChatSession();

    return PERSONAS.reduce((accumulator, persona) => {
      accumulator[persona.id] =
        session[persona.id] && session[persona.id].length > 0
          ? session[persona.id]
          : [createWelcomeMessage(persona.id)];
      return accumulator;
    }, {});
  });

  const chatViewportRef = useRef(null);
  const activePersona = useMemo(
    () => PERSONAS.find((persona) => persona.id === activePersonaId) || PERSONAS[0],
    [activePersonaId],
  );
  const messages = sessionByPersona[activePersonaId] || [createWelcomeMessage(activePersonaId)];

  useEffect(() => {
    saveChatSession(sessionByPersona);
  }, [sessionByPersona]);

  useEffect(() => {
    if (!chatViewportRef.current) {
      return;
    }

    chatViewportRef.current.scrollTo({
      top: chatViewportRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  function resetPersonaThread(persona) {
    setActivePersonaId(persona.id);
    setInput("");
    setError("");
    setSessionByPersona((current) => ({
      ...current,
      [persona.id]: [createWelcomeMessage(persona.id)],
    }));
  }

  async function sendMessage(rawMessage) {
    const message = rawMessage.trim();
    if (!message || isLoading) {
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setError("");
    setInput("");
    setIsLoading(true);
    setSessionByPersona((current) => ({
      ...current,
      [activePersonaId]: [...current[activePersonaId], userMessage],
    }));

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          persona: activePersonaId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong while contacting the assistant.");
      }

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toISOString(),
      };

      setSessionByPersona((current) => ({
        ...current,
        [activePersonaId]: [...current[activePersonaId], assistantMessage],
      }));
    } catch (requestError) {
      setError(requestError.message || "Unable to get a response right now.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="glass-panel overflow-hidden rounded-[32px]">
          <div className="bg-grid bg-[size:18px_18px] p-6 md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-slate-300/70">
                  Persona-Based AI Chatbot
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                  Conversations that feel distinct, credible, and genuinely human.
                </h1>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-slate-200">
                Active persona: <span className="font-semibold text-white">{activePersona.name}</span>
              </div>
            </div>

            <PersonaTabs
              personas={PERSONAS}
              activePersona={activePersona}
              onSelectPersona={resetPersonaThread}
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="glass-panel rounded-[32px] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-300/70">
              Persona Lens
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{activePersona.name}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">{activePersona.intro}</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Suggested starters
              </p>
              <div className="mt-4">
                <SuggestionChips
                  suggestions={activePersona.suggestions}
                  onPick={sendMessage}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <p className="text-sm font-medium text-white">Context reset behavior</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Switching personas starts a fresh thread for that persona so each conversation keeps
                a clean tone and prompt context.
              </p>
            </div>
          </aside>

          <section className="glass-panel flex min-h-[72vh] flex-col rounded-[32px]">
            <div className="border-b border-white/10 px-5 py-4 md:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/70">
                Live Conversation
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {activePersona.role} • {activePersona.badge}
              </p>
            </div>

            <div ref={chatViewportRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5 md:px-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading ? <TypingIndicator personaName={activePersona.name} /> : null}
            </div>

            <div className="border-t border-white/10 px-5 py-4 md:px-6">
              {error ? (
                <div className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {error}
                </div>
              ) : null}
              <ChatComposer
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                disabled={isLoading}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

