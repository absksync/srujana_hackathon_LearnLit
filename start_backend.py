#!/usr/bin/env python3
"""
Unified backend startup script for LearnBuddy platform
Combines Flask backend with RAG system for complete AI-powered learning
"""

import os
import sys
import subprocess
from pathlib import Path

def install_requirements():
    """Install Python requirements for both backend and RAG system"""
    print("🔧 Installing Python dependencies...")
    
    # Install backend requirements
    backend_req = Path("backend_integration/edu-game-backend/requirements.txt")
    if backend_req.exists():
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", str(backend_req)])
    
    # Install RAG requirements
    rag_req = Path("backend_integration/rag/requirements.txt")
    if rag_req.exists():
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", str(rag_req)])
    
    print("✅ Dependencies installed successfully!")

def setup_environment():
    """Setup environment variables"""
    env_example = Path("backend_integration/edu-game-backend/.env.example")
    env_file = Path("backend_integration/edu-game-backend/.env")
    
    if env_example.exists() and not env_file.exists():
        print("📝 Creating .env file from template...")
        with open(env_example, 'r') as src, open(env_file, 'w') as dst:
            dst.write(src.read())
        print("⚠️  Please edit .env file with your API keys!")
        return False
    return True

def start_backend():
    """Start the Flask backend server"""
    print("🚀 Starting Flask backend server...")
    os.chdir("backend_integration/edu-game-backend")
    
    # Set environment variables
    os.environ["FLASK_APP"] = "app.py"
    os.environ["FLASK_ENV"] = "development"
    
    # Start the Flask app
    subprocess.run([sys.executable, "app.py"])

if __name__ == "__main__":
    print("🎓 LearnBuddy Backend Integration Startup")
    print("=" * 50)
    
    # Install requirements
    install_requirements()
    
    # Setup environment
    if not setup_environment():
        print("🛑 Please configure your .env file with API keys before starting!")
        sys.exit(1)
    
    # Start backend
    start_backend()