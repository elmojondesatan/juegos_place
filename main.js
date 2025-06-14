import { cargarAhorcado } from "./componentes/ahorcados/ahorcado.js";

export function cargarDOM() {
    let DOM = document.querySelector("#root");
    DOM.innerHTML = ""; // Limpia contenido previo

    // Agrega título principal
    const tituloPrincipal = document.createElement("h1");
    tituloPrincipal.className = "titulo-general";
    tituloPrincipal.textContent = "🎮 Juego Ahorcado";

    DOM.appendChild(tituloPrincipal);
    DOM.appendChild(cargarAhorcado());
}

cargarDOM();
