// LearnFlow Motivation Coach JavaScript
let currentLanguage = 'en';

// Motivation messages pool
const motivationMessages = {
    en: [
        {
            title: "Hey Champion! 🏆",
            message: "I noticed you're getting better at Math every day! You solved 8 more problems correctly than last week. Keep going - you're building an amazing math brain! 🧠✨"
        },
        {
            title: "Super Star! ⭐",
            message: "Wow! You've been consistent for 5 days in a row. That's the secret superpower of all great learners - showing up every day! 🦸‍♀️"
        },
        {
            title: "Science Genius! 🔬",
            message: "Your curiosity in Science is incredible! You asked 12 thoughtful questions this week. Great scientists always ask 'why' and 'how' - just like you! 🌟"
        },
        {
            title: "Reading Rockstar! 📚",
            message: "I love how you take your time to understand stories! You're not just reading words, you're building whole movie theaters in your mind! 🎬✨"
        },
        {
            title: "Math Magician! ✨",
            message: "Those multiplication tables are becoming your best friends! Remember when 7×8 was tricky? Now you solve it faster than I can blink! 👀⚡"
        }
    ],
    hi: [
        {
            title: "अरे चैंपियन! 🏆",
            message: "मैंने देखा है कि आप रोज गणित में बेहतर हो रहे हैं! आपने पिछले सप्ताह से 8 और सवाल सही किए हैं। आगे बढ़ते रहें - आप एक अद्भुत गणित मस्तिष्क बना रहे हैं! 🧠✨"
        },
        {
            title: "सुपर स्टार! ⭐",
            message: "वाह! आप लगातार 5 दिनों तक निरंतर रहे हैं। यह सभी महान शिक्षार्थियों की गुप्त महाशक्ति है - हर दिन दिखाना! 🦸‍♀️"
        },
        {
            title: "विज्ञान प्रतिभा! 🔬",
            message: "विज्ञान में आपकी जिज्ञासा अविश्वसनीय है! आपने इस सप्ताह 12 विचारशील प्रश्न पूछे। महान वैज्ञानिक हमेशा 'क्यों' और 'कैसे' पूछते हैं - बिल्कुल आपकी तरह! 🌟"
        },
        {
            title: "रीडिंग रॉकस्टार! 📚",
            message: "मुझे पसंद है कि आप कहानियों को समझने के लिए अपना समय लेते हैं! आप सिर्फ शब्द नहीं पढ़ रहे, आप अपने दिमाग में पूरे मूवी थिएटर बना रहे हैं! 🎬✨"
        },
        {
            title: "गणित जादूगर! ✨",
            message: "वे गुणा सारणी आपके सबसे अच्छे दोस्त बन रहे हैं! याद है जब 7×8 मुश्किल था? अब आप इसे मेरी पलक झपकने से भी तेज हल करते हैं! 👀⚡"
        }
    ]
};

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // Initialize language
    updateLanguageDisplay();
    
    // Add entrance animations
    addEntranceAnimations();
});

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    updateLanguageDisplay();
    updateLanguageToggleButton();
    updateMotivationMessage();
}

function updateLanguageDisplay() {
    const elements = document.querySelectorAll('[data-en][data-hi]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
}

function updateLanguageToggleButton() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.textContent = currentLanguage === 'en' ? '🌐 हिंदी' : '🌐 English';
    }
}

function goHome() {
    window.location.href = '/';
}

function getNewMotivation() {
    const messages = motivationMessages[currentLanguage];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const motivationDiv = document.getElementById('todaysMotivation');
    const currentTitle = motivationDiv.querySelector('p:first-child');
    const currentMessage = motivationDiv.querySelector('p:last-child');
    
    // Add fade out animation
    motivationDiv.style.transition = 'all 0.3s ease-out';
    motivationDiv.style.transform = 'scale(0.95)';
    motivationDiv.style.opacity = '0.7';
    
    setTimeout(() => {
        currentTitle.textContent = randomMessage.title;
        currentMessage.textContent = randomMessage.message;
        
        // Fade back in
        motivationDiv.style.transform = 'scale(1)';
        motivationDiv.style.opacity = '1';
        
        // Add a little bounce
        setTimeout(() => {
            motivationDiv.style.animation = 'bounce 0.6s ease-out';
        }, 300);
    }, 300);
    
    showToast(currentLanguage === 'en' ? 
        '🎲 New motivation loaded!' : 
        '🎲 नई प्रेरणा लोड हुई!'
    );
}

