#!/usr/bin/env python3
"""
Integration Test Script for LearnBuddy Platform
Tests the connection between Node.js frontend and Python Flask backend
"""

import requests
import json
import time

def test_backend_health():
    """Test if the backend is responsive"""
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            print("✅ Backend health check passed")
            return True
        else:
            print(f"❌ Backend health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend connection failed: {e}")
        return False

def test_ai_api():
    """Test the AI doubt resolution API"""
    try:
        payload = {
            "question": "What is photosynthesis?",
            "subject": "biology"
        }
        
        response = requests.post(
            'http://localhost:5000/api/ai/ask-doubt',
            json=payload,
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ AI API test passed")
            print(f"📝 Response preview: {data.get('answer', 'No answer')[:100]}...")
            return True
        else:
            print(f"❌ AI API test failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ AI API connection failed: {e}")
        return False

def test_quiz_api():
    """Test the quiz generation API"""
    try:
        payload = {
            "subject": "mathematics",
            "difficulty": "medium",
            "count": 5
        }
        
        response = requests.post(
            'http://localhost:5000/api/quiz/generate',
            json=payload,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Quiz API test passed")
            print(f"📝 Generated {len(data.get('questions', []))} questions")
            return True
        else:
            print(f"❌ Quiz API test failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Quiz API connection failed: {e}")
        return False

def test_frontend_proxy():
    """Test if frontend can proxy requests to backend"""
    try:
        response = requests.get('http://localhost:3000/api/health', timeout=5)
        if response.status_code == 200:
            print("✅ Frontend proxy test passed")
            return True
        else:
            print(f"❌ Frontend proxy test failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend proxy connection failed: {e}")
        return False

def main():
    """Run all integration tests"""
    print("🧪 LearnBuddy Integration Test Suite")
    print("=" * 50)
    
    tests = [
        ("Backend Health Check", test_backend_health),
        ("Frontend Proxy Test", test_frontend_proxy),
        ("AI API Test", test_ai_api),
        ("Quiz API Test", test_quiz_api)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🔬 Running: {test_name}")
        print("-" * 30)
        
        if test_func():
            passed += 1
        
        time.sleep(1)  # Brief pause between tests
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Integration is working correctly.")
        return True
    else:
        print("⚠️  Some tests failed. Check the backend configuration.")
        return False

if __name__ == "__main__":
    main()