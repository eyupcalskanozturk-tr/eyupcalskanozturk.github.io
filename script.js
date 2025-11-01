// ===========================
//  Eyüp Çalışkanöztürk - Site JS
//  Tema, yıl, projeler, filtre, modal
// ===========================

// Yıl otomatik
document.getElementById("year").textContent = new Date().getFullYear();

// Tema geçişi
const themeToggle = document.getElementById("themeToggle");
const applyTheme = (t) => {
  document.body.classList.toggle("light", t === "light");
  themeToggle.textContent = t === "light" ? "☀️" : "🌙";
};
const saved = localStorage.getItem("theme") || "dark";
applyTheme(saved);
themeToggle.addEventListener("click", () => {
  const next = document.body.classList.contains("light") ? "dark" : "light";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

// Scroll belirme animasyonu
const reveal = () => {
  document.querySelectorAll(".fade-in,.fade-in-delayed,.fade-in-delayed2").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight - 80) el.classList.add("visible");
  });
};
reveal();
addEventListener("scroll", reveal);

// ---- Projeler (veri) ----
const PROJECTS = [
  {
    title: "Gold Password Generator",
    desc: "Güçlü şifre üretici + şifre güç testi (gold-black UI).",
    tags: ["web", "js", "security"],
    link: "https://github.com/eyupcalskanozturk-tr/gold-password-generator",
    type: "web"
  },
  {
    title: "Weather App",
    desc: "Modern hava durumu arayüzü, kutu tabanlı minimal tasarım.",
    tags: ["web", "api"],
    link: "#",
    type: "web"
  },
  {
    title: "CMD Dinozor (C#)",
    desc: "Konsol tabanlı mini oyun; akış kontrol ve algoritmalar.",
    tags: ["csharp", "console"],
    link: "#",
    type: "csharp"
  },
  {
    title: "AI Mini Project",
    desc: "Basit JS tabanlı AI denemeleri.",
    tags: ["ai", "js"],
    link: "#",
    type: "ai"
  }
];

// ---- Projeleri render et ----
const grid = document.getElementById("projectGrid");
function renderProjects(filter = "all"){
  grid.innerHTML = "";
  const list = PROJECTS.filter(p => filter === "all" ? true : p.type === filter);
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tagbar">
        ${p.tags.map(t => `<span class="tag">#${t}</span>`).join("")}
      </div>
      <div class="card-actions">
        <button class="btn btn-ghost more">Detay</button>
        <a class="link" href="${p.link}" target="_blank" rel="noopener">GitHub</a>
      </div>
    `;
    // Modal aç
    card.querySelector(".more").addEventListener("click", () => openModal(p));
    grid.appendChild(card);
  });
}
renderProjects();

// ---- Filtreler ----
const chips = document.querySelectorAll(".chip");
chips.forEach(ch => ch.addEventListener("click", () => {
  chips.forEach(c => c.classList.remove("is-active"));
  ch.classList.add("is-active");
  renderProjects(ch.dataset.filter);
}));

// ---- Modal ----
const modal = document.getElementById("projectModal");
const mTitle = document.getElementById("modalTitle");
const mDesc = document.getElementById("modalDesc");
const mTags = document.getElementById("modalTags");
const mLink = document.getElementById("modalLink");
const mClose = document.getElementById("modalClose");

function openModal(p){
  mTitle.textContent = p.title;
  mDesc.textContent = p.desc;
  mTags.innerHTML = p.tags.map(t => `<li>#${t}</li>`).join("");
  mLink.href = p.link === "#" ? "https://github.com/eyupcalskanozturk-tr" : p.link;
  modal.showModal();
}
mClose.addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if(e.target === modal) modal.close(); });

// ---- Smooth anchor (ek güvence) ----
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", e=>{
    const id = a.getAttribute("href");
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:"smooth"});
    }
  });
});
