/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Datos: Sebastián Valencia (Estructura & Nomenclatura Geográfica)
 * ====================================================================
 * Contiene el registro de nombres completos en español y continentes
 * para los 180 países del mapa SVG.
 * 
 * Los datos numéricos de consumo permanecen vacíos en `countries: {}`
 * para ser definidos por Sebastián Valencia.
 */

const CocaColaData = {
    // Categorías de consumo para la visualización
    TIERS: {
        muy_alto: { id: 'muy_alto', label: 'Consumo Muy Alto', range: '> 400 porciones/año', color: '#E50914' },
        alto:     { id: 'alto',     label: 'Consumo Alto',     range: '250 - 399 porciones/año', color: '#FF4D4D' },
        medio:    { id: 'medio',    label: 'Consumo Medio',    range: '120 - 249 porciones/año', color: '#FFA94D' },
        bajo:     { id: 'bajo',     label: 'Consumo Bajo',     range: '40 - 119 porciones/año', color: '#FFE066' },
        muy_bajo: { id: 'muy_bajo', label: 'Consumo Muy Bajo', range: '0 - 39 porciones/año',   color: '#6B7280' }
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

    /**
     * DICCIONARIO DE DATOS:
     * Reservado para que Sebastián Valencia añada las métricas de consumo.
     */
    countries: {},

    /**
     * Resuelve el nombre oficial en español y el continente de cualquier país.
     * NUNCA devuelve la abreviación ISO.
     */
    getCountry: function (code) {
        if (!code) return null;
        const normalized = code.toLowerCase().trim();

        // 1. Si Sebastián ya añadió datos para este país, usarlos
        if (this.countries[normalized]) {
            return this.countries[normalized];
        }

        // 2. Obtener nombre en español del diccionario
        let fullName = this.countryNames[normalized];

        // 3. Fallback inteligente usando Intl.DisplayNames del navegador
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

        const continent = this.continentMapping[normalized] || 'Por definir';

        return {
            id: normalized,
            name: fullName,
            flag: '🏳️',
            continent: continent,
            rank: '--',
            consumptionServings: '--',
            consumptionLiters: '--',
            level: null,
            fact: 'Espacio reservado para la información que añadirá Sebastián Valencia.'
        };
    },

    getTierConfig: function (levelKey) {
        if (!levelKey) return { label: 'Sin datos aún', color: '#3A2E2E' };
        return this.TIERS[levelKey] || { label: 'Sin datos aún', color: '#3A2E2E' };
    },

    getColorByLevel: function (levelKey) {
        return levelKey ? (this.TIERS[levelKey]?.color || '#2A2020') : '#2A2020';
    },

    getTopCountries: function (limit = 5) {
        return Array.from({ length: limit }, (_, i) => ({
            id: `slot_${i + 1}`,
            name: `[País Top #${i + 1}]`,
            flag: '🏳️',
            rank: i + 1,
            consumptionServings: '--',
            consumptionLiters: '--',
            level: null
        }));
    }
};

window.CocaColaData = CocaColaData;
