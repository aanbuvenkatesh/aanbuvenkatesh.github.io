// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {

    // Set experience years dynamically
    const start = new Date(2016, 0); // Jan is 0
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    let exp = years + months / 12;
    let displayExp = (exp % 1 === 0) ? years : exp.toFixed(1);
    Array.from(document.getElementsByClassName('experience-years')).forEach(el => {
        el.textContent = displayExp;
    });
        
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;

        // Add/remove navbar background on scroll
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (scrollTop > 50) {
            if (isDarkMode) {
                navbar.style.setProperty('background', 'rgba(15, 23, 42, 0.98)', 'important');
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.98)', 'important');
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            }
        } else {
            if (isDarkMode) {
                navbar.style.setProperty('background', 'rgba(15, 23, 42, 0.95)', 'important');
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.95)', 'important');
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Active navigation highlighting
    const allSections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards for animation
    const animatedElements = document.querySelectorAll('.experience-card, .skill-category, .education-card, .achievement-card, .contact-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skill tags hover effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateZ(0deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateZ(0deg)';
        });
    });

    // Experience cards stagger animation
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Contact cards hover effect
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // Achievement cards animation
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.achievement-icon');
            icon.style.transform = 'scale(1.1) rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.achievement-icon');
            icon.style.transform = 'scale(1) rotateY(0deg)';
        });
    });

    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // You could add a progress bar here if desired
        // For now, we'll just use it for additional scroll-based animations
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollTop < window.innerHeight) {
            hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Optional: Add typing effect to hero title
        const heroTitle = document.querySelector('.hero-description');
        if (heroTitle) {
            const titleText = heroTitle.textContent;
            typeWriter(heroTitle, titleText, 20);
        }
    });

    // Print functionality
    function printResume() {
        window.print();
    }

    // Add print button functionality if needed
    const printButtons = document.querySelectorAll('[data-print]');
    printButtons.forEach(button => {
        button.addEventListener('click', printResume);
    });

    // Enhanced scroll animations with different delays
    const pageSections = document.querySelectorAll('.section');
    pageSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });

    // Lazy loading for better performance
    const lazyElements = document.querySelectorAll('[data-lazy]');
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // Add lazy loading logic here if needed
                lazyObserver.unobserve(element);
            }
        });
    });

    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });

    // Dark mode functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    function updateThemeIcon(isDark) {
        if (isDark) {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark.toString());
        updateThemeIcon(isDark);
        
        // Update navbar immediately after theme toggle
        const navbar = document.getElementById('navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            if (isDark) {
                navbar.style.setProperty('background', 'rgba(15, 23, 42, 0.98)', 'important');
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.98)', 'important');
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            }
        } else {
            if (isDark) {
                navbar.style.setProperty('background', 'rgba(15, 23, 42, 0.95)', 'important');
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.setProperty('background', 'rgba(255, 255, 255, 0.95)', 'important');
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
        
        // Update star colors for theme
        const stars = document.querySelectorAll('.temporary-star');
        stars.forEach(star => {
            star.style.background = isDark 
                ? 'rgba(96,165,250,0.8)' 
                : 'rgba(255,255,255,0.8)';
            star.style.boxShadow = isDark
                ? '0 0 6px rgba(96,165,250,0.6)'
                : '0 0 6px rgba(255,255,255,0.6)';
        });
    }

    // Check browser preference and saved preference
    function initializeTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let shouldUseDark = false;
        if (savedTheme !== null) {
            shouldUseDark = savedTheme === 'true';
        } else {
            shouldUseDark = prefersDark;
        }
        
        // Clear any existing classes first
        document.body.classList.remove('dark-mode');
        
        if (shouldUseDark) {
            document.body.classList.add('dark-mode');
        }
        updateThemeIcon(shouldUseDark);
    }

    // Initialize theme on page load
    initializeTheme();

    // Create a single star that appears, twinkles, and disappears
    function createTemporaryStar() {
        const hero = document.querySelector('.hero');
        const star = document.createElement('div');
        star.className = 'temporary-star';
        
        // Random position - avoid center area where text is
        let x, y;
        do {
            x = Math.random() * 90 + 5; // 5% to 95% width
            y = Math.random() * 90 + 5; // 5% to 95% height
        } while (x > 20 && x < 80 && y > 30 && y < 70); // Avoid center text area
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.borderRadius = '50%';
        star.style.background = document.body.classList.contains('dark-mode') 
            ? 'rgba(96,165,250,0.8)' 
            : 'rgba(255,255,255,0.8)';
        star.style.boxShadow = document.body.classList.contains('dark-mode')
            ? '0 0 6px rgba(96,165,250,0.6)'
            : '0 0 6px rgba(255,255,255,0.6)';
        star.style.zIndex = '2';
        star.style.opacity = '0';
        star.style.transform = 'scale(0.5)';
        star.style.transition = 'all 0.8s ease-out';
        
        hero.appendChild(star);
        
        // Animate star appearance
        setTimeout(() => {
            star.style.opacity = '1';
            star.style.transform = 'scale(1)';
        }, 100);
        
        // Add twinkling effect
        setTimeout(() => {
            star.style.animation = 'twinkle-dynamic 1.5s ease-in-out infinite';
        }, 800);
        
        // Remove star after random duration (4-8 seconds)
        const lifetime = 4000 + Math.random() * 4000;
        setTimeout(() => {
            star.style.opacity = '0';
            star.style.transform = 'scale(0.3)';
            setTimeout(() => {
                if (star.parentNode) {
                    star.remove();
                }
            }, 800);
        }, lifetime);
    }
    
    // Maintain 5-8 stars visible at any given time
    function startDynamicStars() {
        let activeStarCount = 0;
        const minStars = 5;
        const maxStars = 8;
        
        function getActiveStarCount() {
            return document.querySelectorAll('.temporary-star').length;
        }
        
        function createStarIfNeeded() {
            const currentCount = getActiveStarCount();
            if (currentCount < minStars) {
                const starsToCreate = minStars - currentCount;
                for (let i = 0; i < starsToCreate; i++) {
                    setTimeout(() => createTemporaryStar(), i * 200);
                }
            }
        }
        
        function scheduleNextStar() {
            const delay = 800 + Math.random() * 1500; // 0.8-2.3 seconds between stars
            setTimeout(() => {
                const currentCount = getActiveStarCount();
                if (currentCount < maxStars) {
                    createTemporaryStar();
                }
                scheduleNextStar();
            }, delay);
        }
        
        // Create initial stars immediately
        for (let i = 0; i < minStars; i++) {
            setTimeout(() => createTemporaryStar(), i * 300);
        }
        
        // Start the continuous star creation
        setTimeout(() => {
            scheduleNextStar();
        }, 2000);
        
        // Check every few seconds to maintain minimum star count
        setInterval(() => {
            createStarIfNeeded();
        }, 3000);
    }
    
    // Initialize dynamic stars
    startDynamicStars();

    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleDarkMode);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (localStorage.getItem('darkMode') === null) {
            document.body.classList.remove('dark-mode');
            if (e.matches) {
                document.body.classList.add('dark-mode');
            }
            updateThemeIcon(e.matches);
        }
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konami.join(',')) {
            // Easter egg activation
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

// Additional utility functions
function debounce(func, wait) {
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Additional scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Browser compatibility checks
function checkBrowserSupport() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        scrollBehavior: 'scrollBehavior' in document.documentElement.style,
        cssGrid: CSS.supports('display', 'grid'),
        flexbox: CSS.supports('display', 'flex')
    };

    // Fallbacks for older browsers
    if (!features.intersectionObserver) {
        // Fallback for intersection observer
        console.warn('IntersectionObserver not supported, using fallback');
    }

    if (!features.scrollBehavior) {
        // Fallback for smooth scrolling
        console.warn('Smooth scrolling not supported, using fallback');
    }

    return features;
}

// Initialize browser compatibility checks
checkBrowserSupport();

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }
}

measurePerformance();
