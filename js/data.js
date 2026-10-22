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
    // Métrica activa: 'per_capita' (por defecto) o 'total'
    currentMetric: 'per_capita',

    // Escala para Consumo Total en litros anuales
    TIERS_TOTAL: {
        muy_alto: { id: 'muy_alto', label: 'Consumo Muy Alto', range: '≥ 5,0 B L',       color: '#F40009' },
        alto:     { id: 'alto',     label: 'Consumo Alto',     range: '2,0 - 4,9 B L',   color: '#CF131C' },
        medio:    { id: 'medio',    label: 'Consumo Medio',    range: '1,0 - 1,9 B L',   color: '#9E181F' },
        bajo:     { id: 'bajo',     label: 'Consumo Bajo',     range: '200 - 900 M L',   color: '#66191E' },
        muy_bajo: { id: 'muy_bajo', label: 'Consumo Muy Bajo', range: '≤ 100 M L',       color: '#3A1417' }
    },

    // Escala para Consumo Per Cápita en litros por habitante al año
    TIERS_PER_CAPITA: {
        muy_alto: { id: 'muy_alto', label: 'Consumo Muy Alto', range: '≥ 110 L / hab',   color: '#F40009' },
        alto:     { id: 'alto',     label: 'Consumo Alto',     range: '65 - 109 L / hab', color: '#CF131C' },
        medio:    { id: 'medio',    label: 'Consumo Medio',    range: '30 - 64 L / hab',  color: '#9E181F' },
        bajo:     { id: 'bajo',     label: 'Consumo Bajo',     range: '10 - 29 L / hab',  color: '#66191E' },
        muy_bajo: { id: 'muy_bajo', label: 'Consumo Muy Bajo', range: '< 10 L / hab',     color: '#3A1417' }
    },

    get TIERS() {
        return this.currentMetric === 'per_capita' ? this.TIERS_PER_CAPITA : this.TIERS_TOTAL;
    },

    getTiers: function () {
        return this.TIERS;
    },

    setMetric: function (metric) {
        if (metric !== 'per_capita' && metric !== 'total') return;
        this.currentMetric = metric;
        this._ranking = null;
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
     * Clasifica el consumo según la métrica activa:
     * - 'per_capita': Litros por persona al año (litersPerCapita)
     * - 'total': Miles de millones de litros anuales (litersBillions)
     * @param {number|Object} input Número o registro del país
     */
    getLevel: function (input) {
        if (input == null) return null;
        let perCapitaVal = null;
        let totalVal = null;

        if (typeof input === 'object') {
            perCapitaVal = input.litersPerCapita;
            totalVal = input.litersBillions;
        } else if (typeof input === 'number') {
            if (this.currentMetric === 'per_capita') {
                perCapitaVal = input;
            } else {
                totalVal = input;
            }
        }

        if (this.currentMetric === 'per_capita') {
            if (!this.isValidNumber(perCapitaVal)) return null;
            if (perCapitaVal >= 110.0) return 'muy_alto';
            if (perCapitaVal >= 65.0)  return 'alto';
            if (perCapitaVal >= 30.0)  return 'medio';
            if (perCapitaVal >= 10.0)  return 'bajo';
            return 'muy_bajo';
        } else {
            if (!this.isValidNumber(totalVal)) return null;
            if (totalVal >= 5.0) return 'muy_alto';
            if (totalVal >= 2.0) return 'alto';
            if (totalVal >= 1.0) return 'medio';
            if (totalVal >= 0.2) return 'bajo';
            return 'muy_bajo';
        }
    },

    /**
     * Devuelve el HTML de la bandera como imagen (flagcdn.com). Si la imagen no carga
     * o el código no existe, se usa un SVG como fallback vectorial.
     */
    getFlag: function (code) {
        const svgFallback = `<svg class="flag-placeholder-svg" viewBox="0 0 24 16" width="24" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 1v14M2 2h14l-2 4 2 4H2" stroke="rgba(255,255,255,0.4)" fill="rgba(255,255,255,0.1)"/></svg>`;
        const svgFallbackDataUri = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='1.5'%3E%3Cpath d='M2 1v14M2 2h14l-2 4 2 4H2' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E";
        if (!/^[a-z]{2}$/.test(code)) return svgFallback;
        return `<img class="flag-img" src="https://flagcdn.com/w80/${code}.png" alt="Bandera" loading="lazy" decoding="async" width="24" height="16" onerror="this.onerror=null;this.src='${svgFallbackDataUri}'">`;
    },

    formatNumber: function (value, decimals = 0) {
        return value.toLocaleString('es-CL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    },

    /**
     * Códigos de los países con dato válido ordenados según la métrica activa
     * (de mayor a menor per cápita o volumen total).
     */
    getRanking: function (metric = this.currentMetric) {
        const dataset = this.getDataset();
        if (!dataset || !dataset.countries) return [];

        const isPerCapita = (metric === 'per_capita');
        return Object.keys(dataset.countries)
            .filter(code => {
                const c = dataset.countries[code];
                return isPerCapita ? this.isValidNumber(c?.litersPerCapita) : this.isValidNumber(c?.litersBillions);
            })
            .sort((a, b) => {
                const itemA = dataset.countries[a];
                const itemB = dataset.countries[b];
                return isPerCapita
                    ? (itemA.rankPerCapita - itemB.rankPerCapita)
                    : (itemA.rankTotal - itemB.rankTotal);
            });
    },

    /**
     * Resuelve el nombre oficial en español, métricas duales (per cápita y total),
     * población y comparativa analítica para cualquier país.
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

        if (!fullName) {
            fullName = `País (${normalized.toUpperCase()})`;
        }

        const base = {
            id: normalized,
            name: fullName,
            flag: this.getFlag(normalized),
            continent: this.continentMapping[normalized] || 'Por definir'
        };

        // 3. Buscar datos en el dataset
        const dataset = this.getDataset();
        const record = dataset?.countries?.[normalized];

        if (!record || (!this.isValidNumber(record.litersBillions) && !this.isValidNumber(record.litersPerCapita))) {
            return {
                ...base,
                hasData: false,
                rank: '--',
                rankTotal: '--',
                rankPerCapita: '--',
                litersBillions: null,
                litersTotal: null,
                litersPerCapita: null,
                population: null,
                populationFormatted: 'Sin datos',
                consumption: 'Sin datos',
                consumptionFormatted: 'Sin datos',
                consumptionTotal: 'Sin datos',
                consumptionPerCapita: 'Sin datos',
                level: null,
                fact: 'Este país no figura en la lista de consumo reportada por World Population Review.'
            };
        }

        const isPerCapita = (this.currentMetric === 'per_capita');
        const activeRank = isPerCapita ? record.rankPerCapita : record.rankTotal;
        const activeConsumption = isPerCapita ? record.consumptionPerCapita : record.consumptionTotal;
        const level = this.getLevel(record);
        const formattedTotal = record.litersTotal ? this.formatNumber(record.litersTotal) + ' Litros' : record.consumptionTotal;

        // Fact analítico que contrasta el volumen bruto con el hábito por habitante
        let fact = '';
        if (normalized === 'mx') {
            fact = `México es líder de América en hábito de consumo: ${record.consumptionPerCapita} (#7 mundial) y 19,5 B L en volumen total (#2 mundial).`;
        } else if (normalized === 'cl') {
            fact = `Chile es el #1 indiscutido de Sudamérica por persona con ${record.consumptionPerCapita} (#10 mundial), superando a Brasil y Argentina.`;
        } else if (normalized === 'us') {
            fact = `EE.UU. lidera el volumen bruto global con 39,3 B L (#1 mundial) y mantiene un alto per cápita de ${record.consumptionPerCapita} (#9 mundial).`;
        } else if (normalized === 'cn') {
            fact = `China es #3 en volumen total (10,8 B L), pero cae al puesto #${record.rankPerCapita} per cápita (${record.consumptionPerCapita}) por su enorme población.`;
        } else if (normalized === 'in') {
            fact = `India consume 5,9 B L en total (#8 mundial), pero por habitante es casi insignificante (${record.consumptionPerCapita}, puesto #${record.rankPerCapita}).`;
        } else if (['qa', 'sg', 'kw', 'ae'].includes(normalized)) {
            fact = `Muy alto consumo individual (${record.consumptionPerCapita}) impulsado por altas temperaturas y hábitos de consumo sin bebidas alcohólicas.`;
        } else if (isPerCapita) {
            fact = `Consumo individual anual: ${record.consumptionPerCapita} (Puesto #${record.rankPerCapita} mundial). Volumen país: ${record.consumptionTotal} (#${record.rankTotal}).`;
        } else {
            fact = `Volumen total anual: ${record.consumptionTotal} (Puesto #${record.rankTotal} mundial). Consumo por persona: ${record.consumptionPerCapita} (#${record.rankPerCapita}).`;
        }

        return {
            ...base,
            hasData: true,
            rank: activeRank,
            rankTotal: record.rankTotal,
            rankPerCapita: record.rankPerCapita,
            litersBillions: record.litersBillions,
            litersTotal: record.litersTotal,
            litersPerCapita: record.litersPerCapita,
            population: record.population,
            populationFormatted: record.populationFormatted,
            consumption: activeConsumption,
            consumptionFormatted: activeConsumption,
            consumptionTotal: record.consumptionTotal,
            consumptionPerCapita: record.consumptionPerCapita,
            litersTotalFormatted: formattedTotal,
            level: level,
            fact: fact
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
     * Devuelve el Top de países ordenados por la métrica activa.
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
     * Calcula métricas analíticas agregadas para un continente o global según la métrica activa.
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
                averagePerCapita: '0 L / hab',
                topCountry: null
            };
        }

        const isPerCapita = (this.currentMetric === 'per_capita');
        const topCountry = this.getCountry(codes[0]);

        const totalBillions = codes.reduce((acc, code) => acc + (dataset.countries[code]?.litersBillions || 0), 0);
        const totalPop = codes.reduce((acc, code) => acc + (dataset.countries[code]?.population || 0), 0);
        const totalLiters = codes.reduce((acc, code) => acc + (dataset.countries[code]?.litersTotal || 0), 0);
        const avgPerCapita = totalPop > 0 ? (totalLiters / totalPop) : 0;

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
            averagePerCapita: this.formatNumber(avgPerCapita, 1) + ' L / hab',
            topCountry: topCountry
        };
    }
};

window.CocaColaData = CocaColaData;
