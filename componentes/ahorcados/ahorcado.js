import { palabrasPorNivel } from "./palabras.js";

export function cargarAhorcado() {
    let nivel = 1;
    let vidasIniciales = 5;
    let palabrasGanadas = 0;

    const contenedor = document.createElement("div");
    contenedor.className = "ahorcado-container";

    const titulo = document.createElement("h2");
    titulo.className = "titulo-ahorcado";
    contenedor.appendChild(titulo);

    const palabraElemento = document.createElement("div");
    palabraElemento.className = "palabra-oculta";
    contenedor.appendChild(palabraElemento);

    const letrasDiv = document.createElement("div");
    letrasDiv.className = "letras";
    contenedor.appendChild(letrasDiv);

    const vidasElemento = document.createElement("div");
    vidasElemento.className = "vidas";
    contenedor.appendChild(vidasElemento);

    const timerElemento = document.createElement("div");
    timerElemento.className = "temporizador";
    contenedor.appendChild(timerElemento);

    function iniciarNivel() {
        letrasDiv.innerHTML = "";
        titulo.textContent = `Nivel ${nivel}`;

        let palabras = palabrasPorNivel[nivel] || palabrasPorNivel[5];
        let palabra = palabras[Math.floor(Math.random() * palabras.length)];
        let palabraOculta = Array(palabra.length).fill("_");
        let letrasUsadas = [];
        let vidas = vidasIniciales;
        let tiempo = Math.max(20 - nivel * 2, 5); // Tiempo baja con cada nivel
        let intervalo;

        palabraElemento.textContent = palabraOculta.join(" ");
        actualizarVidas(vidas);
        actualizarTemporizador(tiempo);

        intervalo = setInterval(() => {
            tiempo--;
            actualizarTemporizador(tiempo);
            if (tiempo <= 0) {
                clearInterval(intervalo);
                alert("¡Se acabó el tiempo!");
                reiniciarJuego();
            }
        }, 1000);

        for (let i = 65; i <= 90; i++) {
            let letra = String.fromCharCode(i);
            let boton = document.createElement("button");
            boton.textContent = letra;

            boton.addEventListener("click", function () {
                if (letrasUsadas.includes(letra) || vidas <= 0) return;

                letrasUsadas.push(letra);
                boton.disabled = true;

                if (palabra.includes(letra)) {
                    for (let j = 0; j < palabra.length; j++) {
                        if (palabra[j] === letra) {
                            palabraOculta[j] = letra;
                        }
                    }
                    palabraElemento.textContent = palabraOculta.join(" ");
                } else {
                    vidas--;
                    actualizarVidas(vidas);
                }

                if (!palabraOculta.includes("_")) {
                    clearInterval(intervalo);
                    palabrasGanadas++;
                    if (palabrasGanadas >= 3) {
                        alert("¡Subiste de nivel!");
                        nivel++;
                        palabrasGanadas = 0;
                    } else {
                        alert("¡Palabra correcta!");
                    }
                    iniciarNivel();
                } else if (vidas === 0) {
                    clearInterval(intervalo);
                    alert(`Perdiste. La palabra era: ${palabra}`);
                    reiniciarJuego();
                }
            });

            letrasDiv.appendChild(boton);
        }
    }

    function actualizarVidas(vidas) {
        vidasElemento.textContent = "❤️".repeat(vidas) + "🤍".repeat(vidasIniciales - vidas);
    }

    function actualizarTemporizador(tiempo) {
        timerElemento.textContent = `⏱️ ${tiempo}s`;
    }

    function reiniciarJuego() {
        nivel = 1;
        palabrasGanadas = 0;
        iniciarNivel();
    }

    iniciarNivel();
    return contenedor;
}
