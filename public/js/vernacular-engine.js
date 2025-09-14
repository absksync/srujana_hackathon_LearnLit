// Vernacular Language Engine JavaScript
let currentLanguage = 'en';

// Content data for different languages
const languageContent = {
    waterCycle: {
        en: {
            explanation: [
                { step: 1, text: "The sun heats up water in oceans, rivers, and lakes", emoji: "☀️💧" },
                { step: 2, text: "Water turns into invisible water vapor and rises up (Evaporation)", emoji: "💨⬆️" },
                { step: 3, text: "High in the sky, vapor cools down and forms tiny water droplets (Condensation)", emoji: "☁️❄️" },
                { step: 4, text: "When clouds get heavy with water, it falls down as rain (Precipitation)", emoji: "🌧️⬇️" },
                { step: 5, text: "Rain flows back to oceans and rivers, and the cycle starts again!", emoji: "🌊🔄" }
            ],
            localExample: {
                title: "🏠 Think of your kitchen!",
                content: "When mom heats water in a pot, you see steam rising up. That steam is like evaporation! When you breathe on a cold window, water droplets appear - that's condensation!"
            },
            smartTranslation: [
                "Evaporation = जब गर्मी से पानी भाप बन जाता है, जैसे केतली से भाप निकलती है",
                "Condensation = जब भाप ठंडी होकर वापस पानी बनती है, जैसे ठंडे गिलास पर पानी की बूंदें",
                "Rain = बादलों से गिरने वाला पानी, जो फिर से नदियों में मिल जाता है"
            ],
            culturalContext: [
                "🌧️ Monsoon season brings life to our crops",
                "🏔️ Rivers like Ganga start from mountain glaciers",
                "🌊 Our ancestors knew about this cycle through Vedic texts"
            ]
        },
        hi: {
            explanation: [
                { step: 1, text: "सूर्य समुद्र, नदियों और झीलों के पानी को गर्म करता है", emoji: "☀️💧" },
                { step: 2, text: "पानी अदृश्य भाप बनकर ऊपर उठता है (वाष्पीकरण)", emoji: "💨⬆️" },
                { step: 3, text: "आसमान में ऊपर, भाप ठंडी होकर छोटी पानी की बूंदें बनाती है (संघनन)", emoji: "☁️❄️" },
                { step: 4, text: "जब बादल पानी से भारी हो जाते हैं, तो बारिश होती है (वर्षा)", emoji: "🌧️⬇️" },
                { step: 5, text: "बारिश का पानी वापस समुद्र और नदियों में चला जाता है, और चक्र फिर शुरू होता है!", emoji: "🌊🔄" }
            ],
            localExample: {
                title: "🏠 अपनी रसोई के बारे में सोचें!",
                content: "जब माँ बर्तन में पानी गर्म करती है, तो आप भाप ऊपर उठते देखते हैं। वह भाप वाष्पीकरण जैसी है! जब आप ठंडी खिड़की पर सांस लेते हैं, तो पानी की बूंदें दिखाई देती हैं - वह संघनन है!"
            },
            smartTranslation: [
                "वाष्पीकरण = जब गर्मी से पानी भाप बन जाता है, जैसे केतली से भाप निकलती है",
                "संघनन = जब भाप ठंडी होकर वापस पानी बनती है, जैसे ठंडे गिलास पर पानी की बूंदें",
                "बारिश = बादलों से गिरने वाला पानी, जो फिर से नदियों में मिल जाता है"
            ],
            culturalContext: [
                "🌧️ मानसून का मौसम हमारी फसलों में जीवन लाता है",
                "🏔️ गंगा जैसी नदियां पहाड़ी ग्लेशियरों से शुरू होती हैं",
                "🌊 हमारे पूर्वजों ने वैदिक ग्रंथों के माध्यम से इस चक्र को जाना था"
            ]
        },
        kn: {
            explanation: [
                { step: 1, text: "ಸೂರ್ಯನು ಸಮುದ್ರ, ನದಿಗಳು ಮತ್ತು ಕೆರೆಗಳ ನೀರನ್ನು ಬಿಸಿಮಾಡುತ್ತಾನೆ", emoji: "☀️💧" },
                { step: 2, text: "ನೀರು ಅದೃಶ್ಯ ಆವಿಯಾಗಿ ಮೇಲಕ್ಕೆ ಏರುತ್ತದೆ (ಬಾಷ್ಪೀಕರಣ)", emoji: "💨⬆️" },
                { step: 3, text: "ಆಕಾಶದಲ್ಲಿ ಮೇಲೆ, ಆವಿ ತಣ್ಣಗಾಗಿ ಸಣ್ಣ ನೀರಿನ ಹನಿಗಳನ್ನು ರೂಪಿಸುತ್ತದೆ (ಸಾಂದ್ರೀಕರಣ)", emoji: "☁️❄️" },
                { step: 4, text: "ಮೋಡಗಳು ನೀರಿನಿಂದ ಭಾರವಾದಾಗ, ಅದು ಮಳೆಯಾಗಿ ಬೀಳುತ್ತದೆ (ವರ್ಷಣ)", emoji: "🌧️⬇️" },
                { step: 5, text: "ಮಳೆ ಮತ್ತೆ ಸಮುದ್ರ ಮತ್ತು ನದಿಗಳಿಗೆ ಹರಿಯುತ್ತದೆ, ಮತ್ತು ಚಕ್ರ ಮತ್ತೆ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ!", emoji: "🌊🔄" }
            ],
            localExample: {
                title: "🏠 ನಿಮ್ಮ ಅಡುಗೆಮನೆಯ ಬಗ್ಗೆ ಯೋಚಿಸಿ!",
                content: "ಅಮ್ಮ ಬಾಣಲೆಯಲ್ಲಿ ನೀರನ್ನು ಬಿಸಿಮಾಡಿದಾಗ, ನೀವು ಆವಿ ಮೇಲಕ್ಕೆ ಏರುವುದನ್ನು ನೋಡುತ್ತೀರಿ. ಆ ಆವಿ ಬಾಷ್ಪೀಕರಣದಂತೆ! ತಣ್ಣನೆಯ ಕಿಟಕಿಯ ಮೇಲೆ ಉಸಿರಾಡಿದಾಗ, ನೀರಿನ ಹನಿಗಳು ಕಾಣಿಸುತ್ತವೆ - ಅದು ಸಾಂದ್ರೀಕರಣ!"
            },
            smartTranslation: [
                "ಬಾಷ್ಪೀಕರಣ = ಶಾಖದಿಂದ ನೀರು ಆವಿಯಾಗುವುದು, ಕೆಟಲ್‌ನಿಂದ ಆವಿ ಬರುವಂತೆ",
                "ಸಾಂದ್ರೀಕರಣ = ಆವಿ ತಣ್ಣಗಾಗಿ ಮತ್ತೆ ನೀರಾಗುವುದು, ತಣ್ಣನೆಯ ಗ್ಲಾಸ್‌ನ ಮೇಲೆ ನೀರಿನ ಹನಿಗಳಂತೆ",
                "ಮಳೆ = ಮೋಡಗಳಿಂದ ಬೀಳುವ ನೀರು, ಅದು ಮತ್ತೆ ನದಿಗಳಿಗೆ ಸೇರುತ್ತದೆ"
            ],
            culturalContext: [
                "🌧️ ಮಾನ್ಸೂನ್ ಋತುವು ನಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಜೀವನ ತರುತ್ತದೆ",
                "🏔️ ಕಾವೇರಿಯಂತಹ ನದಿಗಳು ಪರ್ವತ ಹಿಮನದಿಗಳಿಂದ ಆರಂಭವಾಗುತ್ತವೆ",
                "🌊 ನಮ್ಮ ಪೂರ್ವಜರು ಪುರಾಣಗಳ ಮೂಲಕ ಈ ಚಕ್ರವನ್ನು ತಿಳಿದಿದ್ದರು"
            ]
        },
        mr: {
            explanation: [
                { step: 1, text: "सूर्य समुद्र, नद्या आणि तलावांचे पाणी गरम करतो", emoji: "☀️💧" },
                { step: 2, text: "पाणी अदृश्य वाष्प बनून वर चढते (बाष्पीभवन)", emoji: "💨⬆️" },
                { step: 3, text: "आकाशात वर, वाष्प थंड होऊन लहान पाण्याचे थेंब तयार करते (संक्षेपण)", emoji: "☁️❄️" },
                { step: 4, text: "जेव्हा ढग पाण्याने जड होतात, तेव्हा पाऊस पडतो (पर्जन्य)", emoji: "🌧️⬇️" },
                { step: 5, text: "पाऊस परत समुद्र आणि नद्यांमध्ये वाहतो, आणि चक्र पुन्हा सुरू होते!", emoji: "🌊🔄" }
            ],
            localExample: {
                title: "🏠 तुमच्या स्वयंपाकघराचा विचार करा!",
                content: "जेव्हा आई भांड्यात पाणी गरम करते, तेव्हा तुम्हाला वाफ वर जाताना दिसते. ती वाफ बाष्पीभवनासारखी आहे! जेव्हा तुम्ही थंड खिडकीवर श्वास घेता, तेव्हा पाण्याचे थेंब दिसतात - ते संक्षेपण आहे!"
            },
            smartTranslation: [
                "बाष्पीभवन = उष्णतेमुळे पाणी वाफ बनणे, केटलमधून वाफ निघण्यासारखे",
                "संक्षेपण = वाफ थंड होऊन परत पाणी बनणे, थंड ग्लासवर पाण्याचे थेंब यासारखे",
                "पाऊस = ढगांमधून पडणारे पाणी, जे परत नद्यांमध्ये मिळते"
            ],
            culturalContext: [
                "🌧️ पावसाळा आपल्या पिकांमध्ये जीवन आणतो",
                "🏔️ गोदावरीसारख्या नद्या पर्वतीय हिमनद्यांपासून सुरू होतात",
                "🌊 आपल्या पूर्वजांनी पुराणांच्या माध्यमातून हे चक्र जाणले होते"
            ]
        }
    }
};

