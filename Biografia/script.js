// === Modo claro/oscuro ===
const checkbox = document.getElementById('checkboxInput');
checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', checkbox.checked);
  localStorage.setItem('theme', checkbox.checked ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    checkbox.checked = true;
  }
});

// === Menú hamburguesa ===
const burgerCheckbox = document.getElementById('burger');
const navMenu = document.querySelector('.nav-menu');
burgerCheckbox.addEventListener('change', () => {
  navMenu.classList.toggle('active', burgerCheckbox.checked);
});

// === Barra de búsqueda ===
const searchInput = document.getElementById('query');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? 'block' : 'none';
  });
});

// Sonido al pulsar un boton
document.addEventListener("DOMContentLoaded", () => {
  const clickSound = document.getElementById("clickSound");
  clickSound.volume = 0.3;

  document.body.addEventListener("click", () => {
    clickSound.play().catch(() => {});
    clickSound.pause();
    clickSound.currentTime = 0;
  }, { once: true });

  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play().catch(err => console.warn("Audio bloqueado:", err));
    });
  });
});


//Animació titol pàgines // 

const mainTitle = document.querySelector('.main-title');

window.addEventListener('scroll', () => {
  const titlePos = mainTitle.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (titlePos < windowHeight - 100) {
    mainTitle.classList.add('visible');
  }
});
