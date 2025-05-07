// Прелоадер исчезает после загрузки
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 2000);
});

// Анимация счётчиков
const counters = document.querySelectorAll(".counter");
let started = false;

function animateCounters() {
  if (started) return;
  if (window.scrollY + window.innerHeight >= document.querySelector(".stats").offsetTop) {
    counters.forEach(counter => {
      let target = +counter.getAttribute("data-target");
      let count = 0;
      let step = target / 100;
      let interval = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        counter.textContent = Math.floor(count);
      }, 20);
    });
    started = true;
  }
}

window.addEventListener("scroll", animateCounters);

// Плавная прокрутка по якорю
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Модалки
const aboutBtn = document.querySelector(".open-about");
const contactsBtn = document.querySelector(".open-contacts");
const aboutModal = document.querySelector(".about-modal");
const contactsModal = document.querySelector(".contacts-modal");

aboutBtn.addEventListener("click", () => {
  aboutModal.style.display = "flex";
});
contactsBtn.addEventListener("click", () => {
  contactsModal.style.display = "flex";
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      modal.style.display = "none";
    }
  });
});