// Audio simulation (in a real app, this would play actual audio files)
let isPlaying = false;

document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('click', showLanguageMenu);
    }
    
    // Initialize with English
    updateLanguageDisplay();
});

function showLanguageMenu() {
    // Create a dropdown menu for language selection
    const existingMenu = document.getElementById('languageMenu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }

    const menu = document.createElement('div');
    menu.id = 'languageMenu';
    menu.className = 'absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden';
    menu.style.minWidth = '200px';
    
    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
        { code: 'kn', name: 'ಕನ್ನಡ', flag: '🏛️' },
        { code: 'mr', name: 'मराठी', flag: '🕉️' }
    ];
    
    languages.forEach(lang => {
        const option = document.createElement('button');
        option.className = `w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center space-x-3 transition-colors ${currentLanguage === lang.code ? 'bg-purple-50 text-purple-700' : 'text-gray-700'}`;
        option.innerHTML = `
            <span class="text-xl">${lang.flag}</span>
            <span class="font-semibold">${lang.name}</span>
        `;
        option.onclick = () => {
            selectLanguage(lang.code);
            menu.remove();
        };
        menu.appendChild(option);
    });
    
    const selector = document.getElementById('languageSelector');
    selector.style.position = 'relative';
    selector.appendChild(menu);
}

