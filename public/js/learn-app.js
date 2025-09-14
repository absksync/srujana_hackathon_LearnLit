// Global App State
let currentSection = 'home';
let studyTasks = [];
let questionAttempts = {};
let currentLanguage = 'english';

// Data Storage
const studyPlanData = [
    { id: 1, day: 'Monday', time: '5:00-5:30 PM', subject: 'Math Practice', completed: false },
    { id: 2, day: 'Tuesday', time: '4:30-5:15 PM', subject: 'Science Quiz', completed: false },
    { id: 3, day: 'Wednesday', time: '5:30-6:00 PM', subject: 'English Grammar', completed: false },
    { id: 4, day: 'Thursday', time: '5:00-5:45 PM', subject: 'History Review', completed: false },
    { id: 5, day: 'Friday', time: '4:45-5:30 PM', subject: 'Math Problem Solving', completed: false },
    { id: 6, day: 'Saturday', time: '10:00-11:00 AM', subject: 'Weekly Review', completed: false },
    { id: 7, day: 'Sunday', time: 'Rest Day', subject: 'Free Study', completed: false }
];

const questionsData = [
    {
        id: 1,
        question: "Solve: 3x + 2 = 8",
        correctAnswer: "2",
        explanation: {
            title: "Step-by-step solution:",
            steps: [
                "1. Subtract 2 from both sides: 3x + 2 - 2 = 8 - 2",
                "2. Simplify: 3x = 6", 
                "3. Divide both sides by 3: x = 6/3",
                "4. Final answer: x = 2"
            ]
        },
        followUp: "Now try: 2x + 5 = 11"
    },
    {
        id: 2,
        question: "What is 1/2 + 1/3?",
        correctAnswer: "5/6",
        explanation: {
            title: "Adding fractions with different denominators:",
            steps: [
                "1. Find common denominator: LCM of 2 and 3 is 6",
                "2. Convert fractions: 1/2 = 3/6, 1/3 = 2/6",
                "3. Add numerators: 3/6 + 2/6 = 5/6",
                "4. Final answer: 5/6"
            ]
        },
        followUp: "Try this: 2/3 + 1/4"
    },
    {
        id: 3,
        question: "What is photosynthesis?",
        correctAnswer: "plants make food using sunlight",
        explanation: {
            title: "Photosynthesis explained:",
            steps: [
                "1. Plants use sunlight as energy source",
                "2. They take in water through roots",
                "3. They absorb carbon dioxide from air",
                "4. They produce glucose (food) and oxygen",
                "5. Formula: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂"
            ]
        },
        followUp: "Why is photosynthesis important for life on Earth?"
    }
];

const languageTranslations = {
    english: {
        title: "Learning Content",
        photosynthesis: "Plants use sunlight, water, and carbon dioxide to make food through photosynthesis.",
        algebra: "To solve 5x + 3 = 13:\n1. Subtract 3 from both sides: 5x = 10\n2. Divide by 5: x = 2",
        greeting: "Welcome to LearnBuddy! Ready to learn something new today?"
    },
    hindi: {
        title: "शिक्षा सामग्री",
        photosynthesis: "पौधे सूर्य की रोशनी, पानी और कार्बन डाइऑक्साइड का उपयोग करके प्रकाश संश्लेषण के माध्यम से भोजन बनाते हैं।",
        algebra: "5x + 3 = 13 हल करने के लिए:\n1. दोनों तरफ से 3 घटाएं: 5x = 10\n2. 5 से भाग दें: x = 2",
        greeting: "LearnBuddy में आपका स्वागत है! आज कुछ नया सीखने के लिए तैयार हैं?"
    },
    kannada: {
        title: "ಕಲಿಕಾ ವಿಷಯ",
        photosynthesis: "ಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ ಬಳಸಿ ಪ್ರಕಾಶಸಂಶ್ಲೇಷಣೆಯ ಮೂಲಕ ಆಹಾರ ತಯಾರಿಸುತ್ತವೆ।",
        algebra: "5x + 3 = 13 ಪರಿಹರಿಸಲು:\n1. ಎರಡೂ ಬದಿಯಿಂದ 3 ಕಳೆಯಿರಿ: 5x = 10\n2. 5 ರಿಂದ ಭಾಗಿಸಿ: x = 2",
        greeting: "LearnBuddy ಗೆ ಸ್ವಾಗತ! ಇಂದು ಹೊಸದನ್ನು ಕಲಿಯಲು ಸಿದ್ಧರಿದ್ದೀರಾ?"
    },
    marathi: {
        title: "शिक्षण सामग्री",
        photosynthesis: "झाडे सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साइड वापरून प्रकाशसंश्लेषणाद्वारे अन्न तयार करतात।",
        algebra: "5x + 3 = 13 सोडवण्यासाठी:\n1. दोन्ही बाजूंनी 3 वजा करा: 5x = 10\n2. 5 ने भाग द्या: x = 2",
        greeting: "LearnBuddy मध्ये आपले स्वागत आहे! आज काहीतरी नवीन शिकायला तयार आहात का?"
    }
};

