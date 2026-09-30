/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Datos: Martín Concha
 * ====================================================================
 * Este archivo está reservado para Martín Concha.
 * Actualmente se encuentra vacío (solo estructura) para que Martín
 * defina aquí la información y los niveles de consumo de cada país.
 */

const CocaColaData = {
    // Categorías de consumo y colores asignados para la visualización
    TIERS: {
        muy_alto: { id: 'muy_alto', label: 'Consumo Muy Alto', range: '> 400 porciones/año', color: '#E50914' },
        alto:     { id: 'alto',     label: 'Consumo Alto',     range: '250 - 399 porciones/año', color: '#FF4D4D' },
        medio:    { id: 'medio',    label: 'Consumo Medio',    range: '120 - 249 porciones/año', color: '#FFA94D' },
        bajo:     { id: 'bajo',     label: 'Consumo Bajo',     range: '40 - 119 porciones/año', color: '#FFE066' },
        muy_bajo: { id: 'muy_bajo', label: 'Consumo Muy Bajo', range: '0 - 39 porciones/año',   color: '#6B7280' }
    },

    // Mapeo básico de continentes para el filtrado visual
    continentMapping: {
        cl: 'América del Sur', ar: 'América del Sur', br: 'América del Sur',
        pe: 'América del Sur', co: 'América del Sur', uy: 'América del Sur',
        bo: 'América del Sur', ec: 'América del Sur', py: 'América del Sur',
        ve: 'América del Sur', mx: 'América del Norte', us: 'América del Norte',
        ca: 'América del Norte', es: 'Europa', fr: 'Europa', de: 'Europa',
        it: 'Europa', gb: 'Europa', pt: 'Europa', nl: 'Europa', be: 'Europa',
        ru: 'Europa', no: 'Europa', se: 'Europa', cn: 'Asia', jp: 'Asia',
        in: 'Asia', kr: 'Asia', th: 'Asia', id: 'Asia', za: 'África',
        eg: 'África', ng: 'África', ma: 'África', ke: 'África', au: 'Oceanía',
        nz: 'Oceanía'
    },

    // Nombres de países para identificación visual en hover
    countryNames: {
        cl: 'Chile', mx: 'México', us: 'Estados Unidos', ar: 'Argentina',
        br: 'Brasil', ca: 'Canadá', es: 'España', gb: 'Reino Unido',
        de: 'Alemania', fr: 'Francia', it: 'Italia', ru: 'Rusia',
        cn: 'China', jp: 'Japón', in: 'India', za: 'Sudáfrica',
        eg: 'Egipto', au: 'Australia', nz: 'Nueva Zelanda', co: 'Colombia',
        pe: 'Perú', uy: 'Uruguay', bo: 'Bolivia', ec: 'Ecuador', py: 'Paraguay'
    },

    /**
     * DICCIONARIO VACÍO:
     * Martín Concha llenará este objeto con la información de los países.
     */
    countries: {},

    /**
     * Retorna los datos de un país si Martín los ingresó.
     * Si no hay información, devuelve un objeto vacío con recuadros/placeholders.
     */
    getCountry: function (code) {
        if (!code) return null;
        const normalized = code.toLowerCase().trim();

        if (this.countries[normalized]) {
            return this.countries[normalized];
        }

        const continent = this.continentMapping[normalized] || 'Por definir';
        const name = this.countryNames[normalized] || normalized.toUpperCase();

        return {
            id: normalized,
            name: name,
            flag: '🏳️',
            continent: continent,
            rank: '--',
            consumptionServings: '--',
            consumptionLiters: '--',
            level: null,
            fact: 'Espacio reservado para la información que añadirá Martín Concha.'
        };
    },

    getTierConfig: function (levelKey) {
        if (!levelKey) return { label: 'Sin datos aún', color: '#3A2E2E' };
        return this.TIERS[levelKey] || { label: 'Sin datos aún', color: '#3A2E2E' };
    },

    getColorByLevel: function (levelKey) {
        return levelKey ? (this.TIERS[levelKey]?.color || '#2A2020') : '#2A2020';
    },

    /**
     * Retorna 5 slots vacíos para el Top de países (espacios preparados para Martín).
     */
    getTopCountries: function (limit = 5) {
        const list = Object.values(this.countries);
        if (list.length > 0) {
            return list.slice(0, limit);
        }
        // Si no hay datos cargados, entregar 5 espacios vacíos
        return Array.from({ length: limit }, (_, i) => ({
            id: `slot_${i + 1}`,
            name: `[País Top #${i + 1}]`,
            flag: '🏳️',
            rank: i + 1,
            consumptionServings: '--',
            consumptionLiters: '--',
            level: null,
            isPlaceholder: true
        }));
    }
};

window.CocaColaData = CocaColaData;