function selectLanguage(language) {
    currentLanguage = language;
    updateLanguageDisplay();
    updateLanguageSelector();
    
    // Show demo content
    const demoContent = document.getElementById('demoContent');
    if (demoContent.classList.contains('hidden')) {
        demoContent.classList.remove('hidden');
        demoContent.style.animation = 'slideInUp 0.6s ease-out';
    }
    
    // Update content based on selected language
    updateWaterCycleContent();
    showToast(getToastMessage());
}

function getToastMessage() {
    const messages = {
        en: `🌍 Switched to English! Learning with global examples.`,
        hi: `🇮🇳 हिंदी में बदल गया! स्थानीय उदाहरणों के साथ सीख रहे हैं।`,
        kn: `🏛️ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ! ಸ್ಥಳೀಯ ಉದಾಹರಣೆಗಳೊಂದಿಗೆ ಕಲಿಯುತ್ತಿದ್ದೇವೆ.`,
        mr: `🕉️ मराठीत बदलले! स्थानिक उदाहरणांसह शिकत आहोत.`
    };
    return messages[currentLanguage] || messages.en;
}

function updateLanguageDisplay() {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
}

function updateLanguageSelector() {
    const selector = document.getElementById('languageSelector');
    const languageNames = {
        en: '🌐 English',
        hi: '🌐 हिंदी',
        kn: '🌐 ಕನ್ನಡ',
        mr: '🌐 मराठी'
    };
    selector.textContent = languageNames[currentLanguage] || '🌐 English';
}

