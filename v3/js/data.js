/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Datos: Estructura, Nomenclatura Geográfica y Métricas Totales
 * ====================================================================
 * Contiene el registro de nombres completos en español y continentes
 * para los 180 países del mapa SVG, y cruza cada país con el dataset de
 * consumo total en litros (data/coca-cola-per-capita.js).
 * Fuente: World Population Review (2026), Coca-Cola Consumption by Country.
 *
 * Países sin dato en la fuente se devuelven con `hasData: false` y "Sin datos".
 */

const CocaColaData = {
    // Categorías de consumo total en litros (Escala Secuencial Monocromática Rojo Coca-Cola)
    TIERS: {
        muy_alto: { id: 'muy_alto', label: 'Consumo Muy Alto', range: '≥ 5,0 B L',       color: '#F40009' },
        alto:     { id: 'alto',     label: 'Consumo Alto',     range: '2,0 - 4,9 B L',   color: '#CF131C' },
        medio:    { id: 'medio',    label: 'Consumo Medio',    range: '1,0 - 1,9 B L',   color: '#9E181F' },
        bajo:     { id: 'bajo',     label: 'Consumo Bajo',     range: '200 - 900 M L',   color: '#66191E' },
        muy_bajo: { id: 'muy_bajo', label: 'Consumo Muy Bajo', range: '100 M L',         color: '#3A1417' }
    },

    countryNames: {
        ae: 'Emiratos Árabes Unidos', af: 'Afganistán', al: 'Albania', am: 'Armenia',
        ao: 'Angola', ar: 'Argentina', at: 'Austria', au: 'Australia', az: 'Azerbaiyán',
        ba: 'Bosnia y Herzegovina', bd: 'Bangladés', be: 'Bélgica', bf: 'Burkina Faso',
        bg: 'Bulgaria', bi: 'Burundi', bj: 'Benín', bn: 'Brunéi', bo: 'Bolivia',
        br: 'Brasil', bs: 'Bahamas', bt: 'Bután', bw: 'Botsuana', by: 'Bielorrusia',
        bz: 'Belice', ca: 'Canadá', cd: 'República Democrática del Congo',
        cf: 'República Centroafricana', cg: 'República del Congo', ch: 'Suiza',
        ci: 'Costa de Marfil', cl: 'Chile', cm: 'Camerún', cn: 'China', co: 'Colombia',
        cr: 'Costa Rica', cu: 'Cuba', cv: 'Cabo Verde', cy: 'Chipre', cz: 'Chequia',
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
        bt: 'Asia', cn: 'Asia', ge: 'Asia', hk: 'Asia', id: 'Asia', il: 'Asia', in: 'Asia',
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

    /**
     * Clasifica el consumo en miles de millones de litros (litersBillions)
     * en uno de los 5 niveles del choropleth (compatibles con SoundEngine).
     */
    getLevel: function (litersBillions) {
        if (!this.isValidNumber(litersBillions)) return null;
        if (litersBillions >= 5.0) return 'muy_alto';
        if (litersBillions >= 2.0) return 'alto';
        if (litersBillions >= 1.0) return 'medio';
        if (litersBillions >= 0.2) return 'bajo';
        return 'muy_bajo';
    },

    /**
     * Devuelve el HTML de la bandera como imagen (flagcdn.com). Si la imagen no carga
     * o el código no existe, se usa un SVG como fallback vectorial.
     */
    getFlag: function (code) {
        const svgFallback = `<svg class="flag-placeholder-svg" viewBox="0 0 24 16" width="24" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 1v14M2 2h14l-2 4 2 4H2" stroke="rgba(255,255,255,0.4)" fill="rgba(255,255,255,0.1)"/></svg>`;
        const svgFallbackDataUri = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='1.5'%3E%3Cpath d='M2 1v14M2 2h14l-2 4 2 4H2' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E";
        if (!/^[a-z]{2}$/.test(code)) return svgFallback;
        return `<img class="flag-img" src="https://flagcdn.com/w80/${code}.png" alt="Bandera" loading="lazy" onerror="this.onerror=null;this.src='${svgFallbackDataUri}'">`;
    },

    formatNumber: function (value, decimals = 0) {
        return value.toLocaleString('es-CL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    },

    /**
     * Códigos de los países con dato válido ordenados de mayor a menor consumo total.
     */
    getRanking: function () {
        if (this._ranking) return this._ranking;
        const dataset = this.getDataset();
        if (!dataset || !dataset.countries) return [];

        this._ranking = Object.keys(dataset.countries)
            .filter(code => this.isValidNumber(dataset.countries[code]?.litersBillions))
            .sort((a, b) => dataset.countries[a].rank - dataset.countries[b].rank);
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

        if (!record || !this.isValidNumber(record.litersBillions)) {
            return {
                ...base,
                hasData: false,
                rank: '--',
                litersBillions: null,
                litersTotal: null,
                consumption: 'Sin datos',
                consumptionFormatted: 'Sin datos',
                level: null,
                fact: 'Este país no figura en la lista de consumo reportada por World Population Review.'
            };
        }

        const level = this.getLevel(record.litersBillions);
        const formattedTotal = record.litersTotal ? this.formatNumber(record.litersTotal) + ' Litros' : record.consumption;

        return {
            ...base,
            hasData: true,
            rank: record.rank,
            litersBillions: record.litersBillions,
            litersTotal: record.litersTotal,
            consumption: record.consumption,
            consumptionFormatted: record.consumption,
            litersTotalFormatted: formattedTotal,
            level: level,
            fact: `Volumen total anual: ${record.consumption} (${formattedTotal}) según World Population Review 2026.`
        };
    },

    getTierConfig: function (levelKey) {
        if (!levelKey) return { label: 'Sin datos', color: this.NO_DATA_COLOR, range: 'Sin registro' };
        return this.TIERS[levelKey] || { label: 'Sin datos', color: this.NO_DATA_COLOR, range: 'Sin registro' };
    },

    getColorByLevel: function (levelKey) {
        return levelKey ? (this.TIERS[levelKey]?.color || this.NO_DATA_COLOR) : this.NO_DATA_COLOR;
    },

    /**
     * Devuelve el Top de países ordenados por consumo.
     * Por defecto retorna 6 países (o menos si el continente tiene menos).
     * Si se especifica un continente (distinto a 'Todos'), filtra exclusivamente los países de ese continente.
     */
    getTopCountries: function (limit = 6, continent = 'Todos') {
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
        if (!dataset || !dataset.countries) return null;

        let codes = this.getRanking();
        if (continent && continent !== 'Todos') {
            codes = codes.filter(code => this.continentMapping[code] === continent);
        }

        if (codes.length === 0) {
            return {
                continent: continent,
                count: 0,
                totalFormatted: '0 L',
                topCountry: null
            };
        }

        const totalBillions = codes.reduce((acc, code) => acc + (dataset.countries[code]?.litersBillions || 0), 0);
        let totalFormatted = '';
        if (totalBillions >= 1.0) {
            totalFormatted = this.formatNumber(totalBillions, 1) + ' B L';
        } else {
            totalFormatted = this.formatNumber(Math.round(totalBillions * 1000)) + ' M L';
        }

        return {
            continent: continent,
            count: codes.length,
            totalFormatted: totalFormatted,
            topCountry: this.getCountry(codes[0])
        };
    }
};

window.CocaColaData = CocaColaData;
