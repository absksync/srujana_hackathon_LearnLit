// Global variables
let currentLanguage = 'en';

// Language translations
const translations = {
    en: {
        languageButton: '🌐 English'
    },
    hi: {
        languageButton: '🌐 हिन्दी'
    }
};

// Navigation function
function navigateToScreen(url) {
    window.location.href = url;
}

// Language toggle functionality
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    updateLanguage();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en][data-hi]');
    const languageButton = document.getElementById('languageToggle');
    
    elements.forEach(element => {
        if (currentLanguage === 'hi' && element.getAttribute('data-hi')) {
            element.textContent = element.getAttribute('data-hi');
        } else if (element.getAttribute('data-en')) {
            element.textContent = element.getAttribute('data-en');
        }
    });

    if (languageButton) {
        languageButton.textContent = translations[currentLanguage].languageButton;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle event listener
    const languageButton = document.getElementById('languageToggle');
    if (languageButton) {
        languageButton.addEventListener('click', toggleLanguage);
    }

    // Initialize with English
    updateLanguage();

    // Add smooth transitions to cards
    const cards = document.querySelectorAll('.cursor-pointer');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Utility functions for other screens
function goBack() {
    window.history.back();
}

function goHome() {
    window.location.href = '/';
}