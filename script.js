gsap.registerPlugin(ScrollTrigger);

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navbar links
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu tabs functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const cardGrids = document.querySelector('.card-grid');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Load menu content based on tab (simplified - in real app fetch data)
        const tab = btn.dataset.tab;
        let html = '';
        
        if (tab === 'appetizers') {
            html = `
                <div class="menu-card" data-modal="bruschetta">
                    <img src="https://images.unsplash.com/photo-1559314809-0f31657def5e?w=300&auto=format" alt="Bruschetta">
                    <h3>Classic Bruschetta</h3>
                    <p>Fresh tomatoes, basil, garlic on grilled bread</p>
                    <span class="price">$9.99</span>
                </div>
                <div class="menu-card" data-modal="caprese">
                    <img src="https://images.unsplash.com/photo-1541599468178-fe80f461d6ab?w=300&auto=format" alt="Caprese Salad">
                    <h3>Caprese Salad</h3>
                    <p>Mozzarella, tomatoes, balsamic glaze</p>
                    <span class="price">$12.99</span>
                </div>
            `;
        } else if (tab === 'mains') {
            html = `
                <div class="menu-card" data-modal="pizza">
                    <img src="https://cookingitalians.com/wp-content/uploads/2024/11/Margherita-Pizza.jpg" alt="Margherita Pizza">
                    <h3>Margherita Pizza</h3>
                    <p>Tomato sauce, mozzarella, basil</p>
                    <span class="price">$18.99</span>
                </div>
                <div class="menu-card" data-modal="pasta">
                    <img src="https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg" alt="Carbonara">
                    <h3>Spaghetti Carbonara</h3>
                    <p>Egg, pecorino, guanciale, pepper</p>
                    <span class="price">$22.99</span>
                </div>
            `;
        } else if (tab === 'desserts') {
            html = `
                <div class="menu-card" data-modal="tiramisu">
                    <img src="https://www.simplyrecipes.com/thmb/n29cy_Z8pl8r8Au-MpA1Lp08kdg=/2000x1333/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2017__10__2017-10-28-Tiramisu-21-7de4673191d542039f47927fde4fee82.jpg" alt="Tiramisu">
                    <h3>Classic Tiramisu</h3>
                    <p>Mascarpone, coffee, ladyfingers</p>
                    <span class="price">$8.99</span>
                </div>
                <div class="menu-card" data-modal="gelato">
                    <img src="https://amazingfoodanddrink.com/wp-content/uploads/2024/06/Traditional-Italian-gelato-111-1024x768.webp" alt="Gelato">
                    <h3>Artisanal Gelato</h3>
                    <p>Choose from 12 flavors</p>
                    <span class="price">$6.99</span>
                </div>
            `;
        }
        
        cardGrids.innerHTML = html;
        attachMenuListeners(); // Re-attach listeners
    });
});

// Menu modal
const menuModal = document.getElementById('menuModal');
const modalBody = document.getElementById('modalBody');
const closes = document.querySelectorAll('.close');

function attachMenuListeners() {
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.dataset.modal;
            let content = '';
            switch(modalId) {
                case 'bruschetta':
                    content = '<h3>Classic Bruschetta</h3><img src="https://images.unsplash.com/photo-1559314809-0f31657def5e?w=500&auto=format" alt="Bruschetta"><p>Fresh ripe tomatoes, fragrant basil, extra virgin olive oil, roasted garlic on crusty Italian bread. Served with a balsamic reduction.</p><span class="price-big">$9.99</span>';
                    break;
                case 'caprese':
                    content = '<h3>Caprese Salad</h3><img src="https://images.unsplash.com/photo-1541599468178-fe80f461d6ab?w=500&auto=format" alt="Caprese"><p>Imported buffalo mozzarella, heirloom tomatoes, fresh basil leaves, drizzled with 25-year aged balsamic and EVOO.</p><span class="price-big">$12.99</span>';
                    break;
                case 'pizza':
                    content = '<h3>Margherita Pizza</h3><img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&auto=format" alt="Pizza"><p>San Marzano tomatoes, fior di latte mozzarella, fresh basil, finished with EVOO. Wood-fired at 900°F.</p><span class="price-big">$18.99</span>';
                    break;
                case 'pasta':
                    content = '<h3>Spaghetti Carbonara</h3><img src="https://images.unsplash.com/photo-1579586140626-ca3d0b49ecc5?w=500&auto=format" alt="Pasta"><p>Handmade spaghetti, pecorino romano, guanciale, farm-fresh eggs, cracked black pepper. No cream!</p><span class="price-big">$22.99</span>';
                    break;
                case 'tiramisu':
                    content = '<h3>Classic Tiramisu</h3><img src="https://images.unsplash.com/photo-1563053540-647dfb7eaee6?w=500&auto=format" alt="Tiramisu"><p>Ladyfingers soaked in espresso, mascarpone cream, cocoa powder. Made daily.</p><span class="price-big">$8.99</span>';
                    break;
                case 'gelato':
                    content = '<h3>Artisanal Gelato</h3><img src="https://images.unsplash.com/photo-1543352610-ebc98a6791b4?w=500&auto=format" alt="Gelato"><p>Small-batch gelato made with Sicilian ingredients. Flavors: Pistacchio, Stracciatella, Limone, Fragola, etc.</p><span class="price-big">$6.99</span>';
                    break;
            }
            modalBody.innerHTML = content;
            menuModal.style.display = 'block';
        });
    });
}

// Close modals
closes.forEach(close => {
    close.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Reservation form
const reservationForm = document.getElementById('reservationForm');
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple validation
    const formData = new FormData(reservationForm);
    const name = formData.get('name') || reservationForm.querySelector('input[type="text"]').value;
    if (name.trim()) {
        document.getElementById('confirmModal').style.display = 'block';
        reservationForm.reset();
        setTimeout(() => {
            document.getElementById('confirmModal').style.display = 'none';
        }, 4000);
    }
});

// Contact form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const message = formData.get('message') || contactForm.querySelector('textarea').value;
    if (message.trim()) {
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        contactForm.reset();
    }
});

// Gallery carousel
const carouselImgs = document.querySelectorAll('.carousel-img');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function updateCarousel() {
    carouselImgs.forEach((img, i) => img.classList.toggle('active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentSlide = i;
        updateCarousel();
    });
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + carouselImgs.length) % carouselImgs.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % carouselImgs.length;
    updateCarousel();
});

// Auto-advance carousel
setInterval(() => {
    currentSlide = (currentSlide + 1) % carouselImgs.length;
    updateCarousel();
}, 5000);

// GSAP Animations
gsap.from('.hero-title', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

gsap.from('.hero-desc', {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.hero-buttons a', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 0.6,
    ease: 'power3.out'
});

// Section reveals
gsap.utils.toArray('section').forEach((section, i) => {
    gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Card stagger animations
gsap.utils.toArray('.menu-card, .trainer-card').forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
            trigger: card,
            start: 'top 90%'
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(248, 241, 233, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(248, 241, 233, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Form focus animations
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, { scale: 1.02, duration: 0.2 });
    });
    input.addEventListener('blur', () => {
        gsap.to(input, { scale: 1, duration: 0.2 });
    });
});

// Initial tab setup and listeners
document.addEventListener('DOMContentLoaded', () => {
    attachMenuListeners();
});

// Parallax hero effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
