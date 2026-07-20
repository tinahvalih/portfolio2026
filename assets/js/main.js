Portfolio.setupSmoothScroll();
Portfolio.setupSectionParallax();
Portfolio.preloadThemeAssets();

const savedTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
Portfolio.applyTheme(savedTheme);

Portfolio.dom.burger.addEventListener('click', () => {
    const isOpen = Portfolio.dom.navMenu.classList.toggle('open');
    Portfolio.dom.burger.classList.toggle('open', isOpen);
    Portfolio.dom.burger.setAttribute('aria-expanded', String(isOpen));
    Portfolio.dom.siteHeader?.classList.remove('is-nav-hidden');
});

Portfolio.dom.themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

    Portfolio.dom.themeToggle.classList.remove('is-animating');
    void Portfolio.dom.themeToggle.offsetWidth;
    Portfolio.dom.themeToggle.classList.add('is-animating');
    Portfolio.applyTheme(nextTheme);
});

Portfolio.dom.themeToggle.addEventListener('animationend', () => {
    Portfolio.dom.themeToggle.classList.remove('is-animating');
});

document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        Portfolio.dom.navMenu.classList.remove('open');
        Portfolio.dom.burger.classList.remove('open');
        Portfolio.dom.burger.setAttribute('aria-expanded', 'false');
    });
});

Portfolio.dom.openLegalButton?.addEventListener('click', Portfolio.openLegalModal);

Portfolio.dom.legalModal?.querySelectorAll('[data-close-legal]').forEach((element) => {
    element.addEventListener('click', Portfolio.closeLegalModal);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && Portfolio.dom.legalModal?.classList.contains('open')) {
        Portfolio.closeLegalModal();
    }
});

Portfolio.applyLanguage(Portfolio.currentLanguage);
Portfolio.updateNavbarOnScroll();
Portfolio.updateSectionParallax?.();
window.addEventListener('scroll', Portfolio.updateNavbarOnScroll, { passive: true });
window.addEventListener('resize', Portfolio.updateNavbarContrast);
