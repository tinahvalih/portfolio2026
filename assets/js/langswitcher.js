const copy = {
    fr: {
        nav_about: 'À propos',
        nav_projects: 'Mes réalisations',
        nav_skills: 'Expertises',
        hero_intro: 'Hello, je suis',
        hero_line_one: 'Je design vos',
        hero_gradient_word: 'interfaces',
        hero_line_two_before: "et j'anime",
        hero_line_two_after: 'vos idées',
        hero_copy: "Concepteur UI/UX et graphique passionné, avec 5+ ans d'expérience en visuels sociaux, interfaces web, 3D et montage vidéo. Alliant précision technique et créativité pour des solutions sur mesure",
        cv_label: 'Télécharger mon CV',
        projects_title_one: 'Quelques',
        projects_title_two: 'sélection',
        projects_title_three: 'de projets',
        projects_title_accent: 'pixel-perfect',
        projects_see_more: 'Voir plus...',
        project_cursor: 'Voir le projet',
        awards_title_one: 'Distinctions',
        awards_title_two: '& prix',
        footer_location: 'Paris, France, Terre',
        footer_legal: 'Mentions Légales',
        legal_close: 'Fermer'
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
        cv_label: 'Download my resume',
        projects_title_one: 'Selected',
        projects_title_two: 'project',
        projects_title_three: 'highlights',
        projects_title_accent: 'pixel-perfect',
        projects_see_more: 'See more...',
        project_cursor: 'View project',
        awards_title_one: 'Awards',
        awards_title_two: '& prizes',
        footer_location: 'Paris, France, Earth',
        footer_legal: 'Legal Notice',
        legal_close: 'Close'
    }
};

let currentLanguage = localStorage.getItem('language') === 'en' ? 'en' : 'fr';

const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('img');
const projectsList = document.getElementById('projects-list');
const awardsList = document.getElementById('awards-list');
const projectCursor = document.getElementById('project-cursor');
const openLegalButton = document.getElementById('open-legal');
const legalModal = document.getElementById('legal-modal');
const legalDialog = legalModal?.querySelector('.legal-dialog');
const legalContent = document.getElementById('legal-content');
const legalCloseButton = legalModal?.querySelector('.legal-close');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let lenis = null;

const projects = [
    {
        title: 'EmitVerse',
        category: {
            fr: '3D, Jeu vidéo, Web design, Développement',
            en: '3D, Video Game, Web design, Development'
        },
        image: 'assets/images/projects/emitverse.png',
        video: 'assets/video/EMIT video 3d_Rewrap.mp4'
    },
    {
        title: 'RomeExchange',
        category: {
            fr: 'UI & UX, Branding, Web design, Développement',
            en: 'UI & UX, Branding, Web design, Development'
        },
        image: 'assets/images/projects/romeExchange.png'
    },
    {
        title: 'Bouclette.co',
        category: {
            fr: 'UI & UX, Branding, Web design, Développement',
            en: 'UI & UX, Branding, Web design, Development'
        },
        image: 'assets/images/projects/boucletteco.png'
    },
    {
        title: 'Abandonned CashPoint',
        category: {
            fr: '3D, Texturing, Prêt pour jeu vidéo',
            en: '3D, Texturing, Video Game Ready'
        },
        image: 'assets/images/projects/cashpoint.png'
    },
    {
        title: 'LOVA',
        category: {
            fr: '3D, Texturing, Assets prêts pour jeu vidéo',
            en: '3D, Texturing, Video Game Ready Assets'
        },
        image: 'assets/images/projects/lovagame.png'
    },
    {
        title: 'meko',
        category: {
            fr: 'Branding, Logo',
            en: 'Branding, Logo'
        },
        image: 'assets/images/projects/mekobranding.png'
    },
    {
        image: 'assets/images/projects/See_more.png',
        seeMore: true
    }
];

