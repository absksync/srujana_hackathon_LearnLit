class DoubtResolver {
    constructor() {
        this.aiService = new AIService();
        this.isLoading = false;
        this.currentConversationId = null;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const askButton = document.getElementById('askButton');
        const questionInput = document.getElementById('questionInput');

        if (askButton) {
            askButton.addEventListener('click', () => this.askDoubt());
        }

        if (questionInput) {
            questionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.askDoubt();
                }
            });
        }
    }

    async askDoubt() {
        const questionInput = document.getElementById('questionInput');
        const question = questionInput.value.trim();

        if (!question) {
            alert('Please enter your doubt first.');
            return;
        }

        if (this.isLoading) return;

        this.isLoading = true;
        this.showLoading(true);
        
        try {
            this.showAnswer('');
            questionInput.value = '';

            const response = await this.aiService.askDoubt(question);
            this.showAnswer(response.answer || 'Sorry, I could not generate an answer.');

        } catch (error) {
            console.error('Error asking doubt:', error);
            this.showAnswer('Sorry, I could not process your doubt. Please try again.');
        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    }

    showAnswer(content) {
        const answerSection = document.getElementById('answerSection');
        const answerContent = document.getElementById('answerContent');
        
        if (answerSection && answerContent) {
            answerContent.innerHTML = content;
            answerSection.classList.remove('hidden');
        }
    }

    showLoading(show) {
        const askButton = document.getElementById('askButton');
        if (askButton) {
            askButton.disabled = show;
            askButton.textContent = show ? 'Processing...' : 'Ask AI Assistant';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AIService !== 'undefined') {
        window.doubtResolver = new DoubtResolver();
    }
});
