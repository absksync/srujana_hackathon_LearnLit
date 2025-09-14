/**
 * =================================================================
 * 🎨 LEARNBUDDY LANDING PAGE - INTERACTIVE FUNCTIONALITY
 * =================================================================
 * Modern, vibrant landing page with smooth animations and interactions
 * Designed for Class 6-10 students with engaging UX
 */

// Global variables
let currentFeatureIndex = 0;
const totalFeatures = 5;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollProgress();
    initializeMobileMenu();
    initializeFeaturesCarousel();
    initializeSmoothScrolling();
    initializeIntersectionObserver();
    initializeHoverAnimations();
});

/**
 * Progress Bar - Shows scroll progress at top of page
 */
function initializeScrollProgress() {
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Mobile Menu Toggle
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Animate menu icon
        const icon = mobileMenuBtn.querySelector('[data-lucide]');
        if (mobileMenu.classList.contains('hidden')) {
            icon.setAttribute('data-lucide', 'menu');
        } else {
            icon.setAttribute('data-lucide', 'x');
        }
        
        // Re-initialize Lucide icons
        lucide.createIcons();
    });

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('[data-lucide]');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

/**
 * Features Carousel - Horizontal scrolling with navigation
 */
function initializeFeaturesCarousel() {
    const carousel = document.getElementById('features-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Calculate card width (320px + 24px gap)
    const cardWidth = 344;
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentFeatureIndex = currentFeatureIndex > 0 ? currentFeatureIndex - 1 : 0;
        updateCarousel();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentFeatureIndex = currentFeatureIndex < totalFeatures - 1 ? currentFeatureIndex + 1 : totalFeatures - 1;
        updateCarousel();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentFeatureIndex = index;
            updateCarousel();
        });
    });
    
    // Update carousel position and dots
    function updateCarousel() {
        const offset = -currentFeatureIndex * cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentFeatureIndex) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-blue-600');
            } else {
                dot.classList.remove('bg-blue-600');
                dot.classList.add('bg-gray-300');
            }
        });
        
        // Update button states
        prevBtn.style.opacity = currentFeatureIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentFeatureIndex === totalFeatures - 1 ? '0.5' : '1';
    }
    
    // Auto-scroll carousel (optional)
    setInterval(() => {
        currentFeatureIndex = (currentFeatureIndex + 1) % totalFeatures;
        updateCarousel();
    }, 5000); // Change slide every 5 seconds
    
    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        carousel.style.transition = 'none';
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        const offset = -currentFeatureIndex * cardWidth + diff;
        carousel.style.transform = `translateX(${offset}px)`;
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.transition = 'transform 0.5s ease-in-out';
        
        const diff = currentX - startX;
        const threshold = 100;
        
        if (diff > threshold && currentFeatureIndex > 0) {
            currentFeatureIndex--;
        } else if (diff < -threshold && currentFeatureIndex < totalFeatures - 1) {
            currentFeatureIndex++;
        }
        
        updateCarousel();
    });
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Intersection Observer for Scroll Animations
 */
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.group, .min-w-80, h2, h3');
    animateElements.forEach(el => observer.observe(el));
}

/**
 * Enhanced Hover Animations
 */
function initializeHoverAnimations() {
    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.min-w-80');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.transition = 'all 0.3s ease-in-out';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Owl mascot interaction
    const owlMascot = document.querySelector('.w-12.h-12.bg-gradient-to-br.from-orange-400');
    if (owlMascot) {
        owlMascot.addEventListener('click', () => {
            // Create floating message
            showOwlMessage();
        });
    }
    
    // CTA button hover effects
    const ctaButtons = document.querySelectorAll('button[class*="bg-gradient"]');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05) translateY(-2px)';
            button.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1) translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
}

/**
 * Owl Mascot Interaction
 */
function showOwlMessage() {
    // Create floating message bubble
    const message = document.createElement('div');
    message.className = 'fixed top-20 right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-200 max-w-xs z-50 animate-bounce';
    message.innerHTML = `
        <div class="flex items-start space-x-3">
            <span class="text-2xl">🦉</span>
            <div>
                <p class="text-sm font-semibold text-gray-900 mb-1">Hey there, future genius!</p>
                <p class="text-xs text-gray-600">Ready to supercharge your learning? I'm here to help! 🚀</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 4 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 4000);
}

/**
 * Scroll-triggered Animations
 */
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Add staggered animation to children
                const children = entry.target.querySelectorAll('.group, .min-w-80, h2, h3, p');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.2
    });
    
    sections.forEach(section => sectionObserver.observe(section));
}

/**
 * Keyboard Navigation Support
 */
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = document.querySelector('#mobile-menu-btn [data-lucide]');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    }
    
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft') {
        document.getElementById('prev-btn').click();
    } else if (e.key === 'ArrowRight') {
        document.getElementById('next-btn').click();
    }
});

/**
 * Performance optimizations
 */
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
}

function updateScrollPosition() {
    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
    
    ticking = false;
}

// Throttled scroll listener
window.addEventListener('scroll', requestTick);

/**
 * Add custom CSS animations
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    /* Initial state for animated elements */
    .group, .min-w-80, section h2, section h3, section p {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .section-visible .group,
    .section-visible .min-w-80,
    .section-visible h2,
    .section-visible h3,
    .section-visible p {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Smooth hover transitions */
    .hover-scale {
        transition: transform 0.3s ease-in-out;
    }
    
    .hover-scale:hover {
        transform: scale(1.05);
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f5f9;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #2563eb, #7c3aed);
    }
`;

document.head.appendChild(style);

/**
 * Initialize scroll animations
 */
initializeScrollAnimations();