const awards = [
    {
        date: '2025',
        name: {
            fr: 'Major des Majors',
            en: 'Top of the Class'
        },
        event: {
            fr: 'Remise de Diplôme (Promotion ASCENDA)',
            en: 'Graduation Ceremony (ASCENDA Class)'
        },
        location: {
            fr: 'EMIT Fianarantsoa (ASCENDA)',
            en: 'EMIT Fianarantsoa (ASCENDA)'
        },
        image: 'assets/images/awards/1-major.webp'
    },
    {
        date: '2025',
        name: {
            fr: '1ère place',
            en: '1st place'
        },
        event: {
            fr: 'GameJam Inter-Universitaire',
            en: 'Inter-University Game Jam'
        },
        location: {
            fr: 'Madagascar',
            en: 'Madagascar'
        },
        image: 'assets/images/awards/2-gamejam.webp'
    },
    {
        date: '2024',
        name: {
            fr: 'Meilleur Projet',
            en: 'Best Project'
        },
        event: {
            fr: "25e Anniversaire de l'EMIT",
            en: '25th Anniversary of EMIT'
        },
        location: {
            fr: 'EMIT Fianarantsoa',
            en: 'EMIT Fianarantsoa'
        },
        image: 'assets/images/awards/3-bestproject.webp'
    },
    {
        date: '2023',
        name: {
            fr: '2e place',
            en: '2nd place'
        },
        event: {
            fr: 'HACK-IT (HACKATHON)',
            en: 'HACK-IT (HACKATHON)'
        },
        location: {
            fr: 'Fianarantsoa',
            en: 'Fianarantsoa'
        },
        image: 'assets/images/awards/4-hackIT.webp'
    },
    {
        date: '2023',
        name: {
            fr: '1ère place',
            en: '1st place'
        },
        event: {
            fr: 'HACKATHON INTER-UNIVERSITAIRE',
            en: 'INTER-UNIVERSITY HACKATHON'
        },
        location: {
            fr: 'Madagascar',
            en: 'Madagascar'
        },
        image: 'assets/images/awards/5-hackathon.webp'
    },
    {
        date: '2022',
        name: {
            fr: '1ère place',
            en: '1st place'
        },
        event: {
            fr: 'CONCOURS UI & UX',
            en: 'UI & UX CONTEST'
        },
        location: {
            fr: 'EMIT Fianarantsoa',
            en: 'EMIT Fianarantsoa'
        },
        image: 'assets/images/awards/6-uxui.webp'
    }
];

