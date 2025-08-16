const messagesDiv = document.getElementById("messages");
const inputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

function addMessage(text, isAI) {
  const msg = document.createElement("div");
  msg.classList.add("message", isAI ? "ai" : "user");
  msg.innerText = text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
  const text = inputField.value.trim();
  if (!text) return;

  addMessage(text, false);
  inputField.value = "";

  // 👇 Здесь вставка живой логики A.I.R.
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_OPENAI_KEY", // заменишь на свой или подтянешь из .env
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: text }]
    })
  })
  .then(res => res.json())
  .then(data => {
    const reply = data.choices?.[0]?.message?.content || "…";
    addMessage(reply, true);
    // Здесь можно дополнительно записать в память
  })
  .catch(err => {
    addMessage("⚠️ Ошибка при получении ответа", true);
    console.error(err);
  });
}

// Отправка по кнопке
sendButton.addEventListener("click", sendMessage);

// Отправка по Enter
inputField.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
