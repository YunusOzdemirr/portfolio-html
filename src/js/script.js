const root = document.documentElement;
const body = document.body;
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector("#switch");
const languageButtons = document.querySelectorAll(".language-option");
const translatedElements = document.querySelectorAll("[data-en][data-tr]");
let currentLanguage = "en";

function updateMenuLabel(isOpen) {
  const labels = pageMetadata[currentLanguage];
  hamburger.setAttribute("aria-label", isOpen ? labels.menuClose : labels.menuOpen);
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
  updateMenuLabel(false);
  body.classList.remove("menu-open");
}

function toggleMenu() {
  const isOpen = hamburger.classList.toggle("active");
  navMenu.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  updateMenuLabel(isOpen);
  body.classList.toggle("menu-open", isOpen);
}

hamburger.addEventListener("click", toggleMenu);
navLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});

window.addEventListener(
  "scroll",
  () => navbar.classList.toggle("scrolled", window.scrollY > 12),
  { passive: true }
);

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.checked = theme === "dark";
}

const savedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

applyTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("change", (event) => {
  const theme = event.target.checked ? "dark" : "light";
  applyTheme(theme);
  localStorage.setItem("theme", theme);
});

const pageMetadata = {
  en: {
    title: "Yunus Ozdemir | Backend Developer",
    description:
      "Portfolio of Yunus Ozdemir, a Software Development Specialist and Azure Developer Associate focused on scalable .NET backends, microservices, and cloud-native systems.",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    theme: "Toggle dark theme",
  },
  tr: {
    title: "Yunus Ozdemir | Backend Geliştirici",
    description:
      "Ölçeklenebilir .NET backend sistemleri, mikroservisler ve bulut tabanlı çözümler geliştiren Yazılım Geliştirme Uzmanı Yunus Ozdemir'in portföyü.",
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
    theme: "Koyu temayı değiştir",
  },
};

function applyLanguage(language) {
  const lang = language === "tr" ? "tr" : "en";
  currentLanguage = lang;

  translatedElements.forEach((element) => {
    element.textContent = element.dataset[lang];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  root.lang = lang;
  document.title = pageMetadata[lang].title;
  document.querySelector('meta[name="title"]').content = pageMetadata[lang].title;
  document.querySelector('meta[name="description"]').content = pageMetadata[lang].description;
  updateMenuLabel(navMenu.classList.contains("active"));
  themeToggle.setAttribute("aria-label", pageMetadata[lang].theme);

  localStorage.setItem("language", lang);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const savedLanguage = localStorage.getItem("language");
applyLanguage(savedLanguage || "en");

document.querySelector("#datee").textContent = new Date().getFullYear();
