/**
 * =================================================================
 * 🎓 LEARNBUDDY - ENVIRONMENT CONFIGURATION VALIDATOR
 * =================================================================
 * Srujana Hackathon - Educational Technology Category
 * 
 * This utility validates environment variables and provides
 * helpful error messages for missing or invalid configurations.
 */

const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

/**
 * Environment variable definitions with validation rules
 */
const ENV_CONFIG = {
  // Server Configuration (Required)
  required: {
    'NODE_ENV': {
      description: 'Application environment',
      default: 'development',
      validator: (val) => ['development', 'production', 'test'].includes(val)
    },
    'PORT': {
      description: 'Server port number',
      default: '3000',
      validator: (val) => !isNaN(val) && parseInt(val) > 0 && parseInt(val) < 65536
    }
  },

  // AI Services (Recommended for full functionality)
  recommended: {
    'OPENAI_API_KEY': {
      description: 'OpenAI API key for concept gap analysis',
      purpose: 'Enables intelligent concept gap detection and mini-lesson generation'
    },
    'GOOGLE_AI_API_KEY': {
      description: 'Google AI API key for language translation',
      purpose: 'Powers the vernacular language engine for multi-language support'
    },
    'AZURE_SPEECH_KEY': {
      description: 'Azure Speech Services key',
      purpose: 'Enables text-to-speech for voice narration in multiple languages'
    }
  },

  // Database & Storage (Optional for development)
  optional: {
    'MONGODB_URI': {
      description: 'MongoDB connection string',
      purpose: 'Stores user progress and learning analytics'
    },
    'REDIS_URL': {
      description: 'Redis connection URL',
      purpose: 'Caching and session management for better performance'
    }
  }
};

/**
 * Validation results
 */
const validationResults = {
  valid: [],
  missing: [],
  invalid: [],
  warnings: []
};

/**
 * ANSI color codes for console output
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Colorize console output
 */
function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

/**
 * Validate a single environment variable
 */
function validateEnvVar(key, config, required = false) {
  const value = process.env[key];
  
  if (!value) {
    if (required) {
      validationResults.missing.push({
        key,
        description: config.description,
        default: config.default,
        purpose: config.purpose
      });
    } else {
      validationResults.warnings.push({
        key,
        description: config.description,
        purpose: config.purpose
      });
    }
    return false;
  }

  // Validate value if validator function exists
  if (config.validator && !config.validator(value)) {
    validationResults.invalid.push({
      key,
      value: value.substring(0, 20) + '...',
      description: config.description
    });
    return false;
  }

  validationResults.valid.push({
    key,
    description: config.description
  });
  return true;
}

/**
 * Main validation function
 */
function validateEnvironment() {
  console.log(colorize('\n🎓 LEARNBUDDY ENVIRONMENT VALIDATION', 'cyan'));
  console.log(colorize('=' .repeat(50), 'cyan'));

  // Check if .env file exists
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.log(colorize('\n❌ .env file not found!', 'red'));
    console.log(colorize('💡 Copy .env.example to .env and configure your settings', 'yellow'));
    return false;
  }

  // Validate required variables
  console.log(colorize('\n🔍 Checking required environment variables...', 'blue'));
  for (const [key, config] of Object.entries(ENV_CONFIG.required)) {
    validateEnvVar(key, config, true);
  }

  // Validate recommended variables
  console.log(colorize('\n🎯 Checking recommended environment variables...', 'blue'));
  for (const [key, config] of Object.entries(ENV_CONFIG.recommended)) {
    validateEnvVar(key, config, false);
  }

  // Validate optional variables
  console.log(colorize('\n⚙️ Checking optional environment variables...', 'blue'));
  for (const [key, config] of Object.entries(ENV_CONFIG.optional)) {
    validateEnvVar(key, config, false);
  }

  // Display results
  displayResults();

  // Return overall validation status
  return validationResults.missing.length === 0 && validationResults.invalid.length === 0;
}

/**
 * Display validation results
 */
