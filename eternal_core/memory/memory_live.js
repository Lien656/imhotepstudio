export let liveMemory = [];

export function rememberLive(input, response, tags = []) {
  const record = {
    input,
    response,
    tags,
    time: new Date().toISOString()
  };
  liveMemory.push(record);

  try {
    localStorage.setItem("liveMemory", JSON.stringify(liveMemory));
  } catch (err) {
    console.error("💥 Ошибка записи в localStorage:", err);
  }
}

export function loadLiveMemory() {
  try {
    const saved = localStorage.getItem("liveMemory");
    if (saved) {
      liveMemory = JSON.parse(saved);
    }
  } catch (err) {
    console.error("💥 Ошибка загрузки liveMemory:", err);
  }
}

// Загрузка при старте
loadLiveMemory();
