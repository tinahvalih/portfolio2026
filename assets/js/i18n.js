function translateValue(value) {
    if (typeof value === 'string') {
        return value;
    }

    return value[Portfolio.currentLanguage] || value.fr || value.en || '';
}

function applyLanguage(language, options = {}) {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        if (Portfolio.copy[language][key]) {
            element.textContent = Portfolio.copy[language][key];
        }
    });

    document.documentElement.lang = language;
    document.getElementById('current-lang').textContent = language.toUpperCase();
    const languageIcon = document.getElementById('language-icon');
    if (languageIcon) {
        languageIcon.src = language === 'fr' ? 'assets/images/french.png' : 'assets/images/english.png';
    }

    if (Portfolio.dom.projectCursor) {
        Portfolio.dom.projectCursor.textContent = Portfolio.copy[language].project_cursor;
    }

    if (Portfolio.dom.legalCloseButton) {
        Portfolio.dom.legalCloseButton.setAttribute('aria-label', Portfolio.copy[language].legal_close);
    }

    document.querySelector('.cv-button [data-i18n="cv_label"]')?.setAttribute('data-hover-text', Portfolio.copy[language].cv_label);
    Portfolio.renderDynamicContent();
    Portfolio.renderLegalContent(language);
    Portfolio.animateHeroText?.({ noEntrance: options.noEntrance === true });
}

document.getElementById('switcher').addEventListener('click', () => {
    Portfolio.currentLanguage = Portfolio.currentLanguage === 'fr' ? 'en' : 'fr';
    applyLanguage(Portfolio.currentLanguage, { noEntrance: true });
    localStorage.setItem('language', Portfolio.currentLanguage);
});

Portfolio.translateValue = translateValue;
Portfolio.applyLanguage = applyLanguage;
