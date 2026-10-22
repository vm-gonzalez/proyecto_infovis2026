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

        // 5. Configurar selector de métricas (Per Cápita vs Total)
        this.setupMetricControls();

        // 6. Sincronizar textos iniciales de la leyenda según la métrica activa
        this.updateLegendUI();
    },

    setupMetricControls: function () {
        const metricButtons = document.querySelectorAll('.metric-toggle-btn');
        metricButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const metric = btn.getAttribute('data-metric');
                if (metric) {
                    this.setMetric(metric);
                }
            });
        });
    },

    setMetric: function (metric) {
        if (!window.CocaColaData) return;
        if (window.CocaColaData.currentMetric === metric) return;

        window.CocaColaData.setMetric(metric);

        // Actualizar botones de la barra superior
        document.querySelectorAll('.metric-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-metric') === metric);
        });

        // Actualizar todos los paths del mapa SVG con su nuevo nivel y color
        const paths = this.svgElement.querySelectorAll('path.country-path');
        paths.forEach(path => {
            const countryId = path.getAttribute('data-country-id');
            const countryData = window.CocaColaData.getCountry(countryId);
            const level = countryData && countryData.level ? countryData.level : 'sin_datos';
            path.setAttribute('data-level', level);
            path.style.fill = window.CocaColaData.getColorByLevel(countryData?.level);
        });

        // Actualizar textos y rangos de la leyenda
        this.updateLegendUI();

        // Actualizar filtros aplicados (manteniendo continente o tier seleccionado)
        this.applyFilters();

        // Actualizar banner y ranking inferior
        this.filterByContinent(this.activeContinent);
    },

    updateLegendUI: function () {
        if (!window.CocaColaData) return;
        const isPerCapita = (window.CocaColaData.currentMetric === 'per_capita');
        const titleEl = document.getElementById('legend-metric-title');
        const hintEl = document.getElementById('legend-metric-hint');

        if (titleEl) {
            titleEl.textContent = isPerCapita ? 'Consumo Per Cápita' : 'Consumo Total Anual';
        }
        if (hintEl) {
            hintEl.textContent = isPerCapita ? 'Litros / habitante / año' : 'Litros anuales consumidos';
        }

        const tiers = window.CocaColaData.getTiers();
        const legendItems = document.querySelectorAll('.legend-tier[data-tier]');
        legendItems.forEach(item => {
            const tierId = item.getAttribute('data-tier');
            if (tierId === 'sin_datos') return;
            const tierConfig = tiers[tierId];
            if (tierConfig) {
                const rangeEl = item.querySelector('.tier-range');
                if (rangeEl) rangeEl.textContent = `(${tierConfig.range})`;
                item.setAttribute('title', `${tierConfig.label} (${tierConfig.range})`);
            }
        });
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
        if (!this.svgElement) return;

        // Delegación de eventos en el SVG contenedor: evita adjuntar cientos de listeners individuales
        this.svgElement.addEventListener('mouseover', (e) => {
            const path = e.target.closest('path.country-path');
            if (!path) return;

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

        this.svgElement.addEventListener('mousemove', (e) => {
            if (this.currentHoveredCountryId) {
                this.updateTooltipPosition(e);
            }
        }, { passive: true });

        this.svgElement.addEventListener('mouseout', (e) => {
            const path = e.target.closest('path.country-path');
            if (!path) return;

            // Si el cursor se movió a otro elemento del mismo país (isla o polígono contiguo), no limpiar
            const related = e.relatedTarget ? e.relatedTarget.closest('path.country-path') : null;
            const relatedCountryId = related ? related.getAttribute('data-country-id') : null;

            if (relatedCountryId === this.currentHoveredCountryId) {
                return;
            }

            const countryId = path.getAttribute('data-country-id');
            this.unhighlightCountry(countryId);

            // Si sale al mar o fuera del mapa (sin otro país de destino inmediato)
            if (!relatedCountryId) {
                this.hideTooltip();
                this.currentHoveredCountryId = null;
            }
        });

        // Limpieza de seguridad al salir del mapa completo
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
     * Muestra el Tooltip informativo contrastando consumo per cápita y volumen total.
     */
    showTooltip: function (data) {
        if (!this.tooltipElement) return;

        const isPerCapita = window.CocaColaData && window.CocaColaData.currentMetric === 'per_capita';
        const tier = window.CocaColaData ? window.CocaColaData.getTierConfig(data.level) : {};

        const tierBadge = data.hasData ? `
            <div class="tooltip-tier-badge" style="background: ${tier.color}28; border: 1px solid ${tier.color}; color: #FFFFFF;">
                <span class="tooltip-tier-dot" style="background: ${tier.color};"></span>
                <span>${tier.label} &bull; ${tier.range}</span>
            </div>
        ` : `
            <div class="tooltip-tier-badge" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: var(--text-muted);">
                Sin datos reportados
            </div>
        `;

        const flagContent = data.flag || `<svg class="flag-placeholder-svg" viewBox="0 0 24 16" width="24" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 1v14M2 2h14l-2 4 2 4H2" stroke="rgba(255,255,255,0.4)" fill="rgba(255,255,255,0.1)"/></svg>`;

        this.tooltipElement.innerHTML = `
            <div class="tooltip-header">
                <span class="tooltip-flag">${flagContent}</span>
                <div class="tooltip-titles">
                    <h3 class="tooltip-country-name">${data.name}</h3>
                    <span class="tooltip-continent">${data.continent}${data.populationFormatted ? ` &bull; ${data.populationFormatted}` : ''}</span>
                </div>
            </div>
            
            ${tierBadge}

            <div class="tooltip-metrics">
                <div class="metric-item ${isPerCapita ? 'metric-item-active' : ''}">
                    <span class="metric-value">${data.consumptionPerCapita || 'Sin datos'}</span>
                    <span class="metric-label">Per Cápita ${data.rankPerCapita ? '(#' + data.rankPerCapita + ')' : ''}</span>
                </div>
                <div class="metric-item ${!isPerCapita ? 'metric-item-active' : ''}">
                    <span class="metric-value">${data.consumptionTotal || 'Sin datos'}</span>
                    <span class="metric-label">Total Anual ${data.rankTotal ? '(#' + data.rankTotal + ')' : ''}</span>
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

        this._mouseX = e.clientX;
        this._mouseY = e.clientY;

        if (this._rafTooltip) return;

        this._rafTooltip = requestAnimationFrame(() => {
            this._rafTooltip = null;
            const offset = 14;
            let x = this._mouseX + offset;
            let y = this._mouseY + offset;

            const tooltipWidth = 280;
            const tooltipHeight = 160;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;

            if (x + tooltipWidth > winWidth - 12) {
                x = this._mouseX - tooltipWidth - offset;
            }

            if (y + tooltipHeight > winHeight - 12) {
                y = this._mouseY - tooltipHeight - offset;
            }

            this.tooltipElement.style.transform = `translate3d(${Math.max(8, x)}px, ${Math.max(8, y)}px, 0)`;
        });
    },

    hideTooltip: function () {
        if (this._rafTooltip) {
            cancelAnimationFrame(this._rafTooltip);
            this._rafTooltip = null;
        }
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
            const isPerCapita = window.CocaColaData && window.CocaColaData.currentMetric === 'per_capita';

            if (continent === 'Todos') {
                banner.innerHTML = `<span>Descubre qué países lideran el consumo &bull; Métrica activa: <strong>${isPerCapita ? 'Por Habitante (Per Cápita)' : 'Volumen Total Anual'}</strong> &bull; Pasa el cursor para ver detalles</span>`;
            } else {
                const stats = window.CocaColaData ? window.CocaColaData.getContinentStats(continent) : null;
                const statsText = stats && stats.count > 0
                    ? ` &bull; <strong>${stats.count}</strong> países &bull; ${isPerCapita ? 'Promedio: <strong>' + stats.averagePerCapita + '</strong>' : 'Volumen total: <strong>' + stats.totalFormatted + '</strong>'} &bull; Mayor consumidor: <strong>${stats.topCountry?.name}</strong> (${stats.topCountry?.consumption})`
                    : ' &bull; Sin países reportados en la fuente';
                banner.innerHTML = `<span>Países que más consumen en <strong>${continent}</strong> (${isPerCapita ? 'Per Cápita' : 'Volumen Total'})${statsText}</span>`;
            }
        }

        // Coordinación analítica: Actualizar Ranking del continente seleccionado
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