const legalNotices = {
    fr: `
        <h2 id="legal-title">Mentions légales</h2>
        <p><strong>Dernière mise à jour :</strong> 29 juin 2026</p>
        <p>Le présent site, accessible à l'adresse suivante : <a href="https://tinahvaliha.com/portfolio2026" target="_blank" rel="noreferrer">https://tinahvaliha.com/portfolio2026</a>, est un portfolio personnel réalisé dans le cadre d'un projet d'intégration web.</p>
        <h3>Éditeur du site</h3>
        <p>Le site est édité par <strong>SOLONOMENANAHARY Tinah Valiha</strong>, également connu sous le nom de <strong>thekrakenguy</strong>.</p>
        <p>Statut : étudiant alternant<br>Localisation : Paris, France<br>Adresse e-mail : <a href="mailto:tinahvalih@gmail.com">tinahvalih@gmail.com</a><br>Téléphone : 07 76 49 42 24</p>
        <h3>Directeur de la publication</h3>
        <p>Le directeur de la publication est <strong>Tinah Valiha</strong>.</p>
        <h3>Hébergement</h3>
        <p>Le site est hébergé via <strong>GitHub Pages</strong>, service proposé par GitHub, Inc.</p>
        <p>GitHub, Inc.<br>88 Colin P. Kelly Jr. Street<br>San Francisco, CA 94107<br>United States<br>Site web : <a href="https://github.com" target="_blank" rel="noreferrer">https://github.com</a></p>
        <p>Le nom de domaine <strong>tinahvaliha.com</strong> est géré via <strong>Hostinger</strong>. Le site est accessible depuis l'URL GitHub Pages suivante : <a href="https://tinahvalih.github.io/portfolio2026/" target="_blank" rel="noreferrer">https://tinahvalih.github.io/portfolio2026/</a> et redirigé vers <a href="https://tinahvaliha.com/portfolio2026" target="_blank" rel="noreferrer">https://tinahvaliha.com/portfolio2026</a>.</p>
        <h3>Objet du site</h3>
        <p>Ce site a pour objectif de présenter le profil, les compétences, les réalisations et les projets de l'éditeur dans un contexte professionnel, universitaire et personnel.</p>
        <p>Il s'agit d'un portfolio non marchand. Aucune vente en ligne, aucun paiement et aucun abonnement ne sont proposés sur ce site.</p>
        <h3>Propriété intellectuelle</h3>
        <p>L'ensemble du contenu présent sur ce site, sauf mention contraire, est protégé par le droit de la propriété intellectuelle.</p>
        <p>Les textes, compositions graphiques, interfaces, éléments visuels, animations, intégrations web et choix de présentation ont été réalisés ou adaptés par le propriétaire du site dans le cadre de ce portfolio.</p>
        <p>Les projets personnels présentés sur ce portfolio appartiennent au propriétaire du site. Les projets réalisés pour des marques, entreprises, associations, clients ou partenaires restent la propriété de leurs titulaires respectifs. Leur présentation sur ce site a uniquement pour objectif d'illustrer le parcours, les compétences et les expériences professionnelles de l'auteur.</p>
        <p>Toute reproduction, modification, diffusion ou exploitation totale ou partielle des contenus du site, sans autorisation préalable, est interdite.</p>
        <h3>Images, vidéos et médias</h3>
        <p>Les images, captures, vidéos, maquettes, animations et autres éléments multimédias intégrés au site sont utilisés dans le cadre de la présentation du portfolio.</p>
        <p>La vidéo intégrée au site est une vidéo locale appartenant au propriétaire du site. Elle est utilisée comme élément de démonstration dans le cadre du projet.</p>
        <p>Lorsque certains contenus concernent des projets réalisés pour des marques, entreprises ou structures externes, les droits associés restent attachés à leurs propriétaires respectifs.</p>
        <h3>Inspirations, ressources créatives et crédits techniques</h3>
        <p>Certaines animations, transitions et interactions du site ont été inspirées par des références observées sur des plateformes de design et de prototypage telles que :</p>
        <ul>
            <li>Framer : <a href="https://www.framer.com" target="_blank" rel="noreferrer">https://www.framer.com</a></li>
            <li>Dribbble : <a href="https://dribbble.com" target="_blank" rel="noreferrer">https://dribbble.com</a></li>
            <li>GSAP Docs & Learning : <a href="https://gsap.com/docs/v3/" target="_blank" rel="noreferrer">https://gsap.com/docs/v3/</a></li>
        </ul>
        <p>Ces inspirations ont été retravaillées, adaptées et intégrées manuellement en HTML, CSS et JavaScript natif dans le cadre du projet. Le site ne reprend pas directement une interface complète issue de ces plateformes : les références ont servi de base d'observation, d'apprentissage et d'inspiration pour concevoir des interactions adaptées à l'identité visuelle du portfolio.</p>
        <p>Le site utilise également <strong>Lenis Smooth Scroll</strong>, une bibliothèque JavaScript open source permettant d'améliorer la fluidité du défilement : <a href="https://github.com/darkroomengineering/lenis" target="_blank" rel="noreferrer">https://github.com/darkroomengineering/lenis</a>.</p>
        <h3>Utilisation de l'intelligence artificielle</h3>
        <p>Certaines parties du projet ont bénéficié d'une assistance ponctuelle par intelligence artificielle, notamment pour la reformulation de contenus, la structuration de certaines sections et l'aide à la correction de code.</p>
        <p>L'ensemble du site a été adapté, vérifié et intégré manuellement par l'auteur.</p>
        <p>Lorsque du code a été produit ou fortement influencé par un échange avec une IA générative, un commentaire est ajouté dans le code source afin de signaler l'assistance utilisée, conformément aux consignes du projet.</p>
        <h3>Données personnelles</h3>
        <p>Ce site ne contient pas de formulaire de contact et ne collecte pas directement de données personnelles via un champ de saisie.</p>
        <p>Les seuls moyens de contact proposés sont un lien e-mail de type mailto et des liens vers des profils externes : LinkedIn, Facebook, Instagram et Dribbble.</p>
        <p>Lorsqu'un visiteur clique sur l'un de ces liens externes, il quitte le présent site. Les plateformes concernées peuvent appliquer leurs propres politiques de confidentialité, de cookies et de traitement des données personnelles.</p>
        <p>L'éditeur du site n'est pas responsable du traitement des données effectué par ces plateformes externes.</p>
        <h3>Cookies et mesure d'audience</h3>
        <p>À ce jour, ce site n'utilise pas de cookies de suivi, d'outil de mesure d'audience, de publicité personnalisée ou de système d'analyse comportementale.</p>
        <p>Si des outils de statistiques, de suivi ou des cookies venaient à être ajoutés ultérieurement, cette page serait mise à jour afin d'informer les visiteurs de leur finalité et, si nécessaire, recueillir leur consentement.</p>
        <h3>Liens externes</h3>
        <p>Le site peut contenir des liens vers des plateformes externes, notamment LinkedIn, Facebook, Instagram, Dribbble, GitHub ou d'autres sites liés aux projets présentés.</p>
        <p>L'éditeur du site ne peut pas être tenu responsable du contenu, du fonctionnement ou des pratiques de confidentialité de ces sites tiers.</p>
        <h3>Responsabilité</h3>
        <p>L'éditeur s'efforce de fournir des informations exactes et à jour sur ce portfolio. Toutefois, des erreurs, oublis ou modifications peuvent survenir.</p>
        <p>Le site a une vocation de présentation personnelle et professionnelle. Les informations qui y figurent ne constituent pas un engagement contractuel.</p>
        <h3>Contact</h3>
        <p>Pour toute question concernant le site, ses contenus ou les présentes mentions légales, vous pouvez contacter l'éditeur à l'adresse suivante : <a href="mailto:tinahvalih@gmail.com">tinahvalih@gmail.com</a>.</p>
    `,
    en: `
        <h2 id="legal-title">Legal Notice</h2>
        <p><strong>Last updated:</strong> June 29, 2026</p>
        <p>This website, available at <a href="https://tinahvaliha.com/portfolio2026" target="_blank" rel="noreferrer">https://tinahvaliha.com/portfolio2026</a>, is a personal portfolio created as part of a web integration project.</p>
        <h3>Website Publisher</h3>
        <p>The website is published by <strong>SOLONOMENANAHARY Tinah Valiha</strong>, also known as <strong>thekrakenguy</strong>.</p>
        <p>Status: work-study student<br>Location: Paris, France<br>Email: <a href="mailto:tinahvalih@gmail.com">tinahvalih@gmail.com</a><br>Phone: 07 76 49 42 24</p>
        <h3>Publication Director</h3>
        <p>The publication director is <strong>Tinah Valiha</strong>.</p>
        <h3>Hosting</h3>
        <p>The website is hosted through <strong>GitHub Pages</strong>, a service provided by GitHub, Inc.</p>
        <p>GitHub, Inc.<br>88 Colin P. Kelly Jr. Street<br>San Francisco, CA 94107<br>United States<br>Website: <a href="https://github.com" target="_blank" rel="noreferrer">https://github.com</a></p>
        <p>The domain name <strong>tinahvaliha.com</strong> is managed through <strong>Hostinger</strong>. The website is available from <a href="https://tinahvalih.github.io/portfolio2026/" target="_blank" rel="noreferrer">https://tinahvalih.github.io/portfolio2026/</a> and redirected to <a href="https://tinahvaliha.com/portfolio2026" target="_blank" rel="noreferrer">https://tinahvaliha.com/portfolio2026</a>.</p>
        <h3>Purpose</h3>
        <p>This website presents the publisher's profile, skills, work, and projects in a professional, academic, and personal context.</p>
        <p>It is a non-commercial portfolio. No online sales, payments, or subscriptions are offered on this website.</p>
        <h3>Intellectual Property</h3>
        <p>All content on this website, unless otherwise stated, is protected by intellectual property law.</p>
        <p>Texts, graphic compositions, interfaces, visual elements, animations, web integrations, and presentation choices were created or adapted by the website owner for this portfolio.</p>
        <p>Personal projects shown on this portfolio belong to the website owner. Projects created for brands, companies, associations, clients, or partners remain the property of their respective owners and are shown only to illustrate the author's background, skills, and professional experience.</p>
        <p>Any reproduction, modification, distribution, or use of all or part of the website content without prior authorization is prohibited.</p>
        <h3>Images, Videos, and Media</h3>
        <p>Images, screenshots, videos, mockups, animations, and other multimedia elements are used to present the portfolio.</p>
        <p>The video included on the website is a local video owned by the website owner and used as a demonstration element for the project.</p>
        <p>When content relates to projects created for external brands, companies, or organizations, the associated rights remain attached to their respective owners.</p>
        <h3>Inspirations, Creative Resources, and Technical Credits</h3>
        <p>Some animations, transitions, and interactions were inspired by references observed on design and prototyping platforms such as:</p>
        <ul>
            <li>Framer: <a href="https://www.framer.com" target="_blank" rel="noreferrer">https://www.framer.com</a></li>
            <li>Dribbble: <a href="https://dribbble.com" target="_blank" rel="noreferrer">https://dribbble.com</a></li>
            <li>GSAP Docs & Learning: <a href="https://gsap.com/docs/v3/" target="_blank" rel="noreferrer">https://gsap.com/docs/v3/</a></li>
        </ul>
        <p>These inspirations were reworked, adapted, and integrated manually in native HTML, CSS, and JavaScript. The website does not directly copy a complete interface from these platforms; they were used for observation, learning, and inspiration.</p>
        <p>The website also uses <strong>Lenis Smooth Scroll</strong>, an open source JavaScript library that improves scrolling fluidity: <a href="https://github.com/darkroomengineering/lenis" target="_blank" rel="noreferrer">https://github.com/darkroomengineering/lenis</a>.</p>
        <h3>Use of Artificial Intelligence</h3>
        <p>Some parts of the project received occasional assistance from artificial intelligence, especially for content rewriting, section structure, and code correction support.</p>
        <p>The whole website was adapted, reviewed, and integrated manually by the author.</p>
        <p>When code was produced or strongly influenced by an exchange with generative AI, a source-code comment is added to indicate the assistance used, according to the project instructions.</p>
        <h3>Personal Data</h3>
        <p>This website does not include a contact form and does not directly collect personal data through input fields.</p>
        <p>The only contact methods are an email link and links to external profiles: LinkedIn, Facebook, Instagram, and Dribbble.</p>
        <p>When a visitor clicks one of these external links, they leave this website. The relevant platforms may apply their own privacy, cookie, and data-processing policies.</p>
        <p>The website publisher is not responsible for data processing carried out by these external platforms.</p>
        <h3>Cookies and Analytics</h3>
        <p>At this time, this website does not use tracking cookies, analytics tools, personalized advertising, or behavioral analysis systems.</p>
        <p>If analytics, tracking tools, or cookies are added later, this notice will be updated to inform visitors of their purpose and, if necessary, collect consent.</p>
        <h3>External Links</h3>
        <p>The website may contain links to external platforms, including LinkedIn, Facebook, Instagram, Dribbble, GitHub, or other websites related to the projects shown.</p>
        <p>The publisher cannot be held responsible for the content, operation, or privacy practices of third-party websites.</p>
        <h3>Liability</h3>
        <p>The publisher makes efforts to provide accurate and up-to-date information on this portfolio. However, errors, omissions, or changes may occur.</p>
        <p>The website is intended for personal and professional presentation. The information shown does not constitute a contractual commitment.</p>
        <h3>Contact</h3>
        <p>For any question about the website, its content, or this legal notice, contact the publisher at <a href="mailto:tinahvalih@gmail.com">tinahvalih@gmail.com</a>.</p>
    `
};

