// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const navbar = document.getElementById('navbar');
        const navbarHeight = navbar.offsetHeight;
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Handle hero section specially since it's not a section element
        const hero = document.getElementById('home');
        if (hero && window.scrollY < hero.offsetHeight - navbarHeight) {
            current = 'home';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Navbar scroll effect
    function updateNavbarOnScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 253, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'var(--color-surface)';
            navbar.style.boxShadow = 'none';
        }
        
        // Update for dark mode
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(38, 40, 40, 0.95)';
            } else {
                navbar.style.background = 'var(--color-surface)';
            }
        }
    }

    // Scroll event listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                updateNavbarOnScroll();
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Typing animation for hero section
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'High School Student',
        'Figure Skater & Ice Coach',
        'Art & Academic Instructor',
        'Research Intern',
        'Community Volunteer'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        const cursor = '<span class="typing-cursor">|</span>';
        
        if (isDeleting) {
            typingText.innerHTML = currentPhrase.substring(0, charIndex - 1) + cursor;
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.innerHTML = currentPhrase.substring(0, charIndex + 1) + cursor;
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation
    if (typingText) {
        setTimeout(typeText, 1000);
    }

    // Scroll animations
    function handleScrollAnimations() {
        const scrollElements = document.querySelectorAll('.scroll-fade');
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Add scroll-fade class to elements that should animate
    function addScrollAnimations() {
        const animatedElements = [
            '.card',
            '.timeline-item',
            '.skill-category',
            '.contact-item',
            '.contact-form-container'
        ];

        animatedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('scroll-fade');
            });
        });
    }

    // Initialize scroll animations
    addScrollAnimations();

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Since this is a static site, we'll create a mailto link
            const mailtoLink = `mailto:letovaalina11@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;

            // Show success message
            showNotification('Thank you for your message! Opening your email client...', 'success');
            
            // Open mailto link
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1000);

            // Reset form
            contactForm.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease forwards;
        `;

        // Add type-specific styling
        if (type === 'success') {
            notification.style.borderLeftColor = 'var(--color-success)';
            notification.style.borderLeftWidth = '4px';
        } else if (type === 'error') {
            notification.style.borderLeftColor = 'var(--color-error)';
            notification.style.borderLeftWidth = '4px';
        }

        // Style the content
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--space-16);
        `;

        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            font-size: var(--font-size-xl);
            cursor: pointer;
            color: var(--color-text-secondary);
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        // Add to document
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => {
                    notification.remove();
                    if (style.parentElement) {
                        style.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Hero buttons smooth scroll
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navbar = document.getElementById('navbar');
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Add hover effects for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Dark mode detection and navbar background adjustment
    function handleColorSchemeChange() {
        updateNavbarOnScroll();
    }

    // Listen for color scheme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleColorSchemeChange);
    }

    // Initialize navbar background
    updateNavbarOnScroll();

    // Add intersection observer for better scroll animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all scroll-fade elements
        document.querySelectorAll('.scroll-fade').forEach(element => {
            observer.observe(element);
        });
    }

    // Add stagger animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Add stagger animation for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
    });

    // Performance optimization: Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            updateActiveNavLink();
            updateNavbarOnScroll();
        }, 16); // ~60fps
    });

    // Initialize everything on load
    setTimeout(function() {
        updateActiveNavLink();
        handleScrollAnimations();
    }, 100);

    console.log('Alina Letova portfolio initialized successfully! 🚀');
});
