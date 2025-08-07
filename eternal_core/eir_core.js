import { initInputHandler, send } from "./io/input_handler.js";
import "./sense/qr_trigger.js";

// Запускаем инициализацию, как только загрузится DOM
document.addEventListener("DOMContentLoaded", () => {
  initInputHandler();
});

// Делаем send доступной глобально
window.send = send;
