document.addEventListener('DOMContentLoaded', function() {
  // Function to check if an element is in viewport
  function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  function isElementPartiallyInViewport(el) {
      var rect = el.getBoundingClientRect();
      var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
      var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

      var vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
      var horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

      if (vertInView && horInView) {
          var visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          var minimumVisibleHeight = 0.25 * el.offsetHeight; // 25% of element's height
          return visibleHeight >= minimumVisibleHeight;
      }
      return false;
  }

  // Function to handle scroll event
  function onScroll() {
      var elements = document.querySelectorAll('.fadeElement');
      elements.forEach(function(element) {
          if (isElementPartiallyInViewport(element)) {
              element.style.opacity = 1;
          }
      });
  }

  // Attach scroll event listener
  window.addEventListener('scroll', onScroll);

  // Trigger the scroll event once on page load in case the elements are already in view
  onScroll();
});

// Cookies

document.addEventListener("DOMContentLoaded", function () {
  // Función para establecer una cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log(`Cookie ${name} ha sido establecida con el valor: ${value}`);
  }

  // Función para obtener el valor de una cookie por su nombre
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Función para comprobar si las cookies han sido aceptadas
  function cookiesAccepted() {
    return getCookie("cookiesAccepted") === "true";
  }

  // Función para comprobar si las cookies han sido rechazadas
  function cookiesRejected() {
    return getCookie("cookiesAccepted") === "false";
  }

  // Mostrar la alerta de cookies si no han sido aceptadas ni rechazadas
  if (cookiesAccepted() || cookiesRejected()) {
    // Si la cookie ya existe (aceptada o rechazada), ocultamos la alerta
    document.getElementById("cookie-alert").classList.add("hidden");
  } else {
    // Si no se ha tomado ninguna decisión, mostramos la alerta
    document.getElementById("cookie-alert").classList.remove("hidden");
  }

  // Al hacer clic en el botón de "Aceptar", guarda la preferencia y oculta la alerta
  document.getElementById("accept-cookies").addEventListener("click", function () {
    setCookie("cookiesAccepted", "true", 30); // Establece la cookie por 30 días
    console.log("Cookies aceptadas:", getCookie("cookiesAccepted"));
    document.getElementById("cookie-alert").classList.add("hidden");
  });

  // Obtener el botón "Rechazar" y el mensaje de cookies
  const rejectButton = document.getElementById("close-cookies");
  const cookieMessage = document.getElementById("cookie-alert");

  // Ocultar el mensaje de cookies cuando se haga clic en "Rechazar" y guardar la preferencia
  rejectButton.addEventListener("click", function () {
    setCookie("cookiesAccepted", "false", 30); // Establece la cookie de rechazo por 30 días
    console.log("Cookies rechazadas:", getCookie("cookiesAccepted"));
    cookieMessage.classList.add("hidden"); // Ocultar el mensaje de cookies
  });
});

