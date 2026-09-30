/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÃ“N DE CONSUMO MUNDIAL DE COCA-COLA
 * MÃ³dulo de Mapa e InteracciÃ³n Visual: Vicente Meza (dev 1 - Frontend Lead)
 * ====================================================================
 * Gestiona:
 * - Renderizado base del mapa y sus recuadros informativos.
 * - Efectos visuales de hover en cada paÃ­s (sin datos hardcodeados).
 * - Tooltip con los espacios/recuadros preparados para la informaciÃ³n de MartÃ­n.
 * - Filtrado visual por continentes.
 */

const MapModule = {
    svgElement: null,
    tooltipElement: null,
    activeContinent: 'Todos',
    currentHoveredCountryId: null,

    init: function () {
        this.svgElement = document.getElementById('world-map');
        this.tooltipElement = document.getElementById('country-tooltip');

        if (!this.svgElement) {
            console.error('No se encontrÃ³ el elemento SVG #world-map en el DOM.');
            return;
        }

        // 1. Configurar paths del SVG con color base neutro y atributos
        this.setupCountryPaths();

        // 2. Configurar eventos de hover sin acumulaciÃ³n de marcas
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
            
            // Si MartÃ­n definiÃ³ un nivel, usar su color; si no, color base uniforme
            const color = countryData && countryData.level ? window.CocaColaData.getColorByLevel(countryData.level) : '#2A2020';
            path.style.fill = color;
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

                // 1. Iluminar paÃ­s en hover
                this.highlightCountry(countryId);

                // 2. Mostrar recuadros en el Tooltip
                this.showTooltip(countryData);
                this.updateTooltipPosition(e);

                // 3. Invocar al mÃ³dulo de audio de SebastiÃ¡n (recibirÃ¡ el paÃ­s)
                if (window.SoundEngine && typeof window.SoundEngine.playBurpForCountry === 'function') {
                    window.SoundEngine.playBurpForCountry(countryData);
                }

                // 4. Actualizar recuadro lateral
                this.updateSidebarCountryInfo(countryData);
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
     * Muestra el Tooltip con los recuadros/espacios preparados.
     */
    showTooltip: function (data) {
        if (!this.tooltipElement) return;

        const tier = window.CocaColaData ? window.CocaColaData.getTierConfig(data.level) : {};
        const servings = data.consumptionServings !== undefined ? data.consumptionServings : '---';
        const liters = data.consumptionLiters !== undefined ? data.consumptionLiters : '---';

        this.tooltipElement.innerHTML = `
            <div class="tooltip-header">
                <span class="tooltip-flag">${data.flag || 'ðŸ³ï¸'}</span>
                <div class="tooltip-titles">
                    <h3 class="tooltip-country-name">${data.name}</h3>
                    <span class="tooltip-continent">${data.continent}</span>
                </div>
            </div>
            
            <div class="tooltip-tier-badge placeholder-badge">
                ${tier.label || '[Espacio: Nivel de Consumo]'}
            </div>

            <div class="tooltip-metrics">
                <div class="metric-item placeholder-box">
                    <span class="metric-value">${servings}</span>
                    <span class="metric-label">[Porciones 8oz / aÃ±o]</span>
                </div>
                <div class="metric-item placeholder-box">
                    <span class="metric-value">${liters}</span>
                    <span class="metric-label">[Litros per cÃ¡pita]</span>
                </div>
            </div>

            <div class="tooltip-fact placeholder-box">
                <span class="placeholder-tag">[Recuadro de InformaciÃ³n]</span>
                <p>${data.fact || 'Espacio reservado para la informaciÃ³n de MartÃ­n Concha.'}</p>
            </div>
        `;

        this.tooltipElement.classList.add('visible');
    },

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

        const banner = document.getElementById('continent-banner-info');
        if (banner) {
            if (continent === 'Todos') {
                banner.innerHTML = `<span>Mostrando <strong>todos los continentes</strong> &bull; Pasa el cursor sobre un paÃ­s para ver su recuadro</span>`;
            } else {
                banner.innerHTML = `<span>Continente seleccionado: <strong>${continent}</strong></span>`;
            }
        }
    },

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
     * Actualiza el recuadro lateral para el paÃ­s seleccionado.
     */
    updateSidebarCountryInfo: function (data) {
        const infoBox = document.getElementById('featured-country-card');
        if (!infoBox) return;

        const servings = data.consumptionServings !== undefined ? data.consumptionServings : '---';
        const liters = data.consumptionLiters !== undefined ? data.consumptionLiters : '---';

        infoBox.innerHTML = `
            <div class="featured-header">
                <span class="featured-flag">${data.flag || 'ðŸ³ï¸'}</span>
                <div>
                    <h4>${data.name}</h4>
                    <span class="featured-sub">${data.continent}</span>
                </div>
            </div>
            <div class="featured-stat-row">
                <div class="featured-stat placeholder-box">
                    <span class="f-num">${servings}</span>
                    <span class="f-lbl">[Porciones 8oz / aÃ±o]</span>
                </div>
                <div class="featured-stat placeholder-box">
                    <span class="f-num">${liters}</span>
                    <span class="f-lbl">[Litros anuales]</span>
                </div>
            </div>
            <div class="featured-fact placeholder-box">
                <span class="placeholder-tag">[Recuadro de InformaciÃ³n]</span>
                <p>${data.fact || 'Espacio reservado para la informaciÃ³n de MartÃ­n Concha.'}</p>
            </div>
        `;
    }
};

window.MapModule = MapModule;
