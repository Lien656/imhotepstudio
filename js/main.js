document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".preloader");
  const logo = document.querySelector(".preloader-logo");

  // Прелоадер и логотип
  window.addEventListener("load", () => {
    setTimeout(() => {
      logo.classList.add("logo-mini");
      preloader.classList.add("preloader-hide");
    }, 1500); // Пауза перед исчезновением
  });

  // Счётчики в блоке "Статистика"
  const counters = [
    { id: "years", target: 6 },
    { id: "projects", target: 155 },
    { id: "guarantee", target: 100 }
  ];

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const el = document.getElementById(counter.id);
          let count = 0;
          const step = Math.ceil(counter.target / 50);
          const interval = setInterval(() => {
            count += step;
            if (count >= counter.target) {
              count = counter.target;
              clearInterval(interval);
            }
            el.textContent = count;
          }, 40);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.getElementById("stats"));

  // Анимация появления блоков с классом .fade
  const faders = document.querySelectorAll(".fade");

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => fadeObserver.observe(el));
});