function updateWaterCycleContent() {
    const content = languageContent.waterCycle[currentLanguage];
    if (!content) return;
    
    // Update explanation
    const explanationDiv = document.getElementById('explanation');
    explanationDiv.innerHTML = '';
    
    content.explanation.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'flex items-start space-x-3 mb-3';
        stepDiv.innerHTML = `
            <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">${step.step}</div>
            <div class="flex-1">
                <p class="text-gray-700">${step.text}</p>
                <span class="text-2xl">${step.emoji}</span>
            </div>
        `;
        
        // Add entrance animation
        stepDiv.style.opacity = '0';
        stepDiv.style.transform = 'translateX(-20px)';
        explanationDiv.appendChild(stepDiv);
        
        setTimeout(() => {
            stepDiv.style.transition = 'all 0.5s ease-out';
            stepDiv.style.opacity = '1';
            stepDiv.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // Update local example
    const localExampleDiv = document.getElementById('localExample');
    localExampleDiv.innerHTML = `
        <div class="font-bold text-yellow-700 mb-2">${content.localExample.title}</div>
        <p class="text-gray-700 text-sm">${content.localExample.content}</p>
    `;
    
    // Update smart translation
    const smartTranslationDiv = document.getElementById('smartTranslation');
    smartTranslationDiv.innerHTML = '';
    
    content.smartTranslation.forEach((translation, index) => {
        const translationDiv = document.createElement('p');
        translationDiv.textContent = translation;
        translationDiv.style.opacity = '0';
        smartTranslationDiv.appendChild(translationDiv);
        
        setTimeout(() => {
            translationDiv.style.transition = 'opacity 0.5s ease-out';
            translationDiv.style.opacity = '1';
        }, index * 200 + 500);
    });
    
    // Update cultural context
    const culturalContextDiv = document.getElementById('culturalContext');
    culturalContextDiv.innerHTML = '';
    
    content.culturalContext.forEach((context, index) => {
        const contextDiv = document.createElement('div');
        contextDiv.className = 'flex items-center space-x-2 bg-white bg-opacity-50 rounded-lg p-2';
        contextDiv.innerHTML = `<span class="text-sm text-gray-700">${context}</span>`;
        
        contextDiv.style.opacity = '0';
        contextDiv.style.transform = 'translateY(10px)';
        culturalContextDiv.appendChild(contextDiv);
        
        setTimeout(() => {
            contextDiv.style.transition = 'all 0.5s ease-out';
            contextDiv.style.opacity = '1';
            contextDiv.style.transform = 'translateY(0)';
        }, index * 150 + 1000);
    });
}

function goHome() {
    window.location.href = '/';
}

function playAudio() {
    if (isPlaying) return;
    
    isPlaying = true;
    const button = event.target.closest('button');
    const originalContent = button.innerHTML;
    
    button.innerHTML = '<span class="text-lg animate-pulse">🔊</span>';
    button.style.animation = 'pulse 1s infinite';
    
    // Simulate audio playback
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.animation = '';
        isPlaying = false;
        
        showToast(currentLanguage === 'en' ? 
            '🔊 Audio narration complete!' : 
            currentLanguage === 'hi' ? '🔊 ऑडियो कथन पूरा!' :
            currentLanguage === 'kn' ? '🔊 ಆಡಿಯೋ ಕಥನ ಪೂರ್ಣ!' :
            '🔊 ऑडिओ कथन पूर्ण!'
        );
    }, 3000);
    
    showToast(currentLanguage === 'en' ? 
        '🎵 Playing narration in your language...' : 
        currentLanguage === 'hi' ? '🎵 आपकी भाषा में कथन चल रहा है...' :
        currentLanguage === 'kn' ? '🎵 ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕಥನ ಪ್ಲೇ ಆಗುತ್ತಿದೆ...' :
        '🎵 तुमच्या भाषेत कथन प्ले होत आहे...'
    );
}

