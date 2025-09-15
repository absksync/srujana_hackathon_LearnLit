// Knowledge Gap Mapper Logic
// Theme: Friendly, purple, rounded, Poppins/Open Sans


// --- Agentic Knowledge Gap Mapper Integration ---
document.addEventListener('DOMContentLoaded', function() {
  const questionEl = document.getElementById('current-question');
  const answerInput = document.getElementById('gap-answer');
  const submitBtn = document.querySelector('button[onclick="checkGapAnswer()"]');
  const feedbackEl = document.getElementById('gap-feedback');
  const starCountEl = document.getElementById('streak');
  let currentQuestionId = null;
  let stars = 0;

  async function fetchQuestion() {
    const res = await fetch('/api/knowledge-gap/question');
    const data = await res.json();
    currentQuestionId = data.id;
    questionEl.textContent = data.question;
    answerInput.value = '';
    feedbackEl.innerHTML = '';
    feedbackEl.classList.add('hidden');
  }

  async function submitAnswer() {
    const answer = answerInput.value.trim();
    if (!answer) return;
    // For agentic workflow, treat answer as solution steps array
    const res = await fetch('/api/knowledge-gap/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: currentQuestionId, steps: [answer] })
    });
    const data = await res.json();
    feedbackEl.classList.remove('hidden');
    if (data.is_correct) {
      stars = data.correct_question_counter;
      starCountEl.textContent = stars;
      feedbackEl.innerHTML = `<div class='bg-green-50 p-4 rounded-lg'>🎉 Correct! ${data.feedback}</div>`;
      setTimeout(fetchQuestion, 2000);
    } else {
      feedbackEl.innerHTML = `<div class='bg-red-50 p-4 rounded-lg'>❌ Incorrect.<br>${data.error_analysis}<br>${data.feedback}</div>`;
    }
  }

  submitBtn.onclick = submitAnswer;
  answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') submitAnswer();
  });
  fetchQuestion();
});
