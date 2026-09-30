/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Audio y Sonido: Sebastián Valencia
 * ====================================================================
 * Motor de sonido interactivo para reproducir el efecto de chancho / eructo
 * con modulación acústica proporcional al consumo de Coca-Cola.
 * 
 * Implementación:
 * 1. Web Audio API Procedural: Genera el eructo en tiempo real (formantes de garganta,
 *    subarmónicos y modulación esofágica por LFO y ruido gaseoso).
 * 2. Soporte para archivos de audio: Permite a Sebastián colocar archivos MP3/WAV
 *    en `assets/audio/` si desea usar grabaciones reales.
 */

const SoundEngine = {
    audioCtx: null,
    isMuted: false,
    volume: 0.8,
    isUnlocked: false,
    currentSource: null,
    
    // Callbacks para animaciones visuales (burbujas/vibración en UI)
    onSoundPlay: null,
    onSoundEnd: null,

    // Mapeo opcional para grabaciones personalizadas de Sebastián
    customAudioFiles: {
        muy_alto: null, // ej: 'assets/audio/eructo_muy_alto.mp3'
        alto: null,     // ej: 'assets/audio/eructo_alto.mp3'
        medio: null,    // ej: 'assets/audio/eructo_medio.mp3'
        bajo: null,     // ej: 'assets/audio/eructo_bajo.mp3'
        muy_bajo: null  // ej: 'assets/audio/eructo_muy_bajo.mp3'
    },

    /**
     * Inicializa el contexto de audio si no está creado.
     */
    initContext: function () {
        if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                this.audioCtx = new AudioContextClass();
            }
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        this.isUnlocked = true;
    },

    /**
     * Alterna el estado de silencio (Mute / Unmute).
     */
    toggleMute: function () {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    },

    /**
     * Ajusta el volumen maestro (0.0 a 1.0).
     */
    setVolume: function (vol) {
        this.volume = Math.max(0, Math.min(1, vol));
    },

    /**
     * Reproduce el eructo proporcional al país seleccionado.
     * @param {Object} countryData Datos del país (proporcionados por Martín Concha)
     */
    playBurpForCountry: function (countryData) {
        if (this.isMuted || !countryData) return;
        this.initContext();

        const levelKey = (countryData.level || 'muy_bajo').toLowerCase();
        const tier = (window.CocaColaData && window.CocaColaData.getTierConfig(levelKey)) || {
            burpDuration: 0.5,
            burpGain: 0.5,
            burpPitch: 100
        };

        // Si Sebastián configuró un archivo de audio para este nivel, reproducirlo
        if (this.customAudioFiles[levelKey]) {
            this.playAudioFile(this.customAudioFiles[levelKey], tier.burpGain);
            return;
        }

        // De lo contrario, usar el sintetizador procedural Web Audio API
        this.synthesizeBurp(countryData, tier);
    },

    /**
     * Sintetizador acústico de eructo mediante Web Audio API.
     * Modela:
     * - Oscilador de baja frecuencia (vibración de cuerdas / esfínter esofágico)
     * - Tremolo / LFO rápido para el traqueteo característico ("flutter")
     * - Formantes de resonancia faríngea (Bandpass)
     * - Inyección de ruido gaseoso (burbujas de CO2)
     */
    synthesizeBurp: function (countryData, tier) {
        if (!this.audioCtx) return;

        const ctx = this.audioCtx;
        const now = ctx.currentTime;

        // Detener sonido anterior suavemente para evitar saturación caótica
        if (this.currentGainNode) {
            try {
                this.currentGainNode.gain.cancelScheduledValues(now);
                this.currentGainNode.gain.setValueAtTime(this.currentGainNode.gain.value, now);
                this.currentGainNode.gain.linearRampToValueAtTime(0, now + 0.04);
            } catch (e) {}
        }

        // Parámetros calculados según el consumo del país
        const servings = countryData.consumptionServings || 50;
        // Escala normalizada de consumo entre 0 y 750 porciones
        const intensityFactor = Math.min(1.0, Math.max(0.1, servings / 650));

        const duration = tier.burpDuration * (0.85 + intensityFactor * 0.4);
        const masterLevel = tier.burpGain * this.volume;
        const basePitch = tier.burpPitch * (1.1 - intensityFactor * 0.3); // Países altos = más graves

        // --- 1. Nodo Maestro de Ganancia ---
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, now);
        this.currentGainNode = masterGain;
        masterGain.connect(ctx.destination);

        // --- 2. Oscilador Principal (Gárgara / Traqueteo Esófago) ---
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(basePitch, now);
        
        // Envolvente de tono: sube al inicio por el escape de gas y decae al final
        osc.frequency.exponentialRampToValueAtTime(basePitch * 1.25, now + duration * 0.25);
        osc.frequency.exponentialRampToValueAtTime(basePitch * 0.75, now + duration);

        // --- 3. LFO de Modulación de Amplitud (Traqueteo / Flutter) ---
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'triangle';
        // Frecuencia del flutter: 22Hz a 36Hz da el efecto exacto de vibración de tejido
        lfo.frequency.setValueAtTime(24 + intensityFactor * 10, now);
        lfoGain.gain.setValueAtTime(0.7, now);

        // Conectar LFO al gain del oscilador
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.6, now);
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);

        // --- 4. Filtro de Resonancia de Garganta (Formantes) ---
        const throatFilter = ctx.createBiquadFilter();
        throatFilter.type = 'bandpass';
        // Formante faríngeo: 380Hz a 550Hz
        throatFilter.frequency.setValueAtTime(380 + (1 - intensityFactor) * 160, now);
        throatFilter.Q.setValueAtTime(4.5 + intensityFactor * 2.0, now);

        // --- 5. Ruido de Burbujeo de CO2 / Gas carbonatado ---
        const bufferSize = ctx.sampleRate * Math.min(duration, 2.5);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            // Ruido Browniano / Rosa filtrado para textura de gas
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.04 * white)) / 1.04;
            lastOut = output[i];
            output[i] *= 3.2;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = noiseBuffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(450, now);
        noiseFilter.Q.setValueAtTime(2.5, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.25 * intensityFactor, now);

        // --- Conexiones de la Cadena de Audio ---
        osc.connect(throatFilter);
        throatFilter.connect(oscGain);
        oscGain.connect(masterGain);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);

        // --- Envolvente de Ganancia (Attack, Sustain ondulante, Release) ---
        const attackTime = 0.06;
        const releaseTime = duration * 0.35;
        const sustainTime = duration - attackTime - releaseTime;

        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.linearRampToValueAtTime(masterLevel, now + attackTime);
        // Pequeño aumento a la mitad del eructo
        masterGain.gain.linearRampToValueAtTime(masterLevel * 0.9, now + attackTime + sustainTime);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        // Iniciar osciladores y ruido
        osc.start(now);
        lfo.start(now);
        noiseNode.start(now);

        // Detener al terminar la duración
        osc.stop(now + duration + 0.05);
        lfo.stop(now + duration + 0.05);
        noiseNode.stop(now + duration + 0.05);

        // Disparar animación en UI
        if (typeof this.onSoundPlay === 'function') {
            this.onSoundPlay(countryData, duration, intensityFactor);
        }

        setTimeout(() => {
            if (typeof this.onSoundEnd === 'function') {
                this.onSoundEnd();
            }
        }, duration * 1000);
    },

    /**
     * Reproduce un archivo de audio externo si Sebastián lo proporciona.
     */
    playAudioFile: function (path, relativeGain) {
        const audio = new Audio(path);
        audio.volume = this.volume * relativeGain;
        audio.play().catch(err => {
            console.warn('No se pudo reproducir el archivo de audio:', err);
        });
    }
};

// Exportar globalmente
window.SoundEngine = SoundEngine;
