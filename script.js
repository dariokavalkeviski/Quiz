// ===== Quiz de Futebol Brasileiro =====

const questions = [
  {
    text: "1. Qual é o clube com mais títulos do Campeonato Brasileiro?",
    options: ["Palmeiras", "Flamengo", "São Paulo", "Santos"],
    correct: 0,
  },
  {
    text: "2. Quem é o maior artilheiro da história do Campeonato Brasileiro?",
    options: ["Roberto Dinamite", "Romário", "Zico", "Pelé"],
    correct: 0,
  },
  {
    text: "3. Qual seleção tem mais títulos de Copa do Mundo?",
    options: ["Argentina", "Itália", "Brasil", "Espanha"],
    correct: 2,
  },
  {
    text: "4. Quem é o jogador brasileiro com mais gols na história das Copas do Mundo?",
    options: ["Ronaldo", "Pelé", "Romário", "Rivaldo"],
    correct: 0,
  },
  {
    text: "5. Qual é o estádio mais famoso do Brasil?",
    options: ["Maracanã", "Mineirão", "Morumbi", "Arena Corinthians"],
    correct: 0,
  },
  {
    text: "6. Em que ano o Brasil conquistou sua primeira Copa do Mundo?",
    options: ["1950", "1958", "1962", "1970"],
    correct: 1,
  },
  {
    text: "7. Qual jogador é conhecido como o \"Rei do Futebol\"?",
    options: ["Garrincha", "Zico", "Pelé", "Ronaldinho"],
    correct: 2,
  },
  {
    text: "8. Qual clube venceu a Libertadores de 2019 com dois gols de Gabigol na final?",
    options: ["Palmeiras", "Grêmio", "Santos", "Flamengo"],
    correct: 3,
  },
];

const LETTERS = ["A", "B", "C", "D"];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionCounter = document.getElementById("question-counter");
const scoreLive = document.getElementById("score-live");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");

const resultEmoji = document.getElementById("result-emoji");
const resultTitle = document.getElementById("result-title");
const resultScore = document.getElementById("result-score");
const resultMessage = document.getElementById("result-message");

let currentQuestion = 0;
let score = 0;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((s) =>
    s.classList.remove("active")
  );
  screen.classList.add("active");
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];

  questionCounter.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  scoreLive.textContent = `⭐ ${score}`;
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
  questionText.textContent = q.text;
  nextBtn.classList.add("hidden");

  optionsContainer.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerHTML = `<span class="letter">${LETTERS[index]}</span><span>${option}</span>`;
    btn.addEventListener("click", () => selectAnswer(btn, index));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedBtn, selectedIndex) {
  const q = questions[currentQuestion];
  const optionButtons = optionsContainer.querySelectorAll(".option");

  optionButtons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === q.correct) {
    selectedBtn.classList.add("correct");
    score++;
    scoreLive.textContent = `⭐ ${score}`;
  } else {
    selectedBtn.classList.add("wrong");
    optionButtons[q.correct].classList.add("correct");
  }

  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "Ver Resultado 🏁" : "Próxima →";
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const total = questions.length;
  const percent = score / total;

  let emoji, title, message;
  if (percent === 1) {
    emoji = "🏆";
    title = "Perfeito!";
    message = "Você é um craque! Gabaritou o quiz como um verdadeiro campeão.";
  } else if (percent >= 0.7) {
    emoji = "🥇";
    title = "Excelente!";
    message = "Grande jogo! Você domina o futebol brasileiro.";
  } else if (percent >= 0.5) {
    emoji = "⚽";
    title = "Bom jogo!";
    message = "Você conhece bem o futebol, mas ainda dá pra melhorar. Tente de novo!";
  } else {
    emoji = "🟨";
    title = "Cartão amarelo!";
    message = "Precisa treinar mais! Reinicie o quiz e tente novamente.";
  }

  resultEmoji.textContent = emoji;
  resultTitle.textContent = title;
  resultScore.textContent = `Você acertou ${score} de ${total}`;
  resultMessage.textContent = message;
  showScreen(resultScreen);
}

// Rearme: o botão "Reiniciar Quiz" zera o placar e recomeça do início
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
