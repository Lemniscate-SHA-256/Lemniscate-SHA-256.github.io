// app.js
const projects = [
    {
        title: "Dissect",
        category: ["Algorithm", "Visualization", "Flow-charting", "Education"],
        description: "An educational tool for visualizing algorithms and flowcharts.",
        tech: ["Python", "JavaScript", "D3.js"],
        image: "project1.jpg",
        url: "#",
        year: "2025"
    },
    // Add more projects

    {   title: "Robust Lambda", 
        category: ["Lambda Calculus", "Programming Language", "Functional Programming", "Education"],
        description: "A simple programming language based on Lambda Calculus.",
        tech: ["Python", "tree-sitter"],
        image: "project2.jpg",
        url: "#",
        year: "2025"
    },



// Fix misplaced dataset assignment
function renderProjects() {
    const grid = document.querySelector('.work-grid');
    
    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = `work-card`;
        // Add data-category attribute here
        card.dataset.category = project.category.join(' ');
        card.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">
                            <img src="${project.image}" class="work-image" alt="${project.title}">
                            <div class="card-overlay">
                                <h3>${project.title}</h3>
                                <p>View Details →</p>
                            </div>
                        </div>
                        <div class="card-back">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <button class="close-details">×</button>
                        </div>
                    </div>
                `;
        grid.appendChild(card);
    });
};


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
            const categories = card.dataset.category?.split(' ') || [];
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
            <img src="project.jpg" 
                loading="lazy" 
                alt="Project Name"
                width="600"
                height="400" src="${card.querySelector('img').src}" class="modal-image">
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

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close menu on click outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Add this to app.js
document.querySelectorAll('a').forEach(link => {
    if (link.href.includes(window.location.origin)) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const overlay = document.createElement('div');
            overlay.className = 'transition-overlay active';
            document.body.appendChild(overlay);
            
            setTimeout(() => {
                window.location.href = link.href;
            }, 600);
        });
    }
});

// Add to mobile menu links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', renderProjects);