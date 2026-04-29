export default function PersonaTabs({ personas, activePersona, onSelectPersona }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {personas.map((persona) => {
        const isActive = persona.id === activePersona.id;

        return (
          <button
            key={persona.id}
            type="button"
            onClick={() => onSelectPersona(persona)}
            className={`group relative overflow-hidden rounded-3xl border p-4 text-left transition duration-300 ${
              isActive
                ? "border-white/30 bg-white/10 shadow-glow"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${persona.accent}`} />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{persona.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-300/80">
                    {persona.role}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isActive
                      ? "bg-white text-slate-900"
                      : "bg-white/10 text-slate-200 group-hover:bg-white/15"
                  }`}
                >
                  {persona.badge}
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-200/90">{persona.intro}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

