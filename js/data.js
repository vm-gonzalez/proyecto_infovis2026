/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Datos: Martín Concha
 * ====================================================================
 * Martín Concha es el encargado de investigar y definir aquí los datos
 * de consumo de Coca-Cola por país a nivel mundial.
 * 
 * Estructura esperada por país:
 * - id: Código ISO-2 en minúsculas (ej: 'cl', 'mx', 'us', 'ar')
 * - name: Nombre del país en español
 * - continent: Continente al que pertenece
 * - consumptionServings: Porciones anuales de 8 oz per cápita
 * - consumptionLiters: Litros anuales per cápita
 * - level: 'muy_alto' | 'alto' | 'medio' | 'bajo' | 'muy_bajo'
 * - rank: Posición en el ranking mundial
 * - fact: Dato curioso sobre el consumo en ese país
 */

const CocaColaData = {
    // Clasificación y colores base para los niveles de consumo
    TIERS: {
        muy_alto: {
            id: 'muy_alto',
            label: 'Consumo Muy Alto',
            range: '> 400 porciones/año',
            color: '#E50914'
        },
        alto: {
            id: 'alto',
            label: 'Consumo Alto',
            range: '250 - 399 porciones/año',
            color: '#FF4D4D'
        },
        medio: {
            id: 'medio',
            label: 'Consumo Medio',
            range: '120 - 249 porciones/año',
            color: '#FFA94D'
        },
        bajo: {
            id: 'bajo',
            label: 'Consumo Bajo',
            range: '40 - 119 porciones/año',
            color: '#FFE066'
        },
        muy_bajo: {
            id: 'muy_bajo',
            label: 'Consumo Muy Bajo',
            range: '0 - 39 porciones/año',
            color: '#9CA3AF'
        }
    },

    // Mapeo básico de continentes para la navegación visual
    continentMapping: {
        cl: 'América del Sur', ar: 'América del Sur', br: 'América del Sur',
        pe: 'América del Sur', co: 'América del Sur', uy: 'América del Sur',
        bo: 'América del Sur', ec: 'América del Sur', py: 'América del Sur',
        ve: 'América del Sur',
        mx: 'América del Norte', us: 'América del Norte', ca: 'América del Norte',
        es: 'Europa', fr: 'Europa', de: 'Europa', it: 'Europa', gb: 'Europa',
        pt: 'Europa', nl: 'Europa', be: 'Europa', ru: 'Europa', no: 'Europa', se: 'Europa',
        cn: 'Asia', jp: 'Asia', in: 'Asia', kr: 'Asia', th: 'Asia', id: 'Asia',
        za: 'África', eg: 'África', ng: 'África', ma: 'África', ke: 'África',
        au: 'Oceanía', nz: 'Oceanía'
    },

    // Nombres en español para visualización
    countryNames: {
        cl: 'Chile', mx: 'México', us: 'Estados Unidos', ar: 'Argentina',
        br: 'Brasil', ca: 'Canadá', es: 'España', gb: 'Reino Unido',
        de: 'Alemania', fr: 'Francia', it: 'Italia', ru: 'Rusia',
        cn: 'China', jp: 'Japón', in: 'India', za: 'Sudáfrica',
        eg: 'Egipto', au: 'Australia', nz: 'Nueva Zelanda', co: 'Colombia',
        pe: 'Perú', uy: 'Uruguay', bo: 'Bolivia', ec: 'Ecuador', py: 'Paraguay'
    },

    /**
     * DICCIONARIO DE DATOS (A rellenar por Martín Concha)
     * Se incluyen ejemplos representativos para que la vista del frontend
     * de Vicente Meza pueda mostrar el diseño del tooltip y mapa.
     */
    countries: {
        mx: {
            id: 'mx',
            name: 'México',
            flag: '🇲🇽',
            continent: 'América del Norte',
            rank: 1,
            consumptionServings: 728,
            consumptionLiters: 172.5,
            level: 'muy_alto',
            fact: 'Mayor consumidor per cápita del mundo.'
        },
        cl: {
            id: 'cl',
            name: 'Chile',
            flag: '🇨🇱',
            continent: 'América del Sur',
            rank: 2,
            consumptionServings: 485,
            consumptionLiters: 114.8,
            level: 'muy_alto',
            fact: 'Líder de consumo de Coca-Cola en Sudamérica.'
        },
        us: {
            id: 'us',
            name: 'Estados Unidos',
            flag: '🇺🇸',
            continent: 'América del Norte',
            rank: 3,
            consumptionServings: 403,
            consumptionLiters: 95.4,
            level: 'muy_alto',
            fact: 'País de origen de The Coca-Cola Company (Atlanta, 1886).'
        },
        ar: {
            id: 'ar',
            name: 'Argentina',
            flag: '🇦🇷',
            continent: 'América del Sur',
            rank: 4,
            consumptionServings: 375,
            consumptionLiters: 88.8,
            level: 'alto',
            fact: 'Gran consumo tradicional asociado al Fernet con Coca.'
        },
        za: {
            id: 'za',
            name: 'Sudáfrica',
            flag: '🇿🇦',
            continent: 'África',
            rank: 5,
            consumptionServings: 320,
            consumptionLiters: 75.8,
            level: 'alto',
            fact: 'Principal consumidor de Coca-Cola en el continente africano.'
        },
        es: {
            id: 'es',
            name: 'España',
            flag: '🇪🇸',
            continent: 'Europa',
            rank: 7,
            consumptionServings: 292,
            consumptionLiters: 69.1,
            level: 'alto',
            fact: 'Consumo destacado en Europa y creadores del Kalimotxo.'
        },
        br: {
            id: 'br',
            name: 'Brasil',
            flag: '🇧🇷',
            continent: 'América del Sur',
            rank: 15,
            consumptionServings: 232,
            consumptionLiters: 54.9,
            level: 'medio',
            fact: 'Mercado de gran volumen en la región.'
        },
        jp: {
            id: 'jp',
            name: 'Japón',
            flag: '🇯🇵',
            continent: 'Asia',
            rank: 25,
            consumptionServings: 152,
            consumptionLiters: 36.0,
            level: 'medio',
            fact: 'Famoso por sus ediciones y sabores exclusivos de Coca-Cola.'
        },
        cn: {
            id: 'cn',
            name: 'China',
            flag: '🇨🇳',
            continent: 'Asia',
            rank: 41,
            consumptionServings: 54,
            consumptionLiters: 12.8,
            level: 'bajo',
            fact: 'Consumo per cápita moderado pero con un volumen total masivo.'
        },
        in: {
            id: 'in',
            name: 'India',
            flag: '🇮🇳',
            continent: 'Asia',
            rank: 46,
            consumptionServings: 28,
            consumptionLiters: 6.6,
            level: 'muy_bajo',
            fact: 'Consumo per cápita bajo debido a bebidas locales tradicionales.'
        }
    },

    /**
     * Retorna los datos de un país por su código ISO.
     * Si Martín aún no lo ha añadido, retorna un objeto placeholder con su continente.
     */
    getCountry: function (code) {
        if (!code) return null;
        const normalized = code.toLowerCase().trim();

        if (this.countries[normalized]) {
            return this.countries[normalized];
        }

        const continent = this.continentMapping[normalized] || 'Otro';
        const name = this.countryNames[normalized] || normalized.toUpperCase();

        return {
            id: normalized,
            name: name,
            flag: '🥤',
            continent: continent,
            rank: '--',
            consumptionServings: '--',
            consumptionLiters: '--',
            level: 'muy_bajo',
            fact: 'Información pendiente por añadir por Martín Concha.'
        };
    },

    /**
     * Retorna la configuración visual del nivel de consumo.
     */
    getTierConfig: function (levelKey) {
        const key = (levelKey || 'muy_bajo').toLowerCase();
        return this.TIERS[key] || this.TIERS.muy_bajo;
    },

    /**
     * Retorna el color correspondiente para el mapa de coropleta.
     */
    getColorByLevel: function (levelKey) {
        return this.getTierConfig(levelKey).color;
    },

    /**
     * Retorna el top de países disponibles para la lista visual.
     */
    getTopCountries: function (limit = 5) {
        return Object.values(this.countries)
            .sort((a, b) => (b.consumptionServings || 0) - (a.consumptionServings || 0))
            .slice(0, limit);
    }
};

window.CocaColaData = CocaColaData;
