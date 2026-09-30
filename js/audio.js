/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Audio y Sonido: Sebastián Valencia
 * ====================================================================
 * Sebastián Valencia es el encargado de implementar aquí la reproducción
 * y diseño sonoro de los eructos/chanchos.
 * 
 * Requerimiento:
 * - Al pasar el mouse por un país, se debe reproducir un sonido de eructo.
 * - Debe ser más fuerte y largo si el país tiene un alto nivel de consumo.
 * - Debe ser más débil y corto si el país tiene un menor nivel de consumo.
 */

const SoundEngine = {
    /**
     * Esta función es invocada por el frontend (Vicente Meza) cada vez
     * que el usuario pasa el mouse sobre un país en el mapa.
     * 
     * @param {Object} countryData Datos del país proporcionados por Martín Concha:
     *   - countryData.name: Nombre del país (ej: "Chile")
     *   - countryData.level: 'muy_alto' | 'alto' | 'medio' | 'bajo' | 'muy_bajo'
     *   - countryData.consumptionServings: Número de porciones al año
     */
    playBurpForCountry: function (countryData) {
        if (!countryData) return;
        
        // TODO (Sebastián Valencia): Integrar aquí la reproducción de los audios de eructos.
        console.log(`[Audio Sebastián] Hover sobre ${countryData.name} (Nivel: ${countryData.level}). Eructo pendiente de implementar por Sebastián.`);
    }
};

window.SoundEngine = SoundEngine;
