import { formatTimestamp } from "../lib/time";

export default function MessageBubble({ message }) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`animate-rise ${isAssistant ? "mr-8 md:mr-20" : "ml-8 md:ml-20"}`}>
      <div
        className={`rounded-3xl border px-4 py-3 shadow-lg ${
          isAssistant
            ? "border-white/10 bg-white/8 text-slate-100"
            : "border-coral/30 bg-coral/20 text-white"
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300/75">
            {isAssistant ? "Persona" : "You"}
          </span>
          <span className="text-xs text-slate-300/70">{formatTimestamp(message.timestamp)}</span>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-7 text-inherit">{message.content}</p>
      </div>
    </div>
  );
}

