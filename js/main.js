document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to cards and sections
    document.querySelectorAll('.insight-card, .solution-item, .hero-wrap').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealOnScroll.observe(el);
    });

    // 3. Form Handling (Ready for Neon DB)
    const form = document.getElementById('lead-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button');
            submitBtn.innerText = "Processing...";
            submitBtn.disabled = true;

            // This is where you will plug in your Neon DB API endpoint
            // For now, we simulate a successful submission
            setTimeout(() => {
                form.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: #1d1d1f; border-radius: 12px;">
                        <h3 style="color: white; margin-bottom: 10px;">Audit Requested</h3>
                        <p style="color: #86868b;">We will reach out to you within 24 hours.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // 4. Dynamic Insight Card Hover Effects (Apple Style)
    document.querySelectorAll('.insight-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('highlight')) {
                card.style.borderColor = '#0071e3';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('highlight')) {
                card.style.borderColor = '#d2d2d7';
            }
        });
    });
});