const doubtResponses = {
    "photosynthesis": "Photosynthesis is how plants make food! They use sunlight, water, and air to create glucose and oxygen. It's like cooking, but plants are the chefs! 🌱",
    "f=ma": "F = ma means Force equals mass times acceleration! Think of it like this: heavier objects (more mass) need more force to move them. It's like pushing a bike vs pushing a car! 🚗",
    "fractions": "Fractions are parts of a whole! Like cutting a pizza into slices. 1/2 means 1 slice out of 2 total slices. To add fractions, you need the same denominator! 🍕",
    "algebra": "Algebra is like solving puzzles with numbers! When you see 'x', it's a mystery number you need to find. Use opposite operations to isolate x! 🔍",
    "gravity": "Gravity is the force that pulls things down to Earth! That's why when you drop something, it falls instead of floating away. The bigger the object, the stronger its gravity! 🌍",
    "default": "That's a great question! I'm still learning about that topic. Can you try asking about photosynthesis, math, fractions, or gravity? I know lots about those! 😊"
};

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadStudyPlan();
    loadConceptFixer();
    loadLanguageSupport();
    
    // Load saved progress from sessionStorage
    loadSavedProgress();
});

function initializeApp() {
    showSection('home');
    updateActiveNav('home');
}

// Navigation Functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 50);
    }
    
    currentSection = sectionName;
    updateActiveNav(sectionName);
    
    // Update mascot badge
    updateMascotBadge();
}

