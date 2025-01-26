document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    
    fetch(`/content/projects/${projectId}.md`)
        .then(response => response.text())
        .then(markdown => {
            const html = marked.parse(markdown);
            document.querySelector('.case-study').innerHTML = html;
        });
});