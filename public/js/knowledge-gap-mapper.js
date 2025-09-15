// Knowledge Gap Mapper Logic
// Theme: Friendly, purple, rounded, Poppins/Open Sans

document.addEventListener('DOMContentLoaded', function() {
  const answerInput = document.getElementById('answerInput');
  const submitBtn = document.getElementById('submitBtn');
  const feedback = document.getElementById('feedback');
  const mistakeBox = document.getElementById('mistakeBox');
  const starCount = document.getElementById('starCount');

  let stars = parseInt(localStorage.getItem('kgmStars') || '0');
  starCount.textContent = `⭐ ${stars}`;

  const correctAnswer = 56;
  const mistakeSteps = [
    'Step 1: 7 × 8 means adding 7 eight times.',
    'Step 2: 7 + 7 = 14, 14 + 7 = 21, 21 + 7 = 28, 28 + 7 = 35, 35 + 7 = 42, 42 + 7 = 49, 49 + 7 = 56.',
    'Step 3: The answer is 56. If you got a different result, check your multiplication steps.'
  ];

  function showStarAnimation() {
    feedback.innerHTML = '<span class="star-anim">⭐</span> Great job! You earned a star!';
    feedback.className = 'feedback success';
    setTimeout(() => {
      feedback.innerHTML = '';
      feedback.className = 'feedback';
    }, 2000);
  }

  function showMistakeExplanation() {
    mistakeBox.innerHTML = mistakeSteps.map(s => `<div>${s}</div>`).join('');
    mistakeBox.className = 'mistake-box';
  }

  submitBtn.addEventListener('click', function() {
    const userAns = parseInt(answerInput.value);
    mistakeBox.className = 'mistake-box hidden';
    if (userAns === correctAnswer) {
      stars++;
      localStorage.setItem('kgmStars', stars);
      starCount.textContent = `⭐ ${stars}`;
      showStarAnimation();
    } else {
      feedback.textContent = 'Oops! That’s not quite right.';
      feedback.className = 'feedback error';
      showMistakeExplanation();
    }
  });
});