function updateActiveNav(activeSection) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section link
    const activeLink = document.querySelector(`[onclick="showSection('${activeSection}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

function updateMascotBadge() {
    const badge = document.getElementById('mascot-badge');
    if (currentSection === 'doubt-buddy') {
        badge.style.display = 'none';
    } else {
        badge.style.display = 'flex';
    }
}

// Study Planner Functions
function loadStudyPlan() {
    const scheduleContainer = document.getElementById('study-schedule');
    if (!scheduleContainer) return;
    
    studyTasks = [...studyPlanData];
    renderStudySchedule();
    updateProgress();
}

function renderStudySchedule() {
    const scheduleContainer = document.getElementById('study-schedule');
    scheduleContainer.innerHTML = '';
    
    studyTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `study-task ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-1">
                        <span class="font-medium text-gray-700">${task.day}</span>
                        <span class="study-task-time">${task.time}</span>
                    </div>
                    <div class="study-task-subject">${task.subject}</div>
                </div>
                <button onclick="toggleTaskCompletion(${task.id})" 
                        class="btn-${task.completed ? 'secondary' : 'primary'} text-sm px-4 py-2">
                    ${task.completed ? '✓ Done' : 'Mark Done'}
                </button>
            </div>
        `;
        
        scheduleContainer.appendChild(taskElement);
    });
}

function toggleTaskCompletion(taskId) {
    const task = studyTasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderStudySchedule();
        updateProgress();
        saveProgress();
    }
}

function updateProgress() {
    const completedTasks = studyTasks.filter(task => task.completed).length;
    const totalTasks = studyTasks.length;
    const percentage = (completedTasks / totalTasks) * 100;
    
    document.getElementById('completed-count').textContent = `${completedTasks}/${totalTasks}`;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
}

// Concept Fixer Functions
function loadConceptFixer() {
    displayQuestion();
}

function displayQuestion() {
    const container = document.getElementById('question-container');
    if (!container) return;
    
    const currentQuestion = questionsData[0]; // Start with first question
    
    container.innerHTML = `
        <div class="question-card">
            <h4 class="text-xl font-bold text-gray-800 mb-4">${currentQuestion.question}</h4>
            <input type="text" id="answer-input" class="answer-input mb-4" placeholder="Enter your answer...">
            <div class="flex items-center justify-between">
                <div class="attempts-counter">
                    ${generateAttemptDots(currentQuestion.id)}
                </div>
                <button onclick="checkAnswer(${currentQuestion.id})" class="btn-primary">
                    Submit Answer
                </button>
            </div>
        </div>
    `;
    
    // Allow Enter key to submit
    document.getElementById('answer-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer(currentQuestion.id);
        }
    });
}

function generateAttemptDots(questionId) {
    const attempts = questionAttempts[questionId] || 0;
    let dots = '';
    
    for (let i = 0; i < 5; i++) {
        const dotClass = i < attempts ? 'failed' : 'unused';
        dots += `<div class="attempt-dot ${dotClass}"></div>`;
    }
    
    return dots;
}

function checkAnswer(questionId) {
    const answerInput = document.getElementById('answer-input');
    const userAnswer = answerInput.value.trim().toLowerCase();
    const question = questionsData.find(q => q.id === questionId);
    
    if (!userAnswer) {
        showFeedback('error', 'Please enter an answer!');
        return;
    }
    
    // Initialize attempts if not exists
    if (!questionAttempts[questionId]) {
        questionAttempts[questionId] = 0;
    }
    
    questionAttempts[questionId]++;
    
    // Check if answer is correct (simple string matching)
    const isCorrect = userAnswer.includes(question.correctAnswer.toLowerCase()) || 
                     question.correctAnswer.toLowerCase().includes(userAnswer);
    
    if (isCorrect) {
        showFeedback('success', 'Excellent! You got it right! 🎉');
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    } else {
        if (questionAttempts[questionId] >= 3) {
            showRetryStrategy(question);
        } else {
            showFeedback('error', `Not quite right. You have ${3 - questionAttempts[questionId]} attempts left. Try again!`);
            displayQuestion(); // Refresh to show updated attempt dots
        }
    }
    
    saveProgress();
}

function showFeedback(type, message) {
    const container = document.getElementById('feedback-container');
    container.classList.remove('hidden');
    
    const feedbackClass = type === 'success' ? 'feedback-success' : 'feedback-error';
    
    container.innerHTML = `
        <div class="${feedbackClass} fade-in-up">
            <p class="font-semibold">${message}</p>
        </div>
    `;
}

function showRetryStrategy(question) {
    const container = document.getElementById('feedback-container');
    container.classList.remove('hidden');
    
    container.innerHTML = `
        <div class="retry-indicator fade-in-up">
            <h4 class="font-bold mb-3">Don't get frustrated! Let me help you understand this better.</h4>
            <p class="mb-4">You've tried 3 times. Let's break this down step by step:</p>
            <button onclick="showExplanation(${question.id})" class="btn-warning">
                See Step-by-Step Solution
            </button>
        </div>
    `;
}

function showExplanation(questionId) {
    const question = questionsData.find(q => q.id === questionId);
    const container = document.getElementById('feedback-container');
    
    let explanationHTML = `
        <div class="feedback-explanation fade-in-up">
            <h4 class="font-bold mb-3">${question.explanation.title}</h4>
            <div class="space-y-2 mb-4">
    `;
    
    question.explanation.steps.forEach(step => {
        explanationHTML += `<p class="text-sm">${step}</p>`;
    });
    
    explanationHTML += `
            </div>
            <p class="font-medium mb-4">Follow-up question: ${question.followUp}</p>
            <button onclick="nextQuestion()" class="btn-secondary">
                Try Another Question
            </button>
        </div>
    `;
    
    container.innerHTML = explanationHTML;
}

function nextQuestion() {
    // Reset for demo - in real app, this would move to next question
    document.getElementById('feedback-container').classList.add('hidden');
    displayQuestion();
}

// Language Support Functions
function loadLanguageSupport() {
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.addEventListener('change', changeLanguage);
        updateLanguageContent();
    }
}

function changeLanguage() {
    const selector = document.getElementById('language-selector');
    currentLanguage = selector.value;
    updateLanguageContent();
    saveProgress();
}

function updateLanguageContent() {
    const container = document.getElementById('translated-content');
    if (!container) return;
    
    const content = languageTranslations[currentLanguage];
    
    container.innerHTML = `
        <div class="language-content fade-in-up">
            <h4 class="text-xl font-bold text-gray-800 mb-4">${content.title}</h4>
            
            <div class="space-y-6">
                <div class="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h5 class="font-semibold text-green-800 mb-2">🌱 Photosynthesis</h5>
                    <p class="text-green-700">${content.photosynthesis}</p>
                </div>
                
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h5 class="font-semibold text-blue-800 mb-2">🔢 Algebra</h5>
                    <pre class="text-blue-700 whitespace-pre-wrap font-sans">${content.algebra}</pre>
                </div>
                
                <div class="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <h5 class="font-semibold text-purple-800 mb-2">👋 Welcome Message</h5>
                    <p class="text-purple-700">${content.greeting}</p>
                </div>
            </div>
        </div>
    `;
}

// Doubt Buddy Functions
function askDoubt() {
    const input = document.getElementById('doubt-input');
    const question = input.value.trim();
    
    if (!question) return;
    
    // Add user message to chat
    addChatMessage('user', question);
    
    // Clear input
    input.value = '';
    
    // Simulate thinking delay
    setTimeout(() => {
        const response = generateResponse(question);
        addChatMessage('bot', response);
    }, 1000);
}

function addChatMessage(sender, message) {
    const chatContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    
    if (sender === 'user') {
        messageDiv.className = 'flex justify-end mb-4';
        messageDiv.innerHTML = `
            <div class="chat-user">
                <p class="text-sm">${message}</p>
            </div>
        `;
    } else {
        messageDiv.className = 'flex items-start space-x-3 mb-4';
        messageDiv.innerHTML = `
            <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white text-lg">🦸‍♀️</span>
            </div>
            <div class="chat-bot">
                <p class="text-sm text-gray-800">${message}</p>
            </div>
        `;
    }
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function generateResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    // Simple keyword matching
    for (const [keyword, response] of Object.entries(doubtResponses)) {
        if (lowerQuestion.includes(keyword)) {
            return response;
        }
    }
    
    return doubtResponses.default;
}

// Allow Enter key to ask doubt
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && document.getElementById('doubt-input') === document.activeElement) {
        askDoubt();
    }
});

// Progress Persistence Functions
function saveProgress() {
    const progress = {
        studyTasks: studyTasks,
        questionAttempts: questionAttempts,
        currentLanguage: currentLanguage
    };
    
    sessionStorage.setItem('learnbuddy-progress', JSON.stringify(progress));
}

function loadSavedProgress() {
    const saved = sessionStorage.getItem('learnbuddy-progress');
    if (saved) {
        const progress = JSON.parse(saved);
        
        if (progress.studyTasks) {
            studyTasks = progress.studyTasks;
            renderStudySchedule();
            updateProgress();
        }
        
        if (progress.questionAttempts) {
            questionAttempts = progress.questionAttempts;
        }
        
        if (progress.currentLanguage) {
            currentLanguage = progress.currentLanguage;
            const selector = document.getElementById('language-selector');
            if (selector) {
                selector.value = currentLanguage;
                updateLanguageContent();
            }
        }
    }
}