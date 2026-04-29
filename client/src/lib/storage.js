const KEY = "persona-chatbot-session";

export function loadChatSession() {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveChatSession(session) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    // Ignore storage failures to avoid breaking chat interaction.
  }
}

