function renderProjects() {
    const rotations = [-1.8, 2, 0];

    Portfolio.dom.projectsList.innerHTML = Portfolio.projects.map((project, index) => {
        const rotation = rotations[index % rotations.length];
        const hoverRotation = rotation === 0 ? rotations[(index + 1) % 2] : 0;
        const cardClass = project.seeMore ? 'project-card project-card--see-more' : 'project-card';
        const video = project.video
            ? `<video class="project-video" src="${project.video}" muted loop playsinline preload="metadata"></video>`
            : '';
        const meta = project.seeMore
            ? `<span class="project-see-label">${Portfolio.copy[Portfolio.currentLanguage].projects_see_more}</span>`
            : `<div class="project-meta">
                    <h3 class="project-title">${project.title}<span class="project-arrow" aria-hidden="true"></span></h3>
                    <p class="project-category">${Portfolio.translateValue(project.category)}</p>
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

function setupProjectCursor() {
    if (!window.matchMedia('(pointer: fine)').matches) {
        return;
    }

    document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
            Portfolio.dom.projectCursor.classList.add('is-visible');
        });

        card.addEventListener('mousemove', (event) => {
            Portfolio.dom.projectCursor.style.left = `${event.clientX}px`;
            Portfolio.dom.projectCursor.style.top = `${event.clientY}px`;
        });

        card.addEventListener('mouseleave', () => {
            Portfolio.dom.projectCursor.classList.remove('is-visible');
        });

        card.addEventListener('focus', () => {
            Portfolio.dom.projectCursor.classList.remove('is-visible');
        });
    });
}

Portfolio.renderProjects = renderProjects;
Portfolio.setupProjectVideos = setupProjectVideos;
Portfolio.setupProjectCursor = setupProjectCursor;
