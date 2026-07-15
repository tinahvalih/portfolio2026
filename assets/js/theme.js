function applyTheme(theme) {
    const isDark = theme === 'dark';

    document.documentElement.dataset.theme = theme;
    Portfolio.dom.themeIcon.src = isDark ? 'assets/images/dark.svg' : 'assets/images/light.svg';
    Portfolio.dom.themeToggle.setAttribute('aria-pressed', String(isDark));
    Portfolio.dom.themeToggle.setAttribute('aria-label', isDark ? 'Passer en mode clair' : 'Passer en mode sombre');
    localStorage.setItem('theme', theme);
    Portfolio.updateNavbarContrast();
}


Portfolio.applyTheme = applyTheme;