function translateValue(value) {
    if (typeof value === 'string') {
        return value;
    }

    return value[currentLanguage] || value.fr || value.en || '';
}

function applyLanguage(language) {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        if (copy[language][key]) {
            element.textContent = copy[language][key];
        }
    });

    document.documentElement.lang = language;
    document.getElementById('current-lang').textContent = language.toUpperCase();

    if (projectCursor) {
        projectCursor.textContent = copy[language].project_cursor;
    }

    if (legalCloseButton) {
        legalCloseButton.setAttribute('aria-label', copy[language].legal_close);
    }

    renderDynamicContent();
    renderLegalContent(language);
}

document.getElementById('switcher').addEventListener('click', () => {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    applyLanguage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
});

function renderProjects() {
    const rotations = [-1.8, 2, 0];

    projectsList.innerHTML = projects.map((project, index) => {
        const rotation = rotations[index % rotations.length];
        const hoverRotation = rotation === 0 ? rotations[(index + 1) % 2] : 0;
        const cardClass = project.seeMore ? 'project-card project-card--see-more' : 'project-card';
        const video = project.video
            ? `<video class="project-video" src="${project.video}" muted loop playsinline preload="metadata"></video>`
            : '';
        const meta = project.seeMore
            ? `<span class="project-see-label">${copy[currentLanguage].projects_see_more}</span>`
            : `<div class="project-meta">
                    <h3 class="project-title">${project.title}<span class="project-arrow" aria-hidden="true"></span></h3>
                    <p class="project-category">${translateValue(project.category)}</p>
                </div>`;

        return `<article class="${cardClass}" tabindex="0" style="--project-rotation: ${rotation}deg; --project-hover-rotation: ${hoverRotation}deg;">
                    <div class="project-preview">
                        <img src="${project.image}" alt="${project.seeMore ? '' : project.title}">
                        ${video}
                        ${project.seeMore ? meta : ''}
                    </div>
                    ${project.seeMore ? '' : meta}
                </article>`;
    }).join('');
}

