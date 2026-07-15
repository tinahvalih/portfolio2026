function setupSmoothScroll() {
    if (!window.Lenis || Portfolio.prefersReducedMotion.matches) {
        return;
    }

    Portfolio.lenis = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2
    });

    function raf(time) {
        Portfolio.lenis.raf(time);
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
            Portfolio.lenis.scrollTo(target, { offset: 0 });
        });
    });
}


Portfolio.setupSmoothScroll = setupSmoothScroll;
