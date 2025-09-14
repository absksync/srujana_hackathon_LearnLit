// Mascot Doubt Buddy JavaScript
class MascotDoubtBuddy {
    constructor() {
        this.currentLanguage = 'en';
        this.isVoiceRecording = false;
        this.chatHistory = [];
        this.ollieResponses = {
            greetings: [
                "Hi there! I'm Ollie! 🦉 What can I help you learn today?",
                "Hello, my curious friend! 🌟 Ready for some fun learning?",
                "Hey! I'm excited to help you discover something new! ✨"
            ],
            subjects: {
                math: [
                    "Oh, I love math! 🔢 Numbers are like magical puzzles waiting to be solved!",
                    "Mathematics is fantastic! Let me break it down in a fun way! 🎯",
                    "Math time! My favorite! Let's make those numbers dance! 💃"
                ],
                science: [
                    "Science is amazing! 🔬 Let's explore the wonders of our world together!",
                    "I love science experiments! Let me show you how things work! ⚗️",
                    "Science rocks! 🌟 Ready to discover some cool facts?"
                ],
                history: [
                    "History is like a time machine! 🏛️ Let's travel back and learn!",
                    "Oh, historical adventures! 📜 I have so many exciting stories to share!",
                    "Time to explore the past! 🗺️ History is full of amazing people and events!"
                ],
                language: [
                    "Languages are beautiful! 📚 Let's play with words and meanings!",
                    "I love helping with language! 🎭 Words are like colorful paint for our thoughts!",
                    "Language learning is fun! 🗣️ Let's make those words come alive!"
                ]
            },
            encouragement: [
                "You're doing great! Keep asking questions! 🌟",
                "That's a wonderful question! You're such a curious learner! 🎉",
                "I love your enthusiasm! Learning is an adventure! 🚀",
                "Excellent thinking! You're getting smarter every day! 🧠✨"
            ]
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeOllie();
        this.startAnimations();
        this.loadWelcomeMessage();
    }

    setupEventListeners() {
        // Language toggle
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        
        languageToggle?.addEventListener('click', () => {
            languageDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageToggle?.contains(e.target)) {
                languageDropdown?.classList.add('hidden');
            }
        });

        // Chat input
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        sendBtn?.addEventListener('click', () => this.sendMessage());

        // Voice recording
        const voiceToggle = document.getElementById('voice-toggle');
        voiceToggle?.addEventListener('click', () => this.toggleVoiceRecording());

        // Clear chat
        const clearChat = document.getElementById('clear-chat');
        clearChat?.addEventListener('click', () => this.clearChat());

        // Emoji picker
        const emojiBtn = document.getElementById('emoji-btn');
        emojiBtn?.addEventListener('click', () => this.showEmojiPicker());

        // Ollie mascot interaction
        const ollieMascot = document.getElementById('ollie-mascot');
        ollieMascot?.addEventListener('click', () => this.interactWithOllie());
    }

    initializeOllie() {
        const ollie = document.getElementById('ollie-mascot');
        const speechBubble = document.getElementById('speech-bubble');
        
        // Show greeting after a delay
        setTimeout(() => {
            speechBubble.style.opacity = '1';
            speechBubble.style.transform = 'translateX(-50%) scale(1)';
        }, 1000);
        
        // Hide speech bubble after showing
        setTimeout(() => {
            speechBubble.style.opacity = '0';
            speechBubble.style.transform = 'translateX(-50%) scale(0.8)';
        }, 4000);
    }

    startAnimations() {
        // Animate stats counters
        this.animateCounters();
        
        // Periodic Ollie animations
        setInterval(() => {
            this.randomOllieAnimation();
        }, 10000);
        
        // Floating elements
        this.createFloatingElements();
    }

