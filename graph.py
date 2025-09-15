import logging
from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END

# Configure verbose logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class TutorState(TypedDict):
    question_bank: List[Dict[str, Any]]
    student_history: List[Dict[str, Any]]
    current_question: Dict[str, Any]
    solution_image: str
    extracted_steps: List[str]
    is_correct: bool
    error_analysis: Dict[str, Any]
    feedback_message: str
    correct_question_counter: int

class WorkflowGraph:
    def __init__(self):
        self.workflow = StateGraph(TutorState)
        self._setup_nodes()
        self._setup_edges()
        self.graph = self.workflow.compile()
        logging.info("Workflow graph compiled successfully.")

    def _setup_nodes(self):
        from agent import TutorAgent
        self.workflow.add_node("select_question", TutorAgent.select_question)
        self.workflow.add_node("process_solution_image", TutorAgent.process_solution_image)
        self.workflow.add_node("validate_solution_steps", TutorAgent.validate_solution_steps)
        self.workflow.add_node("generate_feedback", TutorAgent.generate_feedback)
        logging.info("Nodes added to the workflow.")

    def _decide_next_step(self, state: TutorState) -> str:
        logging.info("Deciding next step based on solution correctness.")
        if state['is_correct']:
            if state['correct_question_counter'] >= 5:
                logging.info("Student has correctly answered 5 questions. Ending session.")
                return "end"
            else:
                logging.info("Solution is correct. Selecting a new question.")
                return "select_question"
        else:
            logging.info("Solution is incorrect. Generating feedback.")
            return "generate_feedback"

    def _setup_edges(self):
        self.workflow.set_entry_point("select_question")
        self.workflow.add_edge("select_question", "process_solution_image")
        self.workflow.add_edge("process_solution_image", "validate_solution_steps")
        self.workflow.add_conditional_edges(
            "validate_solution_steps",
            self._decide_next_step,
            {
                "select_question": "select_question",
                "generate_feedback": "generate_feedback",
                "end": END
            }
        )
        self.workflow.add_edge("generate_feedback", "process_solution_image")
        logging.info("Edges configured in the workflow.")

    def run(self, initial_state: TutorState):
        logging.info("Running the workflow with initial state.")
        return self.graph.invoke(initial_state)

if __name__ == '__main__':
    graph = WorkflowGraph()
    initial_state = {
        "question_bank": [],
        "student_history": [],
        "current_question": {},
        "solution_image": "",
        "extracted_steps": [],
        "is_correct": False,
        "error_analysis": {},
        "feedback_message": "",
        "correct_question_counter": 0
    }
    # result = graph.run(initial_state)
    # print(result)
