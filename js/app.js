/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Coordinador General de la Aplicación: app.js
 * Frontend: Vicente Meza
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🥤 Inicializando maqueta visual de Vicente Meza...');

    // 1. Inicializar mapa y recuadros de interacción
    if (window.MapModule) {
        window.MapModule.init();
    }

    // 2. Renderizar el Top 5 de consumo en el panel lateral
    renderTopRanking();

    // 3. Inicializar burbujas sutiles de fondo
    createCarbonationBubbles();
});

/**
 * Renderiza el Top 5 de países según el dataset de consumo y continente activo.
 * @param {string} continent 'Todos' o el nombre del continente seleccionado.
 */
function renderTopRanking(continent = 'Todos') {
    const listContainer = document.getElementById('top-ranking-list');
    const titleContainer = document.getElementById('ranking-card-title');
    const subtitleContainer = document.getElementById('ranking-subtitle-container');
    if (!listContainer) return;

    // Actualizar encabezados
    if (titleContainer) {
        titleContainer.innerHTML = (continent === 'Todos')
            ? '🏆 Top Consumo Global'
            : `🏆 Top Consumo &bull; ${continent}`;
    }

    if (subtitleContainer) {
        subtitleContainer.innerHTML = (continent === 'Todos')
            ? '<span>Mayores consumidores a nivel mundial</span>'
            : `<span>Top regional de ${continent}</span>`;
    }

    const top = window.CocaColaData ? window.CocaColaData.getTopCountries(5, continent) : [];

    if (top.length === 0) {
        listContainer.innerHTML = `
            <li class="ranking-item placeholder-ranking">
                <div class="ranking-info">
                    <span class="ranking-name">Sin datos registrados para esta región</span>
                </div>
            </li>
        `;
        return;
    }

    listContainer.innerHTML = top.map(country => {
        const isRegional = continent !== 'Todos';
        const displayRank = isRegional ? `#${country.regionalRank}` : `#${country.rank}`;
        const globalRef = isRegional ? ` &bull; Global: #${country.rank}` : '';

        return `
            <li class="ranking-item" data-country-id="${country.id}">
                <span class="ranking-pos">${displayRank}</span>
                <span class="ranking-flag">${country.flag}</span>
                <div class="ranking-info">
                    <span class="ranking-name">${country.name}</span>
                    <span class="ranking-servings">${country.consumptionServings} porciones/año${globalRef}</span>
                </div>
                <span class="ranking-pill">${country.consumptionLiters} L</span>
            </li>
        `;
    }).join('');

    // Coordinación interactiva: pasar el mouse por un país del ranking lo resalta en el mapa
    const items = listContainer.querySelectorAll('.ranking-item[data-country-id]');
    items.forEach(item => {
        const countryId = item.getAttribute('data-country-id');
        const countryData = window.CocaColaData ? window.CocaColaData.getCountry(countryId) : null;

        item.addEventListener('mouseenter', () => {
            if (window.MapModule && countryId) {
                window.MapModule.highlightCountry(countryId);
                if (countryData) {
                    window.MapModule.updateSidebarCountryInfo(countryData);
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            if (window.MapModule && countryId) {
                window.MapModule.unhighlightCountry(countryId);
            }
        });
    });
}

window.renderTopRanking = renderTopRanking;

/**
 * Genera pequeñas burbujas decorativas que ascienden por el fondo.
 */
function createCarbonationBubbles() {
    const container = document.getElementById('bubbles-bg');
    if (!container) return;

    const bubbleCount = 20;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'coca-bubble';
        
        const size = Math.random() * 6 + 3;
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 8;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;

        container.appendChild(bubble);
    }
}
