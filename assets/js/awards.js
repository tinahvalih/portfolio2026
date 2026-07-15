function renderAwards() {
    Portfolio.dom.awardsList.innerHTML = Portfolio.awards.map((award) => {
        const name = Portfolio.translateValue(award.name);
        const event = Portfolio.translateValue(award.event);
        const location = Portfolio.translateValue(award.location);

        return `<article class="award-card" tabindex="0">
            <span class="award-divider award-divider--top" aria-hidden="true"></span>
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
            <span class="award-divider award-divider--bottom" aria-hidden="true"></span>
        </article>`;
    }).join('');
}

function setupAwardHoverReaction() {
    if (!window.matchMedia('(pointer: fine)').matches || Portfolio.prefersReducedMotion.matches) {
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

Portfolio.renderAwards = renderAwards;
Portfolio.setupAwardHoverReaction = setupAwardHoverReaction;
