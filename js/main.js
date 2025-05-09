main_js = """
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const logo = document.querySelector(".logo-container");

  // Прелоадер
  window.onload = () => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      logo.classList.add("logo-fixed");
    }, 1000);
  };

  // Счётчики
  const counters = [
    { id: "years", target: 6 },
    { id: "projects", target: 155 },
    { id: "guarantee", target: 100 }
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const el = document.getElementById(counter.id);
          let count = 0;
          const step = Math.ceil(counter.target / 50);
          const interval = setInterval(() => {
            if (count < counter.target) {
              count += step;
              if (count > counter.target) count = counter.target;
              el.textContent = count;
            } else {
              clearInterval(interval);
            }
          }, 40);
        });
      }
    });
  }, { threshold: 0.5 });

  const stats = document.getElementById("stats");
  if (stats) observer.observe(stats);

  // Плавный скролл
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
"""

Path("/mnt/data/main.js").write_text(main_js, encoding="utf-8")
"Файл main.js обновлён. Готов к загрузке index.html."
