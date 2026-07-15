function updateNavbarContrast() {
    if (!Portfolio.dom.siteHeader) {
        return;
    }

    const themeIsDark = document.documentElement.dataset.theme === 'dark';
    const headerProbeY = Math.min(72, window.innerHeight - 1);
    const pageX = window.innerWidth / 2;
    const elements = document.elementsFromPoint(pageX, headerProbeY);
    const section = elements.find((element) => (
        !Portfolio.dom.siteHeader.contains(element)
        && element.closest?.('.hero, .projects-section, .awards-section, .site-footer')
    ))?.closest('.hero, .projects-section, .awards-section, .site-footer');
    const isOnLightSection = Boolean(section?.matches('.projects-section, .awards-section'));

    Portfolio.dom.siteHeader.classList.toggle('is-on-light', isOnLightSection && !themeIsDark);
}

function updateNavbarVisibility() {
    if (!Portfolio.dom.siteHeader) {
        return;
    }

    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - Portfolio.lastScrollY;
    const menuIsOpen = Portfolio.dom.navMenu.classList.contains('open');

    if (currentScrollY < 80 || menuIsOpen) {
        Portfolio.dom.siteHeader.classList.remove('is-nav-hidden');
        Portfolio.lastScrollY = currentScrollY;
        return;
    }

    if (Math.abs(scrollDelta) < 8) {
        return;
    }

    Portfolio.dom.siteHeader.classList.toggle('is-nav-hidden', scrollDelta > 0);
    Portfolio.lastScrollY = currentScrollY;
}

function updateNavbarOnScroll() {
    updateNavbarContrast();
    updateNavbarVisibility();
}


Portfolio.updateNavbarContrast = updateNavbarContrast;
Portfolio.updateNavbarVisibility = updateNavbarVisibility;
Portfolio.updateNavbarOnScroll = updateNavbarOnScroll;
