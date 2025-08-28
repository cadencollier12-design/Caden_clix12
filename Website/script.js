// Premium JavaScript for Caden_clix12 Website
class CadenClixWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupScrollEffects();
        this.setupGalleryFilters();
        this.setupContactForm();
        this.setupServiceModals();
        this.setupMobileNavigation();
        this.setupScrollToTop();
        this.resolveLocalImages();
        this.hideLoadingScreen();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    resolveLocalImages() {
        const autoImages = document.querySelectorAll('img.auto-image[data-basesrc]');
        if (!autoImages.length) return;

        const unique = (arr) => Array.from(new Set(arr));

        const buildVariants = (base) => {
            const bases = unique([
                base,
                base.toLowerCase(),
                base.toUpperCase(),
                // Title Case for common patterns like "Volleyball Photo 1"
                base.replace(/\b\w/g, (m) => m.toUpperCase()),
                // Swap 'photo' casing variants
                base.replace(/photo/gi, 'photo'),
                base.replace(/photo/gi, 'Photo'),
                // Replace spaces variations
                base.replace(/\s+/g, '_'),
                base.replace(/\s+/g, ''),
                base.replace(/\s+/g, '-'),
            ]);

            const exts = ['jpg','jpeg','png','JPG','JPEG','PNG'];
            const prefixes = ['', './', 'images/', 'img/', 'assets/', 'photos/'];
            const candidates = [];
            bases.forEach(b => {
                exts.forEach(ext => {
                    prefixes.forEach(prefix => {
                        candidates.push(`${prefix}${b}.${ext}`);
                    });
                });
            });
            return unique(candidates);
        };

        autoImages.forEach(imgEl => {
            const base = imgEl.getAttribute('data-basesrc');
            const candidates = buildVariants(base);

            const tryNext = (index) => {
                if (index >= candidates.length) return; // give up
                const testImg = new Image();
                testImg.onload = () => {
                    imgEl.src = candidates[index];
                };
                testImg.onerror = () => tryNext(index + 1);
                testImg.src = candidates[index];
            };

            // If current src fails, attempt resolution
            const initial = new Image();
            initial.onload = () => { /* current src works, do nothing */ };
            initial.onerror = () => tryNext(0);
            initial.src = imgEl.getAttribute('src');
        });
    }

    initializeAnimations() {
        // Animate elements on page load
        this.animateOnLoad();
        
        // Parallax effect for hero section
        this.setupParallax();
        
        // Floating cards animation
        this.animateFloatingCards();
    }

    setupScrollEffects() {
        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Active navigation link highlighting
        this.highlightActiveNavLink();
    }

    setupGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Filter gallery items with animation
                galleryItems.forEach(item => {
                    const sport = item.getAttribute('data-sport');
                    
                    if (filter === 'all' || sport === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });

            // Real-time form validation
            this.setupFormValidation();
        }
    }

    setupServiceModals() {
        const modal = document.getElementById('serviceModal');
        const closeBtn = document.querySelector('.close');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeServiceModal();
            });
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeServiceModal();
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeServiceModal();
            }
        });
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.service-card, .gallery-item, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    animateOnLoad() {
        // Staggered animation for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });

        // Animate gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            }, index * 150);
        });
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-card');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    animateFloatingCards() {
        const cards = document.querySelectorAll('.floating-card');
        
        cards.forEach((card, index) => {
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-20px) scale(1.1)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });

            // Navigate to sport page on click
            card.addEventListener('click', () => {
                const sport = card.getAttribute('data-sport');
                if (sport) {
                    window.location.href = `${sport}.html`;
                }
            });
        });
    }

    highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupFormValidation() {
        const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        this.removeErrorMessage(field);

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        if (!isValid) {
            field.classList.add('error');
            this.showErrorMessage(field, errorMessage);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.5rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '8px';
        notification.style.color = 'white';
        notification.style.fontWeight = '500';
        notification.style.zIndex = '3000';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'transform 0.3s ease';
        
        if (type === 'success') {
            notification.style.background = '#4CAF50';
        } else {
            notification.style.background = '#f44336';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    openServiceModal(sport) {
        const modal = document.getElementById('serviceModal');
        const modalContent = document.getElementById('modalContent');
        
        if (modal && modalContent) {
            const serviceData = this.getServiceData(sport);
            modalContent.innerHTML = this.createModalContent(serviceData);
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add entrance animation
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }
    }

    closeServiceModal() {
        const modal = document.getElementById('serviceModal');
        
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    getServiceData(sport) {
        const services = {
            football: {
                title: '🏈 Football Photography',
                description: 'Capture every touchdown, tackle, and triumphant moment on the field with professional action shots.',
                pricing: [
                    { amount: '$20', period: 'per game', features: ['Action shots', 'Player highlights', 'Key moments'] },
                    { amount: '$100', period: 'per season (per player)', features: ['All season games for one player', 'Team photos', 'Comprehensive coverage'] }
                ],
                features: ['High-speed action shots', 'Player portraits', 'Team photos', 'Game highlights', 'Season coverage (per player)']
            },
            volleyball: {
                title: '🏐 Volleyball Photography',
                description: 'Document the intensity and teamwork of volleyball matches with dynamic photography.',
                pricing: [
                    { amount: '$15', period: 'per game', features: ['Single game coverage', 'Action shots', 'Portraits'] },
                    { amount: '$85', period: 'per season (per player)', features: ['All season games for one player', 'Team photos', 'Match coverage'] }
                ],
                features: ['Spike moments', 'Team coordination', 'Defensive plays', 'Player portraits', 'Celebration shots', 'Season coverage (per player)']
            },
            soccer: {
                title: '⚽ Men\'s Soccer Photography',
                description: 'Showcase the skill and passion of soccer players with professional game coverage.',
                pricing: [
                    { amount: '$15', period: 'per game', features: ['Single game coverage', 'Action shots', 'Portraits'] },
                    { amount: '$85', period: 'per season (per player)', features: ['All season games for one player', 'Team photos', 'Match coverage'] }
                ],
                features: ['Goal scoring', 'Ball control', 'Team strategy', 'Defensive plays', 'Field action', 'Season coverage (per player)']
            },
            hockey: {
                title: '🏒 Hockey Photography',
                description: 'Freeze the action of fast-paced hockey games with high-speed photography.',
                pricing: [
                    { amount: '$25', period: 'per game', features: ['Single game coverage', 'Action shots', 'Portraits'] },
                    { amount: '$120', period: 'per season (per player)', features: ['All season games for one player', 'Team photos', 'Match coverage'] }
                ],
                features: ['Goal scoring', 'Puck handling', 'Team defense', 'Goalie saves', 'Ice action', 'Season coverage (per player)']
            }
        };

        return services[sport] || services.football;
    }

    createModalContent(serviceData) {
        return `
            <div class="modal-header">
                <h2>${serviceData.title}</h2>
                <p class="modal-description">${serviceData.description}</p>
            </div>
            
            <div class="modal-pricing">
                ${serviceData.pricing.map(pkg => `
                    <div class="modal-package">
                        <div class="package-price">
                            <span class="amount">${pkg.amount}</span>
                            <span class="period">${pkg.period}</span>
                        </div>
                        <ul class="package-features">
                            ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <div class="modal-features">
                <h3>What's Included</h3>
                <div class="features-grid">
                    ${serviceData.features.map(feature => `
                        <span class="feature-tag">${feature}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-cta">
                <button class="btn btn-primary" onclick="window.open('mailto:cadencollier12@gmail.com?subject=Booking Request for ${serviceData.title}')">
                    Book Now
                </button>
            </div>
        `;
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000);
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CadenClixWebsite();
});

// Add some additional utility functions
window.addEventListener('load', () => {
    // Preload critical images
    const criticalImages = [
        // Add your actual image URLs here when you have them
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add smooth reveal animation for elements
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(revealOnScroll, 100));

// Add CSS for additional animations
const additionalStyles = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .error {
        border-color: #ff6b6b !important;
        box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
    }
    
    .modal-header h2 {
        color: var(--accent-color);
        margin-bottom: 1rem;
        font-size: 2rem;
    }
    
    .modal-description {
        color: var(--text-secondary);
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    .modal-pricing {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .modal-package {
        background: rgba(255, 255, 255, 0.05);
        padding: 1.5rem;
        border-radius: var(--border-radius);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .package-price {
        text-align: center;
        margin-bottom: 1rem;
    }
    
    .amount {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
    }
    
    .period {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .package-features {
        list-style: none;
        padding: 0;
    }
    
    .package-features li {
        color: var(--text-secondary);
        padding: 0.3rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .package-features li:last-child {
        border-bottom: none;
    }
    
    .modal-features h3 {
        color: var(--accent-color);
        margin-bottom: 1rem;
    }
    
    .features-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    
    .feature-tag {
        background: rgba(135, 206, 235, 0.2);
        color: var(--primary-color);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .modal-cta {
        text-align: center;
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
