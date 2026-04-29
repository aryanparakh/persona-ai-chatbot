export default function TypingIndicator({ personaName }) {
  return (
    <div className="mr-8 animate-rise md:mr-20">
      <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/8 px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-pulseDots rounded-full bg-slate-200" />
          <span
            className="h-2 w-2 animate-pulseDots rounded-full bg-slate-200"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 animate-pulseDots rounded-full bg-slate-200"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <span className="text-sm text-slate-200">{personaName} is thinking...</span>
      </div>
    </div>
  );
}
