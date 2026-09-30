/**
 * ====================================================================
 * PROYECTO INFOVIS 2026 - VISUALIZACIÓN DE CONSUMO MUNDIAL DE COCA-COLA
 * Coordinador General de la Aplicación: app.js
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🥤 Inicializando Visualización de Consumo Mundial de Coca-Cola...');

    // 1. Inicializar mapa interactivo
    if (window.MapModule) {
        window.MapModule.init();
    }

    // 2. Renderizar Podio Top 5 en el panel lateral
    renderTopRanking();

    // 3. Configurar controles de sonido
    setupAudioControls();

    // 4. Inicializar generador de burbujas decorativas de gaseosa
    createCarbonationBubbles();

    // 5. Vincular desbloqueo de audio ante la primera interacción
    setupAudioUnlockListener();
});

/**
 * Renderiza la lista interactiva de los 5 países con mayor consumo de Coca-Cola.
 */
function renderTopRanking() {
    const listContainer = document.getElementById('top-ranking-list');
    if (!listContainer || !window.CocaColaData) return;

    const top5 = window.CocaColaData.getTopCountries(5);

    listContainer.innerHTML = top5.map((country, index) => {
        const tier = window.CocaColaData.getTierConfig(country.level);
        return `
            <li class="ranking-item" data-country-id="${country.id}" title="Haz clic para ver y escuchar">
                <span class="ranking-pos">#${index + 1}</span>
                <span class="ranking-flag">${country.flag}</span>
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

    // Agregar evento clic para centrar / escuchar eructo al presionar un país del ranking
    listContainer.querySelectorAll('.ranking-item').forEach(item => {
        item.addEventListener('click', () => {
            const countryId = item.getAttribute('data-country-id');
            const path = document.querySelector(`path.country-path[data-country-id="${countryId}"]`);
            const data = window.CocaColaData.getCountry(countryId);

            if (path && data) {
                // Simular hover
                path.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                
                // Efecto de pulso en el botón del ranking
                item.classList.add('ranking-clicked');
                setTimeout(() => item.classList.remove('ranking-clicked'), 600);
            }
        });
    });
}

/**
 * Configura los botones de sonido, volumen y pruebas.
 */
function setupAudioControls() {
    const muteBtn = document.getElementById('btn-sound-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    const testBurpBtn = document.getElementById('btn-test-burp');
    const soundIndicator = document.getElementById('sound-wave-indicator');

    if (muteBtn && window.SoundEngine) {
        muteBtn.addEventListener('click', () => {
            window.SoundEngine.initContext();
            const isMuted = window.SoundEngine.toggleMute();

            if (isMuted) {
                muteBtn.classList.add('is-muted');
                muteBtn.innerHTML = `<span>🔇</span><span>Silenciado</span>`;
                if (soundIndicator) soundIndicator.classList.add('muted');
            } else {
                muteBtn.classList.remove('is-muted');
                muteBtn.innerHTML = `<span>🔊</span><span>Sonido Activo</span>`;
                if (soundIndicator) soundIndicator.classList.remove('muted');
            }
        });
    }

    if (volumeSlider && window.SoundEngine) {
        volumeSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            window.SoundEngine.setVolume(val);
        });
    }

    if (testBurpBtn && window.SoundEngine && window.CocaColaData) {
        testBurpBtn.addEventListener('click', () => {
            window.SoundEngine.initContext();
            // Probar con el eructo de México (el más potente)
            const mexico = window.CocaColaData.getCountry('mx');
            window.SoundEngine.playBurpForCountry(mexico);
        });
    }

    // Callback visual cuando suena un eructo
    if (window.SoundEngine) {
        window.SoundEngine.onSoundPlay = (countryData, duration, intensity) => {
            const indicator = document.getElementById('burp-wave-animation');
            if (indicator) {
                indicator.classList.add('playing');
                indicator.style.animationDuration = `${Math.max(0.2, 0.6 - intensity * 0.4)}s`;
            }
            // Agitar sutilmente el contenedor de la tarjeta
            const featuredCard = document.getElementById('featured-country-card');
            if (featuredCard && intensity > 0.6) {
                featuredCard.classList.add('shake-card');
                setTimeout(() => featuredCard.classList.remove('shake-card'), 400);
            }
        };

        window.SoundEngine.onSoundEnd = () => {
            const indicator = document.getElementById('burp-wave-animation');
            if (indicator) {
                indicator.classList.remove('playing');
            }
        };
    }
}

/**
 * Escucha el primer clic en la ventana para desbloquear la Web Audio API.
 */
function setupAudioUnlockListener() {
    const unlockHandler = () => {
        if (window.SoundEngine) {
            window.SoundEngine.initContext();
        }
        window.removeEventListener('click', unlockHandler);
        window.removeEventListener('keydown', unlockHandler);
    };

    window.addEventListener('click', unlockHandler, { once: true });
    window.addEventListener('keydown', unlockHandler, { once: true });
}

/**
 * Genera pequeñas burbujas decorativas que suben por el fondo emulando Coca-Cola.
 */
function createCarbonationBubbles() {
    const container = document.getElementById('bubbles-bg');
    if (!container) return;

    const bubbleCount = 28;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'coca-bubble';
        
        const size = Math.random() * 8 + 3;
        const left = Math.random() * 100;
        const duration = Math.random() * 7 + 5;
        const delay = Math.random() * 8;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;

        container.appendChild(bubble);
    }
}
