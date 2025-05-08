// Анимация счётчиков
function animateCounter(id, target) {
  const el = document.getElementById(id);
  let start = 0;
  const duration = 1500;
  const step = () => {
    const increment = Math.ceil(target / (duration / 16));
    start += increment;
    if (start >= target) {
      el.textContent = target;
    } else {
      el.textContent = start;
      requestAnimationFrame(step);
    }
  };
  step();
}

// Повторный запуск счётчиков
const stats = document.querySelector('#stats');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter('years', 6);
      animateCounter('projects', 155);
      animateCounter('guarantee', 100);
    }
  });
}, { threshold: 0.5 });

if (stats) statsObserver.observe(stats);

// Анимация появления fade-блоков
const fadeElements = document.querySelectorAll('.fade');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));
