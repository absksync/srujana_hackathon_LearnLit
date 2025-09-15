import json
import os
import sys

class DataLoader:
    def __init__(self):
        self.questions_data = None
        self.load_questions()
    
    def load_questions(self):
        """Load questions from NCERT question database"""
        try:
            # Add the data directory to Python path
            data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
            sys.path.insert(0, data_dir)
            
            # Import NCERT questions
            from ncert_questions import SCIENCE_QUESTIONS, MATHEMATICS_QUESTIONS
            
            # Convert NCERT questions to our format
            self.questions_data = []
            question_id = 1
            
            # Process Science questions
            for topic, questions in SCIENCE_QUESTIONS.items():
                for q in questions:
                    formatted_q = {
                        'id': question_id,
                        'class': self._extract_class_from_source(q.get('source', '')),
                        'subject': 'Science',
                        'chapter': q.get('concept', topic.replace('-', ' ').title()),
                        'question': q['text'],
                        'type': 'mcq',
                        'difficulty': q.get('difficulty', 'medium'),
                        'options': q['options'],
                        'correct_answer': q['options'][q['correct']],
                        'correct_index': q['correct'],
                        'explanation': q.get('explanation', ''),
                        'gamify': q.get('concept', '')
                    }
                    self.questions_data.append(formatted_q)
                    question_id += 1
            
            # Process Math questions
            for topic, questions in MATHEMATICS_QUESTIONS.items():
                for q in questions:
                    formatted_q = {
                        'id': question_id,
                        'class': self._extract_class_from_source(q.get('source', '')),
                        'subject': 'Maths',
                        'chapter': q.get('concept', topic.replace('-', ' ').title()),
                        'question': q['text'],
                        'type': 'mcq',
                        'difficulty': q.get('difficulty', 'medium'),
                        'options': q['options'],
                        'correct_answer': q['options'][q['correct']],
                        'correct_index': q['correct'],
                        'explanation': q.get('explanation', ''),
                        'gamify': q.get('concept', '')
                    }
                    self.questions_data.append(formatted_q)
                    question_id += 1
            
            print(f"Loaded {len(self.questions_data)} questions from NCERT dataset")
            
        except ImportError as e:
            print(f"Could not load NCERT questions: {e}")
            # Fallback to JSON file
            self._load_json_fallback()
        except Exception as e:
            print(f"Error loading NCERT questions: {e}")
            self._load_json_fallback()
    
    def _extract_class_from_source(self, source):
        """Extract class number from source string"""
        if 'Class 6' in source:
            return 6
        elif 'Class 7' in source:
            return 7
        elif 'Class 8' in source:
            return 8
        elif 'Class 9' in source:
            return 9
        elif 'Class 10' in source:
            return 10
        else:
            return 8  # Default to class 8
    
    def _load_json_fallback(self):
        """Fallback to JSON file if NCERT questions fail"""
        try:
            questions_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'questions.json')
            with open(questions_file, 'r', encoding='utf-8') as f:
                self.questions_data = json.load(f)
            print(f"Fallback: Loaded {len(self.questions_data)} questions from JSON dataset")
        except Exception as e:
            print(f"Error loading fallback questions: {e}")
            self.questions_data = []
    
    def get_question_by_id(self, question_id):
        """Get a specific question by ID"""
        if not self.questions_data:
            return None
        
        for question in self.questions_data:
            if question.get('id') == question_id:
                return question
        return None
    
    def get_questions_by_class(self, class_num):
        """Get all questions for a specific class"""
        if not self.questions_data:
            return []
        
        return [q for q in self.questions_data if q.get('class') == class_num]
    
    def get_questions_by_subject(self, subject):
        """Get all questions for a specific subject"""
        if not self.questions_data:
            return []
        
        return [q for q in self.questions_data if q.get('subject', '').lower() == subject.lower()]
    
    def get_questions_by_difficulty(self, difficulty):
        """Get all questions for a specific difficulty level"""
        if not self.questions_data:
            return []
        
        return [q for q in self.questions_data if q.get('difficulty', '').lower() == difficulty.lower()]
    
    def get_filtered_questions(self, class_num=None, subject=None, difficulty=None, limit=None):
        """Get questions with multiple filters"""
        if not self.questions_data:
            return []
        
        filtered = self.questions_data
        
        if class_num:
            filtered = [q for q in filtered if q.get('class') == class_num]
        
        if subject:
            filtered = [q for q in filtered if q.get('subject', '').lower() == subject.lower()]
        
        if difficulty:
            filtered = [q for q in filtered if q.get('difficulty', '').lower() == difficulty.lower()]
        
        if limit:
            filtered = filtered[:limit]
        
        return filtered
    
    def get_random_questions(self, count=5, class_num=None, subject=None):
        """Get random questions for quiz generation"""
        import random
        
        filtered = self.get_filtered_questions(class_num=class_num, subject=subject)
        
        if len(filtered) <= count:
            return filtered
        
        return random.sample(filtered, count)
    
    def search_questions(self, query):
        """Search questions by keyword in question text or chapter"""
        if not self.questions_data:
            return []
        
        query = query.lower()
        results = []
        
        for question in self.questions_data:
            if (query in question.get('question', '').lower() or 
                query in question.get('chapter', '').lower() or
                query in question.get('answer', '').lower()):
                results.append(question)
        
        return results

# Global instance for easy access
_data_loader = DataLoader()

def get_questions_by_filters(class_num=None, subject=None, difficulty=None, limit=None):
    """Global function to get filtered questions"""
    return _data_loader.get_filtered_questions(class_num=class_num, subject=subject, difficulty=difficulty, limit=limit)

def get_all_questions():
    """Get all questions"""
    return _data_loader.questions_data if _data_loader.questions_data else []