function updateMotivationMessage() {
    // Update the motivation message when language changes
    const messages = motivationMessages[currentLanguage];
    const randomMessage = messages[0]; // Use first message for consistency
    
    const motivationDiv = document.getElementById('todaysMotivation');
    const currentTitle = motivationDiv.querySelector('p:first-child');
    const currentMessage = motivationDiv.querySelector('p:last-child');
    
    currentTitle.textContent = randomMessage.title;
    currentMessage.textContent = randomMessage.message;
}

function markTipUseful() {
    showToast(currentLanguage === 'en' ? 
        '👍 Thanks for the feedback! I\'ll remember this helps you.' : 
        '👍 फीडबैक के लिए धन्यवाद! मैं याद रखूंगा कि यह आपकी मदद करता है।'
    );
    
    // Add visual feedback
    const button = event.target;
    button.style.animation = 'pulse 0.6s ease-out';
    button.style.color = '#16a34a';
}

function shareAchievement() {
    showToast(currentLanguage === 'en' ? 
        '📢 Achievement shared! Your family will be so proud!' : 
        '📢 उपलब्धि साझा की गई! आपका परिवार बहुत गर्व करेगा!'
    );
    
    // Could integrate with actual sharing functionality
    const button = event.target;
    button.style.animation = 'wiggle 0.8s ease-out';
}

function tryStrategy() {
    showToast(currentLanguage === 'en' ? 
        '🚀 Great choice! The Story Method is super effective for visual learners like you!' : 
        '🚀 बेहतरीन विकल्प! कहानी विधि आपके जैसे दृश्य शिक्षार्थियों के लिए बहुत प्रभावी है!'
    );
    
    // Add bounce animation to the card
    const button = event.target;
    const card = button.closest('.advice-card');
    card.style.animation = 'bounceIn 0.6s ease-out';
}

function acceptChallenge() {
    showToast(currentLanguage === 'en' ? 
        '💪 Challenge accepted! I know you can do this, champion!' : 
        '💪 चुनौती स्वीकार की गई! मुझे पता है कि आप यह कर सकते हैं, चैंपियन!'
    );
    
    // Could redirect to actual challenge or practice mode
    const button = event.target;
    button.style.animation = 'pulse 0.6s ease-out';
    button.style.backgroundColor = '#f97316';
    button.style.color = 'white';
}

function viewDetailedProgress() {
    showToast(currentLanguage === 'en' ? 
        '📊 Coming soon! Detailed progress analytics in development.' : 
        '📊 जल्द आ रहा है! विस्तृत प्रगति विश्लेषण विकास में है।'
    );
}

function addEntranceAnimations() {
    // Add staggered entrance animations to behavior cards
    const behaviorCards = document.querySelectorAll('.behavior-card');
    behaviorCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add staggered entrance animations to advice cards
    const adviceCards = document.querySelectorAll('.advice-card');
    adviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, (index * 100) + 800); // Start after behavior cards
    });
}

function showToast(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Slide in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(full)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to behavior cards
    const behaviorCards = document.querySelectorAll('.behavior-card');
    behaviorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover effects to advice cards
    const adviceCards = document.querySelectorAll('.advice-card');
    adviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Simulate real-time behavior tracking
function simulateBehaviorUpdates() {
    // This would connect to real analytics in a production app
    setInterval(() => {
        // Update energy levels randomly to simulate real-time tracking
        updateEnergyLevels();
    }, 10000); // Update every 10 seconds for demo
}

function updateEnergyLevels() {
    const energyDots = document.querySelectorAll('.behavior-card .flex.space-x-1');
    
    energyDots.forEach(dotContainer => {
        const dots = dotContainer.querySelectorAll('.w-3.h-3');
        dots.forEach((dot, index) => {
            // Random energy level simulation
            const isActive = Math.random() > 0.3;
            if (isActive) {
                dot.className = 'w-3 h-3 bg-green-400 rounded-full';
            } else {
                dot.className = 'w-3 h-3 bg-gray-200 rounded-full';
            }
        });
    });
}

// Initialize behavior simulation (commented out for demo)
// simulateBehaviorUpdates();