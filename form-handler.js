// form-handler.js
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meopyrqd";

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Enviando...";
  const data = new FormData(form);
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },
      body: data
    });
    if (res.ok) {
      form.reset();
      status.textContent = "Mensaje enviado. Gracias.";
    } else {
      const json = await res.json();
      status.textContent = json?.error || "Error al enviar. Comprueba tu endpoint de Formspree.";
    }
  } catch (err) {
    status.textContent = "Error de red. Intenta de nuevo.";
    console.error(err);
  }
});
