function renderLegalContent(language = Portfolio.currentLanguage) {
    if (!Portfolio.dom.legalContent) {
        return;
    }

    Portfolio.dom.legalContent.innerHTML = Portfolio.legalNotices[language] || Portfolio.legalNotices.fr;
}

function openLegalModal() {
    if (!Portfolio.dom.legalModal || !Portfolio.dom.legalDialog) {
        return;
    }

    renderLegalContent(Portfolio.currentLanguage);
    Portfolio.dom.legalModal.classList.add('open');
    Portfolio.dom.legalModal.setAttribute('aria-hidden', 'false');
    Portfolio.lenis?.stop?.();
    Portfolio.dom.legalDialog.focus();
}

function closeLegalModal() {
    if (!Portfolio.dom.legalModal) {
        return;
    }

    Portfolio.dom.legalModal.classList.remove('open');
    Portfolio.dom.legalModal.setAttribute('aria-hidden', 'true');
    Portfolio.lenis?.start?.();
    Portfolio.dom.openLegalButton?.focus();
}


Portfolio.renderLegalContent = renderLegalContent;
Portfolio.openLegalModal = openLegalModal;
Portfolio.closeLegalModal = closeLegalModal;
