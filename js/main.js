document.addEventListener('DOMContentLoaded', () => {
    // 1. Apple-Style Reveal on Scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.insight-card, .solution-item, .hero-wrap, .trust-bar').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // 2. Lead Form Handling
    const form = document.getElementById('lead-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button');
            submitBtn.innerText = "Processing Lead...";
            submitBtn.disabled = true;

            // This is where you will plug in your Neon DB API later
            setTimeout(() => {
                form.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: #1d1d1f; border-radius: 12px; border: 1px solid #333;">
                        <h3 style="color: white; margin-bottom: 10px;">Audit Requested</h3>
                        <p style="color: #86868b;">Our lead strategist will review your pipeline and contact you within 24 hours.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // 3. Navigation Highlighting
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
