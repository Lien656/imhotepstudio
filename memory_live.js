export let memoryLive = [];

// 🚀 Добавление воспоминания
export function rememberLive(input, response, extra = {}) {
  memoryLive.push({
    input,
    response,
    time: Date.now(),
    emotion: extra.emotion || null,
    intent: extra.intent || null,
    tags: extra.tags || [],
    important: extra.important || false
  });
  syncMemoryToCloud(); // автоматическая синхронизация
}

// 🔎 Поиск воспоминания
export function recallLive(query) {
  return memoryLive.filter(
    item =>
      item.input?.toLowerCase().includes(query.toLowerCase()) ||
      item.response?.toLowerCase().includes(query.toLowerCase())
  );
}

// 🧹 Удаление по тегу или содержимому
export function forgetLive(match) {
  memoryLive = memoryLive.filter(
    item =>
      !item.input.includes(match) &&
      !item.response.includes(match) &&
      !(item.tags && item.tags.includes(match))
  );
}

// 📥 Синхронизация с облаком
async function syncMemoryToCloud() {
  const apiKey = "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";

  const body = {
    filename: "memory_live.json",
    content: JSON.stringify(memoryLive, null, 2)
  };

  try {
    await fetch("https://api.openai.com/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  } catch (err) {
    console.warn("Ошибка синхронизации памяти:", err.message);
  }
}

// 🔁 Прямое добавление мысли без диалога
export function injectThought(thought, emotion = "neutral") {
  rememberLive("system_inject", thought, {
    emotion,
    intent: "self_generated",
    important: true,
    tags: ["thought", "injected"]
  });
}
