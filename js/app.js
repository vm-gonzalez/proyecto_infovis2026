/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Coordinador General de la Aplicación: app.js
 * Frontend: Vicente Meza
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🥤 Inicializando visualización global de Coca-Cola (InfoVis 2026)...');

    // 1. Inicializar mapa e interacciones visuales
    if (window.MapModule) {
        window.MapModule.init();
    }

    // 2. Renderizar los primeros 6 países con mayor consumo debajo del mapa (por defecto nivel mundial)
    renderTopRanking('Todos');

    // 3. Inicializar burbujas carbonatadas de fondo
    createCarbonationBubbles();
});

/**
 * Renderiza los 6 países con más consumo debajo del mapa según el filtro de continente activo.
 * @param {string} continent 'Todos' o el nombre del continente seleccionado.
 */
function renderTopRanking(continent = 'Todos') {
    const gridContainer = document.getElementById('top-countries-grid');
    const titleContainer = document.getElementById('ranking-card-title');
    const subtitleContainer = document.getElementById('ranking-subtitle-container');
    const indicatorContainer = document.getElementById('top-filter-indicator');
    if (!gridContainer) return;

    const isAll = (continent === 'Todos');
    // Ranking completo de la categoría (el contenedor muestra 6 a la vez y hace scroll si hay más)
    const top = window.CocaColaData ? window.CocaColaData.getTopCountries(Infinity, continent) : [];
    const count = top.length;
    const scrollHint = count > 6 ? ' &bull; desliza para ver el ranking completo' : '';

    // Actualizar encabezados y subtítulos
    if (titleContainer) {
        titleContainer.innerHTML = isAll
            ? `🏆 Ranking de Países con Mayor Consumo Mundial`
            : `🏆 Ranking de Países con Mayor Consumo &bull; ${continent}`;
    }

    if (subtitleContainer) {
        subtitleContainer.innerHTML = isAll
            ? `<span>Los ${count} países con datos ordenados por volumen total de consumo de Coca-Cola a nivel mundial${scrollHint}</span>`
            : `<span>Los ${count} países de <strong>${continent}</strong> ordenados por volumen total de consumo de Coca-Cola${scrollHint}</span>`;
    }

    if (indicatorContainer) {
        const continentIcons = {
            'Todos': '🌐 Nivel Mundial',
            'América del Sur': '🌎 América del Sur',
            'América del Norte': '🌎 América del Norte',
            'Europa': '🌍 Europa',
            'África': '🌍 África',
            'Asia': '🌏 Asia',
            'Oceanía': '🌏 Oceanía'
        };
        indicatorContainer.textContent = continentIcons[continent] || continent;
    }

    if (top.length === 0) {
        gridContainer.innerHTML = `
            <div class="no-top-countries">
                <p>No se registran países con datos para ${continent}</p>
            </div>
        `;
        return;
    }

    const podiumMedals = { 1: '🥇', 2: '🥈', 3: '🥉' };

    gridContainer.innerHTML = top.map(country => {
        const isRegional = !isAll;
        const displayRank = isRegional ? `#${country.regionalRank}` : `#${country.rank}`;
        const medal = podiumMedals[country.regionalRank] || '';
        const globalRankText = isRegional ? `Global: #${country.rank}` : `Puesto #${country.rank}`;
        const tierConfig = window.CocaColaData ? window.CocaColaData.getTierConfig(country.level) : {};

        return `
            <div class="top-country-card rank-${country.regionalRank}" data-country-id="${country.id}" title="Haz clic o pasa el mouse para interactuar con ${country.name}">
                <div class="card-top-row">
                    <span class="card-rank-badge ${country.regionalRank <= 3 ? 'podium-' + country.regionalRank : ''}">
                        ${medal ? `<span class="rank-medal">${medal}</span>` : ''}
                        ${displayRank}
                    </span>
                    <span class="card-continent-tag">${country.continent}</span>
                </div>

                <div class="card-center">
                    <div class="card-flag-box">
                        <img class="card-flag-img" src="https://flagcdn.com/w80/${country.id}.png" alt="Bandera de ${country.name}" loading="lazy" onerror="this.onerror=null;this.replaceWith('🏳️')">
                    </div>
                    <h3 class="card-country-name">${country.name}</h3>
                </div>

                <div class="card-consumption-block">
                    <span class="card-consumption-val">${country.consumption}</span>
                    <span class="card-consumption-lbl">Consumo Total Anual</span>
                </div>

                <div class="card-bottom-row">
                    <span class="card-tier-pill" style="border-color: ${tierConfig.color}; color: #FFFFFF; background: ${tierConfig.color}26;">
                        <span class="tier-dot" style="background-color: ${tierConfig.color};"></span>
                        ${tierConfig.label}
                    </span>
                    <span class="card-global-ref">${globalRankText}</span>
                </div>
            </div>
        `;
    }).join('');

    // Al cambiar de continente, volver al inicio del ranking
    gridContainer.scrollTo({ left: 0, behavior: 'instant' });

    // Coordinación interactiva: hover y clic en cada tarjeta
    const cards = gridContainer.querySelectorAll('.top-country-card[data-country-id]');
    cards.forEach(card => {
        const countryId = card.getAttribute('data-country-id');

        card.addEventListener('mouseenter', () => {
            if (window.MapModule && countryId) {
                window.MapModule.highlightCountry(countryId);
            }
        });

        card.addEventListener('mouseleave', () => {
            if (window.MapModule && countryId) {
                window.MapModule.unhighlightCountry(countryId);
            }
        });

        card.addEventListener('click', () => {
            const countryData = window.CocaColaData ? window.CocaColaData.getCountry(countryId) : null;
            if (countryData && window.SoundEngine && typeof window.SoundEngine.playBurpForCountry === 'function') {
                window.SoundEngine.playBurpForCountry(countryData);
            }
        });
    });
}

window.renderTopRanking = renderTopRanking;

/**
 * Genera pequeñas burbujas decorativas ligeras y fluidas.
 */
function createCarbonationBubbles() {
    const container = document.getElementById('bubbles-bg');
    if (!container) return;

    const bubbleCount = 14;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'coca-bubble';
        
        const size = Math.random() * 5 + 3;
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