function setupProjectVideos() {
    document.querySelectorAll('.project-card').forEach((card) => {
        const video = card.querySelector('.project-video');

        if (!video) {
            return;
        }

        const playVideo = () => {
            video.currentTime = 0;
            video.play().catch(() => {});
        };

        const pauseVideo = () => {
            video.pause();
            video.currentTime = 0;
        };

        card.addEventListener('mouseenter', playVideo);
        card.addEventListener('focus', playVideo);
        card.addEventListener('mouseleave', pauseVideo);
        card.addEventListener('blur', pauseVideo);
    });
}

function renderAwards() {
    awardsList.innerHTML = awards.map((award) => {
        const name = translateValue(award.name);
        const event = translateValue(award.event);
        const location = translateValue(award.location);

        return `<article class="award-card" tabindex="0">
            <div class="award-main">
                <h3 class="award-name">${name}</h3>
                <p class="award-event">${event}</p>
            </div>

            <figure class="award-media">
                <img src="${award.image}" alt="${name}" onerror="this.hidden = true">
            </figure>

            <div class="award-details">
                <p class="award-date">${award.date}</p>
                <p class="award-location">
                    <img class="location-icon" src="assets/images/location_icon.svg" alt="" aria-hidden="true">
                    <span>${location}</span>
                </p>
            </div>
        </article>`;
    }).join('');
}

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