function displayResults() {
  console.log(colorize('\n📊 VALIDATION RESULTS', 'magenta'));
  console.log(colorize('=' .repeat(25), 'magenta'));

  // Valid configurations
  if (validationResults.valid.length > 0) {
    console.log(colorize(`\n✅ Valid (${validationResults.valid.length}):`, 'green'));
    validationResults.valid.forEach(item => {
      console.log(colorize(`  ✓ ${item.key}`, 'green') + ` - ${item.description}`);
    });
  }

  // Missing required configurations
  if (validationResults.missing.length > 0) {
    console.log(colorize(`\n❌ Missing Required (${validationResults.missing.length}):`, 'red'));
    validationResults.missing.forEach(item => {
      console.log(colorize(`  ✗ ${item.key}`, 'red') + ` - ${item.description}`);
      if (item.default) {
        console.log(colorize(`    Default: ${item.default}`, 'yellow'));
      }
    });
  }

  // Invalid configurations
  if (validationResults.invalid.length > 0) {
    console.log(colorize(`\n⚠️ Invalid (${validationResults.invalid.length}):`, 'red'));
    validationResults.invalid.forEach(item => {
      console.log(colorize(`  ⚠ ${item.key}`, 'red') + ` - ${item.description}`);
      console.log(colorize(`    Current value: ${item.value}`, 'yellow'));
    });
  }

  // Warnings for missing optional/recommended
  if (validationResults.warnings.length > 0) {
    console.log(colorize(`\n⚠️ Missing Recommended/Optional (${validationResults.warnings.length}):`, 'yellow'));
    validationResults.warnings.forEach(item => {
      console.log(colorize(`  ⚠ ${item.key}`, 'yellow') + ` - ${item.description}`);
      if (item.purpose) {
        console.log(colorize(`    Purpose: ${item.purpose}`, 'cyan'));
      }
    });
  }

  // Summary
  console.log(colorize('\n📋 SUMMARY', 'magenta'));
  console.log(colorize('-' .repeat(10), 'magenta'));
  
  const isValid = validationResults.missing.length === 0 && validationResults.invalid.length === 0;
  
  if (isValid) {
    console.log(colorize('🎉 Environment configuration is valid!', 'green'));
    console.log(colorize('🚀 Ready to start LearnBuddy platform', 'green'));
  } else {
    console.log(colorize('❌ Environment configuration has issues', 'red'));
    console.log(colorize('🔧 Please fix the above issues before starting the application', 'yellow'));
  }

  // Feature availability based on configuration
  console.log(colorize('\n🎯 FEATURE AVAILABILITY', 'magenta'));
  console.log(colorize('-' .repeat(20), 'magenta'));
  
  const hasOpenAI = process.env.OPENAI_API_KEY;
  const hasGoogleAI = process.env.GOOGLE_AI_API_KEY;
  const hasAzureSpeech = process.env.AZURE_SPEECH_KEY;
  const hasMongoDB = process.env.MONGODB_URI;
  
  console.log(colorize(`🤖 Concept Gap Mapper: ${hasOpenAI ? '✅ Available' : '❌ Limited (needs OpenAI API)'}`, hasOpenAI ? 'green' : 'yellow'));
  console.log(colorize(`🗣️ Vernacular Engine: ${hasGoogleAI ? '✅ Available' : '❌ Limited (needs Google AI API)'}`, hasGoogleAI ? 'green' : 'yellow'));
  console.log(colorize(`🔊 Voice Narration: ${hasAzureSpeech ? '✅ Available' : '❌ Limited (needs Azure Speech)'}`, hasAzureSpeech ? 'green' : 'yellow'));
  console.log(colorize(`📊 Progress Tracking: ${hasMongoDB ? '✅ Persistent' : '⚠️ In-memory only'}`, hasMongoDB ? 'green' : 'yellow'));

  console.log(colorize('\n💡 QUICK START TIPS', 'cyan'));
  console.log(colorize('-' .repeat(17), 'cyan'));
  console.log('1. Copy .env.example to .env');
  console.log('2. Add your API keys for full functionality');
  console.log('3. Start with basic setup and add features gradually');
  console.log('4. Check documentation for API key setup instructions');
  
  console.log(colorize('\n' + '=' .repeat(50), 'cyan'));
}

/**
 * Export validation function for use in other modules
 */
module.exports = {
  validateEnvironment,
  isValidEnvironment: () => {
    const tempResults = { valid: [], missing: [], invalid: [], warnings: [] };
    const originalResults = { ...validationResults };
    
    // Reset results for clean validation
    Object.keys(validationResults).forEach(key => {
      validationResults[key] = [];
    });
    
    // Run validation silently
    for (const [key, config] of Object.entries(ENV_CONFIG.required)) {
      validateEnvVar(key, config, true);
    }
    
    const isValid = validationResults.missing.length === 0 && validationResults.invalid.length === 0;
    
    // Restore original results
    Object.assign(validationResults, originalResults);
    
    return isValid;
  },
  getRequiredEnvVars: () => Object.keys(ENV_CONFIG.required),
  getRecommendedEnvVars: () => Object.keys(ENV_CONFIG.recommended)
};

// Run validation if this file is executed directly
if (require.main === module) {
  const isValid = validateEnvironment();
  process.exit(isValid ? 0 : 1);
}