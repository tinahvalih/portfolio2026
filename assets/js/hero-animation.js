function splitTextNode(node, mode, indexRef, options = {}) {
    const text = node.textContent;
    const fragment = document.createDocumentFragment();
    const parts = mode === 'words' ? text.split(/(\s+)/) : Array.from(text);

    parts.forEach((part) => {
        if (!part) {
            return;
        }

        if (/^\s+$/.test(part)) {
            if (options.wrapSpaces) {
                const space = document.createElement('span');
                space.className = options.spaceClass || 'hero-space';
                space.textContent = '\u00A0'.repeat(part.length);
                fragment.appendChild(space);
                return;
            }

            fragment.appendChild(document.createTextNode(part));
            return;
        }

        const span = document.createElement('span');
        span.className = mode === 'words' ? 'hero-word' : 'hero-letter';
        if (options.noEntrance) {
            span.classList.add('hero-text-static');
        }
        span.style.setProperty('--stagger', indexRef.value);
        span.textContent = part;
        indexRef.value += 1;
        fragment.appendChild(span);
    });

    node.replaceWith(fragment);
}

function splitElementText(element, mode, options = {}) {
    if (!element) {
        return;
    }

    const label = element.textContent.replace(/\s+/g, ' ').trim();
    const indexRef = { value: 0 };

    function splitNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.trim()) {
                splitTextNode(node, mode, indexRef, options);
            }
            return;
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        if (mode === 'chars' && node.classList.contains('gradient-word')) {
            node.classList.remove('hero-letter', 'hero-gradient-unit');
            node.classList.toggle('hero-text-static', Boolean(options.noEntrance));
            node.style.removeProperty('--stagger');
            if (!options.noEntrance) {
                void node.offsetWidth;
            }
            node.classList.add('hero-letter', 'hero-gradient-unit');
            node.style.setProperty('--stagger', indexRef.value);
            indexRef.value += 1;
            return;
        }

        Array.from(node.childNodes).forEach(splitNode);
    }

    element.setAttribute('aria-label', label);
    Array.from(element.childNodes).forEach(splitNode);
}

function prepareCvButtonHover() {
    const label = document.querySelector('.cv-button [data-i18n="cv_label"]');

    if (!label) {
        return;
    }

    const text = label.getAttribute('aria-label') || label.textContent;
    label.querySelector('.cv-hover-text')?.remove();

    const hoverText = document.createElement('span');
    hoverText.className = 'cv-hover-text';
    hoverText.setAttribute('aria-hidden', 'true');

    Array.from(text).forEach((char, index) => {
        if (/\s/.test(char)) {
            const space = document.createElement('span');
            space.className = 'cv-hover-space';
            space.textContent = '\u00A0';
            hoverText.appendChild(space);
            return;
        }

        const span = document.createElement('span');
        span.className = 'cv-hover-letter';
        span.style.setProperty('--stagger', index);
        span.textContent = char;
        hoverText.appendChild(span);
    });

    label.appendChild(hoverText);
}

function appendAnimatedCharacters(parent, text, letterClass, spaceClass) {
    Array.from(text).forEach((char, index) => {
        const span = document.createElement('span');
        span.className = /\s/.test(char) ? spaceClass : letterClass;
        span.textContent = /\s/.test(char) ? '\u00A0' : char;

        if (!/\s/.test(char)) {
            span.style.setProperty('--stagger', index);
        }

        parent.appendChild(span);
    });
}

function prepareNavLinkHover() {
    document.querySelectorAll('.nav-link').forEach((link) => {
        const text = link.textContent.replace(/\s+/g, ' ').trim();

        if (!text) {
            return;
        }

        link.textContent = '';
        link.setAttribute('aria-label', text);

        const visibleText = document.createElement('span');
        visibleText.className = 'nav-link-text';

        const hoverText = document.createElement('span');
        hoverText.className = 'nav-hover-text';
        hoverText.setAttribute('aria-hidden', 'true');

        appendAnimatedCharacters(visibleText, text, 'nav-letter', 'nav-space');
        appendAnimatedCharacters(hoverText, text, 'nav-hover-letter', 'nav-hover-space');

        link.append(visibleText, hoverText);
    });
}

function releaseCvButtonEntrance() {
    const label = document.querySelector('.cv-button [data-i18n="cv_label"]');

    if (!label) {
        return;
    }

    label.querySelectorAll('.hero-letter').forEach((letter) => {
        if (letter.classList.contains('hero-text-static')) {
            return;
        }

        letter.addEventListener('animationend', () => {
            letter.classList.add('hero-text-static');
        }, { once: true });
    });
}

function animateHeroText(options = {}) {
    prepareNavLinkHover();
    splitElementText(document.getElementById('hero-title'), 'chars', options);
    splitElementText(document.querySelector('.hero-skill-line'), 'chars', options);
    splitElementText(document.querySelector('.hero-eyebrow'), 'chars', options);
    splitElementText(document.querySelector('.hero-copy'), 'words', options);
    splitElementText(document.querySelector('.cv-button [data-i18n="cv_label"]'), 'chars', {
        wrapSpaces: true,
        spaceClass: 'cv-label-space',
        noEntrance: Boolean(options.noEntrance)
    });
    prepareCvButtonHover();
    releaseCvButtonEntrance();
}

Portfolio.animateHeroText = animateHeroText;
Portfolio.prepareNavLinkHover = prepareNavLinkHover;
