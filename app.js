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
];


// Fix misplaced dataset assignment
// Projects Images Displays
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
                            <img src="${project.image}" 
                                class="work-image lazy" 
                                alt="${project.title}
                                loading="lazy"
                                decoding="async"
                                width="600"
                                height="400"
                                srcset="${project.image} 1x, ${project.image} 2x"
                                sizes="(max-width: 600px) 100vw, 50vw">
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

// FIlter Logic
// Update app.js filtering logic
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        const cards = document.querySelectorAll('.work-card');
        
        cards.forEach(card => {
            const categories = card.dataset.category.toLowerCase().split(' ');
            const match = filter === 'all' || categories.includes(filter.toLowerCase());
            
            card.style.display = match ? 'grid' : 'none';
            card.style.animation = match ? 'fadeInUp 0.6s ease-out' : 'none';
        });
    });
});

// Modal System
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return; // Only on mobile
        
        const project = projects.find(p => 
            p.title === card.querySelector('h3').textContent
        );
        
        const content = `
            <h2>${project.title}</h2>
            <div class="modal-meta">
                <span class="year">${project.year}</span>
                <div class="tags">${project.tech.map(t => `<span>${t}</span>`).join('')}</div>
            </div>
            <img src="${project.image}" alt="${project.title}" class="modal-image">
            <p>${project.description}</p>
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

// Card Flip Functionality
document.querySelectorAll('.work-card').forEach(card => {
    const inner = card.querySelector('.card-inner');
    const closeBtn = card.querySelector('.close-details');
    
    inner.addEventListener('click', (e) => {
        if (!e.target.closest('.close-details')) {
            inner.classList.toggle('flipped');
        }
    });
    
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        inner.classList.remove('flipped');
    });
});

// View Transitions API
document.addEventListener('astro:page-load', () => {
    if (!document.startViewTransition) return;
    
    document.startViewTransition(() => {
        // Update DOM here
    });
});

// Schema Markup
function addSchemaMarkup() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": projects.map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "CreativeWork",
                "name": project.title,
                "description": project.description,
                "dateCreated": project.year
            }
        }))
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Image lazy loading
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
});

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.work-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.1
    });
});


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    addSchemaMarkup();
});