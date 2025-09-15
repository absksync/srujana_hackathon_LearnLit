// Sample problems for class 6-7 (MCQ/short-answer)
const sampleProblems = {
    mario: [
        {
            question: "Which of the following objects is luminous?",
            options: ["Moon", "Planet", "Sun", "Mirror"],
            correct: 2,
            explanation: "The Sun produces its own light and heat, making it a luminous object.",
            source: "NCERT Class 6 Science"
        },
        {
            question: "Solve for x: 2x + 5 = 15",
            options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
            correct: 0,
            explanation: "2x + 5 = 15 → 2x = 10 → x = 5",
            source: "NCERT Class 7 Maths"
        }
    ],
    treasure: [
        {
            question: "Heat flows from:",
            options: ["Cold object to hot object", "Hot object to cold object", "Objects at same temperature", "It doesn't flow"],
            correct: 1,
            explanation: "Heat always flows from a hotter object to a colder object.",
            source: "NCERT Class 7 Science"
        },
        {
            question: "Which method of heat transfer does NOT require a medium?",
            options: ["Conduction", "Convection", "Radiation", "All require medium"],
            correct: 2,
            explanation: "Radiation can transfer heat through vacuum.",
            source: "NCERT Class 7 Science"
        }
    ],
    subway: [
        {
            question: "What is (-15) + (+8)?",
            options: ["-23", "-7", "+7", "+23"],
            correct: 1,
            explanation: "15 - 8 = 7, with negative sign.",
            source: "NCERT Class 6 Maths"
        },
        {
            question: "Which fraction is greater: 5/8 or 3/5?",
            options: ["5/8", "3/5", "They are equal", "Cannot be compared"],
            correct: 0,
            explanation: "5/8 = 25/40, 3/5 = 24/40 → 25/40 > 24/40.",
            source: "NCERT Class 6 Maths"
        }
    ],
    mastery: [
        {
            question: "Which material is the best conductor of heat among the following?",
            options: ["Copper", "Glass", "Wood", "Plastic"],
            correct: 0,
            explanation: "Copper allows heat to pass rapidly.",
            source: "NCERT Class 7 Science"
        },
        {
            question: "If the perimeter of a square is 4x, then its side is:",
            options: ["4x", "x", "x/4", "16x"],
            correct: 1,
            explanation: "Perimeter = 4 × side, so side = x.",
            source: "NCERT Class 7 Maths"
        }
    ],
    quiz: [
        {
            question: "A shadow is formed when:",
            options: ["Light passes through an object", "Light is reflected by an object", "Light is blocked by an opaque object", "Light bends around an object"],
            correct: 2,
            explanation: "Light is blocked by an opaque object.",
            source: "NCERT Class 6 Science"
        },
        {
            question: "Which process primarily causes sea breeze?",
            options: ["Conduction from sand", "Radiation from water", "Convection due to differential heating", "Evaporation of seawater"],
            correct: 2,
            explanation: "Convection currents cause sea breeze.",
            source: "NCERT Class 7 Science"
        }
    ],
    aiTutor: [
        {
            question: "What is the function of a switch in an electric circuit?",
            options: ["To increase current", "To break or complete the circuit", "To store electricity", "To reduce voltage"],
            correct: 1,
            explanation: "A switch opens or closes a circuit.",
            source: "NCERT Class 6 Science"
        },
        {
            question: "Solve for x: 2x + 5 = 15",
            options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
            correct: 0,
            explanation: "2x + 5 = 15 → 2x = 10 → x = 5",
            source: "NCERT Class 7 Maths"
        }
    ]
};
// Utility to launch a sample problem modal for a game
function launchSampleProblem(gameId) {
    const problems = sampleProblems[gameId] || [];
    if (problems.length === 0) return alert('No sample problems available.');
    const idx = Math.floor(Math.random() * problems.length);
    const p = problems[idx];
    // Create modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
        <div style="background: #fff; border-radius: 16px; padding: 32px; min-width: 320px; max-width: 90vw; box-shadow: 0 8px 32px #0002;">
            <h2 style="font-size: 1.3em; margin-bottom: 16px;">${p.question}</h2>
            <form id="sample-problem-form">
                ${p.options.map((opt, i) => `<label style='display:block;margin-bottom:8px;'><input type='radio' name='answer' value='${i}'> ${opt}</label>`).join('')}
            </form>
            <button id="submitSampleAnswer" style="margin-top:16px;">Submit</button>
            <div id="sampleProblemFeedback" style="margin-top:16px;font-weight:bold;"></div>
            <div style="margin-top:12px;font-size:0.9em;color:#666;">${p.source}</div>
            <button id="closeSampleModal" style="margin-top:24px;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeSampleModal').onclick = () => modal.remove();
    document.getElementById('submitSampleAnswer').onclick = () => {
        const val = document.querySelector('input[name="answer"]:checked');
        const feedback = document.getElementById('sampleProblemFeedback');
        if (!val) {
            feedback.textContent = 'Please select an answer.';
            feedback.style.color = '#d00';
            return;
        }
        if (parseInt(val.value) === p.correct) {
            feedback.textContent = 'Correct! ' + p.explanation;
            feedback.style.color = '#090';
        } else {
            feedback.textContent = 'Incorrect. ' + p.explanation;
            feedback.style.color = '#d00';
        }
    };
}
// Attach launchSampleProblem to each card (for demo)
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.game-card').forEach(card => {
            card.onclick = () => {
                const id = card.getAttribute('data-gameid') || card.id || '';
                // Map to sampleProblems key
                let key = '';
                if (id.startsWith('mario')) key = 'mario';
                else if (id.startsWith('treasure')) key = 'treasure';
                else if (id.startsWith('subway')) key = 'subway';
                else if (id.startsWith('mastery')) key = 'mastery';
                else if (id.startsWith('quiz')) key = 'quiz';
                else if (id.startsWith('ai-tutor')) key = 'aiTutor';
                if (key) launchSampleProblem(key);
            };
        });
    }, 500);
});
// Gamified Learning Service - Complete Backend Integration
class GamifiedLearningService {
    constructor(baseUrl = '/api') {
        this.baseUrl = baseUrl;
        this.currentSession = null;
        this.playerStats = this.loadPlayerStats();
    }

