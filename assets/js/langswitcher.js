const copy = {
    fr: {
        nav_about: 'Aa Propos',
        nav_projects: 'Mes Realisations',
        nav_skills: 'Expertises',
        hero_intro: 'Hello, je suis',
        hero_line_one: 'Je design vos',
        hero_gradient_word: 'interfaces',
        hero_line_two_before: "et j'anime",
        hero_line_two_after: 'vos idees',
        hero_copy: "Concepteur UI/UX et Graphique passionne, avec 5+ ans d'experience en visuels sociaux, interfaces web, 3D et montage video. Alliant precision technique et creativite pour des solutions sur mesure",
        cv_label: 'Telecharger mon CV'
    },
    en: {
        nav_about: 'About',
        nav_projects: 'My Projects',
        nav_skills: 'Skills',
        hero_intro: 'Hello, I am',
        hero_line_one: 'I design your',
        hero_gradient_word: 'interfaces',
        hero_line_two_before: 'and animate',
        hero_line_two_after: 'your ideas',
        hero_copy: 'Passionate UI/UX and graphic designer with 5+ years of experience in social visuals, web interfaces, 3D and video editing. Blending technical precision and creativity for tailored solutions',
        cv_label: 'Download my resume'
    }
};

let currentLanguage = 'fr';

function applyLanguage(language) {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        if (copy[language][key]) {
            element.textContent = copy[language][key];
        }
    });

    document.documentElement.lang = language;
    document.getElementById('current-lang').textContent = language.toUpperCase();
}

document.getElementById('switcher').addEventListener('click', () => {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    applyLanguage(currentLanguage);
});

const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    });
});

applyLanguage(currentLanguage);
