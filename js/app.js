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
 * Renderiza el Top 5 de países según el dataset de consumo.
 * Si el dataset no está disponible, deja los recuadros vacíos.
 */
function renderTopRanking() {
    const listContainer = document.getElementById('top-ranking-list');
    if (!listContainer) return;

    const top = window.CocaColaData ? window.CocaColaData.getTopCountries(5) : [];

    if (top.length === 0) {
        listContainer.innerHTML = `
            <li class="ranking-item placeholder-ranking">
                <div class="ranking-info">
                    <span class="ranking-name">Sin datos de consumo disponibles</span>
                </div>
            </li>
        `;
        return;
    }

    listContainer.innerHTML = top.map(country => `
        <li class="ranking-item">
            <span class="ranking-pos">#${country.rank}</span>
            <span class="ranking-flag">${country.flag}</span>
            <div class="ranking-info">
                <span class="ranking-name">${country.name}</span>
                <span class="ranking-servings">${country.consumptionServings} porciones/año</span>
            </div>
            <span class="ranking-pill">${country.consumptionLiters} L</span>
        </li>
    `).join('');
}

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
