
document.addEventListener("DOMContentLoaded", function () {
  const capsulaBlanda = document.querySelector(".pill-izquierda");
  const sawPalmetto = document.querySelector(".pill-derecha");
  const apoyoTratamiento = document.querySelector(".pill-abajo");

  const card = document.querySelector(".contiene-der .card");
  const titulo = card.querySelector("h3");
  const parrafo = card.querySelector("p");

  capsulaBlanda.addEventListener("click", function () {
    titulo.textContent = "Cada cápsula alivia los siguientes síntomas:";

    parrafo.innerHTML = `
      Controla la tos seca y persistente, brindándote un descanso reparador.
    `;
  });

  sawPalmetto.addEventListener("click", function () {
    titulo.textContent = "Cada cápsula alivia los siguientes síntomas:";

    parrafo.innerHTML = `
      Descongestiona rápidamente las vías respiratorias, permitiéndote respirar mejor.
    `;
  });

  apoyoTratamiento.addEventListener("click", function () {
    titulo.textContent = "Cada cápsula alivia los siguientes síntomas:";

    parrafo.innerHTML = `
     Reduce la fiebre y alivia el dolor corporal, devolviéndote la energía.
    `;
  });
});

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    question.addEventListener('click', () => {
      const isOpen = answer.style.display === 'block';

      // Cierra todos
      faqItems.forEach(el => {
        el.querySelector('.faq-answer').style.display = 'none';
        el.querySelector('.faq-icon').textContent = '+';
      });

      // Abre si estaba cerrado
      if (!isOpen) {
        answer.style.display = 'block';
        icon.textContent = '−';
      }
    });
  });
  
function toggleMenu() {
    const menu = document.getElementById("navbarMenu");
    menu.classList.toggle("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navbarLinks = document.getElementById("navbar-links");
  
    if (hamburger && navbarLinks) {
      hamburger.addEventListener("click", () => {
        navbarLinks.classList.toggle("show");
      });
    }
  });
