const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");
const topicMap = {
  sunday: "Вопрос о воскресном богослужении",
  "bible-study": "Чтение библейских текстов и изучение",
  children: "Воскресная школа",
  teens: "Подростковая встреча",
  youth: "Молодежная встреча"
};

if (topic && topicMap[topic]) {
  const select = document.querySelector('select[name="topic"]');
  if (select) {
    const option = [...select.options].find((item) => item.value === topicMap[topic] || item.textContent === topicMap[topic]);
    if (option) select.value = option.value;
  }
}

const form = document.querySelector("[data-contact-form]");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const text = [
      "Здравствуйте! Хочу связаться с Библейской церковью Ейска.",
      `Имя: ${data.get("name")}`,
      `Контакт: ${data.get("contact")}`,
      `Тема: ${data.get("topic")}`,
      `Сообщение: ${data.get("message")}`
    ].join("\n");
    const status = document.querySelector("[data-form-status]");
    if (status) status.textContent = "Открываем Telegram с подготовленным сообщением.";
    window.open(`https://t.me/denis_samarin?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
}
