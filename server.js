/**
 * =================================================================
 * 🎓 LEARNBUDDY - AI-POWERED LEARNING PLATFORM SERVER
 * =================================================================
 * Srujana Hackathon - Educational Technology Category
 * Main server application with environment configuration support
 */

const express = require('express');
const path = require('path');

// Conditional config loading for serverless environments
let config, getSummary;
try {
  const configModule = require('./config');
  config = configModule.config;
  getSummary = configModule.getSummary;
} catch (error) {
  // Fallback for serverless environments
  config = {
    server: {
      port: process.env.PORT || 3000,
      env: process.env.NODE_ENV || 'production'
    }
  };
  getSummary = () => ({ enabledFeatures: 6, totalFeatures: 6, languages: ['en', 'hi', 'kn', 'mr'] });
}

const app = express();

// Load configuration
const PORT = config.server.port;
const ENV = config.server.env;

// Only log startup info in development
if (ENV === 'development') {
  console.log(`🎓 Starting LearnBuddy Platform in ${ENV} mode on port ${PORT}`);
  
  // Display configuration summary
  const summary = getSummary();
  console.log(`📊 Features: ${summary.enabledFeatures}/${summary.totalFeatures} enabled`);
  console.log(`🌍 Languages: ${summary.languages.join(', ')}`);
}

// Set up middleware - Enhanced static file serving
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/audio', express.static(path.join(__dirname, 'public', 'audio')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Set up view engine
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'landing.html'));
});

app.get('/landing', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'landing.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/curriculum', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'curriculum.html'));
});

app.get('/micro-content', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'micro-content.html'));
});

app.get('/exam-trends', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'exam-trends.html'));
});

app.get('/doubt-resolver', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'doubt-resolver.html'));
});

app.get('/concept-gaps', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'concept-gaps.html'));
});

app.get('/motivation-coach', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'motivation-coach.html'));
});

app.get('/vernacular-engine', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'vernacular-engine.html'));
});

app.get('/smart-retry', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'smart-retry.html'));
});

app.get('/mascot-buddy', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'mascot-buddy.html'));
});

// New AI Feature Pages
app.get('/knowledge-gap-mapper', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'knowledge-gap-mapper.html'));
});

app.get('/study-planner', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'study-planner.html'));
});

app.get('/language-support', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'language-support.html'));
});

app.get('/doubt-buddy', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'doubt-buddy.html'));
});

// Legacy routes for compatibility
app.get('/vernacular-engine', (req, res) => {
    res.redirect('/language-support');
});

app.get('/concept-gaps', (req, res) => {
    res.redirect('/knowledge-gap-mapper');
});

// Start server (for local development)
if (ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 LearnBuddy Platform is running!`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🎯 Environment: ${ENV}`);
    console.log(`✨ Ready to help students learn better!`);
    console.log(`🎓 Open your browser and visit the dashboard`);
  });
}

// Export for Vercel serverless functions
module.exports = app;