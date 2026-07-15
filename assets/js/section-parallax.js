function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getParallaxLayers() {
    return Array.from(document.querySelectorAll('main > .scroll-layer, main > section:not(.hero)'));
}

function setLayerParallax(layer, value) {
    layer.style.setProperty('--section-parallax-y', `${value}px`);
}

function updateSectionParallax() {
    const hero = document.querySelector('.hero');
    const layers = getParallaxLayers();
    const footer = document.querySelector('.site-footer');

    if (!hero || !layers.length || Portfolio.prefersReducedMotion.matches) {
        layers.forEach((layer) => setLayerParallax(layer, 0));
        updateFooterReveal(footer, null);
        return;
    }

    layers.forEach((layer, index) => {
        const previousLayer = index === 0 ? hero : layers[index - 1];
        const previousRect = previousLayer.getBoundingClientRect();
        const previousHeight = Math.max(previousLayer.offsetHeight, window.innerHeight);
        const progress = clamp(-previousRect.top / previousHeight, 0, 1);
        const maxOverlap = Math.min(window.innerHeight * 0.24, 220);
        const offset = Math.round(progress * maxOverlap * -1);

        setLayerParallax(layer, offset);
    });

    updateFooterReveal(footer, layers[layers.length - 1]);
}

function updateFooterReveal(footer, previousLayer) {
    if (!footer) {
        return;
    }

    if (!previousLayer || Portfolio.prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--footer-overlay-opacity', '0');
        footer.style.setProperty('--footer-reveal-y', '100%');
        footer.classList.remove('is-visible');
        return;
    }

    const previousRect = previousLayer.getBoundingClientRect();
    const revealDistance = Math.min(window.innerHeight * 0.24, 220);
    const progress = clamp((window.innerHeight - previousRect.bottom) / revealDistance, 0, 1);
    const offset = Math.round((1 - progress) * 100);
    const overlayOpacity = (progress * 0.62).toFixed(3);

    document.documentElement.style.setProperty('--footer-overlay-opacity', overlayOpacity);
    footer.style.setProperty('--footer-reveal-y', `${offset}%`);
    footer.classList.toggle('is-visible', progress > 0.02);
}

function setupSectionParallax() {
    if (Portfolio.prefersReducedMotion.matches) {
        return;
    }

    updateSectionParallax();
    window.addEventListener('scroll', updateSectionParallax, { passive: true });
    window.addEventListener('resize', updateSectionParallax);
}

Portfolio.updateSectionParallax = updateSectionParallax;
Portfolio.setupSectionParallax = setupSectionParallax;