function playSlowNarration() {
    simulateAudioPlayback('slow', 4000);
}

function playNormalNarration() {
    simulateAudioPlayback('normal', 2500);
}

function repeatKeyWords() {
    simulateAudioPlayback('keywords', 1500);
}

function simulateAudioPlayback(type, duration) {
    const button = event.target;
    const originalContent = button.textContent;
    
    button.style.animation = 'pulse 0.5s infinite';
    button.style.backgroundColor = '#8b5cf6';
    button.style.color = 'white';
    
    const messages = {
        slow: {
            en: '🐌 Playing slowly for better understanding...',
            hi: '🐌 बेहतर समझ के लिए धीमे चल रहा है...',
            kn: '🐌 ಉತ್ತಮ ತಿಳುವಳಿಕೆಗಾಗಿ ನಿಧಾನವಾಗಿ ಪ್ಲೇ ಆಗುತ್ತಿದೆ...',
            mr: '🐌 चांगल्या समजुतीसाठी हळू प्ले होत आहे...'
        },
        normal: {
            en: '▶️ Playing at normal speed...',
            hi: '▶️ सामान्य गति से चल रहा है...',
            kn: '▶️ ಸಾಮಾನ್ಯ ವೇಗದಲ್ಲಿ ಪ್ಲೇ ಆಗುತ್ತಿದೆ...',
            mr: '▶️ सामान्य वेगाने प्ले होत आहे...'
        },
        keywords: {
            en: '🔄 Repeating important words...',
            hi: '🔄 महत्वपूर्ण शब्दों को दोहरा रहा है...',
            kn: '🔄 ಪ್ರಮುಖ ಪದಗಳನ್ನು ಪುನರಾವರ್ತಿಸುತ್ತಿದೆ...',
            mr: '🔄 महत्वाचे शब्द पुन्हा म्हणत आहे...'
        }
    };
    
    showToast(messages[type][currentLanguage]);
    
    setTimeout(() => {
        button.style.animation = '';
        button.style.backgroundColor = '';
        button.style.color = '';
        
        const completedMessages = {
            slow: {
                en: '✅ Slow narration complete!',
                hi: '✅ धीमा कथन पूरा!',
                kn: '✅ ನಿಧಾನ ಕಥನ ಪೂರ್ಣ!',
                mr: '✅ मंद कथन पूर्ण!'
            },
            normal: {
                en: '✅ Narration complete!',
                hi: '✅ कथन पूरा!',
                kn: '✅ ಕಥನ ಪೂರ್ಣ!',
                mr: '✅ कथन पूर्ण!'
            },
            keywords: {
                en: '✅ Key words repeated!',
                hi: '✅ मुख्य शब्द दोहराए गए!',
                kn: '✅ ಮುಖ್ಯ ಪದಗಳನ್ನು ಪುನರಾವರ್ತಿಸಲಾಯಿತು!',
                mr: '✅ मुख्य शब्द पुन्हा म्हटले!'
            }
        };
        
        showToast(completedMessages[type][currentLanguage]);
    }, duration);
}

function exploreMoreLanguages() {
    showToast(currentLanguage === 'en' ? 
        '🚀 More subjects coming soon! Math, History, and Geography in your language!' : 
        currentLanguage === 'hi' ? '🚀 और विषय जल्द आ रहे हैं! आपकी भाषा में गणित, इतिहास और भूगोल!' :
        currentLanguage === 'kn' ? '🚀 ಹೆಚ್ಚಿನ ವಿಷಯಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿವೆ! ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಗಣಿತ, ಇತಿಹಾಸ ಮತ್ತು ಭೂಗೋಳ!' :
        '🚀 अधिक विषय लवकरच येत आहेत! तुमच्या भाषेत गणित, इतिहास आणि भूगोल!'
    );
}

function showToast(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-purple-500 text-white px-6 py-3 rounded-full shadow-lg z-50 transform translate-x-full transition-transform duration-300';
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

// Add entrance animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to language cards
    const languageCards = document.querySelectorAll('.language-card');
    languageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.boxShadow = 'none';
        });
    });
});

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('languageMenu');
    const selector = document.getElementById('languageSelector');
    
    if (menu && !selector.contains(event.target)) {
        menu.remove();
    }
});