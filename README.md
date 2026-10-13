# Visualización de Consumo Global de Coca-Cola 🥤🌍
**Proyecto de InfoVis 2026**

🔗 **Versión final en GitHub Pages:** https://vm-gonzalez.github.io/proyecto_infovis2026/

Aplicación web interactiva que visualiza los niveles de consumo total de Coca-Cola por país a nivel mundial mediante un mapa interactivo hero a pantalla completa y un panel dinámico de los primeros 6 países con mayor consumo por continente, con banderas e interactividad acústica proporcional.

## 👥 Equipo y Responsabilidades
- **Vicente Meza (Frontend Lead)**: Estructura HTML5 semántica, distribución hero a pantalla completa con grilla dinámica inferior de Top 6 países, diseño y estilos CSS3 temáticos de Coca-Cola, incrustación y renderizado del mapa mundial SVG, interactividad bidireccional de hover y filtros por continente.
- **Sebastián Valencia (Data & Metrics)**: Recopilación, estructuración y cálculo de métricas de consumo total de Coca-Cola por país y continente (`js/data.js`, `data/coca-cola-per-capita.js`).
- **Martín Concha (Audio & Sound FX)**: Diseño, integración y reproducción del motor de audio para los efectos de eructos/chanchos proporcionales al volumen de consumo (`js/audio.js`).

## 📊 Fuente de Datos
- **World Population Review (2026), *Coca-Cola Consumption by Country*** — [Enlace oficial](https://worldpopulationreview.com/country-rankings/coca-cola-consumption-by-country).
- Unidad: Volumen total anual consumido en litros. Expresado en miles de millones de litros (B L) y millones de litros (M L).
- Cobertura: 96 países reportados con sus banderas oficiales e identificadores ISO. Los países no reportados se indican como **Sin datos**.

## 🛠️ Tecnologías Frontend
- HTML5 semántico
- CSS3 moderno (diseño responsive en layout hero + cards grid, sombras glow rojo Coca-Cola, transiciones fluidas y animaciones de carbonatación)
- JavaScript ES6+ (manipulación vectorial SVG, eventos de cursor y coordinación analítica por continentes)

