// app.js
const projects = [
    {
        title: "E-commerce Platform",
        category: ["web", "design"],
        image: "project1.jpg",
        url: "#",
        year: "2023"
    },
    // Add more projects
];

function renderProjects() {
    const grid = document.querySelector('.work-grid');
    
    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = `work-card`;
        card.innerHTML = `
            <img src="${project.image}" class="work-image" alt="${project.title}">
            <div class="work-content">
                <span class="year">${project.year}</span>
                <h2>${project.title}</h2>
                <div class="tags">
                    ${project.category.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => 
            btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.dataset.filter;
        
        // Filter projects
        const cards = document.querySelectorAll('.work-card');
        cards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.classList.add('animate-in');
            } else {
                card.style.display = 'none';
            }
        });
    });
});


document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h2').innerText;
        const content = `
            <h2>${title}</h2>
            <img src="${card.querySelector('img').src}" class="modal-image">
            <p>Detailed project description...</p>
        `;
        
        document.querySelector('.modal-content').innerHTML = content;
        document.querySelector('.modal-overlay').classList.add('active');
    });
});

document.querySelector('.modal-close').addEventListener('click', () => {
    document.querySelector('.modal-overlay').classList.remove('active');
});

// app.js
const darkModeToggle = document.createElement('button');
darkModeToggle.id = 'dark-mode-toggle';
document.body.prepend(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', 
        document.body.classList.contains('dark-mode'));
});

// Initialize from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Initialize
document.addEventListener('DOMContentLoaded', renderProjects);