from pathlib import Path

full_main_js_with_autoscroll = """
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".preloader");
  const logo = document.querySelector(".logo");
  const siteContent = document.querySelector("main");
  const header = document.querySelector("header");

  siteContent.style.display = "none";
  header.style.display = "none";

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("fade-out");
      logo.classList.add("move-left");
      siteContent.style.display = "block";
      header.style.display = "flex";
    }, 1000);
  });

  // Анимация счётчиков
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

  // Плавный якорный скролл
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Автопрокрутка карусели
  const carousel = document.querySelector(".project-carousel");
  let scrollPosition = 0;
  let scrollSpeed = 1;

  function autoScroll() {
    if (carousel) {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= carousel.scrollWidth - carousel.clientWidth) {
        scrollPosition = 0;
      }
      carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }

  setInterval(autoScroll, 40);
});
"""

Path("/mnt/data/main.js").write_text(full_main_js_with_autoscroll.strip(), encoding="utf-8")
