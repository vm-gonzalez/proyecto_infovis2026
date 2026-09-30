/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Módulo de Mapa e Interacción Visual: Dev 1 (Frontend Lead)
 * ====================================================================
 * Gestiona:
 * - Coloreado de países según nivel de consumo (Choropleth).
 * - Agrupación y filtrado por continentes.
 * - Efectos de hover sobre cada país (iluminación, bordes, escala).
 * - Posicionamiento dinámico del tooltip con datos y métricas.
 * - Invocación del sonido de eructo proporcional al consumo.
 * - Controles de zoom y paneo sobre el SVG.
 */

const MapModule = {
    svgElement: null,
    tooltipElement: null,
    activeContinent: 'Todos',
    activeTier: null,
    currentHoveredCountryId: null,
    
    // Configuración de vista original del SVG
    originalViewBox: { x: 30.767, y: 241.591, width: 784.077, height: 458.627 },
    currentZoom: 1,

    /**
     * Inicializa el módulo del mapa vinculando el SVG y los eventos de interacción.
     */
    init: function () {
        this.svgElement = document.getElementById('world-map');
        this.tooltipElement = document.getElementById('country-tooltip');

        if (!this.svgElement) {
            console.error('No se encontró el elemento SVG #world-map en el DOM.');
            return;
        }

        // Configurar atributos iniciales de los países y coloreado
        this.setupCountryPaths();

        // Configurar eventos de interacción en el mapa
        this.setupEventListeners();

        // Configurar controles de continentes
        this.setupContinentControls();

        // Configurar controles de la leyenda
        this.setupLegendControls();

        // Configurar controles de zoom y navegación
        this.setupNavigationControls();
    },

    /**
     * Recorre cada elemento <path> del mapa SVG, asignando sus datos de consumo,
     * clase CSS, atributos de datos y color de coropleta.
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

            // Consultar datos a Martín Concha (CocaColaData)
            const countryData = window.CocaColaData ? window.CocaColaData.getCountry(countryId) : null;

            if (countryData) {
                const color = window.CocaColaData.getColorByLevel(countryData.level);
                path.setAttribute('data-country-id', countryId);
                path.setAttribute('data-continent', countryData.continent);
                path.setAttribute('data-level', countryData.level);
                path.setAttribute('data-servings', countryData.consumptionServings);
                path.classList.add('country-path');
                
                // Color base según nivel de consumo
                path.style.fill = color;
            } else {
                path.setAttribute('data-country-id', countryId);
                path.setAttribute('data-continent', 'Desconocido');
                path.setAttribute('data-level', 'muy_bajo');
                path.classList.add('country-path', 'country-no-data');
                path.style.fill = '#9CA3AF';
            }
        });
    },

    /**
     * Configura los eventos del mouse (mouseenter, mousemove, mouseleave)
     * en los países del SVG para disparar el hover visual, tooltip y sonido.
     */
    setupEventListeners: function () {
        const paths = this.svgElement.querySelectorAll('path.country-path');

        paths.forEach(path => {
            // Al entrar el cursor al país
            path.addEventListener('mouseenter', (e) => {
                const countryId = path.getAttribute('data-country-id');
                if (!countryId || countryId === 'desconocido') return;
                if (this.currentHoveredCountryId === countryId) return;
                this.currentHoveredCountryId = countryId;

                const countryData = window.CocaColaData ? window.CocaColaData.getCountry(countryId) : null;
                if (!countryData) return;

                // 1. Resaltado visual en el mapa (efecto de dev 1)
                this.highlightCountry(countryId);

                // 2. Mostrar y actualizar contenido del Tooltip
                this.showTooltip(countryData);
                this.updateTooltipPosition(e);

                // 3. Disparar el sonido de eructo proporcional (módulo de Sebastián Valencia)
                if (window.SoundEngine) {
                    window.SoundEngine.playBurpForCountry(countryData);
                }

                // 4. Actualizar panel lateral de país activo
                this.updateSidebarCountryInfo(countryData);
            });

            // Al moverse el cursor dentro del país (posicionamiento suave del tooltip)
            path.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });

            // Al salir el cursor del país
            path.addEventListener('mouseleave', () => {
                const countryId = path.getAttribute('data-country-id');
                this.unhighlightCountry(countryId);
                this.hideTooltip();
                this.currentHoveredCountryId = null;
            });
        });
    },

    /**
     * Aplica los estilos y efectos visuales de hover a un país y todos sus territorios.
     */
    highlightCountry: function (countryId) {
        if (!countryId) return;
        const siblingPaths = this.svgElement.querySelectorAll(`path[data-country-id="${countryId}"]`);
        siblingPaths.forEach(p => {
            p.classList.add('is-hovered');
            if (p.parentNode) {
                p.parentNode.appendChild(p);
            }
        });
    },

    /**
     * Restaura los estilos visuales originales de un país.
     */
    unhighlightCountry: function (countryId) {
        if (!countryId) return;
        const siblingPaths = this.svgElement.querySelectorAll(`path[data-country-id="${countryId}"]`);
        siblingPaths.forEach(p => {
            p.classList.remove('is-hovered');
        });
    },

    /**
     * Rellena y muestra el Tooltip flotante con la información de Coca-Cola.
     */
    showTooltip: function (data) {
        if (!this.tooltipElement) return;

        const tier = window.CocaColaData ? window.CocaColaData.getTierConfig(data.level) : {};
        const servings = data.consumptionServings;
        const liters = data.consumptionLiters;

        // Construir barra de botellas / nivel visual
        const maxServings = 750;
        const percentage = Math.min(100, Math.round((servings / maxServings) * 100));

        this.tooltipElement.innerHTML = `
            <div class="tooltip-header">
                <span class="tooltip-flag">${data.flag || '🥤'}</span>
                <div class="tooltip-titles">
                    <h3 class="tooltip-country-name">${data.name}</h3>
                    <span class="tooltip-continent">${data.continent} &bull; ${data.englishName || ''}</span>
                </div>
                <span class="tooltip-rank">#${data.rank} Mundial</span>
            </div>
            
            <div class="tooltip-tier-badge" style="background-color: ${tier.color};">
                ${tier.label || 'Nivel de Consumo'}
            </div>

            <div class="tooltip-metrics">
                <div class="metric-item">
                    <span class="metric-value">${servings}</span>
                    <span class="metric-label">Porciones (8 oz) / año</span>
                </div>
                <div class="metric-item">
                    <span class="metric-value">${liters} L</span>
                    <span class="metric-label">Litros per cápita</span>
                </div>
            </div>

            <div class="tooltip-meter-container">
                <div class="meter-labels">
                    <span>Intensidad de Consumo</span>
                    <span>${percentage}%</span>
                </div>
                <div class="meter-bar-bg">
                    <div class="meter-bar-fill" style="width: ${percentage}%; background-color: ${tier.color};"></div>
                </div>
            </div>

            <div class="tooltip-burp-indicator">
                <span class="burp-icon">💨</span>
                <div class="burp-info">
                    <span class="burp-title">Efecto Acústico (Eructo):</span>
                    <span class="burp-description">${tier.burpIntensity || 'Proporcional'}</span>
                </div>
            </div>

            ${data.fact ? `<div class="tooltip-fact"><strong>💡 Dato curioso:</strong> ${data.fact}</div>` : ''}
        `;

        this.tooltipElement.classList.add('visible');
    },

    /**
     * Actualiza las coordenadas del tooltip flotante respecto al cursor con clamping.
     */
    updateTooltipPosition: function (e) {
        if (!this.tooltipElement) return;

        const offset = 18;
        let x = e.clientX + offset;
        let y = e.clientY + offset;

        const tooltipRect = this.tooltipElement.getBoundingClientRect();
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        // Evitar que el tooltip se corte a la derecha
        if (x + tooltipRect.width > winWidth - 15) {
            x = e.clientX - tooltipRect.width - offset;
        }

        // Evitar que el tooltip se corte abajo
        if (y + tooltipRect.height > winHeight - 15) {
            y = e.clientY - tooltipRect.height - offset;
        }

        this.tooltipElement.style.left = `${Math.max(10, x)}px`;
        this.tooltipElement.style.top = `${Math.max(10, y)}px`;
    },

    /**
     * Oculta el tooltip flotante.
     */
    hideTooltip: function () {
        if (this.tooltipElement) {
            this.tooltipElement.classList.remove('visible');
        }
    },

    /**
     * Configura los botones de selección y filtrado por continentes.
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
     * Resalta visualmente un continente determinado y atenúa los demás.
     */
    filterByContinent: function (continent) {
        this.activeContinent = continent;
        const paths = this.svgElement.querySelectorAll('path.country-path');

        paths.forEach(path => {
            const countryContinent = path.getAttribute('data-continent');
            if (continent === 'Todos' || countryContinent === continent) {
                path.classList.remove('is-dimmed');
                path.classList.add('is-active-continent');
            } else {
                path.classList.add('is-dimmed');
                path.classList.remove('is-active-continent');
            }
        });

        // Actualizar estadísticas del continente en la barra superior
        this.updateContinentStatsBanner(continent);
    },

    /**
     * Configura la interactividad con la leyenda de niveles de consumo.
     */
    setupLegendControls: function () {
        const legendItems = document.querySelectorAll('.legend-tier');

        legendItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const tierId = item.getAttribute('data-tier');
                this.highlightTier(tierId);
            });

            item.addEventListener('mouseleave', () => {
                this.clearTierHighlight();
            });
        });
    },

    /**
     * Resalta los países que pertenecen a un nivel de consumo específico.
     */
    highlightTier: function (tierId) {
        const paths = this.svgElement.querySelectorAll('path.country-path');
        paths.forEach(path => {
            if (path.getAttribute('data-level') === tierId) {
                path.classList.add('is-tier-highlighted');
            } else {
                path.classList.add('is-dimmed');
            }
        });
    },

    /**
     * Limpia el resaltado de la leyenda.
     */
    clearTierHighlight: function () {
        const paths = this.svgElement.querySelectorAll('path.country-path');
        paths.forEach(path => {
            path.classList.remove('is-tier-highlighted');
            // Respetar el filtro activo de continente
            if (this.activeContinent !== 'Todos') {
                if (path.getAttribute('data-continent') !== this.activeContinent) {
                    path.classList.add('is-dimmed');
                }
            } else {
                path.classList.remove('is-dimmed');
            }
        });
    },

    /**
     * Configura controles de zoom (+, -, reset).
     */
    setupNavigationControls: function () {
        const zoomInBtn = document.getElementById('btn-zoom-in');
        const zoomOutBtn = document.getElementById('btn-zoom-out');
        const resetBtn = document.getElementById('btn-reset-map');

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => this.applyZoom(1.25));
        }
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => this.applyZoom(0.8));
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetMap());
        }
    },

    applyZoom: function (factor) {
        this.currentZoom = Math.min(3.5, Math.max(0.7, this.currentZoom * factor));
        const vb = this.originalViewBox;
        const newWidth = vb.width / this.currentZoom;
        const newHeight = vb.height / this.currentZoom;
        const newX = vb.x + (vb.width - newWidth) / 2;
        const newY = vb.y + (vb.height - newHeight) / 2;

        this.svgElement.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
    },

    resetMap: function () {
        this.currentZoom = 1;
        const vb = this.originalViewBox;
        this.svgElement.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.width} ${vb.height}`);
        this.filterByContinent('Todos');
        
        // Reset botones de continente
        document.querySelectorAll('.continent-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-continent') === 'Todos');
        });
    },

    /**
     * Actualiza el panel de información del país seleccionado o en hover.
     */
    updateSidebarCountryInfo: function (data) {
        const infoBox = document.getElementById('featured-country-card');
        if (!infoBox) return;

        const tier = window.CocaColaData ? window.CocaColaData.getTierConfig(data.level) : {};
        infoBox.innerHTML = `
            <div class="featured-header">
                <span class="featured-flag">${data.flag || '🥤'}</span>
                <div>
                    <h4>${data.name}</h4>
                    <span class="featured-sub">${data.continent} &bull; Rank #${data.rank}</span>
                </div>
            </div>
            <div class="featured-stat-row">
                <div class="featured-stat">
                    <span class="f-num">${data.consumptionServings}</span>
                    <span class="f-lbl">Porciones 8oz/año</span>
                </div>
                <div class="featured-stat">
                    <span class="f-num">${data.consumptionLiters} L</span>
                    <span class="f-lbl">Litros anuales</span>
                </div>
            </div>
            <p class="featured-fact">${data.fact}</p>
        `;
    },

    /**
     * Actualiza el banner de resumen al seleccionar un continente.
     */
    updateContinentStatsBanner: function (continent) {
        const banner = document.getElementById('continent-banner-info');
        if (!banner) return;

        if (continent === 'Todos') {
            banner.innerHTML = `<span>Mostrando <strong>todos los continentes</strong> &bull; Pasa el cursor sobre un país para ver métricas y escuchar su eructo</span>`;
            return;
        }

        // Calcular datos del continente
        const allCountries = Object.values(window.CocaColaData.countries).filter(c => c.continent === continent);
        if (allCountries.length > 0) {
            const topInContinent = allCountries.reduce((prev, curr) => (curr.consumptionServings > prev.consumptionServings) ? curr : prev, allCountries[0]);
            const avgServings = Math.round(allCountries.reduce((sum, c) => sum + c.consumptionServings, 0) / allCountries.length);

            banner.innerHTML = `
                <span>Continente: <strong>${continent}</strong></span>
                <span>Promedio: <strong>${avgServings} porciones</strong></span>
                <span>Líder: <strong>${topInContinent.name} (${topInContinent.consumptionServings} porciones)</strong></span>
            `;
        } else {
            banner.innerHTML = `<span>Filtrando por continente: <strong>${continent}</strong></span>`;
        }
    }
};

// Exportar globalmente
window.MapModule = MapModule;
