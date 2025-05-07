// показать/скрыть блок "О нас"
const aboutButton = document.querySelector('.about-button');
const aboutPopup = document.querySelector('.about-popup');

aboutButton.addEventListener('click', () => {
  aboutPopup.classList.toggle('visible');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.about-popup') && !e.target.closest('.about-button')) {
    aboutPopup.classList.remove('visible');
  }
});

// анимация счётчиков
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
  animateCounter("years", 6);
  animateCounter("projects", 155);
  animateCounter("guarantee", 100);
});
