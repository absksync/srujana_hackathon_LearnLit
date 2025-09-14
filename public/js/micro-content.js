// Micro-content specific functionality
let isFlipped = false;
let currentCardIndex = 0;

// Study mode switching
document.addEventListener('DOMContentLoaded', function() {
    const studyModes = document.querySelectorAll('.study-mode-btn');
    const studySections = document.querySelectorAll('.study-section');

    studyModes.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            studyModes.forEach(b => {
                b.classList.remove('active', 'border-blue-500', 'bg-blue-50', 'text-blue-700');
                b.classList.add('border-gray-300', 'bg-white', 'text-gray-700');
            });

            // Add active class to clicked button
            this.classList.add('active', 'border-blue-500', 'bg-blue-50', 'text-blue-700');
            this.classList.remove('border-gray-300', 'bg-white', 'text-gray-700');

            // Hide all sections
            studySections.forEach(section => section.classList.add('hidden'));

            // Show corresponding section
            const mode = this.id.replace('Mode', '');
            const section = document.getElementById(mode + 'Section');
            if (section) {
                section.classList.remove('hidden');
            }
        });
    });

    // Quiz option selection
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selection from all options
            quizOptions.forEach(opt => {
                opt.classList.remove('border-blue-500', 'bg-blue-50');
                opt.classList.add('border-gray-200');
            });

            // Add selection to clicked option
            this.classList.add('border-blue-500', 'bg-blue-50');
            this.classList.remove('border-gray-200');
        });
    });

    // Game matching functionality
    let selectedGameItem = null;
    const gameItems = document.querySelectorAll('.game-item');
    
    gameItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!selectedGameItem) {
                // First selection
                selectedGameItem = this;
                this.classList.add('ring-2', 'ring-blue-400');
            } else if (selectedGameItem === this) {
                // Deselect if clicking the same item
                selectedGameItem = null;
                this.classList.remove('ring-2', 'ring-blue-400');
            } else {
                // Second selection - check for match
                const firstValue = selectedGameItem.getAttribute('data-value');
                const secondValue = this.getAttribute('data-value');
                
                if (firstValue === secondValue) {
                    // Match found
                    selectedGameItem.classList.add('bg-green-200', 'border-green-400');
                    this.classList.add('bg-green-200', 'border-green-400');
                    selectedGameItem.style.pointerEvents = 'none';
                    this.style.pointerEvents = 'none';
                } else {
                    // No match - briefly highlight red
                    selectedGameItem.classList.add('bg-red-200');
                    this.classList.add('bg-red-200');
                    
                    setTimeout(() => {
                        selectedGameItem.classList.remove('bg-red-200');
                        this.classList.remove('bg-red-200');
                    }, 500);
                }
                
                // Reset selection
                selectedGameItem.classList.remove('ring-2', 'ring-blue-400');
                selectedGameItem = null;
            }
        });
    });
});

// Flashcard functionality
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    isFlipped = !isFlipped;
    
    if (isFlipped) {
        flashcard.style.transform = 'rotateY(180deg)';
    } else {
        flashcard.style.transform = 'rotateY(0deg)';
    }
}

// Sample flashcard data
const flashcards = [
    {
        question: { en: "What is sin(30°)?", hi: "sin(30°) क्या है?" },
        answer: "1/2"
    },
    {
        question: { en: "What is cos(60°)?", hi: "cos(60°) क्या है?" },
        answer: "1/2"
    },
    {
        question: { en: "What is tan(45°)?", hi: "tan(45°) क्या है?" },
        answer: "1"
    },
    {
        question: { en: "What is sin(90°)?", hi: "sin(90°) क्या है?" },
        answer: "1"
    },
    {
        question: { en: "What is cos(0°)?", hi: "cos(0°) क्या है?" },
        answer: "1"
    },
    {
        question: { en: "What is tan(0°)?", hi: "tan(0°) क्या है?" },
        answer: "0"
    },
    {
        question: { en: "What is sin(45°)?", hi: "sin(45°) क्या है?" },
        answer: "√2/2"
    },
    {
        question: { en: "What is cos(30°)?", hi: "cos(30°) क्या है?" },
        answer: "√3/2"
    }
];

// Navigation functions for flashcards
function nextCard() {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        updateFlashcard();
    }
}

function prevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateFlashcard();
    }
}

function updateFlashcard() {
    const flashcard = document.getElementById('flashcard');
    const currentCardElement = document.getElementById('currentCard');
    const totalCardsElement = document.getElementById('totalCards');
    
    // Reset flip state
    isFlipped = false;
    flashcard.style.transform = 'rotateY(0deg)';
    
    // Update card content
    const card = flashcards[currentCardIndex];
    const questionElement = flashcard.querySelector('.flashcard-front .text-2xl');
    const answerElement = flashcard.querySelector('.flashcard-back .text-3xl');
    
    questionElement.textContent = card.question[currentLanguage] || card.question.en;
    answerElement.textContent = card.answer;
    
    // Update counter
    currentCardElement.textContent = currentCardIndex + 1;
    totalCardsElement.textContent = flashcards.length;
    
    // Update button states
    const prevBtn = document.getElementById('prevCard');
    const nextBtn = document.getElementById('nextCard');
    
    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === flashcards.length - 1;
    
    if (prevBtn.disabled) {
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    if (nextBtn.disabled) {
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Add event listeners for card navigation
document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('nextCard');
    const prevBtn = document.getElementById('prevCard');
    
    if (nextBtn) nextBtn.addEventListener('click', nextCard);
    if (prevBtn) prevBtn.addEventListener('click', prevCard);
    
    // Initialize flashcard
    updateFlashcard();
});