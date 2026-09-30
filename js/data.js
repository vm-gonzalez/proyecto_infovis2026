/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÃ“N DE CONSUMO MUNDIAL DE COCA-COLA
 * MÃ³dulo de Datos: MartÃ­n Concha (Estructura & Nomenclatura GeogrÃ¡fica)
 * ====================================================================
 * Contiene el registro de nombres completos en espaÃ±ol y continentes
 * para los 180 paÃ­ses del mapa SVG.
 * 
 * Los datos numÃ©ricos de consumo permanecen vacÃ­os en `countries: {}`
 * para ser definidos por MartÃ­n Concha.
 */

const CocaColaData = {
    // CategorÃ­as de consumo para la visualizaciÃ³n
    TIERS: {
        muy_alto: { id: 'muy_alto', label: 'Consumo Muy Alto', range: '> 400 porciones/aÃ±o', color: '#E50914' },
        alto:     { id: 'alto',     label: 'Consumo Alto',     range: '250 - 399 porciones/aÃ±o', color: '#FF4D4D' },
        medio:    { id: 'medio',    label: 'Consumo Medio',    range: '120 - 249 porciones/aÃ±o', color: '#FFA94D' },
        bajo:     { id: 'bajo',     label: 'Consumo Bajo',     range: '40 - 119 porciones/aÃ±o', color: '#FFE066' },
        muy_bajo: { id: 'muy_bajo', label: 'Consumo Muy Bajo', range: '0 - 39 porciones/aÃ±o',   color: '#6B7280' }
    },

    // Diccionario completo de nombres de paÃ­ses en espaÃ±ol (180 paÃ­ses del SVG)
    countryNames: {
        ae: 'Emiratos Ãrabes Unidos', af: 'AfganistÃ¡n', al: 'Albania', am: 'Armenia',
        ao: 'Angola', ar: 'Argentina', at: 'Austria', au: 'Australia', az: 'AzerbaiyÃ¡n',
        ba: 'Bosnia y Herzegovina', bd: 'BangladÃ©s', be: 'BÃ©lgica', bf: 'Burkina Faso',
        bg: 'Bulgaria', bi: 'Burundi', bj: 'BenÃ­n', bn: 'BrunÃ©i', bo: 'Bolivia',
        br: 'Brasil', bs: 'Bahamas', bt: 'ButÃ¡n', bw: 'Botsuana', by: 'Bielorrusia',
        bz: 'Belice', ca: 'CanadÃ¡', cd: 'RepÃºblica DemocrÃ¡tica del Congo',
        cf: 'RepÃºblica Centroafricana', cg: 'RepÃºblica del Congo', ch: 'Suiza',
        ci: 'Costa de Marfil', cl: 'Chile', cm: 'CamerÃºn', cn: 'China', co: 'Colombia',
        cr: 'Costa Rica', cu: 'Cuba', cv: 'Cabo Verde', cy: 'Chipre', cz: 'RepÃºblica Checa',
        de: 'Alemania', dj: 'Yibuti', dk: 'Dinamarca', dm: 'Dominica', do: 'RepÃºblica Dominicana',
        dz: 'Argelia', ec: 'Ecuador', ee: 'Estonia', eg: 'Egipto', er: 'Eritrea',
        es: 'EspaÃ±a', et: 'EtiopÃ­a', fi: 'Finlandia', fk: 'Islas Malvinas', fr: 'Francia',
        ga: 'GabÃ³n', gb: 'Reino Unido', ge: 'Georgia', gh: 'Ghana', gl: 'Groenlandia',
        gm: 'Gambia', gn: 'Guinea', gq: 'Guinea Ecuatorial', gr: 'Grecia', gt: 'Guatemala',
        gw: 'Guinea-BisÃ¡u', gy: 'Guyana', hn: 'Honduras', hr: 'Croacia', ht: 'HaitÃ­',
        hu: 'HungrÃ­a', id: 'Indonesia', ie: 'Irlanda', il: 'Israel', in: 'India',
        iq: 'Irak', ir: 'IrÃ¡n', is: 'Islandia', it: 'Italia', jm: 'Jamaica',
        jo: 'Jordania', jp: 'JapÃ³n', ke: 'Kenia', kg: 'KirguistÃ¡n', kh: 'Camboya',
        km: 'Comoras', kp: 'Corea del Norte', kr: 'Corea del Sur', kw: 'Kuwait',
        kz: 'KazajistÃ¡n', la: 'Laos', lb: 'LÃ­bano', lc: 'Santa LucÃ­a', lk: 'Sri Lanka',
        lr: 'Liberia', ls: 'Lesoto', lt: 'Lituania', lu: 'Luxemburgo', lv: 'Letonia',
        ly: 'Libia', ma: 'Marruecos', md: 'Moldavia', me: 'Montenegro', mg: 'Madagascar',
        mk: 'Macedonia del Norte', ml: 'MalÃ­', mm: 'Myanmar (Birmania)', mn: 'Mongolia',
        mr: 'Mauritania', mt: 'Malta', mu: 'Mauricio', mv: 'Maldivas', mw: 'Malaui',
        mx: 'MÃ©xico', my: 'Malasia', mz: 'Mozambique', na: 'Namibia', nc: 'Nueva Caledonia',
        ne: 'NÃ­ger', ng: 'Nigeria', ni: 'Nicaragua', nl: 'PaÃ­ses Bajos', no: 'Noruega',
        np: 'Nepal', nz: 'Nueva Zelanda', om: 'OmÃ¡n', pa: 'PanamÃ¡', pe: 'PerÃº',
        pg: 'PapÃºa Nueva Guinea', ph: 'Filipinas', pk: 'PakistÃ¡n', pl: 'Polonia',
        pr: 'Puerto Rico', pt: 'Portugal', py: 'Paraguay', qa: 'Catar', ro: 'Rumania',
        rs: 'Serbia', ru: 'Rusia', rw: 'Ruanda', sa: 'Arabia Saudita', sb: 'Islas SalomÃ³n',
        sc: 'Seychelles', sd: 'SudÃ¡n', se: 'Suecia', sg: 'Singapur', si: 'Eslovenia',
        sk: 'Eslovaquia', sl: 'Sierra Leona', sn: 'Senegal', so: 'Somalia',
        somaliland: 'Somalilandia', sr: 'Surinam', ss: 'SudÃ¡n del Sur',
        st: 'Santo TomÃ© y PrÃ­ncipe', sv: 'El Salvador', sy: 'Siria',
        sz: 'Suazilandia (Esuatini)', td: 'Chad', tg: 'Togo', th: 'Tailandia',
        tj: 'TayikistÃ¡n', tm: 'TurkmenistÃ¡n', tn: 'TÃºnez', tr: 'TurquÃ­a',
        tt: 'Trinidad y Tobago', tw: 'TaiwÃ¡n', tz: 'Tanzania', ua: 'Ucrania',
        ug: 'Uganda', us: 'Estados Unidos', uy: 'Uruguay', uz: 'UzbekistÃ¡n',
        vc: 'San Vicente y las Granadinas', ve: 'Venezuela', vn: 'Vietnam',
        vu: 'Vanuatu', ye: 'Yemen', za: 'SudÃ¡frica', zm: 'Zambia', zw: 'Zimbabue'
    },

    // Continente asignado para cada paÃ­s del SVG
    continentMapping: {
        // AmÃ©rica del Sur
        ar: 'AmÃ©rica del Sur', bo: 'AmÃ©rica del Sur', br: 'AmÃ©rica del Sur',
        cl: 'AmÃ©rica del Sur', co: 'AmÃ©rica del Sur', ec: 'AmÃ©rica del Sur',
        fk: 'AmÃ©rica del Sur', gy: 'AmÃ©rica del Sur', pe: 'AmÃ©rica del Sur',
        py: 'AmÃ©rica del Sur', sr: 'AmÃ©rica del Sur', uy: 'AmÃ©rica del Sur',
        ve: 'AmÃ©rica del Sur',

        // AmÃ©rica del Norte / Central / Caribe
        bs: 'AmÃ©rica del Norte', bz: 'AmÃ©rica del Norte', ca: 'AmÃ©rica del Norte',
        cr: 'AmÃ©rica del Norte', cu: 'AmÃ©rica del Norte', dm: 'AmÃ©rica del Norte',
        do: 'AmÃ©rica del Norte', gl: 'AmÃ©rica del Norte', gt: 'AmÃ©rica del Norte',
        hn: 'AmÃ©rica del Norte', ht: 'AmÃ©rica del Norte', jm: 'AmÃ©rica del Norte',
        lc: 'AmÃ©rica del Norte', mx: 'AmÃ©rica del Norte', ni: 'AmÃ©rica del Norte',
        pa: 'AmÃ©rica del Norte', pr: 'AmÃ©rica del Norte', sv: 'AmÃ©rica del Norte',
        tt: 'AmÃ©rica del Norte', us: 'AmÃ©rica del Norte', vc: 'AmÃ©rica del Norte',

        // Europa
        al: 'Europa', at: 'Europa', ba: 'Europa', be: 'Europa', bg: 'Europa',
        by: 'Europa', ch: 'Europa', cy: 'Europa', cz: 'Europa', de: 'Europa',
        dk: 'Europa', ee: 'Europa', es: 'Europa', fi: 'Europa', fr: 'Europa',
        gb: 'Europa', gr: 'Europa', hr: 'Europa', hu: 'Europa', ie: 'Europa',
        is: 'Europa', it: 'Europa', lt: 'Europa', lu: 'Europa', lv: 'Europa',
        md: 'Europa', me: 'Europa', mk: 'Europa', mt: 'Europa', nl: 'Europa',
        no: 'Europa', pl: 'Europa', pt: 'Europa', ro: 'Europa', rs: 'Europa',
        ru: 'Europa', se: 'Europa', si: 'Europa', sk: 'Europa', ua: 'Europa',

        // Ãfrica
        ao: 'Ãfrica', bf: 'Ãfrica', bi: 'Ãfrica', bj: 'Ãfrica', bw: 'Ãfrica',
        cd: 'Ãfrica', cf: 'Ãfrica', cg: 'Ãfrica', ci: 'Ãfrica', cm: 'Ãfrica',
        cv: 'Ãfrica', dj: 'Ãfrica', dz: 'Ãfrica', eg: 'Ãfrica', er: 'Ãfrica',
        et: 'Ãfrica', ga: 'Ãfrica', gh: 'Ãfrica', gm: 'Ãfrica', gn: 'Ãfrica',
        gq: 'Ãfrica', gw: 'Ãfrica', ke: 'Ãfrica', km: 'Ãfrica', lr: 'Ãfrica',
        ls: 'Ãfrica', ly: 'Ãfrica', ma: 'Ãfrica', mg: 'Ãfrica', ml: 'Ãfrica',
        mr: 'Ãfrica', mu: 'Ãfrica', mw: 'Ãfrica', mz: 'Ãfrica', na: 'Ãfrica',
        ne: 'Ãfrica', ng: 'Ãfrica', rw: 'Ãfrica', sc: 'Ãfrica', sd: 'Ãfrica',
        sl: 'Ãfrica', sn: 'Ãfrica', so: 'Ãfrica', somaliland: 'Ãfrica',
        ss: 'Ãfrica', st: 'Ãfrica', sz: 'Ãfrica', td: 'Ãfrica', tg: 'Ãfrica',
        tn: 'Ãfrica', tz: 'Ãfrica', ug: 'Ãfrica', za: 'Ãfrica', zm: 'Ãfrica',
        zw: 'Ãfrica',

        // Asia
        ae: 'Asia', af: 'Asia', am: 'Asia', az: 'Asia', bd: 'Asia', bn: 'Asia',
        bt: 'Asia', cn: 'Asia', ge: 'Asia', id: 'Asia', il: 'Asia', in: 'Asia',
        iq: 'Asia', ir: 'Asia', jo: 'Asia', jp: 'Asia', kg: 'Asia', kh: 'Asia',
        kp: 'Asia', kr: 'Asia', kw: 'Asia', kz: 'Asia', la: 'Asia', lb: 'Asia',
        lk: 'Asia', mm: 'Asia', mn: 'Asia', mv: 'Asia', my: 'Asia', np: 'Asia',
        om: 'Asia', ph: 'Asia', pk: 'Asia', qa: 'Asia', sa: 'Asia', sg: 'Asia',
        sy: 'Asia', th: 'Asia', tj: 'Asia', tm: 'Asia', tr: 'Asia', tw: 'Asia',
        uz: 'Asia', vn: 'Asia', ye: 'Asia',

        // OceanÃ­a
        au: 'OceanÃ­a', nc: 'OceanÃ­a', nz: 'OceanÃ­a', pg: 'OceanÃ­a', sb: 'OceanÃ­a',
        vu: 'OceanÃ­a'
    },

    /**
     * DICCIONARIO DE DATOS:
     * Reservado para que MartÃ­n Concha aÃ±ada las mÃ©tricas de consumo.
     */
    countries: {},

    /**
     * Resuelve el nombre oficial en espaÃ±ol y el continente de cualquier paÃ­s.
     * NUNCA devuelve la abreviaciÃ³n ISO.
     */
    getCountry: function (code) {
        if (!code) return null;
        const normalized = code.toLowerCase().trim();

        // 1. Si MartÃ­n ya aÃ±adiÃ³ datos para este paÃ­s, usarlos
        if (this.countries[normalized]) {
            return this.countries[normalized];
        }

        // 2. Obtener nombre en espaÃ±ol del diccionario
        let fullName = this.countryNames[normalized];

        // 3. Fallback inteligente usando Intl.DisplayNames del navegador
        if (!fullName) {
            try {
                const regionNames = new Intl.DisplayNames(['es'], { type: 'region' });
                fullName = regionNames.of(normalized.toUpperCase());
            } catch (e) {}
        }

        // Si aÃºn asÃ­ no estuviese, formatear nombre limpio (nunca sigla suelta)
        if (!fullName) {
            fullName = `PaÃ­s (${normalized.toUpperCase()})`;
        }

        const continent = this.continentMapping[normalized] || 'Por definir';

        return {
            id: normalized,
            name: fullName,
            flag: 'ðŸ³ï¸',
            continent: continent,
            rank: '--',
            consumptionServings: '--',
            consumptionLiters: '--',
            level: null,
            fact: 'Espacio reservado para la informaciÃ³n que aÃ±adirÃ¡ MartÃ­n Concha.'
        };
    },

    getTierConfig: function (levelKey) {
        if (!levelKey) return { label: 'Sin datos aÃºn', color: '#3A2E2E' };
        return this.TIERS[levelKey] || { label: 'Sin datos aÃºn', color: '#3A2E2E' };
    },

    getColorByLevel: function (levelKey) {
        return levelKey ? (this.TIERS[levelKey]?.color || '#2A2020') : '#2A2020';
    },

    getTopCountries: function (limit = 5) {
        return Array.from({ length: limit }, (_, i) => ({
            id: `slot_${i + 1}`,
            name: `[PaÃ­s Top #${i + 1}]`,
            flag: 'ðŸ³ï¸',
            rank: i + 1,
            consumptionServings: '--',
            consumptionLiters: '--',
            level: null
        }));
    }
};

window.CocaColaData = CocaColaData;
