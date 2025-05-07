// Анимация счётчиков
function animateCounter(id, target) {
  const el = document.getElementById(id);
  let count = 0;
  const step = Math.ceil(target / 100);
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      el.textContent = target;
      clearInterval(interval);
    } else {
      el.textContent = count;
    }
  }, 20);
}

window.addEventListener('load', () => {
  animateCounter("years", 6);  // 6 лет опыта
  animateCounter("projects", 155);  // 155 проектов
  animateCounter("guarantee", 100);  // 100% гарантия
});