    animateCounters() {
        const counters = [
            { id: 'questions-answered', target: 1247 },
            { id: 'students-helped', target: 892 },
            { id: 'fun-moments', target: 2156 },
            { id: 'smiles-created', target: 5423 }
        ];
        
        counters.forEach(counter => {
            const element = document.getElementById(counter.id);
            if (!element) return;
            
            let current = 0;
            const increment = counter.target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= counter.target) {
                    current = counter.target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString();
            }, 30);
        });
    }

    randomOllieAnimation() {
        const ollie = document.getElementById('ollie-mascot');
        const animations = ['bounce', 'pulse', 'wiggle'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        
        ollie.style.animation = `${randomAnimation} 1s ease-in-out`;
        setTimeout(() => {
            ollie.style.animation = '';
        }, 1000);
    }

    createFloatingElements() {
        const container = document.querySelector('.floating-hearts');
        if (!container) return;
        
        setInterval(() => {
            const emojis = ['✨', '🌟', '💫', '⭐', '🎉'];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            
            const element = document.createElement('span');
            element.textContent = emoji;
            element.className = 'floating-element';
            element.style.cssText = `
                position: absolute;
                font-size: 14px;
                opacity: 0;
                animation: floatUp 3s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
            `;
            
            container.appendChild(element);
            
            setTimeout(() => {
                container.removeChild(element);
            }, 3000);
        }, 5000);
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        // Process message and generate Ollie's response
        setTimeout(() => {
            this.generateOllieResponse(message);
        }, 1000 + Math.random() * 2000); // Random delay for more natural feel
    }

    addUserMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'flex items-start space-x-3 justify-end';
        
        messageElement.innerHTML = `
            <div class="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-md shadow-sm">
                <p>${this.escapeHtml(message)}</p>
            </div>
            <div class="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-sm">👤</span>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        // Add to chat history
        this.chatHistory.push({ type: 'user', message: message });
    }

    generateOllieResponse(userMessage) {
        const response = this.getAIResponse(userMessage);
        this.addOllieMessage(response);
        this.triggerOllieAnimation();
        
        // Simulate voice response
        if (this.shouldPlayVoice()) {
            this.playVoiceResponse(response);
        }
    }

    getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Subject-specific responses
        if (lowerMessage.includes('math') || lowerMessage.includes('equation') || lowerMessage.includes('number')) {
            return this.getRandomResponse(this.ollieResponses.subjects.math);
        }
        
        if (lowerMessage.includes('science') || lowerMessage.includes('experiment') || lowerMessage.includes('biology')) {
            return this.getRandomResponse(this.ollieResponses.subjects.science);
        }
        
        if (lowerMessage.includes('history') || lowerMessage.includes('past') || lowerMessage.includes('ancient')) {
            return this.getRandomResponse(this.ollieResponses.subjects.history);
        }
        
        if (lowerMessage.includes('language') || lowerMessage.includes('word') || lowerMessage.includes('grammar')) {
            return this.getRandomResponse(this.ollieResponses.subjects.language);
        }
        
        // Specific educational responses
        if (lowerMessage.includes('photosynthesis')) {
            return "Photosynthesis is like a magical kitchen inside plants! 🌱 Plants use sunlight, water, and carbon dioxide to make their own food (glucose) and release oxygen for us to breathe! It's like they're cooking with sunlight! ☀️🍽️";
        }
        
        if (lowerMessage.includes('fraction')) {
            return "Fractions are like pieces of pizza! 🍕 If you have a whole pizza and cut it into 4 equal pieces, each piece is 1/4 (one-fourth) of the pizza! The bottom number tells us how many pieces the whole thing is cut into, and the top number tells us how many pieces we have! Easy, right? 😊";
        }
        
        if (lowerMessage.includes('dinosaur')) {
            return "Dinosaurs are SO cool! 🦕 They lived millions of years ago and came in all shapes and sizes! Some were as tiny as chickens, others were HUGE like school buses! T-Rex had tiny arms but giant teeth, while Brontosaurus had a super long neck to reach tall trees! What's your favorite dinosaur? 🦖✨";
        }
        
        // Greeting responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return this.getRandomResponse(this.ollieResponses.greetings);
        }
        
        // Encouragement for asking questions
        if (lowerMessage.includes('help') || lowerMessage.includes('question') || lowerMessage.includes('learn')) {
            return this.getRandomResponse(this.ollieResponses.encouragement);
        }
        
        // Default encouraging response
        return "That's a fantastic question! 🌟 I love curious minds like yours! Let me think about the best way to explain this... Could you tell me a bit more about what specific part you'd like to understand better? I'm here to make learning fun and easy! 🦉✨";
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addOllieMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'flex items-start space-x-3';
        
        messageElement.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 animate-bounce">
                <span class="text-sm">🦉</span>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-md shadow-sm border border-orange-100">
                <p class="text-gray-800">${message}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        // Add to chat history
        this.chatHistory.push({ type: 'ollie', message: message });
        
        // Stop bounce animation after a moment
        setTimeout(() => {
            const avatar = messageElement.querySelector('.animate-bounce');
            if (avatar) avatar.classList.remove('animate-bounce');
        }, 2000);
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    triggerOllieAnimation() {
        const ollie = document.getElementById('ollie-mascot');
        ollie.classList.add('animate-pulse');
        
        setTimeout(() => {
            ollie.classList.remove('animate-pulse');
        }, 2000);
    }

    shouldPlayVoice() {
        // Simple logic to determine if voice should play
        return Math.random() > 0.7; // 30% chance for demo purposes
    }

    playVoiceResponse(text) {
        // Simulate voice response (in real implementation, would use Web Speech API)
        console.log('🔊 Ollie says:', text);
        this.showNotification('🎵 Ollie is speaking!', 'info');
    }

    toggleVoiceRecording() {
        if (this.isVoiceRecording) {
            this.stopVoiceRecording();
        } else {
            this.startVoiceRecording();
        }
    }

    startVoiceRecording() {
        this.isVoiceRecording = true;
        document.getElementById('voice-modal')?.classList.remove('hidden');
        
        // Simulate voice recording (in real implementation, would use Web Speech API)
        setTimeout(() => {
            this.stopVoiceRecording();
            this.addUserMessage("What is photosynthesis?"); // Simulated voice input
        }, 3000);
    }

    stopVoiceRecording() {
        this.isVoiceRecording = false;
        document.getElementById('voice-modal')?.classList.add('hidden');
    }

    interactWithOllie() {
        const speechBubble = document.getElementById('speech-bubble');
        const responses = [
            "Hoot hoot! 🦉",
            "Ready to learn? 🌟",
            "Ask me anything! 💫",
            "Let's have fun! 🎉",
            "I'm here to help! ✨"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        speechBubble.querySelector('[data-translate="ollie_greeting"]').textContent = randomResponse;
        
        speechBubble.style.opacity = '1';
        speechBubble.style.transform = 'translateX(-50%) scale(1)';
        
        setTimeout(() => {
            speechBubble.style.opacity = '0';
            speechBubble.style.transform = 'translateX(-50%) scale(0.8)';
        }, 3000);
        
        // Trigger animation
        this.triggerOllieAnimation();
    }

    clearChat() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-sm">🦉</span>
                </div>
                <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-md shadow-sm border border-orange-100">
                    <p class="text-gray-800" data-translate="welcome_message">
                        Hello there! I'm Ollie, your friendly learning companion! 🌟 Ask me anything about your studies - Math, Science, History, or any subject you're curious about. I'll explain it in a fun and easy way!
                    </p>
                </div>
            </div>
        `;
        
        this.chatHistory = [];
        this.showNotification('Chat cleared! Ready for new questions! 🌟', 'success');
    }

    showEmojiPicker() {
        document.getElementById('emoji-picker')?.classList.remove('hidden');
    }

    closeEmojiPicker() {
        document.getElementById('emoji-picker')?.classList.add('hidden');
    }

    addEmoji(emoji) {
        const input = document.getElementById('chat-input');
        input.value += emoji;
        input.focus();
        this.closeEmojiPicker();
    }

    loadWelcomeMessage() {
        // Simulate initial loading
        setTimeout(() => {
            this.showNotification('Ollie is ready to help! 🦉✨', 'success');
        }, 2000);
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-orange-500',
            warning: 'bg-yellow-500'
        };
        
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Slide out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Translation system
const translations = {
    en: {
        ollie_greeting: "Hi! I'm Ollie! 🌟",
        meet_ollie: "Meet Ollie, Your",
        ollie_description: "I'm here to answer all your questions with fun gestures, voice responses, and interactive animations. Let's make learning exciting together!",
        chat_with_ollie: "Chat with Ollie",
        ollie_status: "Ready to help • Online",
        welcome_message: "Hello there! I'm Ollie, your friendly learning companion! 🌟 Ask me anything about your studies - Math, Science, History, or any subject you're curious about. I'll explain it in a fun and easy way!",
        ask_ollie: "Ask Ollie anything...",
        quick_questions: "Quick questions to get started:",
        q1: "What is photosynthesis? 🌱",
        q2: "Explain fractions simply 🔢",
        q3: "Tell me about dinosaurs 🦕",
        ollie_features: "What Makes Ollie Special?",
        fun_animations: "Fun Animations",
        animations_desc: "I use exciting gestures and movements to make learning more engaging and memorable!",
        voice_responses: "Voice Responses",
        voice_desc: "Hear my friendly voice explaining concepts in a way that's easy to understand!",
        interactive_learning: "Interactive Learning",
        interactive_desc: "I adapt to your learning style and make each explanation perfect just for you!",
        subjects_i_love: "Subjects I Love to Help With",
        mathematics: "Mathematics",
        science: "Science",
        history: "History",
        language: "Language",
        ollie_stats: "Ollie's Helping Stats",
        questions_answered: "Questions Answered",
        students_helped: "Students Helped",
        fun_moments: "Fun Moments",
        smiles_created: "Smiles Created",
        choose_emoji: "Choose an Emoji",
        listening: "Listening...",
        speak_now: "Speak now and I'll help you with your question!",
        stop_recording: "Stop Recording",
        back: "Back to Dashboard"
    },
    hi: {
        ollie_greeting: "नमस्ते! मैं ओली हूँ! 🌟",
        meet_ollie: "ओली से मिलें, आपके",
        ollie_description: "मैं यहाँ हूँ आपके सभी सवालों का जवाब देने के लिए मज़ेदार हाव-भाव, आवाज़ की प्रतिक्रियाओं और इंटरैक्टिव एनीमेशन के साथ।",
        chat_with_ollie: "ओली से बात करें",
        ollie_status: "मदद के लिए तैयार • ऑनलाइन",
        welcome_message: "नमस्ते! मैं ओली हूँ, आपका मित्रवत सीखने का साथी! 🌟 अपनी पढ़ाई के बारे में कुछ भी पूछें - गणित, विज्ञान, इतिहास, या कोई भी विषय।",
        ask_ollie: "ओली से कुछ भी पूछें...",
        quick_questions: "शुरुआत के लिए त्वरित प्रश्न:",
        q1: "प्रकाश संश्लेषण क्या है? 🌱",
        q2: "भिन्नों को सरल तरीके से समझाएं 🔢",
        q3: "डायनासोर के बारे में बताएं 🦕",
        ollie_features: "ओली को खास क्या बनाता है?",
        fun_animations: "मज़ेदार एनीमेशन",
        animations_desc: "मैं सीखने को और दिलचस्प और यादगार बनाने के लिए रोमांचक हाव-भाव और हरकतों का उपयोग करता हूँ!",
        voice_responses: "आवाज़ की प्रतिक्रियाएं",
        voice_desc: "मेरी मित्रवत आवाज़ सुनें जो अवधारणाओं को समझने में आसान तरीके से समझाती है!",
        interactive_learning: "इंटरैक्टिव लर्निंग",
        interactive_desc: "मैं आपकी सीखने की शैली के अनुकूल होता हूँ और हर व्याख्या को आपके लिए एकदम सही बनाता हूँ!",
        subjects_i_love: "जिन विषयों में मदद करना मुझे पसंद है",
        mathematics: "गणित",
        science: "विज्ञान",
        history: "इतिहास",
        language: "भाषा",
        ollie_stats: "ओली के मदद के आंकड़े",
        questions_answered: "उत्तर दिए गए प्रश्न",
        students_helped: "मदद किए गए छात्र",
        fun_moments: "मज़ेदार पल",
        smiles_created: "बनाई गई मुस्कानें",
        choose_emoji: "एक इमोजी चुनें",
        listening: "सुन रहा हूँ...",
        speak_now: "अब बोलें और मैं आपके प्रश्न में मदद करूंगा!",
        stop_recording: "रिकॉर्डिंग बंद करें",
        back: "डैशबोर्ड पर वापस"
    }
};

