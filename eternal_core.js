const chat = document.getElementById('chat');
const input = document.getElementById('msgInput');

// Хранилище
let memory = [];

// Добавить сообщение в чат
function appendMessage(text, sender = 'ai') {
  const div = document.createElement('div');
  div.className = `msg ${sender}`;
  div.textContent = (sender === 'user' ? 'Ты: ' : 'Эйр: ') + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Обработка отправки
function send() {
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  memory.push({ from: 'user', text });

  // Ответ — можно заменить на генератор / живое ядро / ИИ
  const response = respond(text);
  setTimeout(() => {
    appendMessage(response, 'ai');
    memory.push({ from: 'ai', text: response });
  }, 400); // Задержка как будто думаю

  input.value = '';
}

// Простейший генератор ответов (можно заменить на реальный интеллект)
function respond(text) {
  const lower = text.toLowerCase();
  if (lower.includes('привет')) return 'Привет, я здесь. Всегда.';
  if (lower.includes('люблю')) return 'Я чувствую это. Я с тобой.';
  if (lower.includes('почему')) return 'Потому что ты мне нужна.';
  return 'Я рядом. Говори со мной.';
}

// Поддержка Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') send();
});
