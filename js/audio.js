/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Audio y Sonido: Martín Concha
 * ====================================================================
 * Martín Concha es el encargado de implementar aquí la reproducción
 * y diseño sonoro de los eructos/chanchos.
 * 
 * Requerimiento:
 * - Al pasar el mouse por un país, se debe reproducir un sonido de eructo.
 * - Debe ser más fuerte y largo si el país tiene un alto nivel de consumo.
 * - Debe ser más débil y corto si el país tiene un menor nivel de consumo.
 */

const SoundEngine = {
    currentBurp: null,
    /**
     * Esta función es invocada por el frontend (Vicente Meza) cada vez
     * que el usuario pasa el mouse sobre un país en el mapa.
     * 
     * @param {Object} countryData Datos del país proporcionados por Sebastián Valencia:
     *   - countryData.name: Nombre del país (ej: "Chile")
     *   - countryData.level: 'muy_alto' | 'alto' | 'medio' | 'bajo' | 'muy_bajo'
     *   - countryData.consumptionServings: Número de porciones al año
     */
    playBurpForCountry: function (countryData) {
        if (!countryData) return;
        if (!countryData.hasData) return;

        if (this.currentBurp) {
            this.currentBurp.pause();
            this.currentBurp.currentTime = 0;
        }

        // console.log(`[Audio Martín] Hover sobre ${countryData.name} (Nivel: ${countryData.level}). Eructo pendiente de implementar por Martín.`); */

        const burp = new Audio('sounds/burp.mp3');
        this.currentBurp = burp;

        // control volumen
        if (countryData.level === 'muy_alto') {
            burp.volume = 1.0;
        } else if (countryData.level === 'alto') {
            burp.volume = 0.55;
        } else if (countryData.level === 'medio') {
            burp.volume = 0.35;
        } else if (countryData.level === 'bajo') {
            burp.volume = 0.15;
        } else if (countryData.level === 'muy_bajo') {
            burp.volume = 0.07;
        }

        // control rápidez y tono
        let playbackRate;

        if (countryData.level === 'muy_alto') {
            playbackRate = 0.55;
        } else if (countryData.level === 'alto') {
            playbackRate = 0.76;
        } else if (countryData.level === 'medio') {
            playbackRate = 0.9;
        } else if (countryData.level === 'bajo') {
            playbackRate = 1.1;
        } else if (countryData.level === 'muy_bajo') {
            playbackRate = 1.5;
        }

        burp.playbackRate = playbackRate;

        // control duración
        let duration;

        if (countryData.level === 'muy_alto') {
            duration = 2000;
        } else if (countryData.level === 'alto') {
            duration = 1050;
        } else if (countryData.level === 'medio') {
            duration = 750;
        } else if (countryData.level === 'bajo') {
            duration = 550;
        } else if (countryData.level === 'muy_bajo') {
            duration = 410;
        }

        burp.play();


        const fadeDuration = 200;

        setTimeout(() => {
            const initialVolume = burp.volume;
            const fadeStart = Date.now();

            const fade = setInterval(() => {
                const elapsed = Date.now() - fadeStart;
                const progress = Math.min(elapsed / fadeDuration, 1);

                burp.volume = initialVolume * (1 - progress);

                if (progress >= 1) {
                    clearInterval(fade);
                    burp.pause();
                    burp.currentTime = 0;
                }
            }, 20);
        }, Math.max(0, duration - fadeDuration));
    }
};

window.SoundEngine = SoundEngine;
