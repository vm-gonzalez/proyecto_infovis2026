/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Datos: Martín Concha
 * ====================================================================
 * Este archivo contiene las métricas, clasificación y metadatos de
 * consumo anual de Coca-Cola por habitante a nivel mundial.
 * Fuentes: The Coca-Cola Company Annual Reports, Statista, Kantar Worldpanel.
 */

const CocaColaData = {
    // Definición de umbrales y categorías de consumo
    TIERS: {
        MUY_ALTO: {
            id: 'muy_alto',
            label: 'Consumo Muy Alto',
            range: '> 400 porciones/año',
            minServings: 400,
            color: '#E50914', // Rojo Coca-Cola intenso
            glowColor: 'rgba(229, 9, 20, 0.6)',
            burpIntensity: 'Tronador / Legendario (Largo y Estruendoso)',
            burpDuration: 2.2,
            burpGain: 1.0,
            burpPitch: 52
        },
        ALTO: {
            id: 'alto',
            label: 'Consumo Alto',
            range: '250 - 399 porciones/año',
            minServings: 250,
            color: '#FF4D4D', // Rojo claro brillante
            glowColor: 'rgba(255, 77, 77, 0.5)',
            burpIntensity: 'Fuerte y Profundo',
            burpDuration: 1.4,
            burpGain: 0.82,
            burpPitch: 70
        },
        MEDIO: {
            id: 'medio',
            label: 'Consumo Medio',
            range: '120 - 249 porciones/año',
            minServings: 120,
            color: '#FFA94D', // Naranja/Caramelo gaseosa
            glowColor: 'rgba(255, 169, 77, 0.5)',
            burpIntensity: 'Moderado y Ruidoso',
            burpDuration: 0.85,
            burpGain: 0.58,
            burpPitch: 92
        },
        BAJO: {
            id: 'bajo',
            label: 'Consumo Bajo',
            range: '40 - 119 porciones/año',
            minServings: 40,
            color: '#FFE066', // Amarillo ámbar suave
            glowColor: 'rgba(255, 224, 102, 0.4)',
            burpIntensity: 'Leve y Breve',
            burpDuration: 0.45,
            burpGain: 0.35,
            burpPitch: 125
        },
        MUY_BAJO: {
            id: 'muy_bajo',
            label: 'Consumo Muy Bajo',
            range: '0 - 39 porciones/año',
            minServings: 0,
            color: '#9CA3AF', // Gris carbonatado
            glowColor: 'rgba(156, 163, 175, 0.3)',
            burpIntensity: 'Casi Imperceptible (Mini hipo)',
            burpDuration: 0.22,
            burpGain: 0.18,
            burpPitch: 165
        }
    },

    // Base de datos de países (clave: código ISO 3166-1 alpha-2 en minúsculas)
    countries: {
        // --- AMÉRICA DEL NORTE ---
        mx: {
            id: 'mx',
            name: 'México',
            englishName: 'Mexico',
            flag: '🇲🇽',
            continent: 'América del Norte',
            rank: 1,
            consumptionServings: 728, // Porciones de 8 oz per cápita/año
            consumptionLiters: 172.5,
            level: 'muy_alto',
            fact: '¡Campeón mundial indiscutido! En regiones como Chiapas el consumo supera los 800 litros por persona al año, e incluso se usa en ceremonias religiosas indígenas.'
        },
        us: {
            id: 'us',
            name: 'Estados Unidos',
            englishName: 'United States',
            flag: '🇺🇸',
            continent: 'América del Norte',
            rank: 3,
            consumptionServings: 403,
            consumptionLiters: 95.4,
            level: 'muy_alto',
            fact: 'Cuna de Coca-Cola (Atlanta, 1886). El 94% de la población mundial reconoce el logotipo rojo y blanco de la marca inventada por John Pemberton.'
        },
        ca: {
            id: 'ca',
            name: 'Canadá',
            englishName: 'Canada',
            flag: '🇨🇦',
            continent: 'América del Norte',
            rank: 18,
            consumptionServings: 215,
            consumptionLiters: 50.9,
            level: 'medio',
            fact: 'Cuenta con versiones especiales endulzadas con azúcar de caña para comunidades específicas y empaques bilingües inglés-francés.'
        },

        // --- AMÉRICA DEL SUR ---
        cl: {
            id: 'cl',
            name: 'Chile',
            englishName: 'Chile',
            flag: '🇨🇱',
            continent: 'América del Sur',
            rank: 2,
            consumptionServings: 485,
            consumptionLiters: 114.8,
            level: 'muy_alto',
            fact: '¡Líder absoluto de Sudamérica! Los chilenos beben más de 114 litros por persona al año, siendo la bebida por excelencia en los asados y almuerzos familiares.'
        },
        ar: {
            id: 'ar',
            name: 'Argentina',
            englishName: 'Argentina',
            flag: '🇦🇷',
            continent: 'América del Sur',
            rank: 4,
            consumptionServings: 375,
            consumptionLiters: 88.8,
            level: 'alto',
            fact: 'Famosa mundialmente por el "Fernet con Coca", trago icónico que consume una porción gigantesca del stock de Coca-Cola del país.'
        },
        br: {
            id: 'br',
            name: 'Brasil',
            englishName: 'Brazil',
            flag: '🇧🇷',
            continent: 'América del Sur',
            rank: 15,
            consumptionServings: 232,
            consumptionLiters: 54.9,
            level: 'medio',
            fact: 'Uno de los mayores mercados en volumen total del planeta, donde compite intensamente con el tradicional Guaraná Antarctica.'
        },
        co: {
            id: 'co',
            name: 'Colombia',
            englishName: 'Colombia',
            flag: '🇨🇴',
            continent: 'América del Sur',
            rank: 22,
            consumptionServings: 180,
            consumptionLiters: 42.6,
            level: 'medio',
            fact: 'Tradicionalmente se disfruta en las "tiendas de barrio" en botellas de vidrio retornables bien frías.'
        },
        pe: {
            id: 'pe',
            name: 'Perú',
            englishName: 'Peru',
            flag: '🇵🇪',
            continent: 'América del Sur',
            rank: 26,
            consumptionServings: 145,
            consumptionLiters: 34.3,
            level: 'medio',
            fact: 'Es uno de los pocos países del mundo donde una bebida local (Inca Kola) superaba en ventas a Coca-Cola, hasta que The Coca-Cola Company adquirió el 50% de Inca Kola.'
        },
        uy: {
            id: 'uy',
            name: 'Uruguay',
            englishName: 'Uruguay',
            flag: '🇺🇾',
            continent: 'América del Sur',
            rank: 8,
            consumptionServings: 285,
            consumptionLiters: 67.5,
            level: 'alto',
            fact: 'Consumo per cápita muy elevado, solo por detrás de Chile y Argentina en el cono sur.'
        },
        ec: {
            id: 'ec',
            name: 'Ecuador',
            englishName: 'Ecuador',
            flag: '🇪🇨',
            continent: 'América del Sur',
            rank: 28,
            consumptionServings: 130,
            consumptionLiters: 30.8,
            level: 'medio',
            fact: 'Presenta un alto arraigo de envases retornables en ciudades de la sierra y la costa.'
        },
        bo: {
            id: 'bo',
            name: 'Bolivia',
            englishName: 'Bolivia',
            flag: '🇧🇴',
            continent: 'América del Sur',
            rank: 35,
            consumptionServings: 95,
            consumptionLiters: 22.5,
            level: 'bajo',
            fact: 'Aunque surgieron mitos de su "expulsión", Coca-Cola sigue vendiéndose normalmente en todo el territorio boliviano.'
        },
        ve: {
            id: 've',
            name: 'Venezuela',
            englishName: 'Venezuela',
            flag: '🇻🇪',
            continent: 'América del Sur',
            rank: 32,
            consumptionServings: 110,
            consumptionLiters: 26.0,
            level: 'bajo',
            fact: 'En su momento fue uno de los mayores consumidores del Caribe antes de las fluctuaciones de suministro de azúcar.'
        },
        py: {
            id: 'py',
            name: 'Paraguay',
            englishName: 'Paraguay',
            flag: '🇵🇾',
            continent: 'América del Sur',
            rank: 24,
            consumptionServings: 165,
            consumptionLiters: 39.1,
            level: 'medio',
            fact: 'Compite en hidratación con el tradicional tereré, pero es reina en cumpleaños y asados.'
        },

        // --- EUROPA ---
        es: {
            id: 'es',
            name: 'España',
            englishName: 'Spain',
            flag: '🇪🇸',
            continent: 'Europa',
            rank: 7,
            consumptionServings: 292,
            consumptionLiters: 69.1,
            level: 'alto',
            fact: 'Uno de los mayores consumidores de Europa; base cultural del "Kalimotxo" (vino tinto con Coca-Cola) en el País Vasco y toda la península.'
        },
        gb: {
            id: 'gb',
            name: 'Reino Unido',
            englishName: 'United Kingdom',
            flag: '🇬🇧',
            continent: 'Europa',
            rank: 12,
            consumptionServings: 254,
            consumptionLiters: 60.1,
            level: 'alto',
            fact: 'El icónico camión navideño de Coca-Cola ("Holidays are coming") hace un tour anual por ciudades británicas como tradición popular.'
        },
        de: {
            id: 'de',
            name: 'Alemania',
            englishName: 'Germany',
            flag: '🇩🇪',
            continent: 'Europa',
            rank: 16,
            consumptionServings: 225,
            consumptionLiters: 53.3,
            level: 'medio',
            fact: 'Aquí nació la Fanta en 1940: al no poder importar jarabe de Coca-Cola durante la Segunda Guerra Mundial, la filial alemana inventó una nueva fórmula.'
        },
        fr: {
            id: 'fr',
            name: 'Francia',
            englishName: 'France',
            flag: '🇫🇷',
            continent: 'Europa',
            rank: 30,
            consumptionServings: 125,
            consumptionLiters: 29.6,
            level: 'medio',
            fact: 'Los franceses consumen significativamente menos gaseosas que sus vecinos, prefiriendo agua mineral, café y vino.'
        },
        it: {
            id: 'it',
            name: 'Italia',
            englishName: 'Italy',
            flag: '🇮🇹',
            continent: 'Europa',
            rank: 29,
            consumptionServings: 128,
            consumptionLiters: 30.3,
            level: 'medio',
            fact: 'Compite con el espresso diario y los aperitivos locales como el Chinotto y el Campari.'
        },
        be: {
            id: 'be',
            name: 'Bélgica',
            englishName: 'Belgium',
            flag: '🇧🇪',
            continent: 'Europa',
            rank: 9,
            consumptionServings: 278,
            consumptionLiters: 65.8,
            level: 'alto',
            fact: 'Alto consumo per cápita en Europa occidental, con preferencia por envases de vidrio en hostelería.'
        },
        nl: {
            id: 'nl',
            name: 'Países Bajos',
            englishName: 'Netherlands',
            flag: '🇳🇱',
            continent: 'Europa',
            rank: 14,
            consumptionServings: 238,
            consumptionLiters: 56.3,
            level: 'medio',
            fact: 'Gran penetración de variantes sin azúcar (Coca-Cola Zero Sugar).'
        },
        no: {
            id: 'no',
            name: 'Noruega',
            englishName: 'Norway',
            flag: '🇳🇴',
            continent: 'Europa',
            rank: 6,
            consumptionServings: 315,
            consumptionLiters: 74.6,
            level: 'alto',
            fact: '¡Los nórdicos consumen enormes cantidades de Coca-Cola Sin Azúcar per cápita, especialmente durante las vacaciones de invierno!'
        },
        se: {
            id: 'se',
            name: 'Suecia',
            englishName: 'Sweden',
            flag: '🇸🇪',
            continent: 'Europa',
            rank: 20,
            consumptionServings: 195,
            consumptionLiters: 46.2,
            level: 'medio',
            fact: 'En diciembre, el consumo de Coca-Cola cae hasta un 50% debido a la clásica bebida navideña sueca "Julmust".'
        },
        ru: {
            id: 'ru',
            name: 'Rusia',
            englishName: 'Russia',
            flag: '🇷🇺',
            continent: 'Europa',
            rank: 38,
            consumptionServings: 72,
            consumptionLiters: 17.0,
            level: 'bajo',
            fact: 'Tras la retirada oficial en 2022, las embotelladoras locales lanzaron "Dobry Cola", además de importaciones paralelas.'
        },

        // --- ÁFRICA ---
        za: {
            id: 'za',
            name: 'Sudáfrica',
            englishName: 'South Africa',
            flag: '🇿🇦',
            continent: 'África',
            rank: 5,
            consumptionServings: 320,
            consumptionLiters: 75.8,
            level: 'alto',
            fact: '¡Líder del continente africano! Una presencia de distribución masiva que llega a los rincones más alejados del país.'
        },
        eg: {
            id: 'eg',
            name: 'Egipto',
            englishName: 'Egypt',
            flag: '🇪🇬',
            continent: 'África',
            rank: 39,
            consumptionServings: 68,
            consumptionLiters: 16.1,
            level: 'bajo',
            fact: 'Mercado enorme en el norte de África con fuerte presencia en festividades familiares y bodas.'
        },
        ng: {
            id: 'ng',
            name: 'Nigeria',
            englishName: 'Nigeria',
            flag: '🇳🇬',
            continent: 'África',
            rank: 42,
            consumptionServings: 45,
            consumptionLiters: 10.6,
            level: 'bajo',
            fact: 'El país más poblado de África representa uno de los mercados de mayor potencial de crecimiento futuro para la marca.'
        },
        ke: {
            id: 'ke',
            name: 'Kenia',
            englishName: 'Kenya',
            flag: '🇰🇪',
            continent: 'África',
            rank: 45,
            consumptionServings: 38,
            consumptionLiters: 9.0,
            level: 'muy_bajo',
            fact: 'El sistema de distribución en carretas y bicicletas es un caso de estudio logístico global.'
        },
        ma: {
            id: 'ma',
            name: 'Marruecos',
            englishName: 'Morocco',
            flag: '🇲🇦',
            continent: 'África',
            rank: 36,
            consumptionServings: 88,
            consumptionLiters: 20.8,
            level: 'bajo',
            fact: 'Coexiste con la arraigada cultura del té con menta.'
        },

        // --- ASIA ---
        jp: {
            id: 'jp',
            name: 'Japón',
            englishName: 'Japan',
            flag: '🇯🇵',
            continent: 'Asia',
            rank: 25,
            consumptionServings: 152,
            consumptionLiters: 36.0,
            level: 'medio',
            fact: 'El laboratorio de innovación de Coca-Cola: han lanzado Coca-Cola con extracto de café, té verde, durazno, transparente (Clear) y fibra dietética (Plus).'
        },
        cn: {
            id: 'cn',
            name: 'China',
            englishName: 'China',
            flag: '🇨🇳',
            continent: 'Asia',
            rank: 41,
            consumptionServings: 54,
            consumptionLiters: 12.8,
            level: 'bajo',
            fact: 'En chino se traduce como "Kekoukele" (可口可乐), que significa fonéticamente "Deliciosa felicidad compartida".'
        },
        in: {
            id: 'in',
            name: 'India',
            englishName: 'India',
            flag: '🇮🇳',
            continent: 'Asia',
            rank: 46,
            consumptionServings: 28,
            consumptionLiters: 6.6,
            level: 'muy_bajo',
            fact: 'El consumo per cápita es bajo debido a la inmensa población rural y la popularidad de la marca nacional Thums Up (que luego fue comprada por Coca-Cola).'
        },
        kr: {
            id: 'kr',
            name: 'Corea del Sur',
            englishName: 'South Korea',
            flag: '🇰🇷',
            continent: 'Asia',
            rank: 31,
            consumptionServings: 118,
            consumptionLiters: 27.9,
            level: 'bajo',
            fact: 'Muy popular junto al pollo frito coreano ("Chimaek" alternativo) y en máquinas expendedoras urbanas.'
        },
        ph: {
            id: 'ph',
            name: 'Filipinas',
            englishName: 'Philippines',
            flag: '🇵🇭',
            continent: 'Asia',
            rank: 19,
            consumptionServings: 205,
            consumptionLiters: 48.5,
            level: 'medio',
            fact: 'Históricamente fue el primer país de Asia en tener una planta embotelladora de Coca-Cola en 1912.'
        },
        th: {
            id: 'th',
            name: 'Tailandia',
            englishName: 'Thailand',
            flag: '🇹🇭',
            continent: 'Asia',
            rank: 27,
            consumptionServings: 138,
            consumptionLiters: 32.7,
            level: 'medio',
            fact: 'A menudo se sirve en puestos callejeros en bolsas de plástico con hielo picado y bombilla.'
        },
        kp: {
            id: 'kp',
            name: 'Corea del Norte',
            englishName: 'North Korea',
            flag: '🇰🇵',
            continent: 'Asia',
            rank: 50,
            consumptionServings: 0,
            consumptionLiters: 0,
            level: 'muy_bajo',
            fact: 'Uno de los dos únicos países del mundo donde Coca-Cola no opera comercialmente de manera oficial debido a sanciones comerciales.'
        },
        cu: {
            id: 'cu',
            name: 'Cuba',
            englishName: 'Cuba',
            flag: '🇨🇦',
            continent: 'América del Norte',
            rank: 49,
            consumptionServings: 2,
            consumptionLiters: 0.5,
            level: 'muy_bajo',
            fact: 'Pese a que el coctel "Cuba Libre" lleva su nombre, Coca-Cola no opera oficialmente en la isla desde la revolución de 1960. Usan su propia marca: TuKola.'
        },

        // --- OCEANÍA ---
        au: {
            id: 'au',
            name: 'Australia',
            englishName: 'Australia',
            flag: '🇦🇺',
            continent: 'Oceanía',
            rank: 10,
            consumptionServings: 275,
            consumptionLiters: 65.1,
            level: 'alto',
            fact: 'En Australia se originó la famosa campaña global "Comparte una Coca-Cola con..." con nombres propios en las latas en 2011.'
        },
        nz: {
            id: 'nz',
            name: 'Nueva Zelanda',
            englishName: 'New Zealand',
            flag: '🇳🇿',
            continent: 'Oceanía',
            rank: 17,
            consumptionServings: 220,
            consumptionLiters: 52.1,
            level: 'medio',
            fact: 'Mercado con una altísima adopción de botellas de plástico 100% reciclado (rPET).'
        }
    },

    // Asignación de continentes para el resto de países del SVG
    continentMapping: {
        // América del Norte y Central / Caribe
        gl: 'América del Norte', gt: 'América del Norte', hn: 'América del Norte',
        sv: 'América del Norte', ni: 'América del Norte', cr: 'América del Norte',
        pa: 'América del Norte', cu: 'América del Norte', do: 'América del Norte',
        ht: 'América del Norte', jm: 'América del Norte', bs: 'América del Norte',
        bz: 'América del Norte',

        // América del Sur
        gy: 'América del Sur', sr: 'América del Sur', gf: 'América del Sur',

        // Europa
        pt: 'Europa', ch: 'Europa', at: 'Europa', pl: 'Europa', cz: 'Europa',
        sk: 'Europa', hu: 'Europa', ro: 'Europa', bg: 'Europa', gr: 'Europa',
        tr: 'Europa', ua: 'Europa', by: 'Europa', fi: 'Europa', dk: 'Europa',
        ie: 'Europa', is: 'Europa', rs: 'Europa', hr: 'Europa', ba: 'Europa',
        al: 'Europa', me: 'Europa', mk: 'Europa', md: 'Europa', lt: 'Europa',
        lv: 'Europa', ee: 'Europa',

        // Asia
        sa: 'Asia', ae: 'Asia', ir: 'Asia', iq: 'Asia', sy: 'Asia', jo: 'Asia',
        il: 'Asia', lb: 'Asia', ye: 'Asia', om: 'Asia', pk: 'Asia', bd: 'Asia',
        lk: 'Asia', np: 'Asia', mm: 'Asia', vn: 'Asia', my: 'Asia', sg: 'Asia',
        id: 'Asia', kz: 'Asia', uz: 'Asia', tm: 'Asia', kg: 'Asia', tj: 'Asia',
        mn: 'Asia', tw: 'Asia', af: 'Asia',

        // África
        dz: 'África', ly: 'África', sd: 'África', ss: 'África', et: 'África',
        tz: 'África', ug: 'África', gh: 'África', ci: 'África', sn: 'África',
        cm: 'África', ao: 'África', mz: 'África', zm: 'África', zw: 'África',
        na: 'África', bw: 'África', mg: 'África', tn: 'África', ml: 'África',
        ne: 'África', td: 'África', cd: 'África', cg: 'África', ga: 'África',

        // Oceanía
        pg: 'Oceanía', fj: 'Oceanía', sb: 'Oceanía', vu: 'Oceanía', nc: 'Oceanía'
    },

    // Nombres en español para países complementarios
    countryNames: {
        pt: 'Portugal', ch: 'Suiza', at: 'Austria', pl: 'Polonia', cz: 'República Checa',
        sk: 'Eslovaquia', hu: 'Hungría', ro: 'Rumania', bg: 'Bulgaria', gr: 'Grecia',
        tr: 'Turquía', ua: 'Ucrania', by: 'Bielorrusia', fi: 'Finlandia', dk: 'Dinamarca',
        ie: 'Irlanda', is: 'Islandia', gl: 'Groenlandia', gt: 'Guatemala', hn: 'Honduras',
        sv: 'El Salvador', ni: 'Nicaragua', cr: 'Costa Rica', pa: 'Panamá', do: 'Rep. Dominicana',
        ht: 'Haití', jm: 'Jamaica', id: 'Indonesia', my: 'Malasia', sg: 'Singapur',
        vn: 'Vietnam', tw: 'Taiwán', pk: 'Pakistán', bd: 'Bangladés', sa: 'Arabia Saudita',
        ae: 'Emiratos Árabes', dz: 'Argelia', et: 'Etiopía', gh: 'Ghana', ma: 'Marruecos'
    },

    /**
     * Obtiene la información completa de un país dado su código ISO.
     * Si no está en la base principal, infiere datos coherentes para que
     * la visualización siempre responda al cursor.
     */
    getCountry: function (code) {
        if (!code) return null;
        const normalized = code.toLowerCase().trim();

        if (this.countries[normalized]) {
            return this.countries[normalized];
        }

        // Generación sintética para países que no están en el top detallado
        const continent = this.continentMapping[normalized] || 'Desconocido';
        const name = this.countryNames[normalized] || normalized.toUpperCase();
        
        // Asignación de nivel estándar estimada por continente
        let servings = 60;
        let level = 'bajo';
        if (continent === 'América del Sur' || continent === 'América del Norte') {
            servings = 160;
            level = 'medio';
        } else if (continent === 'Europa') {
            servings = 140;
            level = 'medio';
        } else if (continent === 'Oceanía') {
            servings = 120;
            level = 'medio';
        } else if (continent === 'África' || continent === 'Asia') {
            servings = 35;
            level = 'muy_bajo';
        }

        return {
            id: normalized,
            name: name,
            englishName: name,
            flag: '🌍',
            continent: continent,
            rank: 40,
            consumptionServings: servings,
            consumptionLiters: Number((servings * 0.237).toFixed(1)),
            level: level,
            fact: `País perteneciente a ${continent}. Posee un consumo estimado de ${servings} porciones anuales por habitante.`
        };
    },

    /**
     * Retorna la configuración visual y auditiva del nivel de consumo.
     */
    getTierConfig: function (levelKey) {
        const key = (levelKey || 'muy_bajo').toUpperCase();
        return this.TIERS[key] || this.TIERS.MUY_BAJO;
    },

    /**
     * Retorna el color correspondiente para el mapa de coropleta.
     */
    getColorByLevel: function (levelKey) {
        const tier = this.getTierConfig(levelKey);
        return tier.color;
    },

    /**
     * Obtiene el listado de países Top consumidores ordenados de mayor a menor.
     */
    getTopCountries: function (limit = 5) {
        return Object.values(this.countries)
            .sort((a, b) => b.consumptionServings - a.consumptionServings)
            .slice(0, limit);
    },

    /**
     * Retorna los continentes disponibles en la visualización.
     */
    getContinents: function () {
        return [
            'Todos',
            'América del Sur',
            'América del Norte',
            'Europa',
            'África',
            'Asia',
            'Oceanía'
        ];
    }
};

// Exportar globalmente para navegador
window.CocaColaData = CocaColaData;
