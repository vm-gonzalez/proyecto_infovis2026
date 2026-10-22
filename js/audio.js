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
    audio: null,
    fadeTimer: null,
    fadeInterval: null,
    lastPlayTime: 0,
    cooldownMs: 80, // Cooldown ligero para evitar saturación de audio en paneos rápidos

    init: function () {
        if (!this.audio) {
            this.audio = new Audio('sounds/burp.mp3');
            this.audio.preload = 'auto';
        }
    },

    stopCurrent: function () {
        if (this.fadeTimer) {
            clearTimeout(this.fadeTimer);
            this.fadeTimer = null;
        }
        if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
            this.fadeInterval = null;
        }
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    },

    /**
     * Reproduce el efecto de sonido modulado por nivel de consumo.
     * Reutiliza una única instancia de audio (evita fugas de memoria y decodificación repetida).
     */
    playBurpForCountry: function (countryData) {
        if (!countryData || !countryData.hasData) return;

        const now = Date.now();
        if (now - this.lastPlayTime < this.cooldownMs) return;
        this.lastPlayTime = now;

        if (!this.audio) {
            this.init();
        }

        // Detener reproducción previa y limpiar intervalos
        this.stopCurrent();

        // Control de volumen según nivel
        const volumes = {
            muy_alto: 1.0,
            alto: 0.55,
            medio: 0.35,
            bajo: 0.15,
            muy_bajo: 0.07
        };

        // Control de rapidez y tono
        const rates = {
            muy_alto: 0.55,
            alto: 0.76,
            medio: 0.9,
            bajo: 1.1,
            muy_bajo: 1.5
        };

        // Control de duración
        const durations = {
            muy_alto: 2000,
            alto: 1050,
            medio: 750,
            bajo: 550,
            muy_bajo: 410
        };

        const targetVolume = volumes[countryData.level] || 0.3;
        const targetRate = rates[countryData.level] || 1.0;
        const duration = durations[countryData.level] || 600;

        this.audio.volume = targetVolume;
        this.audio.playbackRate = targetRate;

        // Reproducir de forma segura con captura de política de autoplay
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {});
        }

        const fadeDuration = 180;
        const fadeStartTime = Math.max(0, duration - fadeDuration);

        this.fadeTimer = setTimeout(() => {
            const initialVol = this.audio ? this.audio.volume : targetVolume;
            const start = Date.now();

            this.fadeInterval = setInterval(() => {
                if (!this.audio) {
                    clearInterval(this.fadeInterval);
                    return;
                }
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / fadeDuration, 1);
                this.audio.volume = initialVol * (1 - progress);

                if (progress >= 1) {
                    clearInterval(this.fadeInterval);
                    this.fadeInterval = null;
                    this.audio.pause();
                    this.audio.currentTime = 0;
                }
            }, 25);
        }, fadeStartTime);
    }
};

window.SoundEngine = SoundEngine;
