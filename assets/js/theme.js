function preloadImage(src) {
    if (!src) {
        return;
    }

    const image = new Image();
    image.src = src;

    if (typeof image.decode === 'function') {
        image.decode().catch(() => {});
    }
}

function preloadThemeAssets() {
    const heroPortrait = document.getElementById('hero-portrait');

    if (!heroPortrait) {
        return;
    }

    preloadImage(heroPortrait.dataset.lightSrc);
    preloadImage(heroPortrait.dataset.darkSrc);
}

function applyTheme(theme) {
    const isDark = theme === 'dark';

    document.documentElement.dataset.theme = theme;
    Portfolio.dom.themeIcon.src = isDark ? 'assets/images/dark.svg' : 'assets/images/light.svg';
    Portfolio.dom.themeToggle.setAttribute('aria-pressed', String(isDark));
    Portfolio.dom.themeToggle.setAttribute('aria-label', isDark ? 'Passer en mode clair' : 'Passer en mode sombre');
    const heroPortrait = document.getElementById('hero-portrait');
    if (heroPortrait) {
        heroPortrait.src = isDark ? heroPortrait.dataset.darkSrc : heroPortrait.dataset.lightSrc;
    }
    localStorage.setItem('theme', theme);
    Portfolio.updateNavbarContrast();
}


Portfolio.preloadThemeAssets = preloadThemeAssets;
Portfolio.applyTheme = applyTheme;
