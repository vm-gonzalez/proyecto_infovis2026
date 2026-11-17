/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Audio y Sonido: Martín Concha
 * + Puente de Fisicalización Arduino (Web Serial API - Entrega 2 V2)
 * ====================================================================
 * Martín Concha es el encargado de implementar aquí la reproducción
 * y diseño sonoro de los eructos/chanchos.
 * 
 * Requerimiento:
 * - Al pasar el mouse por un país, se debe reproducir un sonido de eructo.
 * - Debe ser más fuerte y largo si el país tiene un alto nivel de consumo.
 * - Debe ser más débil y corto si el país tiene un menor nivel de consumo.
 * - Al hacer clic en el botón de una tarjeta (o clic en un país del mapa),
 *   se activa además la bomba de agua y los LEDs del prototipo Arduino.
 */

const ArduinoBridge = {
    port: null,
    writer: null,
    isConnected: false,
    isBusy: false,
    busyTimer: null,

    levelMap: {
        muy_bajo: '1',
        bajo: '2',
        medio: '3',
        alto: '4',
        muy_alto: '5'
    },

    durationsMs: {
        muy_bajo: 410,
        bajo: 550,
        medio: 750,
        alto: 1050,
        muy_alto: 2000
    },

    initUI: function () {
        const btn = document.getElementById('btn-connect-arduino');
        if (!btn) return;

        btn.addEventListener('click', () => {
            if (this.isConnected) {
                this.disconnect();
            } else {
                this.connect();
            }
        });
    },

    connect: async function () {
        if (!('serial' in navigator)) {
            if (window.location.protocol === 'file:') {
                alert('Para conectar el Arduino por USB, abre la página con Live Server (http://localhost o http://127.0.0.1) o desde GitHub Pages (https://), ya que Chrome bloquea el puerto USB en archivos file://.');
            } else {
                alert('Tu navegador no soporta Web Serial API. Por favor abre la página en Google Chrome o Microsoft Edge.');
            }
            return;
        }

        try {
            this.port = await navigator.serial.requestPort();
            await this.port.open({ baudRate: 9600 });

            const textEncoder = new TextEncoderStream();
            textEncoder.readable.pipeTo(this.port.writable);
            this.writer = textEncoder.writable.getWriter();
            this.isConnected = true;
            this.updateButtonUI(true);

            this.port.addEventListener('disconnect', () => {
                this.cleanup();
            });
        } catch (err) {
            console.warn('Conexión con Arduino cancelada o fallida:', err);
            this.cleanup();
        }
    },

    disconnect: async function () {
        try {
            if (this.writer) {
                await this.writer.write('0');
                this.writer.releaseLock();
                this.writer = null;
            }
            if (this.port) {
                await this.port.close();
                this.port = null;
            }
        } catch (err) {
            console.warn('Error al cerrar puerto Arduino:', err);
        } finally {
            this.cleanup();
        }
    },

    cleanup: function () {
        if (this.busyTimer) {
            clearTimeout(this.busyTimer);
            this.busyTimer = null;
        }
        this.isBusy = false;
        this.writer = null;
        this.port = null;
        this.isConnected = false;
        this.updateButtonUI(false);
    },

    updateButtonUI: function (connected, customLabel = null) {
        const btn = document.getElementById('btn-connect-arduino');
        const label = document.getElementById('arduino-btn-label');
        if (!btn) return;

        btn.classList.toggle('is-connected', connected);
        if (label) {
            if (customLabel) {
                label.textContent = customLabel;
            } else {
                label.textContent = connected ? 'Arduino Conectado' : 'Conectar Arduino';
            }
        }
    },

    sendCountryLevel: async function (level) {
        if (!this.isConnected || !this.writer) return false;
        const code = this.levelMap[level] || '0';
        try {
            await this.writer.write(code);
            return true;
        } catch (err) {
            console.warn('Error enviando datos al Arduino:', err);
            this.cleanup();
            return false;
        }
    },

    /**
     * Acción explícita por clic (en botón de tarjeta o clic en país del mapa):
     * Reproduce el eructo y activa los LEDs + Bomba de agua en el Arduino.
     */
    dispenseForCountry: async function (countryData, triggerButtonEl = null) {
        if (!countryData || !countryData.hasData) return;

        // 1. Reproducir el sonido proporcional del país
        if (window.SoundEngine && typeof window.SoundEngine.playBurpForCountry === 'function') {
            window.SoundEngine.playBurpForCountry(countryData, true);
        }

        // 2. Enviar nivel al Arduino (bomba + LEDs) si está conectado
        const duration = this.durationsMs[countryData.level] || 800;

        if (this.isConnected && this.writer) {
            await this.sendCountryLevel(countryData.level);
            this.updateButtonUI(true, `Bombeando: ${countryData.name}...`);
        }

        // 3. Feedback visual en el botón de la tarjeta presionada
        if (triggerButtonEl) {
            const originalHTML = triggerButtonEl.dataset.originalHtml || triggerButtonEl.innerHTML;
            triggerButtonEl.dataset.originalHtml = originalHTML;
            triggerButtonEl.classList.add('is-dispensing');
            triggerButtonEl.innerHTML = `<span>💧 Dispensando (${(duration / 1000).toFixed(1)}s)...</span>`;

            setTimeout(() => {
                triggerButtonEl.classList.remove('is-dispensing');
                triggerButtonEl.innerHTML = originalHTML;
            }, duration);
        }

        if (this.busyTimer) clearTimeout(this.busyTimer);
        this.busyTimer = setTimeout(() => {
            if (this.isConnected) {
                this.updateButtonUI(true);
            }
        }, duration);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ArduinoBridge.initUI();
});

window.ArduinoBridge = ArduinoBridge;

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
     * Reproduce el efecto de sonido modulado por nivel de consumo (en hover o clic).
     * Nota: El hover solo reproduce el audio; la bomba de agua se activa únicamente por clic
     * mediante ArduinoBridge.dispenseForCountry() para evitar rebalses al mover el cursor.
     */
    playBurpForCountry: function (countryData, forceImmediate = false) {
        if (!countryData || !countryData.hasData) return;

        const now = Date.now();
        if (!forceImmediate && now - this.lastPlayTime < this.cooldownMs) return;
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
