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

let currentLanguage = localStorage.getItem('language') === 'en' ? 'en' : 'fr';

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
    localStorage.setItem('language', currentLanguage);
});

const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('img');
const projectsList = document.getElementById('projects-list');
const projectCursor = document.getElementById('project-cursor');

const projects = [
    {
        title: 'EmitVerse',
        category: '3D, Video Game, Web design, Development',
        image: 'assets/images/projects/emitverse.png'
    },
    {
        title: 'RomeExchange',
        category: 'UI & UX, Branding, Web design, Development',
        image: 'assets/images/projects/romeExchange.png'
    },
    {
        title: 'Bouclette.co',
        category: 'UI & UX, Branding, Web design, Development',
        image: 'assets/images/projects/boucletteco.png'
    },
    {
        title: 'Abandonned CashPoint',
        category: '3D, Texturing, Video Game Ready',
        image: 'assets/images/projects/cashpoint.png'
    },
    {
        title: 'LOVA',
        category: '3D, Texturing, Video Game Ready Assets',
        image: 'assets/images/projects/lovagame.png'
    },
    {
        title: 'meko',
        category: 'Branding, Logo',
        image: 'assets/images/projects/mekobranding.png'
    },
    {
        title: 'Voir plus...',
        image: 'assets/images/projects/See_more.png',
        seeMore: true
    }
];

function renderProjects() {
    const rotations = [-1.8, 2, 0];

    projectsList.innerHTML = projects.map((project, index) => {
        const rotation = rotations[index % rotations.length];
        const hoverRotation = rotation === 0 ? rotations[(index + 1) % 2] : 0;
        const cardClass = project.seeMore ? 'project-card project-card--see-more' : 'project-card';
        const meta = project.seeMore
            ? '<span class="project-see-label">Voir plus...</span>'
            : `<div class="project-meta">
                    <h3 class="project-title">${project.title}<span class="project-arrow" aria-hidden="true"></span></h3>
                    <p class="project-category">${project.category}</p>
                </div>`;

        return `<article class="${cardClass}" tabindex="0" style="--project-rotation: ${rotation}deg; --project-hover-rotation: ${hoverRotation}deg;">
                    <div class="project-preview">
                        <img src="${project.image}" alt="${project.seeMore ? '' : project.title}">
                        ${project.seeMore ? meta : ''}
                    </div>
                    ${project.seeMore ? '' : meta}
                </article>`;
    }).join('');
}

renderProjects();

function setupProjectCursor() {
    if (!window.matchMedia('(pointer: fine)').matches) {
        return;
    }

    document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
            projectCursor.classList.add('is-visible');
        });

        card.addEventListener('mousemove', (event) => {
            projectCursor.style.left = `${event.clientX}px`;
            projectCursor.style.top = `${event.clientY}px`;
        });

        card.addEventListener('mouseleave', () => {
            projectCursor.classList.remove('is-visible');
        });

        card.addEventListener('focus', () => {
            projectCursor.classList.remove('is-visible');
        });
    });
}

setupProjectCursor();

function applyTheme(theme) {
    const isDark = theme === 'dark';

    document.documentElement.dataset.theme = theme;
    themeIcon.src = isDark ? 'assets/images/dark.svg' : 'assets/images/light.svg';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Passer en mode clair' : 'Passer en mode sombre');
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
applyTheme(savedTheme);

burger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
});

themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

    themeToggle.classList.remove('is-animating');
    void themeToggle.offsetWidth;
    themeToggle.classList.add('is-animating');
    applyTheme(nextTheme);
});

themeToggle.addEventListener('animationend', () => {
    themeToggle.classList.remove('is-animating');
});

document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    });
});

applyLanguage(currentLanguage);