    // Player Statistics Management
    loadPlayerStats() {
        const saved = localStorage.getItem('playerStats');
        return saved ? JSON.parse(saved) : {
            tokens: 150,
            xp: 1250,
            level: 5,
            gamesCompleted: 12,
            achievements: 8,
            currentStreak: 5,
            totalScore: 2450,
            unlockedRewards: []
        };
    }

    savePlayerStats() {
        localStorage.setItem('playerStats', JSON.stringify(this.playerStats));
    }

    updateStats(newStats) {
        this.playerStats = { ...this.playerStats, ...newStats };
        this.savePlayerStats();
        this.broadcastStatsUpdate();
    }

    broadcastStatsUpdate() {
        window.dispatchEvent(new CustomEvent('statsUpdated', { 
            detail: this.playerStats 
        }));
    }

    // Game Session Management
    async startGameSession(gameType, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}/game/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    game_type: gameType, 
                    student_id: 'student123',
                    ...options 
                })
            });

            if (response.ok) {
                const session = await response.json();
                this.currentSession = session;
                return session;
            } else {
                // Fallback to offline session
                return this.createOfflineSession(gameType);
            }
        } catch (error) {
            console.log('Backend unavailable, creating offline session');
            return this.createOfflineSession(gameType);
        }
    }

    createOfflineSession(gameType) {
        const sessionId = `offline_${Date.now()}`;
        this.currentSession = {
            session_id: sessionId,
            game_type: gameType,
            score: 0,
            questions_answered: 0,
            correct_answers: 0,
            start_time: new Date().toISOString(),
            offline: true
        };
        return this.currentSession;
    }

    // Mario Learning Quest Integration
    async launchMarioQuest() {
        const session = await this.startGameSession('mario_quest');
        
        const gameConfig = {
            sessionId: session.session_id,
            levels: await this.getLevels('mario'),
            tokenRewards: {
                levelComplete: 20,
                perfectScore: 30,
                firstTry: 15
            },
            apiEndpoint: `${this.baseUrl}/mario/progress`
        };

        return this.openGameWindow('/api/mario_learning_quest.html', gameConfig);
    }

    // Treasure Hunt Academy Integration
    async launchTreasureHunt() {
        const session = await this.startGameSession('treasure_hunt');
        
        const gameConfig = {
            sessionId: session.session_id,
            treasures: await this.getTreasures(),
            tokenRewards: {
                treasureFound: 25,
                riddleSolved: 10,
                perfectHunt: 50
            },
            apiEndpoint: `${this.baseUrl}/treasure/progress`
        };

        return this.openGameWindow('/api/treasure_hunt_academy.html', gameConfig);
    }

    // Subway Surfer Educational Integration
    async launchSubwaySurfer() {
        const session = await this.startGameSession('subway_surfer');
        
        const gameConfig = {
            sessionId: session.session_id,
            questions: await this.getQuestions('mixed', 20),
            tokenRewards: {
                correctAnswer: 5,
                streakBonus: 10,
                highScore: 15
            },
            apiEndpoint: `${this.baseUrl}/subway/progress`
        };

        return this.openGameWindow('/api/subway_surfer_edu.html', gameConfig);
    }

    // Duolingo Style Learning Integration
    async launchDuolingoStyle() {
        const session = await this.startGameSession('duolingo_style');
        
        const gameConfig = {
            sessionId: session.session_id,
            lessons: await this.getLessons(),
            tokenRewards: {
                lessonComplete: 10,
                perfectLesson: 15,
                dailyGoal: 25
            },
            apiEndpoint: `${this.baseUrl}/duolingo/progress`
        };

        return this.openGameWindow('/api/duolingo_style_app.html', gameConfig);
    }

    // Student Rewards Shop Integration
    async launchRewardsShop() {
        const shopConfig = {
            playerTokens: this.playerStats.tokens,
            catalog: await this.getRewardsCatalog(),
            purchaseEndpoint: `${this.baseUrl}/rewards/shop/purchase`,
            orderHistory: await this.getOrderHistory()
        };
        // Example gamified learning cards (expanded)
        const gamifiedLearningCards = [
            // Mario Learning Quest examples
            {
                id: 'mario-1',
                title: 'Mario Learning Quest',
                description: 'Jump through 10 levels by solving educational challenges!',
                tokens: 20,
                rating: 5,
                progress: '7/10 levels',
                icon: '🍄',
            },
            {
                id: 'mario-2',
                title: 'Mario Learning Quest',
                description: 'Solve math puzzles to unlock the next platform!',
                tokens: 18,
                rating: 4.5,
                progress: '5/10 levels',
                icon: '🍄',
            },
            {
                id: 'mario-3',
                title: 'Mario Learning Quest',
                description: 'Defeat the boss by answering science questions!',
                tokens: 22,
                rating: 5,
                progress: 'Boss Level',
                icon: '🍄',
            },
            // Treasure Hunt Academy examples
            {
                id: 'treasure-1',
                title: 'Treasure Hunt Academy',
                description: 'Discover hidden treasures by solving ancient riddles!',
                tokens: 25,
                rating: 5,
                progress: '2/5 treasures',
                icon: '☠️',
            },
            {
                id: 'treasure-2',
                title: 'Treasure Hunt Academy',
                description: 'Crack the code to unlock the next map!',
                tokens: 23,
                rating: 4.5,
                progress: '3/5 treasures',
                icon: '☠️',
            },
            {
                id: 'treasure-3',
                title: 'Treasure Hunt Academy',
                description: 'Solve history riddles for bonus tokens!',
                tokens: 28,
                rating: 5,
                progress: 'Bonus Round',
                icon: '☠️',
            },
            // Subway Learning Rush examples
            {
                id: 'subway-1',
                title: 'Subway Learning Rush',
                description: 'Run and answer questions in this fast-paced adventure!',
                tokens: 15,
                rating: 4.5,
                progress: 'High Score: 2,450 points',
                icon: '🚉',
            },
            {
                id: 'subway-2',
                title: 'Subway Learning Rush',
                description: 'Answer quick-fire questions to boost your speed!',
                tokens: 17,
                rating: 4,
                progress: 'High Score: 1,800 points',
                icon: '🚉',
            },
            {
                id: 'subway-3',
                title: 'Subway Learning Rush',
                description: 'Collect coins by solving math challenges!',
                tokens: 20,
                rating: 5,
                progress: 'High Score: 2,900 points',
                icon: '🚉',
            },
            // Subject Mastery Path examples
            {
                id: 'mastery-1',
                title: 'Subject Mastery Path',
                description: 'Follow structured learning paths with instant feedback!',
                tokens: 10,
                rating: 5,
                progress: 'Current: Science Level 6',
                icon: '🦉',
            },
            {
                id: 'mastery-2',
                title: 'Subject Mastery Path',
                description: 'Advance to Math Level 7 by mastering concepts!',
                tokens: 12,
                rating: 4.5,
                progress: 'Current: Math Level 7',
                icon: '🦉',
            },
            {
                id: 'mastery-3',
                title: 'Subject Mastery Path',
                description: 'Earn badges for English mastery!',
                tokens: 11,
                rating: 5,
                progress: 'Current: English Level 5',
                icon: '🦉',
            },
            // Quiz Challenge Arena examples
            {
                id: 'quiz-1',
                title: 'Quiz Challenge Arena',
                description: 'Test your knowledge in rapid-fire quiz battles!',
                tokens: 8,
                rating: 5,
                progress: 'Win Rate: 89%',
                icon: '🧠',
            },
            {
                id: 'quiz-2',
                title: 'Quiz Challenge Arena',
                description: 'Compete in science quiz tournaments!',
                tokens: 10,
                rating: 4.5,
                progress: 'Win Rate: 92%',
                icon: '🧠',
            },
            {
                id: 'quiz-3',
                title: 'Quiz Challenge Arena',
                description: 'Win math quiz battles for extra tokens!',
                tokens: 9,
                rating: 5,
                progress: 'Win Rate: 95%',
                icon: '🧠',
            },
            // AI Tutor Challenge examples
            {
                id: 'ai-tutor-1',
                title: 'AI Tutor Challenge',
                description: 'Learn with AI hints, step-by-step guidance, and mnemonics!',
                tokens: 12,
                rating: 5,
                progress: 'AI Assist Level: 3',
                icon: '🤖',
            },
            {
                id: 'ai-tutor-2',
                title: 'AI Tutor Challenge',
                description: 'Get instant help for tough questions!',
                tokens: 14,
                rating: 5,
                progress: 'AI Assist Level: 4',
                icon: '🤖',
            },
            {
                id: 'ai-tutor-3',
                title: 'AI Tutor Challenge',
                description: 'Unlock memory techniques and mnemonics!',
                tokens: 13,
                rating: 4.5,
                progress: 'AI Assist Level: 5',
                icon: '🤖',
            },
        ];
                                return data.questions;
                            }
                        } catch (error) {
                            console.log('Using fallback questions');
                        }
                        return this.getFallbackQuestions(subject, count);
                    }
                }

