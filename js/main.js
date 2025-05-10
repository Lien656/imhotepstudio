document.addEventListener("DOMContentLoaded", () => {

  /* ─ 1. прелоадер ─────────────────────── */
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".preloader").classList.add("hide");
    }, 1100);                     // 1.1 сек и сразу сайт
  });

  /* ─ 2. fade-on-scroll ────────────────── */
  const fIO = new IntersectionObserver(e =>
    e.forEach(i => i.isIntersecting && i.target.classList.add("show")),
    {threshold:.2});
  document.querySelectorAll(".fade").forEach(el => fIO.observe(el));

  /* ─ 3. counters ──────────────────────── */
  const sIO = new IntersectionObserver(e=>{
    e.forEach(i=>{
      if(!i.isIntersecting) return;
      i.target.querySelectorAll(".num").forEach(run);
    });
  },{threshold:.6});
  sIO.observe(document.getElementById("stats"));

  function run(el){
    const end=+el.dataset.num; let cur=0,step=Math.max(1,Math.ceil(end/60));
    (function tick(){ cur+=step; el.textContent=cur>=end?end:cur;
      if(cur<end) requestAnimationFrame(tick);
    })();
  }

  /* ─ 4. проекты ───────────────────────── */
  const data = [
    {slug:"luchi",     name:"Квартира в ЖК «Лучи»"},
    {slug:"spa",       name:"Современный дом SPA"},
    {slug:"oktava",    name:"ЖК «Октава»"},
    {slug:"meshchera", name:"ЖК «Мещера»"},
    {slug:"piskunova", name:"Дом на Пискунова"},
    {slug:"tihiy",     name:"Квартира «Тихий уголок»"}
  ];
  const wrap = document.querySelector(".projects-wrap");

  data.forEach(p=>{
    const sec = document.createElement("div");
    sec.className="project fade";
    sec.innerHTML=`<h3>${p.name}</h3><div class="gallery"></div>`;
    const g = sec.querySelector(".gallery");

    // загружаем 1-8.jpg
    for(let i=1;i<=8;i++){
      const img=new Image();
      img.src=`${p.slug}/${i}.jpg`; img.alt=p.name; img.loading="lazy";
      img.onerror=()=>img.remove();
      g.appendChild(img);
    }
    // дублируем для бесконечной ленты
    g.innerHTML += g.innerHTML;

    // автоскролл + стоп при ручном свайпе
    const timer=setInterval(()=>{g.scrollLeft+=1},20);
    g.addEventListener("pointerdown", ()=>clearInterval(timer), {once:true});

    wrap.appendChild(sec);
    fIO.observe(sec);
  });

  /* ─ 5. коллаж ────────────────────────── */
  const col=document.querySelector(".collage-col");
  for(let i=1;i<=11;i++){ add(i); }

  function add(n){
    const img=new Image();
    img.src=`collage/${n}.jpg`; img.loading="lazy";
    img.onerror=()=>img.remove();
    col.appendChild(img);
    fIO.observe(img);
  }

});
