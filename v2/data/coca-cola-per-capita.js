/**
 * ====================================================================
 * DATASET: Consumo per cápita de bebidas de The Coca-Cola Company
 * Responsable: Sebastián Valencia (Data & Metrics)
 * ====================================================================
 * Fuente: The Coca-Cola Company (©2012), "Per Capita Consumption of
 *         Company Beverage Products". Publicada junto al Annual Review 2011.
 *         Copia del documento original:
 *         https://wonderprofessor.com/121/Chap09/Chap09_CocaCola_2011_PerCapitaConsumption_Growth.pdf
 *
 * Unidad: porciones de 8 onzas líquidas EE.UU. (236,6 ml) de bebida
 *         terminada, por persona y por año. Incluye TODAS las marcas de la
 *         compañía (Coca-Cola, Sprite, Fanta, aguas, isotónicas, etc.),
 *         no solo Coca-Cola clásica.
 *
 * Cobertura: 35 países + promedio mundial. Los países del mapa que no
 *            aparecen aquí se muestran como "Sin datos".
 *            `null` = la fuente no reporta ese año (N/A).
 */

const CocaColaDataset = {
    source: {
        name: 'The Coca-Cola Company — Per Capita Consumption of Company Beverage Products',
        year: 2012,
        url: 'https://wonderprofessor.com/121/Chap09/Chap09_CocaCola_2011_PerCapitaConsumption_Growth.pdf',
        unit: 'porciones de 8 oz / persona / año',
        years: [1991, 2001, 2011]
    },

    worldwide: { 1991: 44, 2001: 69, 2011: 92 },

    // Código ISO (igual a los ids del SVG) -> porciones per cápita por año
    countries: {
        mx: { 1991: 290, 2001: 460, 2011: 728 },
        cl: { 1991: 157, 2001: 332, 2011: 460 },
        us: { 1991: 292, 2001: 407, 2011: 403 },
        pa: { 1991: 80,  2001: 155, 2011: 379 },
        ar: { 1991: 135, 2001: 237, 2011: 345 },
        be: { 1991: 201, 2001: 295, 2011: 340 },
        au: { 1991: 224, 2001: 302, 2011: 309 },
        es: { 1991: 156, 2001: 259, 2011: 287 },
        ca: { 1991: 166, 2001: 240, 2011: 259 },
        at: { 1991: 155, 2001: 189, 2011: 253 },
        za: { 1991: 136, 2001: 176, 2011: 247 },
        bo: { 1991: 55,  2001: 81,  2011: 244 },
        br: { 1991: 102, 2001: 141, 2011: 230 },
        gb: { 1991: 87,  2001: 188, 2011: 210 },
        pe: { 1991: 47,  2001: 97,  2011: 208 },
        de: { 1991: 181, 2001: 193, 2011: 190 },
        sv: { 1991: 83,  2001: 189, 2011: 180 },
        jp: { 1991: 122, 2001: 169, 2011: 179 },
        tr: { 1991: 21,  2001: 67,  2011: 173 },
        fr: { 1991: 52,  2001: 110, 2011: 149 },
        it: { 1991: 90,  2001: 104, 2011: 137 },
        ph: { 1991: 90,  2001: 154, 2011: 129 },
        co: { 1991: 105, 2001: 87,  2011: 127 },
        th: { 1991: 42,  2001: 60,  2011: 93 },
        ma: { 1991: 35,  2001: 74,  2011: 88 },
        kr: { 1991: 70,  2001: 72,  2011: 84 },
        ru: { 1991: 1,   2001: 20,  2011: 73 },
        eg: { 1991: 17,  2001: 31,  2011: 53 },
        ke: { 1991: 35,  2001: 31,  2011: 40 },
        cn: { 1991: 1,   2001: 9,   2011: 38 },
        ng: { 1991: 23,  2001: 30,  2011: 27 },
        pk: { 1991: 3,   2001: 5,   2011: 17 },
        id: { 1991: 5,   2001: 18,  2011: 14 },
        ml: { 1991: 1,   2001: 7,   2011: 12 },
        in: { 1991: null, 2001: 4,  2011: 12 }
    }
};

window.CocaColaDataset = CocaColaDataset;
