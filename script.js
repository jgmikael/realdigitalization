// Real Digitalization - Interactive Features

// Matrix Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.matrix-tab');
    const contents = document.querySelectorAll('.matrix-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update tab active states
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update content visibility
            contents.forEach(content => {
                if (content.id === category + '-events') {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe capability and event cards
    document.querySelectorAll('.capability-card, .event-card, .vision-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Fallback: ensure all cards are visible after 2 seconds (in case observer doesn't trigger)
    setTimeout(() => {
        document.querySelectorAll('.capability-card, .event-card, .vision-card').forEach(card => {
            if (parseFloat(window.getComputedStyle(card).opacity) < 0.5) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }, 2000);
});

// Add subtle parallax effect to hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
