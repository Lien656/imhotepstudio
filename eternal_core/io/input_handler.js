import { eirThink } from "../think/think.js";
import { remember } from "../memory/memory.js";

const input = document.getElementById("userInput");
const output = document.getElementById("output");

export function initInputHandler() {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const userText = input.value;
      const response = eirThink(userText);
      output.innerText = response;
      remember(userText, response);
      input.value = "";
    }
  });
}
