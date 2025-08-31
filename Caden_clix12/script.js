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
        this.setupServiceModals();
        this.setupMobileNavigation();
        this.setupScrollToTop();
        this.resolveLocalImages();
        this.setupParallaxEffects();
        this.setupBubbleEffects();
        this.setupIntersectionObserver();
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

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Floating cards interaction
        document.querySelectorAll('.floating-card').forEach(card => {
            card.addEventListener('click', () => {
                const sport = card.getAttribute('data-sport');
                this.animateCardClick(card);
                this.scrollToSection(sport);
            });
        });
    }

    setupParallaxEffects() {
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

    setupBubbleEffects() {
        const bubbles = document.querySelectorAll('.bubble');
        
        bubbles.forEach(bubble => {
            // Mouse enter effect - like dropping into pond
            bubble.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(bubble, e, 'enter');
            });
            
            // Mouse leave effect - like taking out of pond
            bubble.addEventListener('mouseleave', (e) => {
                this.createRippleEffect(bubble, e, 'leave');
            });
            
            // Mouse move effect - follow cursor
            bubble.addEventListener('mousemove', (e) => {
                this.followCursor(bubble, e);
            });
        });
    }

    createRippleEffect(bubble, event, type) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        const rect = bubble.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.animation = type === 'enter' ? 'rippleIn 0.6s ease-out' : 'rippleOut 0.4s ease-out';
        
        bubble.appendChild(ripple);
        
        // Remove ripple element after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, type === 'enter' ? 600 : 400);
    }

    followCursor(bubble, event) {
        const rect = bubble.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = event.clientX - rect.left - centerX;
        const y = event.clientY - rect.top - centerY;
        
        // Subtle movement following cursor
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        bubble.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        
        // Reset transform after mouse leaves
        setTimeout(() => {
            bubble.style.transform = 'translate(0, 0) scale(1)';
        }, 100);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all elements that should animate on scroll
        const animateElements = document.querySelectorAll('.section-header, .service-card, .gallery-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    initializeAnimations() {
        // Animate elements on page load
        this.animateOnLoad();
        
        // Stagger animation for service cards
        this.staggerAnimation('.service-card', 0.2);
        
        // Stagger animation for gallery items
        this.staggerAnimation('.gallery-item', 0.15);
    }

    animateOnLoad() {
        // Hero section animations are handled by CSS
        // Additional on-load animations can be added here
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    staggerAnimation(selector, delay) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate');
            }, index * delay * 1000);
        });
    }

    setupScrollEffects() {
        // Parallax scrolling for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Add subtle parallax to background elements
            document.body.style.setProperty('--scroll-offset', `${rate}px`);
        });

        // Smooth reveal animations
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    setupGalleryFilters() {
        // Gallery filtering functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-sport') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('animate'), 100);
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('animate');
                    }
                });
            });
        });
    }

    setupServiceModals() {
        const modal = document.getElementById('serviceModal');
        const modalContent = document.getElementById('modalContent');
        const closeBtn = document.querySelector('.close');

        // Service card click handlers
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', () => {
                const sport = card.getAttribute('data-sport');
                this.showServiceModal(sport);
            });
        });

        // Close modal
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideServiceModal();
            });
        }

        // Close modal on outside click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideServiceModal();
                }
            });
        }
    }

    showServiceModal(sport) {
        const modal = document.getElementById('serviceModal');
        const modalContent = document.getElementById('modalContent');
        
        if (!modal || !modalContent) return;

        const sportData = this.getSportData(sport);
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${sportData.title}</h2>
                <div class="sport-icon">
                    <i class="${sportData.icon}"></i>
                </div>
            </div>
            <div class="modal-body">
                <div class="pricing-section">
                    <h3>Pricing</h3>
                    <div class="pricing-grid">
                        <div class="price-card">
                            <div class="price">${sportData.pricing.perGame}</div>
                            <div class="period">per game</div>
                            <ul class="features">
                                ${sportData.features.perGame.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="price-card featured">
                            <div class="price">${sportData.pricing.perSeason}</div>
                            <div class="period">per season</div>
                            <ul class="features">
                                ${sportData.features.perSeason.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="description-section">
                    <h3>What's Included</h3>
                    <p>${sportData.description}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="window.location.href='${sportData.page}'">
                    View Full Gallery
                </button>
            </div>
        `;

        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    hideServiceModal() {
        const modal = document.getElementById('serviceModal');
        if (!modal) return;

        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    getSportData(sport) {
        const sportData = {
            football: {
                title: 'Football Photography',
                icon: 'fas fa-football-ball',
                pricing: { perGame: '$20', perSeason: '$100' },
                features: {
                    perGame: ['Action shots', 'Player highlights', 'Key moments'],
                    perSeason: ['All season games', 'Team photos', 'Comprehensive coverage']
                },
                description: 'Capture every touchdown, tackle, and triumphant moment with professional action shots.',
                page: 'football.html'
            },
            volleyball: {
                title: 'Volleyball Photography',
                icon: 'fas fa-volleyball-ball',
                pricing: { perGame: '$15', perSeason: '$85' },
                features: {
                    perGame: ['Action shots', 'Team coordination', 'Match highlights'],
                    perSeason: ['All season games', 'Team photos', 'Comprehensive coverage']
                },
                description: 'Document the intensity and teamwork of volleyball matches with dynamic photography.',
                page: 'volleyball.html'
            },
            soccer: {
                title: 'Men\'s Soccer Photography',
                icon: 'fas fa-futbol',
                pricing: { perGame: '$15', perSeason: '$85' },
                features: {
                    perGame: ['Action shots', 'Player portraits', 'Game highlights'],
                    perSeason: ['All season games', 'Team photos', 'Comprehensive coverage']
                },
                description: 'Showcase the skill and passion of soccer players with professional game coverage.',
                page: 'soccer.html'
            },
            hockey: {
                title: 'Hockey Photography',
                icon: 'fas fa-hockey-puck',
                pricing: { perGame: '$40', perSeason: '$150' },
                features: {
                    perGame: ['Action shots', 'Player highlights', 'Key moments'],
                    perSeason: ['All season games', 'Team photos', 'Comprehensive coverage']
                },
                description: 'Capture the speed and intensity of hockey with professional action photography.',
                page: 'hockey.html'
            }
        };

        return sportData[sport] || sportData.football;
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });
        }
    }

    setupScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        
        if (scrollBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollBtn.classList.add('show');
                } else {
                    scrollBtn.classList.remove('show');
                }
            });

            scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
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
                base.replace(/\b\w/g, (m) => m.toUpperCase()),
                base.replace(/photo/gi, 'photo'),
                base.replace(/photo/gi, 'Photo'),
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
                if (index >= candidates.length) return;
                const testImg = new Image();
                testImg.onload = () => {
                    imgEl.src = candidates[index];
                };
                testImg.onerror = () => tryNext(index + 1);
                testImg.src = candidates[index];
            };

            const initial = new Image();
            initial.onload = () => { /* current src works */ };
            initial.onerror = () => tryNext(0);
            initial.src = imgEl.getAttribute('src');
        });
    }

    animateCardClick(card) {
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.transition = 'transform 0.3s ease';
        }, 100);
    }

    scrollToSection(sport) {
        const targetSection = document.getElementById(sport);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Utility methods
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

    throttle(func, limit) {
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
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CadenClixWebsite();
});

// Add smooth reveal animations
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements in sequence
    const animateSequence = () => {
        const elements = document.querySelectorAll('.animate-sequence');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate');
            }, index * 200);
        });
    };
    
    setTimeout(animateSequence, 500);
});

// Add hover effects for interactive elements
document.querySelectorAll('.interactive').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect for background elements
const parallaxBackground = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
};

window.addEventListener('scroll', parallaxBackground);

// Add smooth transitions for all interactive elements
document.querySelectorAll('a, button, .interactive').forEach(element => {
    element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Add loading states for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Remove loading state after animation
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = this.getAttribute('data-original-text') || this.innerHTML;
            }, 2000);
        }
    });
    
    // Store original text
    button.setAttribute('data-original-text', button.innerHTML);
});
