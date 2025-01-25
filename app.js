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

// Initialize
document.addEventListener('DOMContentLoaded', renderProjects);