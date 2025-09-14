// Smart Retry Strategy Predictor JavaScript
class SmartRetryPredictor {
    constructor() {
        this.currentLanguage = 'en';
        this.retryData = {
            morning: { concepts: 5, retention: 'high' },
            afternoon: { concepts: 3, retention: 'optimal' },
            evening: { concepts: 7, retention: 'review' }
        };
        this.userStats = {
            streak: 12,
            conceptsLearned: 45,
            retentionRate: 87,
            optimalSessions: 34
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderMemoryCurve();
        this.startLiveUpdates();
        this.initializeAnimations();
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

        // Sync schedule button
        const syncButton = document.getElementById('sync-schedule');
        syncButton?.addEventListener('click', () => this.syncSchedule());

        // Retry slot interactions
        document.querySelectorAll('.retry-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                const time = slot.dataset.time;
                this.selectTimeSlot(time);
            });
        });
    }

    renderMemoryCurve() {
        const canvas = document.getElementById('memory-curve-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Memory curve data points (Ebbinghaus forgetting curve)
        const dataPoints = [
            { x: 0, y: 100 },    // Day 0 - 100% retention
            { x: 20, y: 80 },    // Day 1 - 80% retention
            { x: 60, y: 50 },    // Day 3 - 50% retention
            { x: 140, y: 25 },   // Day 7 - 25% retention
            { x: 200, y: 15 },   // Day 14 - 15% retention
            { x: 280, y: 10 }    // Day 21 - 10% retention
        ];

        // Optimal review points
        const reviewPoints = [
            { x: 20, y: 80, label: '1d' },
            { x: 60, y: 50, label: '3d' },
            { x: 140, y: 25, label: '7d' },
            { x: 280, y: 10, label: '21d' }
        ];

        // Draw grid
        ctx.strokeStyle = '#f3f4f6';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = (height - 40) * i / 10 + 20;
            ctx.beginPath();
            ctx.moveTo(40, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
        }

        // Draw memory curve
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        dataPoints.forEach((point, index) => {
            const x = point.x + 40;
            const y = height - 20 - (point.y / 100) * (height - 40);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw review points
        reviewPoints.forEach(point => {
            const x = point.x + 40;
            const y = height - 20 - (point.y / 100) * (height - 40);
            
            // Draw circle
            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw label
            ctx.fillStyle = '#374151';
            ctx.font = '12px Nunito';
            ctx.textAlign = 'center';
            ctx.fillText(point.label, x, y - 15);
        });

        // Draw axis labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Nunito';
        ctx.textAlign = 'left';
        ctx.fillText('Days', width - 40, height - 5);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Retention %', 0, 0);
        ctx.restore();
    }

    syncSchedule() {
        const syncButton = document.getElementById('sync-schedule');
        const originalText = syncButton.innerHTML;
        
        // Show loading state
        syncButton.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Syncing...</span>';
        syncButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Update schedule data (simulate new recommendations)
            this.updateScheduleData();
            
            // Reset button
            syncButton.innerHTML = originalText;
            syncButton.disabled = false;
            lucide.createIcons();
            
            // Show success notification
            this.showNotification('Schedule synced successfully!', 'success');
        }, 2000);
    }

    updateScheduleData() {
        // Simulate dynamic schedule updates
        const slots = document.querySelectorAll('.retry-slot');
        slots.forEach(slot => {
            const time = slot.dataset.time;
            const conceptsEl = slot.querySelector('.text-2xl');
            
            // Random update to concept count
            const newCount = Math.floor(Math.random() * 8) + 2;
            conceptsEl.textContent = newCount;
            
            // Add animation
            conceptsEl.classList.add('animate-pulse');
            setTimeout(() => {
                conceptsEl.classList.remove('animate-pulse');
            }, 1000);
        });
    }

    selectTimeSlot(time) {
        // Remove previous selections
        document.querySelectorAll('.retry-slot').forEach(slot => {
            slot.classList.remove('ring-4', 'ring-indigo-500');
        });
        
        // Add selection to clicked slot
        const selectedSlot = document.querySelector(`[data-time="${time}"]`);
        selectedSlot.classList.add('ring-4', 'ring-indigo-500');
        
        // Start review session for selected time
        setTimeout(() => {
            this.startReviewSession(time);
        }, 500);
    }

    startReviewSession(timeSlot = 'morning') {
        const modal = document.getElementById('review-modal');
        const content = document.getElementById('review-content');
        
        // Generate review content based on time slot
        const concepts = this.generateReviewConcepts(timeSlot);
        
        content.innerHTML = `
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i data-lucide="brain" class="w-8 h-8 text-white"></i>
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-2">Ready to Review?</h4>
                <p class="text-gray-600">Your brain is optimally primed for learning right now!</p>
            </div>
            
            <div class="space-y-4 mb-6">
                ${concepts.map(concept => `
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <i data-lucide="${concept.icon}" class="w-4 h-4 text-indigo-600"></i>
                            </div>
                            <div>
                                <h5 class="font-medium text-gray-900">${concept.title}</h5>
                                <p class="text-sm text-gray-500">${concept.subject}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-medium text-gray-900">${concept.retention}%</div>
                            <div class="text-xs text-gray-500">retention</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="flex space-x-4">
                <button onclick="smartRetry.beginReview()" class="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                    Begin Review
                </button>
                <button onclick="smartRetry.scheduleForLater()" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Schedule for Later
                </button>
            </div>
        `;
        
        modal.classList.remove('hidden');
        lucide.createIcons();
    }

    generateReviewConcepts(timeSlot) {
        const conceptPool = [
            { title: 'Quadratic Equations', subject: 'Mathematics', icon: 'calculator', retention: 75 },
            { title: 'Photosynthesis', subject: 'Biology', icon: 'leaf', retention: 82 },
            { title: 'Newton\'s Laws', subject: 'Physics', icon: 'zap', retention: 68 },
            { title: 'French Revolution', subject: 'History', icon: 'crown', retention: 90 },
            { title: 'Chemical Bonding', subject: 'Chemistry', icon: 'atom', retention: 73 },
            { title: 'Prose Writing', subject: 'English', icon: 'pen-tool', retention: 85 }
        ];
        
        const slotConcepts = {
            morning: 5,
            afternoon: 3,
            evening: 7
        };
        
        const count = slotConcepts[timeSlot] || 3;
        return conceptPool.slice(0, count);
    }

    beginReview() {
        this.closeReviewModal();
        this.showNotification('Review session started! Focus mode activated.', 'success');
        
        // Simulate navigation to review interface
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
    }

    scheduleForLater() {
        this.closeReviewModal();
        this.showNotification('Review scheduled for later. We\'ll remind you!', 'info');
    }

    closeReviewModal() {
        document.getElementById('review-modal')?.classList.add('hidden');
    }

    customizeSchedule() {
        document.getElementById('schedule-modal')?.classList.remove('hidden');
    }

    closeScheduleModal() {
        document.getElementById('schedule-modal')?.classList.add('hidden');
    }

    saveSchedule() {
        this.closeScheduleModal();
        this.showNotification('Schedule preferences saved successfully!', 'success');
    }

    viewAnalytics() {
        this.showNotification('Opening detailed analytics...', 'info');
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1000);
    }

    startLiveUpdates() {
        // Update stats periodically
        setInterval(() => {
            this.updateLiveStats();
        }, 30000); // Every 30 seconds
    }

    updateLiveStats() {
        // Simulate real-time updates
        const elements = {
            streak: Math.max(1, this.userStats.streak + (Math.random() > 0.7 ? 1 : 0)),
            retention: Math.min(100, this.userStats.retentionRate + (Math.random() - 0.5) * 2)
        };
        
        // Update with smooth animations
        Object.entries(elements).forEach(([key, value]) => {
            const element = document.querySelector(`[data-stat="${key}"]`);
            if (element) {
                element.textContent = Math.round(value);
                element.classList.add('animate-pulse');
                setTimeout(() => element.classList.remove('animate-pulse'), 1000);
            }
        });
    }

    initializeAnimations() {
        // Stagger animations for stats cards
        const statCards = document.querySelectorAll('.text-center.p-6');
        statCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Animate action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05) translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) translateY(0)';
            });
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
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
        ai_powered: "AI-Powered Spaced Repetition",
        master_timing: "Master the Perfect",
        subtitle: "Our AI analyzes your learning patterns to predict the optimal time for reviewing concepts, maximizing retention and minimizing study time.",
        learning_status: "Your Learning Status",
        active: "Active",
        day_streak: "Day Streak",
        concepts_learned: "Concepts Learned",
        retention_rate: "Retention Rate",
        optimal_sessions: "Optimal Sessions",
        today_schedule: "Today's Retry Schedule",
        sync: "Sync",
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
        concepts: "concepts",
        high_retention: "High Retention",
        optimal: "Optimal",
        review_mode: "Review Mode",
        start_now: "Start Now →",
        ai_recommendation: "AI Recommendation",
        recommendation_text: "Based on your learning pattern, you perform best during afternoon sessions. Consider starting with Mathematics concepts at 2:30 PM for optimal retention.",
        confidence: "Confidence: 94%",
        learn_more: "Learn More →",
        algorithm_insights: "Algorithm Insights",
        memory_curve: "Your Memory Curve",
        memory_curve_desc: "Your retention follows the Ebbinghaus forgetting curve. Optimal reviews occur at: Day 1, Day 3, Day 7, Day 21.",
        success_rate: "Success Rate",
        time_saved: "Time Saved",
        time_saved_desc: "vs. traditional review methods",
        next_breakthrough: "Next Breakthrough",
        breakthrough_desc: "Based on your current pace",
        quick_actions: "Quick Actions",
        start_review: "Start Review Session",
        start_review_desc: "Begin your optimally timed practice",
        customize_schedule: "Customize Schedule",
        customize_desc: "Adjust timing preferences",
        view_analytics: "View Analytics",
        analytics_desc: "Deep dive into your progress",
        review_session: "Review Session",
        preferred_times: "Preferred Study Times",
        save_changes: "Save Changes",
        cancel: "Cancel",
        back: "Back to Dashboard"
    },
    hi: {
        ai_powered: "AI-संचालित स्पेस्ड रिपीटिशन",
        master_timing: "सही समय में",
        subtitle: "हमारा AI आपके सीखने के पैटर्न का विश्लेषण करके अवधारणाओं की समीक्षा के लिए इष्टतम समय की भविष्यवाणी करता है।",
        learning_status: "आपकी अध्ययन स्थिति",
        active: "सक्रिय",
        day_streak: "दिन की लकीर",
        concepts_learned: "सीखी गई अवधारणाएं",
        retention_rate: "अवधारण दर",
        optimal_sessions: "इष्टतम सत्र",
        today_schedule: "आज का पुनः प्रयास कार्यक्रम",
        sync: "सिंक",
        morning: "सुबह",
        afternoon: "दोपहर",
        evening: "शाम",
        concepts: "अवधारणाएं",
        high_retention: "उच्च अवधारण",
        optimal: "इष्टतम",
        review_mode: "समीक्षा मोड",
        start_now: "अभी शुरू करें →",
        ai_recommendation: "AI सुझाव",
        recommendation_text: "आपके सीखने के पैटर्न के आधार पर, आप दोपहर के सत्रों में सबसे अच्छा प्रदर्शन करते हैं।",
        confidence: "विश्वास: 94%",
        learn_more: "और जानें →",
        algorithm_insights: "एल्गोरिदम अंतर्दृष्टि",
        memory_curve: "आपका स्मृति वक्र",
        memory_curve_desc: "आपकी अवधारण एबिंगहॉस भूलने के वक्र का पालन करती है।",
        success_rate: "सफलता दर",
        time_saved: "समय बचाया",
        time_saved_desc: "पारंपरिक समीक्षा विधियों की तुलना में",
        next_breakthrough: "अगली सफलता",
        breakthrough_desc: "आपकी वर्तमान गति के आधार पर",
        quick_actions: "त्वरित क्रियाएं",
        start_review: "समीक्षा सत्र शुरू करें",
        start_review_desc: "अपना इष्टतम समय अभ्यास शुरू करें",
        customize_schedule: "कार्यक्रम अनुकूलित करें",
        customize_desc: "समय प्राथमिकताएं समायोजित करें",
        view_analytics: "विश्लेषणात्मक देखें",
        analytics_desc: "अपनी प्रगति में गहराई से जाएं",
        review_session: "समीक्षा सत्र",
        preferred_times: "पसंदीदा अध्ययन समय",
        save_changes: "परिवर्तन सहेजें",
        cancel: "रद्द करें",
        back: "डैशबोर्ड पर वापस"
    }
};

function switchLanguage(lang) {
    const smartRetry = window.smartRetry;
    if (smartRetry) {
        smartRetry.currentLanguage = lang;
        document.getElementById('current-language').textContent = lang === 'en' ? 'English' : 'हिंदी';
        document.getElementById('language-dropdown').classList.add('hidden');
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
}

// Global functions for HTML onclick handlers
function startReviewSession() {
    window.smartRetry?.startReviewSession();
}

function customizeSchedule() {
    window.smartRetry?.customizeSchedule();
}

function viewAnalytics() {
    window.smartRetry?.viewAnalytics();
}

function closeReviewModal() {
    window.smartRetry?.closeReviewModal();
}

function closeScheduleModal() {
    window.smartRetry?.closeScheduleModal();
}

function saveSchedule() {
    window.smartRetry?.saveSchedule();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.smartRetry = new SmartRetryPredictor();
});