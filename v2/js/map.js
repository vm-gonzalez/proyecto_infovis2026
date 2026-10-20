/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Mapa e Interacción Visual: Vicente Meza (dev 1 - Frontend Lead)
 * ====================================================================
 * Gestiona:
 * - Renderizado base del mapa y sus recuadros informativos.
 * - Efectos visuales de hover en cada país (sin datos hardcodeados).
 * - Tooltip con los espacios/recuadros preparados para la información de Sebastián.
 * - Filtrado visual por continentes.
 */

const MapModule = {
    svgElement: null,
    tooltipElement: null,
    activeContinent: 'Todos',
    activeTier: null,
    currentHoveredCountryId: null,

    init: function () {
        this.svgElement = document.getElementById('world-map');
        this.tooltipElement = document.getElementById('country-tooltip');

        if (!this.svgElement) {
            console.error('No se encontró el elemento SVG #world-map en el DOM.');
            return;
        }

        // 1. Configurar paths del SVG con color base neutro y atributos
        this.setupCountryPaths();

        // 2. Configurar eventos de hover sin acumulación de marcas
        this.setupEventListeners();

        // 3. Configurar filtros de continentes
        this.setupContinentControls();

        // 4. Configurar interactividad de la leyenda
        this.setupLegendControls();
    },

    setupCountryPaths: function () {
        const paths = this.svgElement.querySelectorAll('path');

        paths.forEach(path => {
            let rawId = path.getAttribute('id');
            if (!rawId && path.parentElement && path.parentElement.tagName.toLowerCase() === 'g') {
                rawId = path.parentElement.getAttribute('id');
            }
            rawId = rawId || '';
            const countryId = rawId.replace(/^_/, '').toLowerCase();

            const countryData = window.CocaColaData ? window.CocaColaData.getCountry(countryId) : null;
            const continent = countryData ? countryData.continent : 'Por definir';

            path.setAttribute('data-country-id', countryId);
            path.setAttribute('data-continent', continent);
            path.classList.add('country-path');
            
            // Color según el nivel de consumo del dataset; países sin dato quedan con color base
            const level = countryData && countryData.level ? countryData.level : 'sin_datos';
            path.setAttribute('data-level', level);
            path.style.fill = window.CocaColaData ? window.CocaColaData.getColorByLevel(countryData?.level) : '#241E1E';
        });
    },

    setupEventListeners: function () {
        const paths = this.svgElement.querySelectorAll('path.country-path');

        paths.forEach(path => {
            path.addEventListener('mouseenter', (e) => {
                const countryId = path.getAttribute('data-country-id');
                if (!countryId || countryId === 'desconocido') return;

                if (this.currentHoveredCountryId === countryId) return;

                this.clearAllHighlights();
                this.currentHoveredCountryId = countryId;

                const countryData = window.CocaColaData ? window.CocaColaData.getCountry(countryId) : null;
                if (!countryData) return;

                // 1. Iluminar país en hover
                this.highlightCountry(countryId);

                // 2. Mostrar Tooltip optimizado
                this.showTooltip(countryData);
                this.updateTooltipPosition(e);

                // 3. Invocar al módulo de audio de Martín (recibirá el país)
                if (window.SoundEngine && typeof window.SoundEngine.playBurpForCountry === 'function') {
                    window.SoundEngine.playBurpForCountry(countryData);
                }
            });

            path.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });

            path.addEventListener('mouseleave', () => {
                const countryId = path.getAttribute('data-country-id');
                this.unhighlightCountry(countryId);
                this.hideTooltip();
                this.currentHoveredCountryId = null;
            });
        });

        // Limpieza al salir del mapa completo
        this.svgElement.addEventListener('mouseleave', () => {
            this.clearAllHighlights();
            this.hideTooltip();
            this.currentHoveredCountryId = null;
        });
    },

    highlightCountry: function (countryId) {
        if (!countryId) return;
        const matchingPaths = this.svgElement.querySelectorAll(`path[data-country-id="${countryId}"]`);
        matchingPaths.forEach(p => p.classList.add('is-hovered'));
    },

    unhighlightCountry: function (countryId) {
        if (!countryId) return;
        const matchingPaths = this.svgElement.querySelectorAll(`path[data-country-id="${countryId}"]`);
        matchingPaths.forEach(p => p.classList.remove('is-hovered'));
    },

    clearAllHighlights: function () {
        const hovered = this.svgElement.querySelectorAll('path.country-path.is-hovered');
        hovered.forEach(p => p.classList.remove('is-hovered'));
    },

    /**
     * Muestra el Tooltip informativo de forma minimalista y concisa.
     */
    showTooltip: function (data) {
        if (!this.tooltipElement) return;

        const tier = window.CocaColaData ? window.CocaColaData.getTierConfig(data.level) : {};
        const servings = data.consumptionServings !== undefined ? data.consumptionServings : '---';
        const liters = data.consumptionLiters !== undefined ? data.consumptionLiters : '---';

        const tierBadge = data.hasData ? `
            <div class="tooltip-tier-badge" style="background: ${tier.color}24; border: 1px solid ${tier.color}; color: #FFFFFF;">
                ${tier.label}
            </div>
        ` : `
            <div class="tooltip-tier-badge" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: var(--text-muted);">
                Sin datos en la fuente
            </div>
        `;

        this.tooltipElement.innerHTML = `
            <div class="tooltip-header">
                <span class="tooltip-flag">${data.flag || '🏳️'}</span>
                <div class="tooltip-titles">
                    <h3 class="tooltip-country-name">${data.name}</h3>
                    <span class="tooltip-continent">${data.continent}</span>
                </div>
            </div>
            
            ${tierBadge}

            <div class="tooltip-metrics">
                <div class="metric-item">
                    <span class="metric-value">${servings}</span>
                    <span class="metric-label">Porciones / año</span>
                </div>
                <div class="metric-item">
                    <span class="metric-value">${liters}</span>
                    <span class="metric-label">Litros / año</span>
                </div>
            </div>

            ${data.hasData && data.fact ? `
                <div class="tooltip-fact">
                    <p>${data.fact}</p>
                </div>
            ` : ''}
        `;

        this.tooltipElement.classList.add('visible');
    },

    updateTooltipPosition: function (e) {
        if (!this.tooltipElement) return;

        if (this._rafTooltip) cancelAnimationFrame(this._rafTooltip);
        this._rafTooltip = requestAnimationFrame(() => {
            const offset = 14;
            let x = e.clientX + offset;
            let y = e.clientY + offset;

            const tooltipWidth = 280;
            const tooltipHeight = 160;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;

            if (x + tooltipWidth > winWidth - 12) {
                x = e.clientX - tooltipWidth - offset;
            }

            if (y + tooltipHeight > winHeight - 12) {
                y = e.clientY - tooltipHeight - offset;
            }

            this.tooltipElement.style.transform = `translate3d(${Math.max(8, x)}px, ${Math.max(8, y)}px, 0)`;
        });
    },

    hideTooltip: function () {
        if (this.tooltipElement) {
            this.tooltipElement.classList.remove('visible');
        }
    },

    setupContinentControls: function () {
        const buttons = document.querySelectorAll('.continent-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const selectedContinent = btn.getAttribute('data-continent');
                this.filterByContinent(selectedContinent);
            });
        });
    },

    applyFilters: function () {
        const paths = this.svgElement.querySelectorAll('path.country-path');
        paths.forEach(path => {
            const countryContinent = path.getAttribute('data-continent');
            const countryTier = path.getAttribute('data-level');

            const matchesContinent = (this.activeContinent === 'Todos' || countryContinent === this.activeContinent);
            const matchesTier = (!this.activeTier || countryTier === this.activeTier);

            if (matchesContinent && matchesTier) {
                path.classList.remove('is-dimmed');
                if (this.activeTier) {
                    path.classList.add('is-tier-highlighted');
                } else {
                    path.classList.remove('is-tier-highlighted');
                }
            } else {
                path.classList.add('is-dimmed');
                path.classList.remove('is-tier-highlighted');
            }
        });
    },

    filterByContinent: function (continent) {
        this.activeContinent = continent;
        this.applyFilters();

        const banner = document.getElementById('continent-banner-info');
        if (banner) {
            if (continent === 'Todos') {
                banner.innerHTML = `<span>Mostrando <strong>todos los continentes</strong> &bull; Pasa el cursor sobre un país para ver métricas</span>`;
            } else {
                const stats = window.CocaColaData ? window.CocaColaData.getContinentStats(continent) : null;
                const statsText = stats && stats.count > 0
                    ? ` &bull; <strong>${stats.count}</strong> países reportados &bull; Promedio: <strong>${stats.avgServings}</strong> porciones/año`
                    : ' &bull; Sin países reportados en la fuente';
                banner.innerHTML = `<span>Continente: <strong>${continent}</strong>${statsText}</span>`;
            }
        }

        // Coordinación analítica: Actualizar Top 5 del continente
        if (typeof window.renderTopRanking === 'function') {
            window.renderTopRanking(continent);
        }
    },

    setupLegendControls: function () {
        const legendItems = document.querySelectorAll('.legend-tier');

        legendItems.forEach(item => {
            const tierId = item.getAttribute('data-tier');

            // 1. Hover temporal (Brushing sobre el mapa)
            item.addEventListener('mouseenter', () => {
                if (this.activeTier) return; // Si hay filtro fijo por click, respetar el estado
                const paths = this.svgElement.querySelectorAll('path.country-path');
                paths.forEach(path => {
                    const matchesContinent = (this.activeContinent === 'Todos' || path.getAttribute('data-continent') === this.activeContinent);
                    if (path.getAttribute('data-level') === tierId && matchesContinent) {
                        path.classList.add('is-tier-highlighted');
                        path.classList.remove('is-dimmed');
                    } else {
                        path.classList.add('is-dimmed');
                        path.classList.remove('is-tier-highlighted');
                    }
                });
            });

            item.addEventListener('mouseleave', () => {
                if (this.activeTier) return; // Si hay filtro fijo por click, no resetear
                this.applyFilters();
            });

            // 2. Click para alternar filtro persistente por nivel
            item.addEventListener('click', () => {
                if (this.activeTier === tierId) {
                    // Desactivar filtro
                    this.activeTier = null;
                    item.classList.remove('is-active');
                } else {
                    // Activar este nivel y desactivar otros
                    legendItems.forEach(i => i.classList.remove('is-active'));
                    this.activeTier = tierId;
                    item.classList.add('is-active');
                }
                this.applyFilters();
            });
        });
    }
};

window.MapModule = MapModule;
