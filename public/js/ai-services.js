/**
 * AI Service Integration for LearnBuddy Platform
 * Connects frontend with Python backend AI capabilities
 */

class AIService {
    constructor() {
        this.baseURL = '/api';
        this.retryAttempts = 3;
        this.retryDelay = 1000;
    }

    /**
     * Generic API call with retry logic
     */
    async apiCall(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...options
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                return await response.json();
            } catch (error) {
                console.warn(`API call attempt ${attempt} failed:`, error.message);
                
                if (attempt === this.retryAttempts) {
                    throw new Error(`Failed after ${this.retryAttempts} attempts: ${error.message}`);
                }
                
                await this.delay(this.retryDelay * attempt);
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * AI-powered hint generation
     */
    async getHint(question, context = {}) {
        try {
            const response = await this.apiCall('/ai/hint', {
                method: 'POST',
                body: JSON.stringify({ question, context })
            });
            return response;
        } catch (error) {
            console.error('Error getting AI hint:', error);
            return { hint: 'Try breaking down the problem into smaller steps!', error: true };
        }
    }

    /**
     * Generate mnemonic for concept
     */
    async getMnemonic(concept, difficulty = 'medium') {
        try {
            const response = await this.apiCall('/ai/mnemonic', {
                method: 'POST',
                body: JSON.stringify({ concept, difficulty })
            });
            return response;
        } catch (error) {
            console.error('Error getting mnemonic:', error);
            return { mnemonic: 'Create a simple story to remember this concept!', error: true };
        }
    }

    /**
     * Get step-by-step solution
     */
    async getSolutionSteps(question, subject = 'science') {
        try {
            const response = await this.apiCall('/ai/solution-steps', {
                method: 'POST',
                body: JSON.stringify({ question, subject })
            });
            return response;
        } catch (error) {
            console.error('Error getting solution steps:', error);
            return { steps: ['Read the question carefully', 'Identify key concepts', 'Apply learned principles'], error: true };
        }
    }

    /**
     * Get AI encouragement based on performance
     */
    async getEncouragement(score, attempts, topic) {
        try {
            const response = await this.apiCall('/ai/encouragement', {
                method: 'POST',
                body: JSON.stringify({ score, attempts, topic })
            });
            return response;
        } catch (error) {
            console.error('Error getting encouragement:', error);
            return { message: 'Keep going! Every mistake is a learning opportunity! 🌟', error: true };
        }
    }

    /**
     * RAG-powered doubt resolution
     */
    async resolveDoubt(question, context = 'general') {
        try {
            const response = await this.apiCall('/rag/query', {
                method: 'POST',
                body: JSON.stringify({ query: question, context })
            });
            return response;
        } catch (error) {
            console.error('Error resolving doubt:', error);
            return { 
                answer: 'I understand your question! Let me help you find the answer step by step.',
                sources: [],
                error: true 
            };
        }
    }
}

/**
 * Quiz Service Integration
 */
class QuizService extends AIService {
    /**
     * Get quiz questions by subject and difficulty
     */
    async getQuestions(subject = 'science', difficulty = 'medium', count = 10) {
        try {
            const response = await this.apiCall('/quiz/questions', {
                method: 'POST',
                body: JSON.stringify({ subject, difficulty, count })
            });
            return response;
        } catch (error) {
            console.error('Error getting quiz questions:', error);
            return { questions: [], error: true };
        }
    }

    /**
     * Submit quiz answer
     */
    async submitAnswer(questionId, answer, timeSpent = 0) {
        try {
            const response = await this.apiCall('/quiz/submit', {
                method: 'POST',
                body: JSON.stringify({ questionId, answer, timeSpent })
            });
            return response;
        } catch (error) {
            console.error('Error submitting answer:', error);
            return { correct: false, feedback: 'Please try again!', error: true };
        }
    }
}

/**
 * Gamified Learning Service
 */
class GameService extends AIService {
    /**
     * Start a new learning game session
     */
    async startGame(gameType = 'quiz', difficulty = 'medium') {
        try {
            const response = await this.apiCall('/game/start', {
                method: 'POST',
                body: JSON.stringify({ gameType, difficulty })
            });
            return response;
        } catch (error) {
            console.error('Error starting game:', error);
            return { sessionId: 'offline_mode', error: true };
        }
    }

    /**
     * Get leaderboard
     */
    async getLeaderboard(gameType = 'overall', limit = 10) {
        try {
            const response = await this.apiCall('/game/leaderboard', {
                method: 'GET'
            });
            return response;
        } catch (error) {
            console.error('Error getting leaderboard:', error);
            return { leaderboard: [], error: true };
        }
    }
}

/**
 * Rewards Service
 */
class RewardsService extends AIService {
    /**
     * Earn tokens for achievements
     */
    async earnTokens(studentId, action, points) {
        try {
            const response = await this.apiCall('/rewards/tokens/earn', {
                method: 'POST',
                body: JSON.stringify({ studentId, action, points })
            });
            return response;
        } catch (error) {
            console.error('Error earning tokens:', error);
            return { tokens: 0, error: true };
        }
    }

    /**
     * Get rewards shop catalog
     */
    async getShopCatalog() {
        try {
            const response = await this.apiCall('/rewards/shop/catalog');
            return response;
        } catch (error) {
            console.error('Error getting shop catalog:', error);
            return { items: [], error: true };
        }
    }

    /**
     * Purchase item from shop
     */
    async purchaseItem(studentId, itemId) {
        try {
            const response = await this.apiCall('/rewards/shop/purchase', {
                method: 'POST',
                body: JSON.stringify({ studentId, itemId })
            });
            return response;
        } catch (error) {
            console.error('Error purchasing item:', error);
            return { success: false, message: 'Purchase failed', error: true };
        }
    }
}

// Global service instances
window.aiService = new AIService();
window.quizService = new QuizService();
window.gameService = new GameService();
window.rewardsService = new RewardsService();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIService, QuizService, GameService, RewardsService };
}

console.log('🤖 AI Services initialized successfully!');