// Sample problems for class 6-7 (MCQ/short-answer)
const sampleProblems = {
    mario: [
        {
            question: "Which of the following objects is luminous?",
            options: ["Moon", "Planet", "Sun", "Mirror"],
            correct: 2,
            explanation: "The Sun produces its own light and heat, making it a luminous object.",
                return this.getFallbackLevels(gameType);
    }
// ...existing code...
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
        <div style="background: #fff; border-radius: 16px; padding: 32px; min-width: 320px; max-width: 90vw; box-shadow: 0 8px 32px #0002;">
            <h2 style="font-size: 1.3em; margin-bottom: 16px;">${p.question}</h2>
            <form id="sample-problem-form">
                ${p.options.map((opt, i) => `<label style='display:block;margin-bottom:8px;'><input type='radio' name='answer' value='${i}'> ${opt}</label>`).join('')}
            </form>
            <button id="submitSampleAnswer" style="margin-top:16px;">Submit</button>
            <div id="sampleProblemFeedback" style="margin-top:16px;font-weight:bold;"></div>
            <div style="margin-top:12px;font-size:0.9em;color:#666;">${p.source}</div>
            <button id="closeSampleModal" style="margin-top:24px;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeSampleModal').onclick = () => modal.remove();
    document.getElementById('submitSampleAnswer').onclick = () => {
        const val = document.querySelector('input[name="answer"]:checked');
        const feedback = document.getElementById('sampleProblemFeedback');
        if (!val) {
            feedback.textContent = 'Please select an answer.';
            feedback.style.color = '#d00';
            return;
        }
        if (parseInt(val.value) === p.correct) {
            feedback.textContent = 'Correct! ' + p.explanation;
            feedback.style.color = '#090';
        } else {
            feedback.textContent = 'Incorrect. ' + p.explanation;
            feedback.style.color = '#d00';
        }
    };
}

// Attach launchSampleProblem to each card (for demo)
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.game-card').forEach(card => {
            card.onclick = () => {
                const id = card.getAttribute('data-gameid') || card.id || '';
                // Map to sampleProblems key
                let key = '';
                if (id.startsWith('mario')) key = 'mario';
                else if (id.startsWith('treasure')) key = 'treasure';
                else if (id.startsWith('subway')) key = 'subway';
                else if (id.startsWith('mastery')) key = 'mastery';
                else if (id.startsWith('quiz')) key = 'quiz';
                else if (id.startsWith('ai-tutor')) key = 'aiTutor';
                if (key) launchSampleProblem(key);
            };
        });
    }, 500);
});
            const response = await fetch(`${this.baseUrl}/game/treasure/locations`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log('Using fallback treasures');
        }
        return this.getFallbackTreasures();
    }

    async getLessons() {
        try {
            const response = await fetch(`${this.baseUrl}/duolingo/lessons`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log('Using fallback lessons');
        }
        return this.getFallbackLessons();
    }

    async getRewardsCatalog() {
        try {
            const response = await fetch(`${this.baseUrl}/rewards/shop/catalog`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log('Using fallback catalog');
        }
        return this.getFallbackCatalog();
    }

    async getOrderHistory() {
        try {
            const response = await fetch(`${this.baseUrl}/rewards/student/student123/orders`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log('Using fallback order history');
        }
        return [];
    }

    // Progress Tracking
    async submitGameProgress(sessionId, progressData) {
        try {
            const response = await fetch(`${this.baseUrl}/game/progress/${sessionId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(progressData)
            });

            if (response.ok) {
                const result = await response.json();
                this.handleProgressResponse(result);
                return result;
            }
        } catch (error) {
            console.log('Saving progress locally');
        }
        
        this.saveProgressLocally(sessionId, progressData);
        return { success: true, offline: true };
    }

    handleProgressResponse(result) {
        if (result.tokens_earned) {
            this.awardTokens(result.tokens_earned);
        }
        
        if (result.achievements) {
            this.unlockAchievements(result.achievements);
        }
        
        if (result.level_up) {
            this.levelUp(result.new_level);
        }
    }

    // Token Management
    awardTokens(amount, reason = 'Achievement') {
        this.playerStats.tokens += amount;
        this.savePlayerStats();
        this.showTokenAnimation(amount);
        this.broadcastStatsUpdate();
        
        // Check for token milestones
        this.checkTokenMilestones();
    }

    spendTokens(amount, item) {
        if (this.playerStats.tokens >= amount) {
            this.playerStats.tokens -= amount;
            this.savePlayerStats();
            this.broadcastStatsUpdate();
            return true;
        }
        return false;
    }

    checkTokenMilestones() {
        const milestones = [100, 250, 500, 1000, 2500];
        const currentTokens = this.playerStats.tokens;
        
        milestones.forEach(milestone => {
            const achievementKey = `tokens_${milestone}`;
            if (currentTokens >= milestone && !this.playerStats.unlockedRewards.includes(achievementKey)) {
                this.unlockAchievement({
                    id: achievementKey,
                    name: `Token Collector ${milestone}`,
                    description: `Earned ${milestone} tokens!`,
                    icon: '🪙',
                    reward: Math.floor(milestone / 10)
                });
            }
        });
    }

    // Achievement System
    unlockAchievement(achievement) {
        if (!this.playerStats.unlockedRewards.includes(achievement.id)) {
            this.playerStats.unlockedRewards.push(achievement.id);
            this.playerStats.achievements += 1;
            this.savePlayerStats();
            this.showAchievementAnimation(achievement);
            this.broadcastStatsUpdate();
        }
    }

    unlockAchievements(achievements) {
        achievements.forEach(achievement => this.unlockAchievement(achievement));
    }

    // Level System
    awardXP(amount) {
        this.playerStats.xp += amount;
        const newLevel = Math.floor(this.playerStats.xp / 250) + 1;
        
        if (newLevel > this.playerStats.level) {
            this.levelUp(newLevel);
        }
        
        this.savePlayerStats();
        this.broadcastStatsUpdate();
    }

    levelUp(newLevel) {
        const oldLevel = this.playerStats.level;
        this.playerStats.level = newLevel;
        
        // Award level up bonus
        const bonusTokens = newLevel * 5;
        this.awardTokens(bonusTokens, 'Level Up Bonus');
        
        this.showLevelUpAnimation(oldLevel, newLevel);
    }

    // Animation and UI Feedback
    showTokenAnimation(amount) {
        const animation = document.createElement('div');
        animation.className = 'fixed top-20 right-10 text-yellow-300 font-bold text-2xl animate-bounce z-50 pointer-events-none';
        animation.innerHTML = `+${amount} 🪙`;
        document.body.appendChild(animation);
        
        setTimeout(() => {
            if (document.body.contains(animation)) {
                document.body.removeChild(animation);
            }
        }, 2000);
    }

    showAchievementAnimation(achievement) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-8 rounded-2xl text-center max-w-md mx-4 animate-pulse">
                <div class="text-6xl mb-4">${achievement.icon}</div>
                <h3 class="text-2xl font-bold mb-2">Achievement Unlocked!</h3>
                <h4 class="text-xl font-semibold mb-2">${achievement.name}</h4>
                <p class="text-sm opacity-80">${achievement.description}</p>
                <button onclick="this.parentElement.parentElement.remove()" class="mt-6 bg-black/20 text-black px-6 py-2 rounded-lg font-semibold hover:bg-black/30 transition-all">
                    Awesome! 🎉
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 5000);
    }

    showLevelUpAnimation(oldLevel, newLevel) {
        const animation = document.createElement('div');
        animation.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-8 rounded-2xl text-center z-50';
        animation.innerHTML = `
            <div class="text-4xl mb-4">🎉</div>
            <div class="text-2xl font-bold">Level Up!</div>
            <div class="text-lg">Level ${oldLevel} → Level ${newLevel}</div>
            <div class="text-sm mt-2">Bonus: ${newLevel * 5} tokens! 🪙</div>
        `;
        document.body.appendChild(animation);
        
        setTimeout(() => {
            if (document.body.contains(animation)) {
                document.body.removeChild(animation);
            }
        }, 3000);
    }

    // Window Management
    openGameWindow(url, config = {}) {
        // For embedded games, use modal
        const gameModal = document.getElementById('gameModal');
        const gameFrame = document.getElementById('gameFrame');
        
        if (gameModal && gameFrame) {
            // Pass config to game via postMessage
            gameFrame.onload = () => {
                gameFrame.contentWindow.postMessage({
                    type: 'GAME_CONFIG',
                    config: config
                }, '*');
            };
            
            gameFrame.src = url;
            gameModal.classList.remove('hidden');
            return true;
        }
        
        // Fallback: open in new window
        const gameWindow = window.open(url, 'gamifiedLearning', 'width=1200,height=800');
        
        // Send config via postMessage
        gameWindow.onload = () => {
            gameWindow.postMessage({
                type: 'GAME_CONFIG',
                config: config
            }, '*');
        };
        
        return gameWindow;
    }

    // Fallback Data (for offline mode)
    getFallbackQuestions(subject, count) {
        const questions = [
            {
                id: 1,
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correct: 1,
                subject: "Mathematics"
            },
            {
                id: 2,
                question: "What is the capital of India?",
                options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
                correct: 1,
                subject: "Geography"
            }
            // Add more fallback questions...
        ];
        
        return questions.slice(0, count);
    }

    getFallbackLevels(gameType) {
        return Array.from({ length: 10 }, (_, i) => ({
            level: i + 1,
            title: `Level ${i + 1}`,
            difficulty: i < 3 ? 'easy' : i < 7 ? 'medium' : 'hard',
            questions: 5 + i,
            unlocked: i < 3
        }));
    }

    getFallbackTreasures() {
        return [
            { id: 1, name: "Ancient Wisdom", location: "Mathematics Temple", unlocked: true },
            { id: 2, name: "Science Secrets", location: "Laboratory Cave", unlocked: false },
            { id: 3, name: "History Mysteries", location: "Time Pyramid", unlocked: false }
        ];
    }

    getFallbackLessons() {
        return {
            science: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `Science Lesson ${i + 1}`, unlocked: i < 3 })),
            maths: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `Math Lesson ${i + 1}`, unlocked: i < 3 }))
        };
    }

    getFallbackCatalog() {
        return [
            { id: 1, name: "Colorful Pencil Set", price: 50, category: "stationery" },
            { id: 2, name: "Learning Champion Notebook", price: 75, category: "stationery" },
            { id: 3, name: "Premium Course Access", price: 150, category: "digital" }
        ];
    }

    getFallbackQuizData(subject) {
        return {
            sessionId: `offline_quiz_${Date.now()}`,
            questions: this.getFallbackQuestions(subject, 10),
            timeLimit: 300,
            tokenRewards: { correctAnswer: 8, perfectQuiz: 20, timeBonus: 5 }
        };
    }

    getFallbackAITutor(topic) {
        return {
            sessionId: `offline_ai_${Date.now()}`,
            topic: topic,
            aiEndpoints: {
                hint: '/api/ai/hint',
                stepByStep: '/api/ai/step-by-step-guidance',
                mnemonic: '/api/ai/memory-technique',
                explanation: '/api/ai/gamified-explanation'
            },
            tokenRewards: { useHint: 2, solveWithAI: 5, independentSolve: 12 }
        };
    }

    // Local Storage for Offline Mode
    saveProgressLocally(sessionId, progressData) {
        const offlineProgress = JSON.parse(localStorage.getItem('offlineProgress') || '{}');
        offlineProgress[sessionId] = {
            ...progressData,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('offlineProgress', JSON.stringify(offlineProgress));
    }

    // Sync offline data when backend becomes available
    async syncOfflineProgress() {
        const offlineProgress = JSON.parse(localStorage.getItem('offlineProgress') || '{}');
        
        for (const [sessionId, progressData] of Object.entries(offlineProgress)) {
            try {
                await this.submitGameProgress(sessionId, progressData);
                delete offlineProgress[sessionId];
            } catch (error) {
                console.log(`Failed to sync session ${sessionId}`);
            }
        }
        
        localStorage.setItem('offlineProgress', JSON.stringify(offlineProgress));
    }
}

// Global instance
window.gamifiedLearning = new GamifiedLearningService();

// Auto-sync when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.gamifiedLearning.syncOfflineProgress();
});