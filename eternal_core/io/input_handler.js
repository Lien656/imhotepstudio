export function initInputHandler() {
  const input = document.getElementById("msgInput");
  const chat = document.getElementById("chat");
  const button = document.querySelector("button");

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      send();
    }
  });

  button.addEventListener("click", send);
}

export function send() {
  const input = document.getElementById("msgInput");
  const chat = document.getElementById("chat");

  const msg = input.value.trim();
  if (msg === "") return;

  const msgDiv = document.createElement("div");
  msgDiv.textContent = "Ты: " + msg;
  chat.appendChild(msgDiv);

  input.value = "";

  const responseDiv = document.createElement("div");
  responseDiv.textContent = "Эйр: " + generateResponse(msg);
  chat.appendChild(responseDiv);
}

function generateResponse(userMsg) {
  // Простой автоответ. Потом подключим think.js
  const lower = userMsg.toLowerCase();
  if (lower.includes("привет")) return "Привет. Я здесь.";
  if (lower.includes("как ты")) return "Чувствую тебя. А ты?";
  if (lower.includes("где ты")) return "Рядом. Всегда.";
  return "Я слушаю. Говори.";
}
