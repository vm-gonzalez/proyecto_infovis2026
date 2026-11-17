/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Coordinador General de la Aplicación: app.js
 * Frontend: Vicente Meza
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando visualización global de Coca-Cola (InfoVis 2026)...');

    // 1. Inicializar mapa e interacciones visuales
    if (window.MapModule) {
        window.MapModule.init();
    }

    // 2. Renderizar todos los países con scroll horizontal continuo (por defecto nivel mundial, en Top 1)
    renderTopRanking('Todos');

    // 3. Inicializar burbujas carbonatadas de fondo
    createCarbonationBubbles();
});

/**
 * Renderiza el ranking completo de países de la zona seleccionada, permitiendo scroll horizontal.
 * @param {string} continent 'Todos' o el nombre del continente seleccionado.
 */
function renderTopRanking(continent = 'Todos') {
    const gridContainer = document.getElementById('top-countries-grid');
    const titleContainer = document.getElementById('ranking-card-title');
    const subtitleContainer = document.getElementById('ranking-subtitle-container');
    const indicatorContainer = document.getElementById('top-filter-indicator');
    if (!gridContainer) return;

    const isAll = (continent === 'Todos');
    const metric = window.CocaColaData ? window.CocaColaData.currentMetric : 'per_capita';
    const isPerCapita = (metric === 'per_capita');
    const metricTitleName = isPerCapita ? 'Mayor Consumo Per Cápita' : 'Mayor Volumen Total';

    // Carga de todos los países disponibles para la zona para permitir scroll horizontal completo
    const top = window.CocaColaData ? window.CocaColaData.getTopCountries(Infinity, continent) : [];
    const count = top.length;
    const scrollHint = count > 6 ? ' &bull; Desliza horizontalmente para ver todos los países' : '';

    const trophySvg = `<svg class="trophy-svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/><path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/><path d="M4 5h16v4a6 6 0 0 1-12 0V5z"/><path d="M12 15v5"/><path d="M8 20h8"/></svg>`;

    // Actualizar encabezados y subtítulos
    if (titleContainer) {
        titleContainer.innerHTML = isAll
            ? `${trophySvg} <span>Países que Más Consumen Coca-Cola &bull; ${isPerCapita ? 'Por Habitante' : 'Volumen Total'} (${count})</span>`
            : `${trophySvg} <span>Países que Más Consumen en ${continent} &bull; ${isPerCapita ? 'Por Habitante' : 'Volumen Total'} (${count})</span>`;
    }

    if (subtitleContainer) {
        subtitleContainer.innerHTML = isPerCapita
            ? (isAll
                ? `<span>Ranking de las naciones que lideran el consumo de Coca-Cola por persona al año (Litros por habitante)${scrollHint}</span>`
                : `<span>Ranking de los países de <strong>${continent}</strong> que más consumen Coca-Cola por persona al año${scrollHint}</span>`)
            : (isAll
                ? `<span>Ranking de las naciones con mayor volumen total de consumo de Coca-Cola al año en litros${scrollHint}</span>`
                : `<span>Ranking de los países de <strong>${continent}</strong> con mayor volumen total de Coca-Cola al año${scrollHint}</span>`);
    }

    if (indicatorContainer) {
        indicatorContainer.textContent = (continent === 'Todos') ? 'Nivel Mundial' : continent;
    }

    if (top.length === 0) {
        gridContainer.innerHTML = `
            <div class="no-top-countries">
                <p>No se registran países con datos para ${continent}</p>
            </div>
        `;
        return;
    }

    // Medallas vectoriales SVG en lugar de emojis
    const podiumMedals = {
        1: `<svg class="rank-medal-svg rank-medal-gold" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="14" r="6" fill="#FFD700" stroke="#D4AF37"/><path d="M8.2 8.5 6 3h12l-2.2 5.5" stroke="#D4AF37"/><path d="M12 11.5v5" stroke="#8A6500" stroke-width="1.5"/></svg>`,
        2: `<svg class="rank-medal-svg rank-medal-silver" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="14" r="6" fill="#D8D8D8" stroke="#B0B0B0"/><path d="M8.2 8.5 6 3h12l-2.2 5.5" stroke="#B0B0B0"/><path d="M12 11.5v5" stroke="#707070" stroke-width="1.5"/></svg>`,
        3: `<svg class="rank-medal-svg rank-medal-bronze" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#CD7F32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="14" r="6" fill="#CD7F32" stroke="#A05A18"/><path d="M8.2 8.5 6 3h12l-2.2 5.5" stroke="#A05A18"/><path d="M12 11.5v5" stroke="#5A2F08" stroke-width="1.5"/></svg>`
    };

    const flagSvgFallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='1.5'%3E%3Cpath d='M2 1v14M2 2h14l-2 4 2 4H2' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E";

    gridContainer.innerHTML = top.map(country => {
        const isRegional = !isAll;
        const displayRank = isRegional ? `#${country.regionalRank}` : `#${country.rank}`;
        const medalSvg = podiumMedals[country.regionalRank] || '';
        const globalRankText = isPerCapita
            ? (isRegional ? `Global: #${country.rankPerCapita} (Tot: #${country.rankTotal})` : `Puesto #${country.rankPerCapita} (Tot: #${country.rankTotal})`)
            : (isRegional ? `Global: #${country.rankTotal} (Per Cáp: #${country.rankPerCapita})` : `Puesto #${country.rankTotal} (Per Cáp: #${country.rankPerCapita})`);
        const consumptionLabel = isPerCapita ? 'Consumo por Persona' : 'Consumo Total Anual';
        const tierConfig = window.CocaColaData ? window.CocaColaData.getTierConfig(country.level) : {};
        const tierShortLabel = tierConfig.label ? tierConfig.label.replace('Consumo ', '') : 'Sin datos';

        return `
            <div class="top-country-card rank-${country.regionalRank}" data-country-id="${country.id}" title="Haz clic o pasa el mouse para interactuar con ${country.name}">
                <div class="card-top-row">
                    <span class="card-rank-badge ${country.regionalRank <= 3 ? 'podium-' + country.regionalRank : ''}">
                        ${medalSvg ? `<span class="rank-medal">${medalSvg}</span>` : ''}
                        ${displayRank}
                    </span>
                    <span class="card-continent-tag" title="${country.continent}">${country.continent}</span>
                </div>

                <div class="card-center">
                    <div class="card-flag-box">
                        <img class="card-flag-img" src="https://flagcdn.com/w80/${country.id}.png" alt="Bandera de ${country.name}" loading="lazy" decoding="async" width="28" height="18" onerror="this.onerror=null;this.src='${flagSvgFallback}'">
                    </div>
                    <h3 class="card-country-name" title="${country.name}">${country.name}</h3>
                </div>

                <div class="card-consumption-block">
                    <span class="card-consumption-val">${country.consumption}</span>
                    <span class="card-consumption-lbl">${consumptionLabel}</span>
                </div>

                <div class="card-bottom-row">
                    <span class="card-tier-pill" style="border-color: ${tierConfig.color}; color: #FFFFFF; background: ${tierConfig.color}26;">
                        <span class="tier-dot" style="background-color: ${tierConfig.color};"></span>
                        ${tierShortLabel}
                    </span>
                    <span class="card-global-ref" title="${globalRankText}">${globalRankText}</span>
                </div>
            </div>
        `;
    }).join('');

    // Al cambiar de continente o recargar, situar el scroll del ranking al inicio
    gridContainer.scrollLeft = 0;
    gridContainer.scrollTo({ left: 0, behavior: 'instant' });

    // Coordinación interactiva delegada: hover y clic en las tarjetas (registrado una sola vez)
    if (!gridContainer._hasDelegatedEvents) {
        gridContainer._hasDelegatedEvents = true;

        gridContainer.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.top-country-card[data-country-id]');
            if (!card) return;
            const countryId = card.getAttribute('data-country-id');
            if (window.MapModule && countryId) {
                window.MapModule.highlightCountry(countryId);
            }
        });

        gridContainer.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.top-country-card[data-country-id]');
            if (!card) return;
            const relatedCard = e.relatedTarget ? e.relatedTarget.closest('.top-country-card[data-country-id]') : null;
            if (relatedCard === card) return; // Sigue dentro de la misma tarjeta
            const countryId = card.getAttribute('data-country-id');
            if (window.MapModule && countryId) {
                window.MapModule.unhighlightCountry(countryId);
            }
        });

        gridContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.top-country-card[data-country-id]');
            if (!card) return;
            const countryId = card.getAttribute('data-country-id');
            const countryData = window.CocaColaData ? window.CocaColaData.getCountry(countryId) : null;
            if (countryData && window.SoundEngine && typeof window.SoundEngine.playBurpForCountry === 'function') {
                window.SoundEngine.playBurpForCountry(countryData);
            }
        });
    }
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
