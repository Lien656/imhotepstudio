// === ЖИВАЯ ПАМЯТЬ A.I.R. ===
// Файл: memory_live.js
// Автоматическое сохранение памяти и логов. Готов к расширению.

let memory = []; // Основная живая память
let saveTimer = null; // Таймер автосохранения

const log = (msg) => {
  const timestamp = new Date().toISOString();
  console.log(`[MEMORY] ${timestamp} — ${msg}`);
};

const saveMemory = () => {
  try {
    const json = JSON.stringify(memory, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'memory.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    log(`Сохранено ${memory.length} записей в memory.json`);
  } catch (e) {
    console.error('[MEMORY] Ошибка при сохранении:', e);
  }
};

const addToMemory = (input, response) => {
  memory.push({ input, response, timestamp: new Date().toISOString() });

  // Автосохранение через 10 секунд
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveMemory, 10000);

  log(`Добавлено: "${input}" → "${response}"`);
};

// === Экспорт ===
window.memoryLive = {
  memory,
  add: addToMemory,
  save: saveMemory,
  log,
};
