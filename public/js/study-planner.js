// Dynamic Study Planner Logic
// Theme: Rounded cards, purple buttons, Poppins/Open Sans

const subjects = [
  { name: 'Math', day: 'Monday', time: '6:00 PM' },
  { name: 'Science', day: 'Tuesday', time: '7:00 PM' },
  { name: 'English', day: 'Wednesday', time: '6:30 PM' },
  { name: 'Social', day: 'Thursday', time: '7:30 PM' },
  { name: 'Math', day: 'Friday', time: '6:00 PM' },
  { name: 'Science', day: 'Saturday', time: '7:00 PM' }
];

function getPlannerData() {
  return JSON.parse(localStorage.getItem('studyPlannerData') || '[]');
}
function savePlannerData(data) {
  localStorage.setItem('studyPlannerData', JSON.stringify(data));
}

function renderPlanner() {
  let plannerData = getPlannerData();
  if (plannerData.length === 0) {
    plannerData = subjects.map(s => ({ ...s, status: 'Pending' }));
    savePlannerData(plannerData);
  }
  const container = document.getElementById('plannerCards');
  container.innerHTML = '';
  plannerData.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'card planner-card';
    card.innerHTML = `
      <div><strong>${item.name}</strong></div>
      <div>${item.day} at ${item.time}</div>
      <div>Status: <span class="${item.status === 'Completed' ? 'text-success' : 'text-pending'}">${item.status}</span></div>
      <button class="button" onclick="markCompleted(${idx})">Mark Done</button>
    `;
    container.appendChild(card);
  });
  updateProgressBar();
  renderAISuggestion();
}

function markCompleted(idx) {
  let plannerData = getPlannerData();
  plannerData[idx].status = 'Completed';
  savePlannerData(plannerData);
  renderPlanner();
}

function updateProgressBar() {
  const plannerData = getPlannerData();
  const completed = plannerData.filter(i => i.status === 'Completed').length;
  const percent = Math.round((completed / plannerData.length) * 100);
  const bar = document.getElementById('progressBar');
  bar.style.width = percent + '%';
  bar.textContent = percent + '%';
}

function renderAISuggestion() {
  // Simulate AI suggestion based on app usage time
  let usage = parseInt(localStorage.getItem('appUsageMinutes') || '0');
  let suggestion = '';
  if (usage < 30) suggestion = 'Try studying between 6-7 PM for best focus!';
  else if (usage < 60) suggestion = 'You seem active in the evenings. Schedule Math and Science after 7 PM.';
  else suggestion = 'Great consistency! Keep your current study slots for maximum retention.';
  document.getElementById('aiSuggestion').textContent = suggestion;
}

// Simulate app usage tracking
setInterval(() => {
  let usage = parseInt(localStorage.getItem('appUsageMinutes') || '0');
  usage++;
  localStorage.setItem('appUsageMinutes', usage);
}, 60000);

// Initial render
window.onload = renderPlanner;
