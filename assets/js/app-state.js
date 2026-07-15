window.Portfolio = window.Portfolio || {};

Portfolio.currentLanguage = localStorage.getItem('language') === 'en' ? 'en' : 'fr';
Portfolio.dom = {
    burger: document.querySelector('.burger'),
    navMenu: document.querySelector('.nav-menu'),
    themeToggle: document.getElementById('theme-toggle'),
    projectsList: document.getElementById('projects-list'),
    awardsList: document.getElementById('awards-list'),
    projectCursor: document.getElementById('project-cursor'),
    openLegalButton: document.getElementById('open-legal'),
    legalModal: document.getElementById('legal-modal'),
    siteHeader: document.querySelector('.site-header')
};
Portfolio.dom.themeIcon = Portfolio.dom.themeToggle?.querySelector('img');
Portfolio.dom.legalDialog = Portfolio.dom.legalModal?.querySelector('.legal-dialog');
Portfolio.dom.legalContent = document.getElementById('legal-content');
Portfolio.dom.legalCloseButton = Portfolio.dom.legalModal?.querySelector('.legal-close');
Portfolio.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
Portfolio.lenis = null;
Portfolio.lastScrollY = window.scrollY;
