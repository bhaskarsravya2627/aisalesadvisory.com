// AI Sales Advisory - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // Add scroll effect to header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#0f172a';
            header.style.backdropFilter = 'none';
        }
    });

    console.log('AI Sales Advisory website loaded successfully!');
});

