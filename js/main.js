// Плавное появление элементов при скролле
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// Счётчики
function animateCounter(id, target, duration = 2000) {
  const el = document.getElementById(id);
  let start = 0;
  const step = Math.ceil(duration / target);

  const counter = setInterval(() => {
    start++;
    el.textContent = start;
    if (start >= target) clearInterval(counter);
  }, step);
}

// Сброс счётчиков каждый раз при скролле
const stats = document.getElementById('stats');
let statsVisible = false;

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!statsVisible) {
        animateCounter('years', 6);
        animateCounter('projects', 155);
        animateCounter('guarantee', 100);
        statsVisible = true;
      }
    } else {
      statsVisible = false;
      document.getElementById('years').textContent = '0';
      document.getElementById('projects').textContent = '0';
      document.getElementById('guarantee').textContent = '0';
    }
  });
}, { threshold: 0.5 });

statObserver.observe(stats);