function setupAwardHoverReaction() {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion.matches) {
        return;
    }

    document.querySelectorAll('.award-card').forEach((card) => {
        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--award-cursor-x', `${x.toFixed(2)}%`);
            card.style.setProperty('--award-cursor-y', `${y.toFixed(2)}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--award-cursor-x', '50%');
            card.style.setProperty('--award-cursor-y', '50%');
        });
    });
}

function renderDynamicContent() {
    renderProjects();
    setupProjectVideos();
    setupProjectCursor();
    renderAwards();
    setupAwardHoverReaction();
}

function setupSmoothScroll() {
    if (!window.Lenis || prefersReducedMotion.matches) {
        return;
    }

    lenis = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();
            lenis.scrollTo(target, { offset: 0 });
        });
    });
}

function renderLegalContent(language = currentLanguage) {
    if (!legalContent) {
        return;
    }

    legalContent.innerHTML = legalNotices[language] || legalNotices.fr;
}

function openLegalModal() {
    if (!legalModal || !legalDialog) {
        return;
    }

    renderLegalContent(currentLanguage);
    legalModal.classList.add('open');
    legalModal.setAttribute('aria-hidden', 'false');
    lenis?.stop?.();
    legalDialog.focus();
}

function closeLegalModal() {
    if (!legalModal) {
        return;
    }

    legalModal.classList.remove('open');
    legalModal.setAttribute('aria-hidden', 'true');
    lenis?.start?.();
    openLegalButton?.focus();
}

function applyTheme(theme) {
    const isDark = theme === 'dark';

    document.documentElement.dataset.theme = theme;
    themeIcon.src = isDark ? 'assets/images/dark.svg' : 'assets/images/light.svg';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Passer en mode clair' : 'Passer en mode sombre');
    localStorage.setItem('theme', theme);
}

setupSmoothScroll();

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

openLegalButton?.addEventListener('click', openLegalModal);

legalModal?.querySelectorAll('[data-close-legal]').forEach((element) => {
    element.addEventListener('click', closeLegalModal);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && legalModal?.classList.contains('open')) {
        closeLegalModal();
    }
});

applyLanguage(currentLanguage);
