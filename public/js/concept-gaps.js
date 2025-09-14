// Concept Gap Mapper JavaScript
let currentLanguage = 'en';
let selectedSubject = null;

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // Initialize language
    updateLanguageDisplay();
});

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    updateLanguageDisplay();
    updateLanguageToggleButton();
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

function startGapAnalysis() {
    // Hide intro section and show subject selection
    const introSection = document.querySelector('.slide-in-up');
    const subjectSelection = document.getElementById('subjectSelection');
    
    introSection.style.transform = 'translateY(-20px)';
    introSection.style.opacity = '0';
    
    setTimeout(() => {
        introSection.style.display = 'none';
        subjectSelection.classList.remove('hidden');
        subjectSelection.style.animation = 'slideInUp 0.6s ease-out';
    }, 300);
}

function selectSubject(subject) {
    selectedSubject = subject;
    
    // Hide subject selection and show gap analysis results
    const subjectSelection = document.getElementById('subjectSelection');
    const gapResults = document.getElementById('gapAnalysisResults');
    
    subjectSelection.style.transform = 'translateY(-20px)';
    subjectSelection.style.opacity = '0';
    
    setTimeout(() => {
        subjectSelection.style.display = 'none';
        gapResults.classList.remove('hidden');
        
        // Add slide-in animation to each section
        const sections = gapResults.children;
        Array.from(sections).forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            setTimeout(() => {
                section.style.transition = 'all 0.6s ease-out';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Generate subject-specific mistakes
        generateSubjectMistakes(subject);
    }, 300);
}

function generateSubjectMistakes(subject) {
    const mistakesList = document.getElementById('mistakesList');
    let mistakes = [];
    
    switch(subject) {
        case 'math':
            mistakes = [
                {
                    icon: '❌',
                    title: currentLanguage === 'en' ? 'Addition with Carrying' : 'हासिल के साथ जोड़',
                    description: currentLanguage === 'en' ? 
                        'You wrote 47 + 29 = 66, but the correct answer is 76. You forgot to carry the 1!' :
                        'आपने 47 + 29 = 66 लिखा, लेकिन सही उत्तर 76 है। आप 1 का हासिल ले जाना भूल गए!',
                    subject: currentLanguage === 'en' ? 'Math' : 'गणित',
                    concept: 'carrying',
                    time: currentLanguage === 'en' ? '2 minutes to fix' : 'ठीक करने में 2 मिनट',
                    color: 'red'
                },
                {
                    icon: '🔢',
                    title: currentLanguage === 'en' ? 'Multiplication Tables' : 'गुणा सारणी',
                    description: currentLanguage === 'en' ? 
                        'You keep mixing up 7 × 8 = 54 instead of 56. Let\'s practice the 7 and 8 tables!' :
                        'आप 7 × 8 = 56 के बजाय 54 लिख रहे हैं। आइए 7 और 8 की सारणी का अभ्यास करें!',
                    subject: currentLanguage === 'en' ? 'Math' : 'गणित',
                    concept: 'tables',
                    time: currentLanguage === 'en' ? '3 minutes to master' : 'महारत हासिल करने में 3 मिनट',
                    color: 'blue'
                }
            ];
            break;
        case 'english':
            mistakes = [
                {
                    icon: '⚠️',
                    title: currentLanguage === 'en' ? 'Past Tense Verbs' : 'भूतकाल की क्रिया',
                    description: currentLanguage === 'en' ? 
                        'You wrote "I goed to school" instead of "I went to school". Some verbs change completely in past tense!' :
                        'आपने "I goed to school" के बजाय "I went to school" लिखा। कुछ क्रियाएं भूतकाल में पूरी तरह बदल जाती हैं!',
                    subject: currentLanguage === 'en' ? 'English' : 'अंग्रेजी',
                    concept: 'irregular-verbs',
                    time: currentLanguage === 'en' ? '3 minutes to fix' : 'ठीक करने में 3 मिनट',
                    color: 'yellow'
                },
                {
                    icon: '📖',
                    title: currentLanguage === 'en' ? 'Reading Comprehension' : 'पठन बोध',
                    description: currentLanguage === 'en' ? 
                        'You missed the main idea in the story about the brave little mouse. Let\'s practice finding key details!' :
                        'आपने बहादुर छोटे चूहे की कहानी में मुख्य विचार को नहीं समझा। आइए मुख्य विवरण खोजने का अभ्यास करें!',
                    subject: currentLanguage === 'en' ? 'English' : 'अंग्रेजी',
                    concept: 'comprehension',
                    time: currentLanguage === 'en' ? '4 minutes to improve' : 'सुधार में 4 मिनट',
                    color: 'green'
                }
            ];
            break;
        case 'science':
            mistakes = [
                {
                    icon: '🔬',
                    title: currentLanguage === 'en' ? 'States of Matter' : 'पदार्थ की अवस्थाएं',
                    description: currentLanguage === 'en' ? 
                        'You said ice is a liquid, but ice is actually solid water! Water can be solid, liquid, or gas.' :
                        'आपने कहा बर्फ तरल है, लेकिन बर्फ वास्तव में ठोस पानी है! पानी ठोस, तरल या गैस हो सकता है।',
                    subject: currentLanguage === 'en' ? 'Science' : 'विज्ञान',
                    concept: 'states-of-matter',
                    time: currentLanguage === 'en' ? '4 minutes to understand' : 'समझने में 4 मिनट',
                    color: 'blue'
                },
                {
                    icon: '🌱',
                    title: currentLanguage === 'en' ? 'Plant Parts' : 'पौधे के भाग',
                    description: currentLanguage === 'en' ? 
                        'You mixed up roots and stems! Roots grow down into soil, stems grow up toward the sun.' :
                        'आपने जड़ों और तनों को मिला दिया! जड़ें मिट्टी में नीचे की ओर बढ़ती हैं, तना सूर्य की ओर ऊपर बढ़ता है।',
                    subject: currentLanguage === 'en' ? 'Science' : 'विज्ञान',
                    concept: 'plant-parts',
                    time: currentLanguage === 'en' ? '3 minutes to learn' : 'सीखने में 3 मिनट',
                    color: 'green'
                }
            ];
            break;
        case 'social':
            mistakes = [
                {
                    icon: '🗺️',
                    title: currentLanguage === 'en' ? 'Directions & Maps' : 'दिशाएं और नक्शे',
                    description: currentLanguage === 'en' ? 
                        'You said the sun rises in the west, but it actually rises in the east! Remember: Never Eat Soggy Waffles (N-E-S-W).' :
                        'आपने कहा सूर्य पश्चिम में उगता है, लेकिन यह वास्तव में पूर्व में उगता है! याद रखें: उत्तर-पूर्व-दक्षिण-पश्चिम।',
                    subject: currentLanguage === 'en' ? 'Social Studies' : 'सामाजिक अध्ययन',
                    concept: 'directions',
                    time: currentLanguage === 'en' ? '2 minutes to remember' : 'याद रखने में 2 मिनट',
                    color: 'orange'
                },
                {
                    icon: '🏛️',
                    title: currentLanguage === 'en' ? 'Indian History' : 'भारतीय इतिहास',
                    description: currentLanguage === 'en' ? 
                        'You mixed up the Mughal and Gupta empires! The Guptas came much earlier and were famous for mathematics.' :
                        'आपने मुगल और गुप्त साम्राज्यों को मिला दिया! गुप्त बहुत पहले आए थे और गणित के लिए प्रसिद्ध थे।',
                    subject: currentLanguage === 'en' ? 'Social Studies' : 'सामाजिक अध्ययन',
                    concept: 'indian-empires',
                    time: currentLanguage === 'en' ? '5 minutes to clarify' : 'स्पष्ट करने में 5 मिनट',
                    color: 'purple'
                }
            ];
            break;
    }
    
    // Clear existing mistakes and add new ones
    mistakesList.innerHTML = '';
    mistakes.forEach(mistake => {
        const mistakeElement = createMistakeElement(mistake);
        mistakesList.appendChild(mistakeElement);
    });
}

function createMistakeElement(mistake) {
    const div = document.createElement('div');
    div.className = `mistake-item bg-${mistake.color}-50 border border-${mistake.color}-200 rounded-2xl p-6`;
    
    div.innerHTML = `
        <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-${mistake.color}-100 rounded-full flex items-center justify-center">
                    <span class="text-xl">${mistake.icon}</span>
                </div>
            </div>
            <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-gray-900">${mistake.title}</h4>
                    <span class="bg-${mistake.color}-100 text-${mistake.color}-800 text-xs px-3 py-1 rounded-full">${mistake.subject}</span>
                </div>
                <p class="text-gray-600 mb-3">${mistake.description}</p>
                <div class="flex items-center space-x-3">
                    <button onclick="learnConcept('${mistake.concept}')" class="bg-${getButtonColor(mistake.color)}-500 hover:bg-${getButtonColor(mistake.color)}-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                        🎯 ${currentLanguage === 'en' ? 'Fix This Now!' : 'अभी ठीक करें!'}
                    </button>
                    <span class="text-xs text-gray-500">${mistake.time}</span>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

function getButtonColor(color) {
    const colorMap = {
        'red': 'red',
        'yellow': 'yellow',
        'blue': 'blue',
        'green': 'green',
        'orange': 'orange',
        'purple': 'purple'
    };
    return colorMap[color] || 'blue';
}

function learnConcept(concept) {
    startMiniLesson(concept);
}

function startMiniLesson(concept) {
    const modal = document.getElementById('miniLessonModal');
    const lessonContent = document.getElementById('lessonContent');
    
    // Get lesson content based on concept
    const lesson = getLessonContent(concept);
    lessonContent.innerHTML = lesson;
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.bg-white');
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease-out';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 100);
}

function getLessonContent(concept) {
    const lessons = {
        'carrying': {
            en: `
                <div class="text-left space-y-4">
                    <h4 class="text-xl font-bold text-center mb-4">🔢 Adding with Carrying Made Easy!</h4>
                    <div class="bg-blue-50 p-4 rounded-xl">
                        <p class="font-semibold mb-2">Let's solve: 47 + 29</p>
                        <div class="font-mono text-lg space-y-1">
                            <div>  4 7</div>
                            <div>+ 2 9</div>
                            <div>-----</div>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center space-x-3">
                            <span class="bg-yellow-200 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</span>
                            <span>Start with the ones place: 7 + 9 = 16</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="bg-yellow-200 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</span>
                            <span>Write down 6, carry the 1 to tens place</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="bg-yellow-200 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</span>
                            <span>Tens place: 4 + 2 + 1 (carried) = 7</span>
                        </div>
                        <div class="bg-green-100 p-3 rounded-lg text-center">
                            <span class="text-xl font-bold">Answer: 76! 🎉</span>
                        </div>
                    </div>
                </div>
            `,
            hi: `
                <div class="text-left space-y-4">
                    <h4 class="text-xl font-bold text-center mb-4">🔢 हासिल के साथ जोड़ना आसान बनाया!</h4>
                    <div class="bg-blue-50 p-4 rounded-xl">
                        <p class="font-semibold mb-2">आइए हल करें: 47 + 29</p>
                        <div class="font-mono text-lg space-y-1">
                            <div>  4 7</div>
                            <div>+ 2 9</div>
                            <div>-----</div>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center space-x-3">
                            <span class="bg-yellow-200 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</span>
                            <span>इकाई के स्थान से शुरू करें: 7 + 9 = 16</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="bg-yellow-200 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</span>
                            <span>6 लिखें, 1 को दहाई के स्थान पर ले जाएं</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="bg-yellow-200 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</span>
                            <span>दहाई का स्थान: 4 + 2 + 1 (हासिल) = 7</span>
                        </div>
                        <div class="bg-green-100 p-3 rounded-lg text-center">
                            <span class="text-xl font-bold">उत्तर: 76! 🎉</span>
                        </div>
                    </div>
                </div>
            `
        },
        'irregular-verbs': {
            en: `
                <div class="text-left space-y-4">
                    <h4 class="text-xl font-bold text-center mb-4">📝 Irregular Verbs are Special!</h4>
                    <p class="text-gray-600 text-center">Some verbs don't follow the regular "-ed" rule for past tense.</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-green-50 p-4 rounded-xl text-center">
                            <h5 class="font-bold text-green-700 mb-2">Present</h5>
                            <div class="space-y-2">
                                <div>go</div>
                                <div>eat</div>
                                <div>run</div>
                                <div>see</div>
                            </div>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-xl text-center">
                            <h5 class="font-bold text-blue-700 mb-2">Past</h5>
                            <div class="space-y-2">
                                <div>went</div>
                                <div>ate</div>
                                <div>ran</div>
                                <div>saw</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-yellow-100 p-4 rounded-xl">
                        <p class="font-semibold">Memory Trick! 🧠</p>
                        <p>Think of a sentence: "Yesterday I <strong>went</strong> to school" (not "goed")</p>
                    </div>
                </div>
            `,
            hi: `
                <div class="text-left space-y-4">
                    <h4 class="text-xl font-bold text-center mb-4">📝 अनियमित क्रियाएं विशेष हैं!</h4>
                    <p class="text-gray-600 text-center">कुछ क्रियाएं भूतकाल के लिए नियमित "-ed" नियम का पालन नहीं करतीं।</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-green-50 p-4 rounded-xl text-center">
                            <h5 class="font-bold text-green-700 mb-2">वर्तमान</h5>
                            <div class="space-y-2">
                                <div>go (जाना)</div>
                                <div>eat (खाना)</div>
                                <div>run (दौड़ना)</div>
                                <div>see (देखना)</div>
                            </div>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-xl text-center">
                            <h5 class="font-bold text-blue-700 mb-2">भूतकाल</h5>
                            <div class="space-y-2">
                                <div>went (गया)</div>
                                <div>ate (खाया)</div>
                                <div>ran (दौड़ा)</div>
                                <div>saw (देखा)</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-yellow-100 p-4 rounded-xl">
                        <p class="font-semibold">याददाश्त की तरकीब! 🧠</p>
                        <p>एक वाक्य सोचें: "कल मैं स्कूल <strong>गया</strong>" (not "goed")</p>
                    </div>
                </div>
            `
        },
        'states-of-matter': {
            en: `
                <div class="text-left space-y-4">
                    <h4 class="text-xl font-bold text-center mb-4">🧊 Three States of Water!</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-blue-100 p-4 rounded-xl text-center">
                            <div class="text-3xl mb-2">🧊</div>
                            <h5 class="font-bold text-blue-700">SOLID</h5>
                            <p class="text-sm">Ice, Snow</p>
                            <p class="text-xs">Particles are close together</p>
                        </div>
                        <div class="bg-cyan-100 p-4 rounded-xl text-center">
                            <div class="text-3xl mb-2">💧</div>
                            <h5 class="font-bold text-cyan-700">LIQUID</h5>
                            <p class="text-sm">Water, Rain</p>
                            <p class="text-xs">Particles move around</p>
                        </div>
                        <div class="bg-gray-100 p-4 rounded-xl text-center">
                            <div class="text-3xl mb-2">💨</div>
                            <h5 class="font-bold text-gray-700">GAS</h5>
                            <p class="text-sm">Steam, Vapor</p>
                            <p class="text-xs">Particles spread out</p>
                        </div>
                    </div>
                    <div class="bg-yellow-100 p-4 rounded-xl">
                        <p class="font-semibold">Fun Fact! ⭐</p>
                        <p>Ice cubes in your drink are SOLID water, even though they're in liquid water!</p>
                    </div>
                </div>
            `,
            hi: `
                <div class="text-left space-y-4">
                    <h4 class="text-xl font-bold text-center mb-4">🧊 पानी की तीन अवस्थाएं!</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-blue-100 p-4 rounded-xl text-center">
                            <div class="text-3xl mb-2">🧊</div>
                            <h5 class="font-bold text-blue-700">ठोस</h5>
                            <p class="text-sm">बर्फ, हिम</p>
                            <p class="text-xs">कण पास-पास हैं</p>
                        </div>
                        <div class="bg-cyan-100 p-4 rounded-xl text-center">
                            <div class="text-3xl mb-2">💧</div>
                            <h5 class="font-bold text-cyan-700">तरल</h5>
                            <p class="text-sm">पानी, बारिश</p>
                            <p class="text-xs">कण घूमते रहते हैं</p>
                        </div>
                        <div class="bg-gray-100 p-4 rounded-xl text-center">
                            <div class="text-3xl mb-2">💨</div>
                            <h5 class="font-bold text-gray-700">गैस</h5>
                            <p class="text-sm">भाप, वाष्प</p>
                            <p class="text-xs">कण फैल जाते हैं</p>
                        </div>
                    </div>
                    <div class="bg-yellow-100 p-4 rounded-xl">
                        <p class="font-semibold">मजेदार तथ्य! ⭐</p>
                        <p>आपके पेय में बर्फ के टुकड़े ठोस पानी हैं, भले ही वे तरल पानी में हों!</p>
                    </div>
                </div>
            `
        }
    };
    
    const lesson = lessons[concept];
    if (lesson) {
        return lesson[currentLanguage] || lesson.en;
    }
    
    return `
        <div class="text-center">
            <div class="text-6xl mb-4">🚧</div>
            <h4 class="text-xl font-bold mb-4">${currentLanguage === 'en' ? 'Coming Soon!' : 'जल्द आ रहा है!'}</h4>
            <p class="text-gray-600">${currentLanguage === 'en' ? 'This mini-lesson is being prepared just for you!' : 'यह मिनी-पाठ आपके लिए तैयार किया जा रहा है!'}</p>
        </div>
    `;
}

function closeMiniLesson() {
    const modal = document.getElementById('miniLessonModal');
    const modalContent = modal.querySelector('.bg-white');
    
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

function practiceMore() {
    // For now, just close the modal and show a success message
    closeMiniLesson();
    
    setTimeout(() => {
        showToast(currentLanguage === 'en' ? 
            '🎉 Great! Keep practicing to master this concept!' : 
            '🎉 बहुत बढ़िया! इस अवधारणा में महारत हासिल करने के लिए अभ्यास जारी रखें!'
        );
    }, 500);
}

function skipToNext() {
    showToast(currentLanguage === 'en' ? 
        '⏭️ Moved to next gap! Don\'t forget to come back to this one.' : 
        '⏭️ अगले अंतर पर जाया गया! इसे वापस आना न भूलें।'
    );
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
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add bounce animation to mistake items when they appear
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'bounceIn 0.6s ease-out';
            }
        });
    });
    
    // Observe mistake items when they're added
    const mistakesList = document.getElementById('mistakesList');
    if (mistakesList) {
        const observeMistakes = () => {
            const mistakes = mistakesList.querySelectorAll('.mistake-item');
            mistakes.forEach(mistake => observer.observe(mistake));
        };
        
        // Initial observation
        observeMistakes();
        
        // Re-observe when new mistakes are added
        const mutationObserver = new MutationObserver(observeMistakes);
        mutationObserver.observe(mistakesList, { childList: true });
    }
});