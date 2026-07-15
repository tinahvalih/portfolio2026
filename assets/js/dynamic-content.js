function renderDynamicContent() {
    Portfolio.renderProjects();
    Portfolio.setupProjectVideos();
    Portfolio.setupProjectCursor();
    Portfolio.renderAwards();
    Portfolio.setupAwardHoverReaction();
}


Portfolio.renderDynamicContent = renderDynamicContent;
