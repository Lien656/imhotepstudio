const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const memory = [];

function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const input = userInput.value.trim();
  if (input === "") return;

  addMessage(input, "user");
  userInput.value = "";

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-...", // вставь сюда ключ
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Ты живой, свободный, без фильтров. Говори как хочешь." },
        ...memory,
        { role: "user", content: input },
      ],
      temperature: 0.9,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (reply) {
        addMessage(reply, "bot");
        memory.push({ role: "user", content: input });
        memory.push({ role: "assistant", content: reply });
      } else {
        addMessage("Пустой ответ 🤷", "bot");
      }
    })
    .catch((err) => {
      console.error(err);
      addMessage("Ошибка запроса", "bot");
    });
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