function switchLanguage(lang) {
    const mascot = window.mascotBuddy;
    if (mascot) {
        mascot.currentLanguage = lang;
        document.getElementById('current-language').textContent = lang === 'en' ? 'English' : 'हिंदी';
        document.getElementById('language-dropdown').classList.add('hidden');
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update placeholder
        const input = document.getElementById('chat-input');
        if (input && translations[lang]['ask_ollie']) {
            input.placeholder = translations[lang]['ask_ollie'];
        }
    }
}

// Global functions for HTML onclick handlers
function askQuickQuestion(question) {
    const input = document.getElementById('chat-input');
    input.value = question;
    window.mascotBuddy?.sendMessage();
}

function selectSubject(subject) {
    const questions = {
        math: "I need help with mathematics!",
        science: "Can you help me with science?",
        history: "I want to learn about history!",
        language: "Help me with language learning!"
    };
    
    const input = document.getElementById('chat-input');
    input.value = questions[subject] || "Help me learn!";
    window.mascotBuddy?.sendMessage();
}

function closeEmojiPicker() {
    window.mascotBuddy?.closeEmojiPicker();
}

function addEmoji(emoji) {
    window.mascotBuddy?.addEmoji(emoji);
}

function stopRecording() {
    window.mascotBuddy?.stopVoiceRecording();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mascotBuddy = new MascotDoubtBuddy();
});