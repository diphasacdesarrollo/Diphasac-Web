// =============================
// main.js — Diphasac (seguro y desacoplado por página)
// =============================
document.addEventListener("DOMContentLoaded", function () {
  // ---------- Helpers ----------
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));
  const exists = (el) => el !== null && el !== undefined;

  // =============================
  // 1) PÍLDORAS / BENEFICIOS (solo si existen en la página)
  // =============================
  (function handlePills() {
    const capsulaBlanda    = $(".pill-izquierda");
    const sawPalmetto      = $(".pill-derecha");
    const apoyoTratamiento = $(".pill-abajo");
    const card             = $(".beneficio-der .card");
    const titulo           = card ? $("h3", card) : null;
    const parrafo          = card ? $("p", card)  : null;

    const safeSet = (h3, pHtml) => {
      if (!exists(titulo) || !exists(parrafo)) return;
      titulo.textContent = h3;
      parrafo.innerHTML  = pHtml;
    };

    if (exists(capsulaBlanda)) {
      capsulaBlanda.addEventListener("click", () => {
        safeSet("Cápsula blanda", `
          Fáciles de ingerir.<br>
          Suave con tu estómago.<br>
          Disminuye la irritación gástrica.<br>
          Efecto rápido.
        `);
      });
    }

    if (exists(sawPalmetto)) {
      sawPalmetto.addEventListener("click", () => {
        safeSet("Saw Palmetto", `
          Mejora la salud prostática.<br>
          Regula los niveles hormonales.<br>
          Alivio de problemas urinarios.<br>
          Propiedades antiinflamatorias.
        `);
      });
    }

    if (exists(apoyoTratamiento)) {
      apoyoTratamiento.addEventListener("click", () => {
        safeSet("Tratamiento del HBP", `
          Ayuda a reducir los síntomas de la hiperplasia prostática benigna, como la
          dificultad para orinar o la necesidad frecuente de hacerlo, al disminuir la
          inflamación y el tamaño de la próstata.
        `);
      });
    }
  })();

  // =============================
  // 2) MODAL DE VIDEO (Facebook Embed)
  // =============================
  (function handleVideoModal() {
    const modalEl = $("#videoModal");
    const iframe  = $("#videoFrame");

    if (!exists(modalEl) || !exists(iframe)) return;

    // Guardamos el src base
    const baseSrc = iframe.getAttribute("src");

    // Bootstrap modal
    const modal = new bootstrap.Modal(modalEl, {
      backdrop: true,
      keyboard: true
    });

    // Mostrar modal automáticamente (1.2s después de cargar la página)
    setTimeout(() => {
      iframe.setAttribute("src", baseSrc + "&autoplay=true&mute=1");
      modal.show();
    }, 1200);

    // Resetear video al cerrar el modal
    modalEl.addEventListener("hidden.bs.modal", function () {
      iframe.setAttribute("src", baseSrc);
    });
  })();

  // =============================
  // 2) FAQ (seguro aunque no exista en la página)
  // =============================
  (function handleFAQ() {
    const items = $$('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
      const question = $('.faq-question', item);
      const answer   = $('.faq-answer', item);
      const icon     = $('.faq-icon', item);
      if (!exists(question) || !exists(answer) || !exists(icon)) return;

      question.addEventListener('click', () => {
        const isOpen = answer.style.display === 'block';

        // Cierra todos
        $$('.faq-item .faq-answer').forEach(el => el.style.display = 'none');
        $$('.faq-item .faq-icon').forEach(el => el.textContent = '+');

        // Abre si estaba cerrado
        if (!isOpen) {
          answer.style.display = 'block';
          icon.textContent = '−';
        }
      });
    });
  })();

  // =============================
  // 3) Menú hamburguesa (solo si existe)
  // =============================
  (function handleHamburger() {
    const hamburger   = $("#hamburger");
    const navbarLinks = $("#navbar-links");
    if (!exists(hamburger) || !exists(navbarLinks)) return;

    hamburger.addEventListener("click", () => {
      navbarLinks.classList.toggle("show");
    });
  })();

  // =============================
  // 4) Cookies banner (si existe)
  // =============================
  (function handleCookies() {
    const alertBox = $("#cookie-alert");
    if (!exists(alertBox)) return;

    const btnAccept = $("#accept-cookies");
    const btnClose  = $("#close-cookies");

    // Si ya eligió, ocultar
    const pref = localStorage.getItem("diphasac_cookies_pref");
    if (pref) alertBox.style.display = "none";

    btnAccept?.addEventListener("click", () => {
      localStorage.setItem("diphasac_cookies_pref", "accepted");
      alertBox.style.display = "none";
    });

    btnClose?.addEventListener("click", () => {
      localStorage.setItem("diphasac_cookies_pref", "rejected");
      alertBox.style.display = "none";
    });
  })();

  // =============================
  // 5) Modal de VIDEO (LinkedIn) — auto-abrir y pausar al cerrar
  // =============================
// =============================
// 2) MODAL DE VIDEO (Facebook Embed) con autoplay MUTE
// =============================
(function handleVideoModal() {
  const modalEl = document.querySelector("#videoModal");
  const iframe  = document.querySelector("#videoFrame");
  if (!modalEl || !iframe) return;

  // Guarda el src base (sin autoplay) para poder resetear
  const baseSrc = (() => {
    const url = new URL(iframe.src);
    // quitamos cualquier autoplay/mute previos
    url.searchParams.delete("autoplay");
    url.searchParams.delete("mute");
    return url.toString();
  })();

  const modal = new bootstrap.Modal(modalEl, {
    backdrop: true,
    keyboard: true
  });

  // Muestra el modal 1.2s después de carga
  setTimeout(() => modal.show(), 1200);

  // Cuando el modal YA ES visible, añadimos autoplay=1&mute=1
  modalEl.addEventListener("shown.bs.modal", function () {
    const url = new URL(baseSrc);
    url.searchParams.set("autoplay", "1"); // autoplay permitido SOLO si está mute
    url.searchParams.set("mute", "1");
    iframe.src = url.toString();
  });

  // Al cerrar, resetea el src para parar la reproducción
  modalEl.addEventListener("hidden.bs.modal", function () {
    iframe.src = baseSrc;
  });
})();


  // =============================
  // 6) (IMPORTANTE) Quitar llamadas a funciones inexistentes
  // =============================
  // Si en algún HTML existía esto, lo dejamos comentado para no romper:
  // window.addEventListener('load', scaleBeneficios);
  // window.addEventListener('resize', scaleBeneficios);
});