/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Coordinador General de la Aplicación: app.js
 * Frontend: Vicente Meza
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🥤 Inicializando frontend de Vicente Meza (InfoVis 2026)...');

    // 1. Inicializar mapa interactivo
    if (window.MapModule) {
        window.MapModule.init();
    }

    // 2. Renderizar lista Top 5 en el panel lateral
    renderTopRanking();

    // 3. Inicializar burbujas decorativas de fondo
    createCarbonationBubbles();
});

/**
 * Renderiza la lista interactiva de países con mayor consumo de Coca-Cola.
 */
function renderTopRanking() {
    const listContainer = document.getElementById('top-ranking-list');
    if (!listContainer || !window.CocaColaData) return;

    const top5 = window.CocaColaData.getTopCountries(5);

    listContainer.innerHTML = top5.map((country, index) => {
        const tier = window.CocaColaData.getTierConfig(country.level);
        return `
            <li class="ranking-item" data-country-id="${country.id}" title="Haz clic para ver en el mapa">
                <span class="ranking-pos">#${index + 1}</span>
                <span class="ranking-flag">${country.flag || '🥤'}</span>
                <div class="ranking-info">
                    <span class="ranking-name">${country.name}</span>
                    <span class="ranking-servings">${country.consumptionServings} porciones/año</span>
                </div>
                <span class="ranking-pill" style="background-color: ${tier.color};">
                    ${country.consumptionLiters} L
                </span>
            </li>
        `;
    }).join('');

    // Al hacer clic en un país del top, seleccionarlo visualmente
    listContainer.querySelectorAll('.ranking-item').forEach(item => {
        item.addEventListener('click', () => {
            const countryId = item.getAttribute('data-country-id');
            const path = document.querySelector(`path.country-path[data-country-id="${countryId}"]`);
            const data = window.CocaColaData.getCountry(countryId);

            if (path && data && window.MapModule) {
                window.MapModule.clearAllHighlights();
                window.MapModule.highlightCountry(countryId);
                window.MapModule.updateSidebarCountryInfo(data);

                // Feedback visual en el botón del ranking
                item.classList.add('ranking-clicked');
                setTimeout(() => item.classList.remove('ranking-clicked'), 500);
            }
        });
    });
}

/**
 * Genera pequeñas burbujas decorativas que ascienden por el fondo.
 */
function createCarbonationBubbles() {
    const container = document.getElementById('bubbles-bg');
    if (!container) return;

    const bubbleCount = 24;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'coca-bubble';
        
        const size = Math.random() * 7 + 3;
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
