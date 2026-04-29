import { SendHorizonal } from "lucide-react";

export default function ChatComposer({ value, onChange, onSubmit, disabled }) {
  return (
    <form onSubmit={onSubmit} className="glass-panel rounded-[28px] p-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            rows="3"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Ask something thoughtful, practical, or personal..."
            disabled={disabled}
            className="min-h-[88px] w-full resize-none bg-transparent px-3 py-2 text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-400"
          />
        </div>
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-200"
        >
          <SendHorizonal size={16} />
          Send
        </button>
      </div>
    </form>
  );
}

