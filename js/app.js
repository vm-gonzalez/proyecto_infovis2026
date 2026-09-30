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

    // 2. Renderizar los 5 recuadros vacíos del Top en el panel lateral
    renderTopRankingPlaceholders();

    // 3. Inicializar burbujas sutiles de fondo
    createCarbonationBubbles();
});

/**
 * Renderiza los 5 recuadros/espacios contenedores del Top de países.
 */
function renderTopRankingPlaceholders() {
    const listContainer = document.getElementById('top-ranking-list');
    if (!listContainer) return;

    const placeholderSlots = [
        { pos: 1, label: '[País Top #1 por definir]' },
        { pos: 2, label: '[País Top #2 por definir]' },
        { pos: 3, label: '[País Top #3 por definir]' },
        { pos: 4, label: '[País Top #4 por definir]' },
        { pos: 5, label: '[País Top #5 por definir]' }
    ];

    listContainer.innerHTML = placeholderSlots.map(slot => `
        <li class="ranking-item placeholder-ranking">
            <span class="ranking-pos">#${slot.pos}</span>
            <span class="ranking-flag">🏳️</span>
            <div class="ranking-info">
                <span class="ranking-name">${slot.label}</span>
                <span class="ranking-servings">[--- porciones/año]</span>
            </div>
            <span class="ranking-pill placeholder-pill">--- L</span>
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
