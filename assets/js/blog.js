// assets/js/blog.js
document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

async function fetchPosts() {
    const response = await fetch('/blog/_posts/post-index.json');
    const posts = await response.json();
    
    const container = document.getElementById('postContainer');
    
    posts.forEach(post => {
        const postCard = document.createElement('article');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <img src="${post.banner}" class="post-banner">
            <div class="post-meta">
                <time>${post.date}</time>
                <span class="post-branch">${post.branch}</span>
            </div>
            <h2>${post.title}</h2>
            <div class="post-tags">${post.tags.map(t => `<span>${t}</span>`).join('')}</div>
        `;
        container.appendChild(postCard);
    });
}