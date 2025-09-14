# 🔧 Environment Configuration Guide

## Quick Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file with your actual API keys:**
   ```bash
   # Required for full functionality
   OPENAI_API_KEY=sk-your_actual_openai_key_here
   GOOGLE_AI_API_KEY=your_actual_google_ai_key_here
   AZURE_SPEECH_KEY=your_actual_azure_speech_key_here
   ```

3. **Validate your configuration:**
   ```bash
   npm run validate-env
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

## 🔑 API Keys Setup

### OpenAI API (Concept Gap Mapper)
- Visit: https://platform.openai.com/api-keys
- Create a new API key
- Add to `.env` as `OPENAI_API_KEY=sk-your_key_here`
- **Purpose**: Powers intelligent concept gap analysis and mini-lesson generation

### Google AI API (Vernacular Engine)
- Visit: https://cloud.google.com/translate/docs/setup
- Enable Translation API
- Create service account and download credentials
- Add API key to `.env` as `GOOGLE_AI_API_KEY=your_key_here`
- **Purpose**: Enables multi-language translation (Hindi, Kannada, Marathi)

### Azure Speech Services (Voice Narration)
- Visit: https://azure.microsoft.com/en-us/services/cognitive-services/speech-services/
- Create Speech resource
- Get key and region
- Add to `.env` as `AZURE_SPEECH_KEY=your_key_here` and `AZURE_SPEECH_REGION=your_region`
- **Purpose**: Text-to-speech for all supported languages

## 🎯 Feature Availability Matrix

| Feature | Requirement | Status |
|---------|-------------|--------|
| **Concept Gap Mapper** | OpenAI API Key | ✅ Full functionality with API key, ⚠️ Limited without |
| **Motivation Coach** | None | ✅ Always available |
| **Vernacular Engine** | Google AI API Key | ✅ Full translation with API key, ⚠️ Limited without |
| **Voice Narration** | Azure Speech Key | ✅ TTS with API key, ⚠️ Text-only without |
| **Smart Retry Predictor** | None | ✅ Algorithm-based |
| **Mascot Doubt Buddy** | None | ✅ Frontend-based |

## 🚨 Security Best Practices

1. **Never commit `.env` to version control**
   - The `.env` file is already in `.gitignore`
   - Use `.env.example` as a template for team members

2. **Use different keys for different environments**
   - Development: Use test/trial API keys
   - Production: Use production-grade API keys with proper billing

3. **Rotate keys regularly**
   - Change API keys periodically for security
   - Update keys if compromised

4. **Limit API key permissions**
   - Use minimum required permissions
   - Set usage limits where possible

## 🔧 Development vs Production

### Development Environment
```env
NODE_ENV=development
DEBUG_MODE=true
LOG_LEVEL=info
```

### Production Environment
```env
NODE_ENV=production
DEBUG_MODE=false
LOG_LEVEL=error
JWT_SECRET=your_strong_production_secret
SESSION_SECRET=your_strong_session_secret
```

## 📊 Configuration Validation

The application includes automatic environment validation:

- **Startup validation**: Runs before server starts
- **Manual validation**: `npm run validate-env`
- **Feature detection**: Automatically enables/disables features based on available API keys

## 🆘 Troubleshooting

### Common Issues

1. **"Missing required environment variables"**
   - Copy `.env.example` to `.env`
   - Fill in the required values

2. **"Invalid API key"**
   - Check API key format
   - Verify key is active and has proper permissions
   - Check billing status for paid services

3. **"Feature not working"**
   - Run `npm run validate-env` to check configuration
   - Check API key for that specific feature
   - Verify network connectivity

### Getting Help

1. Check the validation output for specific missing configurations
2. Review the feature availability matrix
3. Verify API key setup in the respective service dashboards
4. Check application logs for detailed error messages

## 🎓 Educational Context

This environment setup is designed for:
- **Students**: Easy setup with minimal configuration
- **Teachers**: Clear feature availability based on available resources
- **Developers**: Comprehensive configuration options
- **Hackathons**: Quick deployment with optional enhancements

Remember: The platform works with basic functionality even without API keys, and features are enabled progressively as you add the corresponding API keys!