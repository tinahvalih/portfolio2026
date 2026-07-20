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

function unwrapWipeLines(element) {
    element?.querySelectorAll('.hero-wipe-line').forEach((line) => {
        line.replaceWith(...Array.from(line.childNodes));
    });
}

function applyWipeReveal(element, index, options = {}) {
    if (!element) {
        return;
    }

    element.classList.remove('hero-wipe-reveal', 'hero-wipe-static');
    element.style.setProperty('--wipe-index', index);

    if (options.noEntrance) {
        element.classList.add('hero-wipe-static');
        return;
    }

    void element.offsetWidth;
    element.classList.add('hero-wipe-reveal');
}

function applyWipeLineReveal(line, index, options = {}) {
    line.classList.remove('hero-wipe-reveal', 'hero-wipe-static');
    line.style.setProperty('--wipe-index', index);

    if (options.noEntrance) {
        line.classList.add('hero-wipe-static');
        return;
    }

    void line.offsetWidth;
    line.classList.add('hero-wipe-reveal');
}

function wrapHardBreakLines(element) {
    if (!element) {
        return [];
    }

    unwrapWipeLines(element);

    const nodes = Array.from(element.childNodes);
    const fragment = document.createDocumentFragment();
    const lines = [];
    let lineNodes = [];

    function flushLine() {
        const line = document.createElement('span');
        line.className = 'hero-wipe-line';
        lineNodes.forEach((node) => line.appendChild(node));
        fragment.appendChild(line);
        lines.push(line);
        lineNodes = [];
    }

    nodes.forEach((node) => {
        if (node.nodeName === 'BR') {
            flushLine();
            fragment.appendChild(node);
            return;
        }

        lineNodes.push(node);
    });

    if (lineNodes.length) {
        flushLine();
    }

    element.appendChild(fragment);
    return lines;
}

function extractFigmaBadgeFromLine(line) {
    const badge = line.querySelector('.figma-badge');

    if (!badge) {
        return;
    }

    line.parentNode.insertBefore(badge, line);
}

function wrapSkillLines(element) {
    if (!element) {
        return [];
    }

    unwrapWipeLines(element);

    const lines = [];
    const titleLine = element.querySelector('.hero-skill-title-line');

    if (titleLine) {
        const badge = titleLine.querySelector('.figma-badge');
        const line = document.createElement('span');
        line.className = 'hero-wipe-line';

        Array.from(titleLine.childNodes).forEach((node) => {
            if (node === badge || node.contains?.(badge)) {
                return;
            }

            line.appendChild(node);
        });

        if (badge) {
            titleLine.append(badge, line);
        } else {
            titleLine.appendChild(line);
        }

        lines.push(line);
    }

    Array.from(element.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
            return;
        }

        if (node.nodeName === 'BR' || node.classList?.contains('hero-skill-title-line')) {
            return;
        }

        const line = document.createElement('span');
        line.className = 'hero-wipe-line';

        while (node && node.parentNode === element && node.nodeName !== 'BR') {
            const next = node.nextSibling;
            line.appendChild(node);
            node = next;
        }

        if (line.childNodes.length) {
            element.appendChild(line);
            lines.push(line);
        }
    });

    return lines;
}

function wrapMeasuredTextLines(element) {
    if (!element) {
        return [];
    }

    const text = element.textContent.replace(/\s+/g, ' ').trim();

    if (!text) {
        return [];
    }

    element.textContent = '';

    const words = text.split(' ');
    const lines = [];
    let line = document.createElement('span');
    line.className = 'hero-wipe-line';
    element.appendChild(line);
    lines.push(line);

    words.forEach((word) => {
        const probe = line.textContent ? `${line.textContent} ${word}` : word;
        const previous = line.textContent;
        line.textContent = probe;
        line.style.whiteSpace = 'nowrap';

        if (line.scrollWidth > element.clientWidth && previous) {
            line.textContent = previous;
            element.appendChild(document.createTextNode(' '));
            line = document.createElement('span');
            line.className = 'hero-wipe-line';
            line.textContent = word;
            line.style.whiteSpace = 'nowrap';
            element.appendChild(line);
            lines.push(line);
        }
    });

    return lines;
}

function animateHeroText(options = {}) {
    prepareNavLinkHover();
    const revealLines = [];
    revealLines.push(...wrapHardBreakLines(document.querySelector('.hero-eyebrow')).map((line, offset) => ({ line, index: offset })));
    revealLines.push(...wrapHardBreakLines(document.getElementById('hero-title')).map((line, offset) => ({ line, index: 1 + offset })));
    revealLines.push(...wrapMeasuredTextLines(document.querySelector('.hero-copy')).map((line, offset) => ({ line, index: 3 + offset })));

    wrapSkillLines(document.querySelector('.hero-skill-line')).forEach((line, offset) => {
        revealLines.push({ line, index: 1 + offset });
    });

    revealLines.forEach(({ line, index }) => {
        applyWipeLineReveal(line, index, options);
    });
    splitElementText(document.querySelector('.cv-button [data-i18n="cv_label"]'), 'chars', {
        wrapSpaces: true,
        spaceClass: 'cv-label-space',
        noEntrance: true
    });
    applyWipeReveal(document.querySelector('.cv-button'), 6, options);
    prepareCvButtonHover();
}

Portfolio.animateHeroText = animateHeroText;
Portfolio.prepareNavLinkHover = prepareNavLinkHover;
