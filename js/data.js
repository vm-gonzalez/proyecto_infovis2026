/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Datos: Sebastián Valencia (Estructura & Nomenclatura Geográfica)
 * ====================================================================
 * Contiene el registro de nombres completos en español y continentes
 * para los 180 países del mapa SVG, y cruza cada país con el dataset de
 * consumo per cápita (data/coca-cola-per-capita.js).
 *
 * Países sin dato en la fuente se devuelven con `hasData: false` y "Sin datos".
 */

const CocaColaData = {
    // Categorías de consumo para la visualización (Escala Secuencial Monocromática Rojo Coca-Cola)
    TIERS: {
        muy_alto: { id: 'muy_alto', label: 'Consumo Muy Alto', range: '≥ 400 porciones/año', color: '#F40009' },
        alto:     { id: 'alto',     label: 'Consumo Alto',     range: '250 - 399 porciones/año', color: '#CF131C' },
        medio:    { id: 'medio',    label: 'Consumo Medio',    range: '120 - 249 porciones/año', color: '#9E181F' },
        bajo:     { id: 'bajo',     label: 'Consumo Bajo',     range: '40 - 119 porciones/año', color: '#66191E' },
        muy_bajo: { id: 'muy_bajo', label: 'Consumo Muy Bajo', range: '0 - 39 porciones/año',   color: '#3A1417' }
    },

    // Diccionario completo de nombres de países en español (180 países del SVG)
    countryNames: {
        ae: 'Emiratos Árabes Unidos', af: 'Afganistán', al: 'Albania', am: 'Armenia',
        ao: 'Angola', ar: 'Argentina', at: 'Austria', au: 'Australia', az: 'Azerbaiyán',
        ba: 'Bosnia y Herzegovina', bd: 'Bangladés', be: 'Bélgica', bf: 'Burkina Faso',
        bg: 'Bulgaria', bi: 'Burundi', bj: 'Benín', bn: 'Brunéi', bo: 'Bolivia',
        br: 'Brasil', bs: 'Bahamas', bt: 'Bután', bw: 'Botsuana', by: 'Bielorrusia',
        bz: 'Belice', ca: 'Canadá', cd: 'República Democrática del Congo',
        cf: 'República Centroafricana', cg: 'República del Congo', ch: 'Suiza',
        ci: 'Costa de Marfil', cl: 'Chile', cm: 'Camerún', cn: 'China', co: 'Colombia',
        cr: 'Costa Rica', cu: 'Cuba', cv: 'Cabo Verde', cy: 'Chipre', cz: 'República Checa',
        de: 'Alemania', dj: 'Yibuti', dk: 'Dinamarca', dm: 'Dominica', do: 'República Dominicana',
        dz: 'Argelia', ec: 'Ecuador', ee: 'Estonia', eg: 'Egipto', er: 'Eritrea',
        es: 'España', et: 'Etiopía', fi: 'Finlandia', fk: 'Islas Malvinas', fr: 'Francia',
        ga: 'Gabón', gb: 'Reino Unido', ge: 'Georgia', gh: 'Ghana', gl: 'Groenlandia',
        gm: 'Gambia', gn: 'Guinea', gq: 'Guinea Ecuatorial', gr: 'Grecia', gt: 'Guatemala',
        gw: 'Guinea-Bisáu', gy: 'Guyana', hn: 'Honduras', hr: 'Croacia', ht: 'Haití',
        hu: 'Hungría', id: 'Indonesia', ie: 'Irlanda', il: 'Israel', in: 'India',
        iq: 'Irak', ir: 'Irán', is: 'Islandia', it: 'Italia', jm: 'Jamaica',
        jo: 'Jordania', jp: 'Japón', ke: 'Kenia', kg: 'Kirguistán', kh: 'Camboya',
        km: 'Comoras', kp: 'Corea del Norte', kr: 'Corea del Sur', kw: 'Kuwait',
        kz: 'Kazajistán', la: 'Laos', lb: 'Líbano', lc: 'Santa Lucía', lk: 'Sri Lanka',
        lr: 'Liberia', ls: 'Lesoto', lt: 'Lituania', lu: 'Luxemburgo', lv: 'Letonia',
        ly: 'Libia', ma: 'Marruecos', md: 'Moldavia', me: 'Montenegro', mg: 'Madagascar',
        mk: 'Macedonia del Norte', ml: 'Malí', mm: 'Myanmar (Birmania)', mn: 'Mongolia',
        mr: 'Mauritania', mt: 'Malta', mu: 'Mauricio', mv: 'Maldivas', mw: 'Malaui',
        mx: 'México', my: 'Malasia', mz: 'Mozambique', na: 'Namibia', nc: 'Nueva Caledonia',
        ne: 'Níger', ng: 'Nigeria', ni: 'Nicaragua', nl: 'Países Bajos', no: 'Noruega',
        np: 'Nepal', nz: 'Nueva Zelanda', om: 'Omán', pa: 'Panamá', pe: 'Perú',
        pg: 'Papúa Nueva Guinea', ph: 'Filipinas', pk: 'Pakistán', pl: 'Polonia',
        pr: 'Puerto Rico', pt: 'Portugal', py: 'Paraguay', qa: 'Catar', ro: 'Rumania',
        rs: 'Serbia', ru: 'Rusia', rw: 'Ruanda', sa: 'Arabia Saudita', sb: 'Islas Salomón',
        sc: 'Seychelles', sd: 'Sudán', se: 'Suecia', sg: 'Singapur', si: 'Eslovenia',
        sk: 'Eslovaquia', sl: 'Sierra Leona', sn: 'Senegal', so: 'Somalia',
        somaliland: 'Somalilandia', sr: 'Surinam', ss: 'Sudán del Sur',
        st: 'Santo Tomé y Príncipe', sv: 'El Salvador', sy: 'Siria',
        sz: 'Suazilandia (Esuatini)', td: 'Chad', tg: 'Togo', th: 'Tailandia',
        tj: 'Tayikistán', tm: 'Turkmenistán', tn: 'Túnez', tr: 'Turquía',
        tt: 'Trinidad y Tobago', tw: 'Taiwán', tz: 'Tanzania', ua: 'Ucrania',
        ug: 'Uganda', us: 'Estados Unidos', uy: 'Uruguay', uz: 'Uzbekistán',
        vc: 'San Vicente y las Granadinas', ve: 'Venezuela', vn: 'Vietnam',
        vu: 'Vanuatu', ye: 'Yemen', za: 'Sudáfrica', zm: 'Zambia', zw: 'Zimbabue'
    },

    // Continente asignado para cada país del SVG
    continentMapping: {
        // América del Sur
        ar: 'América del Sur', bo: 'América del Sur', br: 'América del Sur',
        cl: 'América del Sur', co: 'América del Sur', ec: 'América del Sur',
        fk: 'América del Sur', gy: 'América del Sur', pe: 'América del Sur',
        py: 'América del Sur', sr: 'América del Sur', uy: 'América del Sur',
        ve: 'América del Sur',

        // América del Norte / Central / Caribe
        bs: 'América del Norte', bz: 'América del Norte', ca: 'América del Norte',
        cr: 'América del Norte', cu: 'América del Norte', dm: 'América del Norte',
        do: 'América del Norte', gl: 'América del Norte', gt: 'América del Norte',
        hn: 'América del Norte', ht: 'América del Norte', jm: 'América del Norte',
        lc: 'América del Norte', mx: 'América del Norte', ni: 'América del Norte',
        pa: 'América del Norte', pr: 'América del Norte', sv: 'América del Norte',
        tt: 'América del Norte', us: 'América del Norte', vc: 'América del Norte',

        // Europa
        al: 'Europa', at: 'Europa', ba: 'Europa', be: 'Europa', bg: 'Europa',
        by: 'Europa', ch: 'Europa', cy: 'Europa', cz: 'Europa', de: 'Europa',
        dk: 'Europa', ee: 'Europa', es: 'Europa', fi: 'Europa', fr: 'Europa',
        gb: 'Europa', gr: 'Europa', hr: 'Europa', hu: 'Europa', ie: 'Europa',
        is: 'Europa', it: 'Europa', lt: 'Europa', lu: 'Europa', lv: 'Europa',
        md: 'Europa', me: 'Europa', mk: 'Europa', mt: 'Europa', nl: 'Europa',
        no: 'Europa', pl: 'Europa', pt: 'Europa', ro: 'Europa', rs: 'Europa',
        ru: 'Europa', se: 'Europa', si: 'Europa', sk: 'Europa', ua: 'Europa',

        // África
        ao: 'África', bf: 'África', bi: 'África', bj: 'África', bw: 'África',
        cd: 'África', cf: 'África', cg: 'África', ci: 'África', cm: 'África',
        cv: 'África', dj: 'África', dz: 'África', eg: 'África', er: 'África',
        et: 'África', ga: 'África', gh: 'África', gm: 'África', gn: 'África',
        gq: 'África', gw: 'África', ke: 'África', km: 'África', lr: 'África',
        ls: 'África', ly: 'África', ma: 'África', mg: 'África', ml: 'África',
        mr: 'África', mu: 'África', mw: 'África', mz: 'África', na: 'África',
        ne: 'África', ng: 'África', rw: 'África', sc: 'África', sd: 'África',
        sl: 'África', sn: 'África', so: 'África', somaliland: 'África',
        ss: 'África', st: 'África', sz: 'África', td: 'África', tg: 'África',
        tn: 'África', tz: 'África', ug: 'África', za: 'África', zm: 'África',
        zw: 'África',

        // Asia
        ae: 'Asia', af: 'Asia', am: 'Asia', az: 'Asia', bd: 'Asia', bn: 'Asia',
        bt: 'Asia', cn: 'Asia', ge: 'Asia', id: 'Asia', il: 'Asia', in: 'Asia',
        iq: 'Asia', ir: 'Asia', jo: 'Asia', jp: 'Asia', kg: 'Asia', kh: 'Asia',
        kp: 'Asia', kr: 'Asia', kw: 'Asia', kz: 'Asia', la: 'Asia', lb: 'Asia',
        lk: 'Asia', mm: 'Asia', mn: 'Asia', mv: 'Asia', my: 'Asia', np: 'Asia',
        om: 'Asia', ph: 'Asia', pk: 'Asia', qa: 'Asia', sa: 'Asia', sg: 'Asia',
        sy: 'Asia', th: 'Asia', tj: 'Asia', tm: 'Asia', tr: 'Asia', tw: 'Asia',
        uz: 'Asia', vn: 'Asia', ye: 'Asia',

        // Oceanía
        au: 'Oceanía', nc: 'Oceanía', nz: 'Oceanía', pg: 'Oceanía', sb: 'Oceanía',
        vu: 'Oceanía'
    },

    // 1 porción = 8 onzas líquidas EE.UU. = 0,2365882 litros
    LITERS_PER_SERVING: 0.2365882,
    // Año que se usa para colorear el mapa y armar el ranking
    DATA_YEAR: 2011,
    NO_DATA_COLOR: '#241E1E',

    _ranking: null,

    /**
     * Dataset cargado desde data/coca-cola-per-capita.js.
     * Si el archivo no se cargó, el mapa funciona igual, todo como "Sin datos".
     */
    getDataset: function () {
        return window.CocaColaDataset || null;
    },

    isValidNumber: function (value) {
        return typeof value === 'number' && Number.isFinite(value);
    },

    getLevel: function (servings) {
        if (!this.isValidNumber(servings)) return null;
        if (servings >= 400) return 'muy_alto';
        if (servings >= 250) return 'alto';
        if (servings >= 120) return 'medio';
        if (servings >= 40) return 'bajo';
        return 'muy_bajo';
    },

    /**
     * Devuelve el HTML de la bandera como imagen (flagcdn.com), porque Windows
     * no dibuja los emojis de banderas. Si la imagen no carga (sin internet o
     * código inexistente), se reemplaza por la bandera blanca 🏳️.
     */
    getFlag: function (code) {
        if (!/^[a-z]{2}$/.test(code)) return '🏳️';
        return `<img class="flag-img" src="https://flagcdn.com/w80/${code}.png" alt="" loading="lazy" onerror="this.replaceWith('🏳️')">`;
    },

    formatNumber: function (value, decimals = 0) {
        return value.toLocaleString('es-CL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    },

    /**
     * Códigos de los países con dato válido en DATA_YEAR, de mayor a menor consumo.
     */
    getRanking: function () {
        if (this._ranking) return this._ranking;
        const dataset = this.getDataset();
        const year = this.DATA_YEAR;
        if (!dataset || !dataset.countries) return [];

        this._ranking = Object.keys(dataset.countries)
            .filter(code => this.isValidNumber(dataset.countries[code]?.[year]))
            .sort((a, b) => dataset.countries[b][year] - dataset.countries[a][year]);
        return this._ranking;
    },

    /**
     * Resuelve el nombre oficial en español y el continente de cualquier país,
     * junto con su consumo si el dataset lo incluye. NUNCA devuelve la abreviación ISO.
     */
    getCountry: function (code) {
        if (!code) return null;
        const normalized = code.toLowerCase().trim();

        // 1. Obtener nombre en español del diccionario
        let fullName = this.countryNames[normalized];

        // 2. Fallback inteligente usando Intl.DisplayNames del navegador
        if (!fullName) {
            try {
                const regionNames = new Intl.DisplayNames(['es'], { type: 'region' });
                fullName = regionNames.of(normalized.toUpperCase());
            } catch (e) {}
        }

        // Si aún así no estuviese, formatear nombre limpio (nunca sigla suelta)
        if (!fullName) {
            fullName = `País (${normalized.toUpperCase()})`;
        }

        const base = {
            id: normalized,
            name: fullName,
            flag: this.getFlag(normalized),
            continent: this.continentMapping[normalized] || 'Por definir'
        };

        // 3. Buscar el consumo en el dataset
        const dataset = this.getDataset();
        const record = dataset?.countries?.[normalized];
        const servings = record?.[this.DATA_YEAR];

        if (!this.isValidNumber(servings)) {
            return {
                ...base,
                hasData: false,
                rank: '--',
                servings: null,
                consumptionServings: 'Sin datos',
                consumptionLiters: 'Sin datos',
                level: null,
                fact: dataset
                    ? `The Coca-Cola Company no publica el consumo per cápita de este país en su tabla de ${dataset.source.year}.`
                    : 'No se pudo cargar el dataset de consumo.'
            };
        }

        const history = dataset.source.years
            .map(year => `${year}: ${this.isValidNumber(record[year]) ? this.formatNumber(record[year]) : 'N/D'}`)
            .join(' · ');
        const worldAvg = dataset.worldwide?.[this.DATA_YEAR];
        const worldText = this.isValidNumber(worldAvg)
            ? ` Promedio mundial ${this.DATA_YEAR}: ${this.formatNumber(worldAvg)}.`
            : '';

        return {
            ...base,
            hasData: true,
            rank: this.getRanking().indexOf(normalized) + 1,
            servings: servings,
            consumptionServings: this.formatNumber(servings),
            consumptionLiters: this.formatNumber(servings * this.LITERS_PER_SERVING, 1),
            level: this.getLevel(servings),
            fact: `Porciones de 8 oz por persona — ${history}.${worldText}`
        };
    },

    getTierConfig: function (levelKey) {
        if (!levelKey) return { label: 'Sin datos', color: this.NO_DATA_COLOR };
        return this.TIERS[levelKey] || { label: 'Sin datos', color: this.NO_DATA_COLOR };
    },

    getColorByLevel: function (levelKey) {
        return levelKey ? (this.TIERS[levelKey]?.color || this.NO_DATA_COLOR) : this.NO_DATA_COLOR;
    },

    /**
     * Devuelve el Top de países ordenados por consumo.
     * Si se especifica un continente (distinto a 'Todos'), filtra exclusivamente los países de ese continente.
     */
    getTopCountries: function (limit = 5, continent = 'Todos') {
        let codes = this.getRanking();
        if (continent && continent !== 'Todos') {
            codes = codes.filter(code => this.continentMapping[code] === continent);
        }
        return codes.slice(0, limit).map((code, index) => {
            const country = this.getCountry(code);
            return {
                ...country,
                regionalRank: index + 1
            };
        });
    },

    /**
     * Calcula métricas analíticas agregadas para un continente o global.
     */
    getContinentStats: function (continent = 'Todos') {
        const dataset = this.getDataset();
        const year = this.DATA_YEAR;
        if (!dataset || !dataset.countries) return null;

        let codes = this.getRanking();
        if (continent && continent !== 'Todos') {
            codes = codes.filter(code => this.continentMapping[code] === continent);
        }

        if (codes.length === 0) {
            return {
                count: 0,
                avgServings: 0,
                topCountry: null
            };
        }

        const totalServings = codes.reduce((acc, code) => acc + (dataset.countries[code]?.[year] || 0), 0);
        const avgServings = Math.round(totalServings / codes.length);

        return {
            continent: continent,
            count: codes.length,
            avgServings: avgServings,
            topCountry: this.getCountry(codes[0])
        };
    }
};

window.CocaColaData = CocaColaData;
