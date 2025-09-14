/**
 * =================================================================
 * 🎓 LEARNBUDDY - CONFIGURATION MANAGER
 * =================================================================
 * Srujana Hackathon - Educational Technology Category
 * 
 * Central configuration management for the LearnBuddy platform.
 * Loads and validates environment variables with sensible defaults.
 */

require('dotenv').config();

/**
 * Configuration object with all application settings
 */
const config = {
  // Server Configuration
  server: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT) || 3000,
    host: process.env.HOST || 'localhost',
    baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`
  },

  // AI Services Configuration
  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4',
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 1000
    },
    googleAI: {
      apiKey: process.env.GOOGLE_AI_API_KEY,
      projectId: process.env.GOOGLE_TRANSLATE_PROJECT_ID
    },
    azure: {
      speechKey: process.env.AZURE_SPEECH_KEY,
      speechRegion: process.env.AZURE_SPEECH_REGION || 'eastus'
    }
  },

  // Database Configuration
  database: {
    mongodb: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/learnbuddy',
      database: process.env.MONGODB_DATABASE || 'learnbuddy'
    },
    redis: {
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD
    }
  },

  // Security Configuration
  security: {
    jwtSecret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    sessionSecret: process.env.SESSION_SECRET || 'default-session-secret',
    encryptionKey: process.env.ENCRYPTION_KEY,
    encryptionIV: process.env.ENCRYPTION_IV
  },

  // Email Configuration
  email: {
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    from: {
      email: process.env.FROM_EMAIL || 'noreply@learnbuddy.com',
      name: process.env.FROM_NAME || 'LearnBuddy Platform'
    }
  },

  // Language & Localization
  language: {
    default: process.env.DEFAULT_LANGUAGE || 'en',
    supported: (process.env.SUPPORTED_LANGUAGES || 'en,hi,kn,mr').split(','),
    translationCacheTTL: parseInt(process.env.TRANSLATION_CACHE_TTL) || 3600,
    culturalContextApiKey: process.env.CULTURAL_CONTEXT_API_KEY
  },

  // Analytics Configuration
  analytics: {
    googleAnalytics: {
      trackingId: process.env.GA_TRACKING_ID,
      measurementId: process.env.GA_MEASUREMENT_ID
    },
    learningAnalytics: {
      apiKey: process.env.LEARNING_ANALYTICS_API_KEY,
      behaviorTracking: process.env.BEHAVIOR_TRACKING_ENABLED === 'true',
      syncInterval: parseInt(process.env.PROGRESS_SYNC_INTERVAL) || 30000
    },
    sentry: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT || 'development'
    }
  },

  // Gamification Settings
  gamification: {
    enabled: process.env.ACHIEVEMENTS_ENABLED !== 'false',
    points: {
      conceptMastered: parseInt(process.env.POINTS_PER_CONCEPT_MASTERED) || 100,
      gapFixed: parseInt(process.env.POINTS_PER_GAP_FIXED) || 50,
      streakBonusMultiplier: parseFloat(process.env.STREAK_BONUS_MULTIPLIER) || 1.5
    },
    motivation: {
      messageFrequency: process.env.MOTIVATION_MESSAGE_FREQUENCY || 'daily',
      analysisDepth: process.env.BEHAVIORAL_ANALYSIS_DEPTH || 'detailed',
      encouragementLevel: process.env.ENCOURAGEMENT_LEVEL || 'high'
    }
  },

  // Text-to-Speech Configuration
  tts: {
    provider: process.env.TTS_PROVIDER || 'azure',
    voices: {
      en: process.env.TTS_VOICE_EN || 'en-US-AriaNeural',
      hi: process.env.TTS_VOICE_HI || 'hi-IN-SwaraNeural',
      kn: process.env.TTS_VOICE_KN || 'kn-IN-SapnaNeural',
      mr: process.env.TTS_VOICE_MR || 'mr-IN-ManoharNeural'
    },
    speed: process.env.TTS_SPEED || 'normal',
    quality: process.env.TTS_QUALITY || 'high',
    storage: {
      path: process.env.AUDIO_STORAGE_PATH || './public/audio',
      cacheDuration: parseInt(process.env.AUDIO_CACHE_DURATION) || 86400
    }
  },

  // Progressive Web App
  pwa: {
    enabled: process.env.PWA_ENABLED !== 'false',
    offlineCache: process.env.PWA_OFFLINE_CACHE !== 'false',
    pushNotifications: process.env.PUSH_NOTIFICATIONS_ENABLED === 'true',
    vapid: {
      publicKey: process.env.VAPID_PUBLIC_KEY,
      privateKey: process.env.VAPID_PRIVATE_KEY
    }
  },

  // AI Feature Settings
  features: {
    conceptGapMapper: {
      analysisDepth: process.env.CONCEPT_ANALYSIS_DEPTH || 'comprehensive',
      detectionSensitivity: process.env.GAP_DETECTION_SENSITIVITY || 'high',
      lessonDuration: parseInt(process.env.MINI_LESSON_DURATION) || 120,
      practiceQuestions: parseInt(process.env.PRACTICE_QUESTIONS_PER_CONCEPT) || 5
    },
    motivationCoach: {
      trackingInterval: parseInt(process.env.BEHAVIOR_TRACKING_INTERVAL) || 5000,
      triggerThreshold: parseFloat(process.env.MOTIVATION_TRIGGER_THRESHOLD) || 0.7,
      energyTracking: process.env.ENERGY_LEVEL_TRACKING !== 'false',
      celebrationEnabled: process.env.SUCCESS_CELEBRATION_ENABLED !== 'false'
    },
    vernacularEngine: {
      translationQuality: process.env.TRANSLATION_QUALITY || 'premium',
      culturalAdaptation: process.env.CULTURAL_ADAPTATION !== 'false',
      voiceNarrationSpeeds: (process.env.VOICE_NARRATION_SPEEDS || 'slow,normal,fast').split(','),
      localExamplesCount: parseInt(process.env.LOCAL_EXAMPLES_COUNT) || 3
    },
    smartRetryPredictor: {
      spacedRepetition: process.env.SPACED_REPETITION_ENABLED !== 'false',
      memoryCurveAlgorithm: process.env.MEMORY_CURVE_ALGORITHM || 'ebbinghaus',
      optimalTimingAI: process.env.OPTIMAL_TIMING_AI !== 'false'
    },
    mascotDoubtBuddy: {
      animations: process.env.MASCOT_ANIMATIONS !== 'false',
      voiceResponses: process.env.VOICE_RESPONSES !== 'false',
      gestureRecognition: process.env.GESTURE_RECOGNITION === 'true',
      emotionalIntelligence: process.env.EMOTIONAL_INTELLIGENCE || 'basic'
    }
  },

  // Development Settings
  development: {
    debug: process.env.DEBUG_MODE === 'true',
    logLevel: process.env.LOG_LEVEL || 'info',
    logFilePath: process.env.LOG_FILE_PATH || './logs/learnbuddy.log',
    sqlLogging: process.env.SQL_LOGGING === 'true',
    performanceMonitoring: process.env.PERFORMANCE_MONITORING !== 'false',
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT) || 30000,
    maxFileSize: process.env.MAX_FILE_SIZE || '10MB'
  },

  // Rate Limiting
  rateLimiting: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000, // Convert minutes to ms
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },

  // Educational Content
  education: {
    gradeLevels: (process.env.GRADE_LEVELS || '6,7,8,9,10').split(',').map(g => parseInt(g)),
    subjects: (process.env.SUBJECTS || 'math,english,science,social_studies').split(','),
    difficultyLevels: (process.env.DIFFICULTY_LEVELS || 'beginner,intermediate,advanced').split(','),
    content: {
      apiUrl: process.env.CONTENT_API_URL,
      apiKey: process.env.CONTENT_API_KEY,
      updateFrequency: process.env.CURRICULUM_UPDATE_FREQUENCY || 'weekly'
    }
  },

  // UI/UX Configuration
  ui: {
    theme: {
      primaryColor: process.env.THEME_PRIMARY_COLOR || '#6366f1',
      secondaryColor: process.env.THEME_SECONDARY_COLOR || '#ec4899',
      animationSpeed: process.env.ANIMATION_SPEED || 'normal',
      accessibilityMode: process.env.ACCESSIBILITY_MODE === 'true'
    },
    fonts: {
      primary: process.env.PRIMARY_FONT || 'Fredoka One',
      secondary: process.env.SECONDARY_FONT || 'Nunito',
      baseSize: process.env.FONT_SIZE_BASE || '16px'
    }
  },

  // Reporting & Analytics
  reporting: {
    dailyReport: process.env.DAILY_REPORT_ENABLED !== 'false',
    weeklySummary: process.env.WEEKLY_SUMMARY_ENABLED !== 'false',
    parentNotifications: process.env.PARENT_NOTIFICATION_ENABLED === 'true',
    teacherDashboard: process.env.TEACHER_DASHBOARD_ENABLED === 'true',
    metrics: {
      learningVelocity: process.env.LEARNING_VELOCITY_TRACKING !== 'false',
      masteryThreshold: parseFloat(process.env.CONCEPT_MASTERY_THRESHOLD) || 0.8,
      milestoneNotifications: process.env.PROGRESS_MILESTONE_NOTIFICATIONS !== 'false'
    }
  }
};

/**
 * Helper functions for configuration management
 */
const configHelpers = {
  /**
   * Check if AI features are available based on API keys
   */
  getAvailableFeatures() {
    return {
      conceptGapMapper: !!config.ai.openai.apiKey,
      motivationCoach: true, // No external API required
      vernacularEngine: !!config.ai.googleAI.apiKey,
      voiceNarration: !!config.ai.azure.speechKey,
      smartRetryPredictor: true, // Algorithm-based
      mascotDoubtBuddy: true // Frontend-based
    };
  },

  /**
   * Get runtime configuration summary
   */
  getSummary() {
    const features = configHelpers.getAvailableFeatures();
    const enabledFeatures = Object.entries(features).filter(([, enabled]) => enabled).length;
    
    return {
      environment: config.server.env,
      port: config.server.port,
      enabledFeatures: enabledFeatures,
      totalFeatures: Object.keys(features).length,
      features: features,
      languages: config.language.supported,
      database: !!config.database.mongodb.uri,
      security: !!config.security.jwtSecret
    };
  },

  /**
   * Validate critical configuration
   */
  validate() {
    const issues = [];

    // Check required server settings
    if (!config.server.port || config.server.port < 1 || config.server.port > 65535) {
      issues.push('Invalid server port configuration');
    }

    // Check environment
    if (!['development', 'production', 'test'].includes(config.server.env)) {
      issues.push('Invalid NODE_ENV value');
    }

    // Security warnings
    if (config.server.env === 'production') {
      if (config.security.jwtSecret === 'default-secret-change-in-production') {
        issues.push('Production deployment requires custom JWT_SECRET');
      }
      if (config.security.sessionSecret === 'default-session-secret') {
        issues.push('Production deployment requires custom SESSION_SECRET');
      }
    }

    return {
      isValid: issues.length === 0,
      issues: issues
    };
  }
};

// Validate configuration on load
const validation = configHelpers.validate();
if (!validation.isValid) {
  console.warn('⚠️ Configuration issues detected:', validation.issues);
}

module.exports = {
  config,
  ...configHelpers
};