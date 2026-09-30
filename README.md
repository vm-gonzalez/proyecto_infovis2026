# Visualización de Consumo Global de Coca-Cola 🥤🌍
**Proyecto de InfoVis 2026**

Aplicación web interactiva que visualiza los niveles de consumo de Coca-Cola por país a nivel mundial mediante un mapa interactivo por continentes con efectos visuales de hover.

## 👥 Equipo y Responsabilidades
- **Vicente Meza (Frontend Lead)**: Estructura HTML5, diseño y estilos CSS3 temáticos de Coca-Cola, incrustación y renderizado del mapa mundial SVG, interactividad de hover por país y filtros por continente.
- **Sebastián Valencia (Data & Metrics)**: Recopilación, estructuración y cálculo de métricas de consumo de Coca-Cola por país y continente (`js/data.js`).
- **Martín Concha (Audio & Sound FX)**: Diseño, integración y reproducción del motor de audio para los efectos de eructos/chanchos proporcionales (`js/audio.js`).

## 📊 Fuente de Datos
- **The Coca-Cola Company (©2012), *Per Capita Consumption of Company Beverage Products*** — [PDF](https://wonderprofessor.com/121/Chap09/Chap09_CocaCola_2011_PerCapitaConsumption_Growth.pdf).
- Unidad: porciones de 8 oz (236,6 ml) por persona al año, considerando todas las marcas de la compañía. Años 1991, 2001 y 2011; el mapa usa 2011.
- Cobertura: 35 países más el promedio mundial (`data/coca-cola-per-capita.js`). Los países que no aparecen en la fuente se muestran como **Sin datos**.

## 🛠️ Tecnologías Frontend
- HTML5 semántico
- CSS3 moderno (diseño responsive, efectos de hover con sombras glow, transiciones y animaciones de carbonatación)
- JavaScript ES6+ (manipulación vectorial SVG y eventos del cursor)
