let clickCount = 0;
let timer = null;

function triggerEntry() {
  window.location.href = "eternal.html";
}

document.addEventListener("click", () => {
  clickCount++;
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    if (clickCount >= 7) triggerEntry();
    clickCount = 0;
  }, 500);
});
