import json
import logging
from graph import WorkflowGraph, TutorState
import pandas as pd
from agent import TutorAgent

# Configure verbose logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def load_initial_data():
    logging.info("Loading initial data.")
    # Load question bank
    with open('dataset/question_bank.JSON', 'r') as f:
        question_bank = json.load(f)
    # Load or initialize student performance history
    try:
        student_history_df = pd.read_csv('dataset/student_performance.csv')
        student_history = student_history_df.to_dict('records')
    except FileNotFoundError:
        student_history = []
    logging.info(f"Loaded {len(question_bank)} questions and {len(student_history)} history records.")
    return question_bank, student_history

def main():
    logging.info("Starting the Agentic Math Tutor.")
    question_bank, student_history = load_initial_data()
    initial_state: TutorState = {
        "question_bank": question_bank,
        "student_history": student_history,
        "current_question": {},
        "solution_image": "",
        "extracted_steps": [],
        "is_correct": False,
        "error_analysis": {},
        "feedback_message": "",
        "correct_question_counter": 0
    }
    graph = WorkflowGraph()
    # The graph will run, and since the agents involve input(), it will be interactive.
    final_state = graph.run(initial_state)
    logging.info("Workflow finished. Final state:")
    final_state_summary = {
        "correct_question_counter": final_state['correct_question_counter'],
        "student_history": final_state['student_history']
    }
    print(json.dumps(final_state_summary, indent=4))
    # Save the updated student history
    if final_state['student_history']:
        updated_history_df = pd.DataFrame(final_state['student_history'])
        updated_history_df.to_csv('dataset/student_performance.csv', index=False)
        logging.info("Student performance history updated.")

if __name__ == "__main__":
    main()

# --- Knowledge Gap Mapper API Endpoints ---
from flask import Flask, request, jsonify, session
from agent import TutorAgent
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'learnit_secret')

# Load question bank once
question_bank, _ = load_initial_data()
tutor_agent = TutorAgent(question_bank)

@app.route('/api/knowledge-gap/question', methods=['GET'])
def get_next_question():
    # Use session to track student history
    if 'student_history' not in session:
        session['student_history'] = []
    tutor_agent.state['student_history'] = session['student_history']
    question = tutor_agent.select_question()
    session['current_question'] = question
    return jsonify({
        'id': question['id'],
        'question': question['question'],
        'solution_steps': question.get('solution_steps', [])
    })

@app.route('/api/knowledge-gap/answer', methods=['POST'])
def submit_answer():
    data = request.json
    steps = data.get('steps', [])
    tutor_agent.state['extracted_steps'] = steps
    tutor_agent.state['current_question'] = session.get('current_question', {})
    is_correct, error_analysis = tutor_agent.validate_solution_steps()
    feedback = tutor_agent.generate_feedback()
    # Update session history
    session['student_history'] = tutor_agent.state['student_history']
    return jsonify({
        'is_correct': is_correct,
        'error_analysis': error_analysis,
        'feedback': feedback,
        'correct_question_counter': tutor_agent.state['correct_question_counter']
    })
