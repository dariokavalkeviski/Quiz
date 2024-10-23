function submitQuiz() {
  const form = document.getElementById('quizForm');
  const results = [];
  for (let i = 1; i <= 5; i++) {
      const question = form[`q${i}`];
      if (question) {
          const answer = question.value;
          results.push(`Pergunta ${i}: ${answer}`);
      }
  }
  alert("Respostas: \n" + results.join("\n"));
}