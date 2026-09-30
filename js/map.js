/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Mapa e Interacción Visual: Vicente Meza (dev 1 - Frontend Lead)
 * ====================================================================
 * Gestiona:
 * - Coloreado coropleta de países según los datos de Martín Concha.
 * - Resaltado visual instantáneo al pasar el mouse (hover sin atascos).
 * - Tooltip informativo flotante que sigue el cursor.
 * - Invocación del sonido de eructos para Sebastián Valencia.
 * - Filtrado visual por continentes.
 */

const MapModule = {
    svgElement: null,
    tooltipElement: null,
    activeContinent: 'Todos',
    currentHoveredCountryId: null,

    /**
     * Inicializa el mapa y sus listeners.
     */
    init: function () {
        this.svgElement = document.getElementById('world-map');
        this.tooltipElement = document.getElementById('country-tooltip');

        if (!this.svgElement) {
            console.error('No se encontró el elemento SVG #world-map en el DOM.');
            return;
        }

        // 1. Configurar datos de países en los trazos del SVG
        this.setupCountryPaths();

        // 2. Configurar eventos de hover limpios e instantáneos
        this.setupEventListeners();

        // 3. Configurar filtros por continentes
        this.setupContinentControls();

        // 4. Configurar interactividad de la leyenda
        this.setupLegendControls();
    },

    /**
     * Asocia cada <path> del SVG con su país y color.
     * Soporta tanto IDs en <path> como en grupos <g id="...">.
     */
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

            if (countryData) {
                const color = window.CocaColaData.getColorByLevel(countryData.level);
                path.setAttribute('data-country-id', countryId);
                path.setAttribute('data-continent', countryData.continent);
                path.setAttribute('data-level', countryData.level);
                path.classList.add('country-path');
                path.style.fill = color;
            } else {
                path.setAttribute('data-country-id', countryId);
                path.setAttribute('data-continent', 'Otro');
                path.setAttribute('data-level', 'muy_bajo');
                path.classList.add('country-path');
                path.style.fill = '#9CA3AF';
            }
        });
    },

    /**
     * Configura los eventos del mouse.
     * Garantiza que ningún país anterior quede marcado al cambiar de país.
     */
    setupEventListeners: function () {
        const paths = this.svgElement.querySelectorAll('path.country-path');

        paths.forEach(path => {
            // Hover sobre un país
            path.addEventListener('mouseenter', (e) => {
                const countryId = path.getAttribute('data-country-id');
                if (!countryId || countryId === 'desconocido') return;

                // Si ya estamos sobre el mismo país, no repetir
                if (this.currentHoveredCountryId === countryId) return;

                // Limpiar SIEMPRE cualquier país previo para evitar que quede pegado
                this.clearAllHighlights();
                this.currentHoveredCountryId = countryId;

                const countryData = window.CocaColaData ? window.CocaColaData.getCountry(countryId) : null;
                if (!countryData) return;

                // 1. Resaltar únicamente este país (y sus islas si tiene)
                this.highlightCountry(countryId);

                // 2. Mostrar Tooltip
                this.showTooltip(countryData);
                this.updateTooltipPosition(e);

                // 3. Invocar al módulo de audio de Sebastián
                if (window.SoundEngine && typeof window.SoundEngine.playBurpForCountry === 'function') {
                    window.SoundEngine.playBurpForCountry(countryData);
                }

                // 4. Actualizar tarjeta de país en foco en el lateral
                this.updateSidebarCountryInfo(countryData);
            });

            // Movimiento suave del tooltip
            path.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });

            // Salida del país
            path.addEventListener('mouseleave', () => {
                const countryId = path.getAttribute('data-country-id');
                this.unhighlightCountry(countryId);
                this.hideTooltip();
                this.currentHoveredCountryId = null;
            });
        });

        // Limpieza de seguridad al salir completamente del SVG
        this.svgElement.addEventListener('mouseleave', () => {
            this.clearAllHighlights();
            this.hideTooltip();
            this.currentHoveredCountryId = null;
        });
    },

    /**
     * Ilumina visualmente el país usando clases CSS (sin tocar el orden del DOM).
     */
    highlightCountry: function (countryId) {
        if (!countryId) return;
        const matchingPaths = this.svgElement.querySelectorAll(`path[data-country-id="${countryId}"]`);
        matchingPaths.forEach(p => {
            p.classList.add('is-hovered');
        });
    },

    /**
     * Remueve el resaltado de un país específico.
     */
    unhighlightCountry: function (countryId) {
        if (!countryId) return;
        const matchingPaths = this.svgElement.querySelectorAll(`path[data-country-id="${countryId}"]`);
        matchingPaths.forEach(p => {
            p.classList.remove('is-hovered');
        });
    },

    /**
     * Limpia de inmediato cualquier país resaltado.
     */
    clearAllHighlights: function () {
        const hoveredPaths = this.svgElement.querySelectorAll('path.country-path.is-hovered');
        hoveredPaths.forEach(p => {
            p.classList.remove('is-hovered');
        });
    },

    /**
     * Muestra el Tooltip informativo con datos de Coca-Cola.
     */
    showTooltip: function (data) {
        if (!this.tooltipElement) return;

        const tier = window.CocaColaData ? window.CocaColaData.getTierConfig(data.level) : {};
        const servings = data.consumptionServings !== undefined ? data.consumptionServings : '--';
        const liters = data.consumptionLiters !== undefined ? data.consumptionLiters : '--';

        this.tooltipElement.innerHTML = `
            <div class="tooltip-header">
                <span class="tooltip-flag">${data.flag || '🥤'}</span>
                <div class="tooltip-titles">
                    <h3 class="tooltip-country-name">${data.name}</h3>
                    <span class="tooltip-continent">${data.continent}</span>
                </div>
                ${data.rank && data.rank !== '--' ? `<span class="tooltip-rank">#${data.rank} Mundial</span>` : ''}
            </div>
            
            <div class="tooltip-tier-badge" style="background-color: ${tier.color || '#E50914'};">
                ${tier.label || 'Nivel de Consumo'}
            </div>

            <div class="tooltip-metrics">
                <div class="metric-item">
                    <span class="metric-value">${servings}</span>
                    <span class="metric-label">Porciones (8 oz) / año</span>
                </div>
                <div class="metric-item">
                    <span class="metric-value">${liters} ${typeof liters === 'number' ? 'L' : ''}</span>
                    <span class="metric-label">Litros per cápita</span>
                </div>
            </div>

            <div class="tooltip-fact">
                <strong>💡 Información:</strong> ${data.fact || 'Sin información adicional.'}
            </div>
        `;

        this.tooltipElement.classList.add('visible');
    },

    /**
     * Posiciona el tooltip siguiendo el mouse con control de límites en pantalla.
     */
    updateTooltipPosition: function (e) {
        if (!this.tooltipElement) return;

        const offset = 16;
        let x = e.clientX + offset;
        let y = e.clientY + offset;

        const tooltipRect = this.tooltipElement.getBoundingClientRect();
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        if (x + tooltipRect.width > winWidth - 12) {
            x = e.clientX - tooltipRect.width - offset;
        }

        if (y + tooltipRect.height > winHeight - 12) {
            y = e.clientY - tooltipRect.height - offset;
        }

        this.tooltipElement.style.left = `${Math.max(8, x)}px`;
        this.tooltipElement.style.top = `${Math.max(8, y)}px`;
    },

    /**
     * Oculta el tooltip.
     */
    hideTooltip: function () {
        if (this.tooltipElement) {
            this.tooltipElement.classList.remove('visible');
        }
    },

    /**
     * Configura los botones de selección por continentes.
     */
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

    /**
     * Filtra y resalta los países del continente seleccionado.
     */
    filterByContinent: function (continent) {
        this.activeContinent = continent;
        const paths = this.svgElement.querySelectorAll('path.country-path');

        paths.forEach(path => {
            const countryContinent = path.getAttribute('data-continent');
            if (continent === 'Todos' || countryContinent === continent) {
                path.classList.remove('is-dimmed');
            } else {
                path.classList.add('is-dimmed');
            }
        });

        // Actualizar banner superior de información
        const banner = document.getElementById('continent-banner-info');
        if (banner) {
            if (continent === 'Todos') {
                banner.innerHTML = `<span>Mostrando <strong>todos los continentes</strong> &bull; Pasa el cursor sobre un país para ver su información</span>`;
            } else {
                banner.innerHTML = `<span>Continente seleccionado: <strong>${continent}</strong></span>`;
            }
        }
    },

    /**
     * Configura la interactividad de la leyenda.
     */
    setupLegendControls: function () {
        const legendItems = document.querySelectorAll('.legend-tier');

        legendItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const tierId = item.getAttribute('data-tier');
                const paths = this.svgElement.querySelectorAll('path.country-path');
                paths.forEach(path => {
                    if (path.getAttribute('data-level') === tierId) {
                        path.classList.add('is-tier-highlighted');
                    } else {
                        path.classList.add('is-dimmed');
                    }
                });
            });

            item.addEventListener('mouseleave', () => {
                const paths = this.svgElement.querySelectorAll('path.country-path');
                paths.forEach(path => {
                    path.classList.remove('is-tier-highlighted');
                    if (this.activeContinent !== 'Todos') {
                        if (path.getAttribute('data-continent') !== this.activeContinent) {
                            path.classList.add('is-dimmed');
                        }
                    } else {
                        path.classList.remove('is-dimmed');
                    }
                });
            });
        });
    },

    /**
     * Actualiza la tarjeta de país seleccionado en el panel lateral.
     */
    updateSidebarCountryInfo: function (data) {
        const infoBox = document.getElementById('featured-country-card');
        if (!infoBox) return;

        const servings = data.consumptionServings !== undefined ? data.consumptionServings : '--';
        const liters = data.consumptionLiters !== undefined ? data.consumptionLiters : '--';

        infoBox.innerHTML = `
            <div class="featured-header">
                <span class="featured-flag">${data.flag || '🥤'}</span>
                <div>
                    <h4>${data.name}</h4>
                    <span class="featured-sub">${data.continent} ${data.rank && data.rank !== '--' ? `&bull; Rank #${data.rank}` : ''}</span>
                </div>
            </div>
            <div class="featured-stat-row">
                <div class="featured-stat">
                    <span class="f-num">${servings}</span>
                    <span class="f-lbl">Porciones 8oz/año</span>
                </div>
                <div class="featured-stat">
                    <span class="f-num">${liters} ${typeof liters === 'number' ? 'L' : ''}</span>
                    <span class="f-lbl">Litros anuales</span>
                </div>
            </div>
            <p class="featured-fact">${data.fact || 'Datos en proceso de recopilación por Martín Concha.'}</p>
        `;
    }
};

window.MapModule = MapModule;
