import logging
import random
from typing import Dict, Any, List
import pandas as pd
import os
import json

# Configure verbose logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class TutorAgent:
    def __init__(self, question_bank: List[Dict[str, Any]]):
        self.state = {
            'question_bank': question_bank,
            'student_history': [],
            'current_question': None,
            'extracted_steps': [],
            'is_correct': None,
            'error_analysis': {},
            'feedback_message': '',
            'correct_question_counter': 0
        }

    def select_question(self):
        logging.info("Selecting a new question.")
        question_bank = self.state['question_bank']
        student_history = self.state['student_history']
        if student_history:
            recent_question_ids = [h['question_id'] for h in student_history[-3:] if 'question_id' in h]
            available_questions = [q for q in question_bank if q['id'] not in recent_question_ids]
            if not available_questions:
                available_questions = question_bank
        else:
            available_questions = question_bank
        selected_question = random.choice(available_questions)
        logging.info(f"Selected question ID: {selected_question['id']}")
        self.state['current_question'] = selected_question
        print(f"\nNew Question: {selected_question['question']}")
        return selected_question

    def process_solution_image(self):
        logging.info("Processing solution image.")
        print("Please enter the steps of your solution, separated by a new line. Type 'done' when finished.")
        steps = []
        while True:
            step = input("Step: ")
            if step.lower() == 'done':
                break
            steps.append(step)
        self.state['extracted_steps'] = steps
        logging.info(f"Extracted steps: {steps}")
        return steps

    def validate_solution_steps(self):
        logging.info("Validating solution steps.")
        current_question = self.state['current_question']
        extracted_steps = self.state['extracted_steps']
        correct_solution_steps = current_question.get('solution_steps', [])
        is_correct = True
        error_analysis = {}
        if len(extracted_steps) != len(correct_solution_steps):
            is_correct = False
            error_analysis = {
                "error_step": len(extracted_steps),
                "error_type": "Incorrect number of steps",
                "explanation": f"You provided {len(extracted_steps)} steps, but the correct solution has {len(correct_solution_steps)} steps."
            }
        else:
            for i, step in enumerate(extracted_steps):
                if step.replace(" ","") != correct_solution_steps[i].replace(" ",""):
                    is_correct = False
                    error_analysis = {
                        "error_step": i + 1,
                        "error_type": "Calculation Error",
                        "explanation": f"There seems to be a mistake in step {i + 1}. Your step was '{step}', but it should be '{correct_solution_steps[i]}'."
                    }
                    break
        self.state['is_correct'] = is_correct
        self.state['error_analysis'] = error_analysis
        if is_correct:
            logging.info("Solution is correct.")
            self.state['correct_question_counter'] += 1
            self.state['student_history'].append({"question_id": current_question['id'], "status": "correct"})
        else:
            logging.info(f"Solution is incorrect. Error: {error_analysis}")
            self.state['student_history'].append({"question_id": current_question['id'], "status": "incorrect"})
        return is_correct, error_analysis

    def generate_feedback(self):
        logging.info("Generating feedback for the student.")
        error_analysis = self.state['error_analysis']
        current_question = self.state['current_question']
        error_step_index = error_analysis.get('error_step', 1) - 1
        student_step = self.state['extracted_steps'][error_step_index] if self.state['extracted_steps'] else ''
        correct_step = current_question['solution_steps'][error_step_index] if current_question.get('solution_steps') else ''
        feedback_message = (
            f"You're on the right track, great effort!\n"
            f"Let's take a closer look at step {error_analysis.get('error_step', '?')}. You wrote: '{student_step}'.\n"
            f"It seems there might be a small mix-up here. Remember the rules for this type of problem. For example, when factoring a quadratic equation like x^2 + bx + c, we look for two numbers that multiply to 'c' and add up to 'b'.\n"
            f"Take another look at your work for that step. What should the correct numbers be?\n"
            f"Please correct it from there and resubmit your answer. You can do it!"
        )
        self.state['feedback_message'] = feedback_message
        print(f"\nFeedback: {feedback_message}")
        log_dir = "logs"
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
        log_file = os.path.join(log_dir, "tutor_log.json")
        log_entry = {
            "timestamp": pd.Timestamp.now().isoformat(),
            "session_id": "session_123",
            "student_id": "student_abc",
            "question_id": current_question['id'],
            "is_correct": self.state['is_correct'],
            "error_analysis": error_analysis,
            "feedback": feedback_message,
            "steps": self.state['extracted_steps']
        }
        logs = []
        if os.path.exists(log_file):
            with open(log_file, 'r') as f:
                try:
                    logs = json.load(f)
                except json.JSONDecodeError:
                    logs = []
        logs.append(log_entry)
        with open(log_file, 'w') as f:
            json.dump(logs, f, indent=4)
        logging.info("Log entry saved.")
        return feedback_message
