document.addEventListener("DOMContentLoaded", ()=>{
  /* ---------- 0. PRELOADER ---------- */
  window.addEventListener("load",()=>{
    const pre   = document.querySelector(".preloader");
    const fixed = document.querySelector(".logo-fixed");
    setTimeout(()=>{
      fixed.classList.add("shrink");   // показываем маленький логотип
      pre.classList.add("hide");       // убираем тёмный экран
    },1700);
  });

  /* ---------- 1. FADE ON SCROLL ------ */
  const fadeIO = new IntersectionObserver(es=>{
    es.forEach(e=>e.isIntersecting && e.target.classList.add("show"));
  },{threshold:.2});
  document.querySelectorAll(".fade").forEach(el=>fadeIO.observe(el));

  /* ---------- 2. COUNTERS ------------ */
  const statIO = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.querySelectorAll(".num").forEach(runCounter);
    });
  },{threshold:.6});
  statIO.observe(document.getElementById("stats"));

  function runCounter(el){
    const target = +el.dataset.num;
    let cur = 0, step = Math.max(1,Math.ceil(target/60));
    const tick = ()=>{ cur+=step; el.textContent = cur>=target?target:cur; if(cur<target) requestAnimationFrame(tick);}
    tick();
  }

  /* ---------- 3. PROJECTS ------------ */
  const projects = [
    {slug:"luchi",     name:"Квартира в ЖК «Лучи»"},
    {slug:"spa",       name:"Современный дом SPA"},
    {slug:"oktava",    name:"ЖК «Октава»"},
    {slug:"meshchera", name:"ЖК «Мещера»"},
    {slug:"piskunova", name:"Дом на Пискунова"},
    {slug:"tihiy",     name:"Квартира «Тихий уголок»"}
  ];
  const wrap = document.querySelector(".projects-wrap");

  projects.forEach(p=>{
    const section = document.createElement("div");
    section.className="project fade";
    section.innerHTML = `<h3>${p.name}</h3><div class="gallery autoMove"></div>`;
    const gal = section.querySelector(".gallery");
    for(let i=1;i<=8;i++){
      const src = `${p.slug}/${i}.jpg`;
      const img = new Image();
      img.src = src; img.alt = p.name; img.loading="lazy";
      img.onerror=()=>img.remove();
      gal.appendChild(img);
    }
    // Дублируем изображения, чтобы авто-скролл был бесконечным
    gal.innerHTML += gal.innerHTML;
    wrap.appendChild(section);
    fadeIO.observe(section);
  });

  /* ---------- 4. COLLAGE ------------- */
  const col = document.querySelector(".collage-col");
  fetch("collage/")   // не все хосты отдают листинг; потому вручную:
    .then(()=>{for(let i=1;i<=11;i++){ addCollage(i); }});

  function addCollage(n){
    const img = new Image();
    img.src = `collage/${n}.jpg`;
    img.loading="lazy";
    img.onerror=()=>img.remove();
    col.appendChild(img);
    fadeIO.observe(img);
  }
});
