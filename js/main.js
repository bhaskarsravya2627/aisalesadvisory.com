// AI Sales Advisory - Enhanced JavaScript

class AIAdvisoryWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupFormValidation();
        this.setupMobileMenu();
        this.setupIntersectionObserver();
        console.log('AI Sales Advisory website initialized successfully!');
    }

    // Navigation and Smooth Scrolling
    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    this.updateActiveNavLink(targetId);
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavLinkOnScroll();
        });
    }

    updateActiveNavLink(activeId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    updateActiveNavLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top - headerHeight;
            const sectionBottom = rect.bottom - headerHeight;
            
            if (sectionTop <= 100 && sectionBottom >= 100) {
                this.updateActiveNavLink(section.id);
            }
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Header background effect
            if (currentScrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }

            // Header hide/show on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Animations and Intersection Observer
    setupAnimations() {
        // Add CSS for fade-in animations
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .slide-in-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .slide-in-left.visible {
                opacity: 1;
                transform: translateX(0);
            }
            
            .slide-in-right {
                opacity: 0;
                transform: translateX(50px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .slide-in-right.visible {
                opacity: 1;
                transform: translateX(0);
            }
            
            .scale-in {
                opacity: 0;
                transform: scale(0.9);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .scale-in.visible {
                opacity: 1;
                transform: scale(1);
            }
        `;
        document.head.appendChild(style);

        // Add animation classes to elements
        this.addAnimationClasses();
    }

    addAnimationClasses() {
        // Add fade-in to service cards
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Add fade-in to problem items
        document.querySelectorAll('.problem-item').forEach((item, index) => {
            item.classList.add('fade-in');
            item.style.transitionDelay = `${index * 0.1}s`;
        });

        // Add slide-in to timeline items
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
            item.style.transitionDelay = `${index * 0.2}s`;
        });

        // Add scale-in to why items
        document.querySelectorAll('.why-item').forEach((item, index) => {
            item.classList.add('scale-in');
            item.style.transitionDelay = `${index * 0.15}s`;
        });

        // Add fade-in to section headers
        document.querySelectorAll('.section-header').forEach(header => {
            header.classList.add('fade-in');
        });
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    }

    // Form Validation and Submission
    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Real-time validation
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Email validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail(emailInput));
        }

        // Form submission
        form.addEventListener('submit', (e) => this.handleFormSubmission(e));
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');
        
        if (!value && field.hasAttribute('required')) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    validateEmail(emailField) {
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.showFieldError(emailField, 'Please enter a valid email address');
            return false;
        }
        
        return this.validateField(emailField);
    }

    showFieldError(field, message) {
        const fieldGroup = field.closest('.form-group');
        let errorElement = fieldGroup.querySelector('.field-error');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: block;
            `;
            fieldGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.style.borderColor = '#ef4444';
    }

    clearFieldError(field) {
        const fieldGroup = field.closest('.form-group');
        const errorElement = fieldGroup.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        field.style.borderColor = '';
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('span');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Validate all fields
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate email specifically
        const emailField = document.getElementById('email');
        if (emailField && !this.validateEmail(emailField)) {
            isValid = false;
        }

        if (!isValid) {
            this.showFormMessage('Please correct the errors above and try again.', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';

        try {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Add timestamp
            data.timestamp = new Date().toISOString();
            
            // Here you would typically send to your backend
            // For now, we'll simulate the submission
            await this.simulateFormSubmission(data);
            
            // Show success message
            this.showFormMessage('Thank you! We\'ll be in touch within 24 hours to schedule your free AI assessment.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage('Sorry, there was an error submitting your form. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    async simulateFormSubmission(data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Log the form data (in production, this would be sent to your backend)
        console.log('Form submission data:', data);
        
        // You can integrate with Netlify Forms by adding data-netlify="true" to the form
        // and removing the preventDefault() call above
    }

    showFormMessage(message, type) {
        const form = document.getElementById('contact-form');
        let messageElement = form.querySelector('.form-message');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            form.insertBefore(messageElement, form.firstChild);
        }
        
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-weight: 500;
            ${type === 'success' 
                ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' 
                : 'background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;'
            }
        `;
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (messageElement && messageElement.parentNode) {
                messageElement.remove();
            }
        }, 10000);
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Performance optimization
    setupPerformanceOptimizations() {
        // Lazy load images when they come into view
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIAdvisoryWebsite();
});

// Add CSS for mobile menu
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 2rem;
            transition: right 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .nav-link {
            font-size: 1.25rem;
            padding: 1rem 0;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid var(--border-light);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyles);

