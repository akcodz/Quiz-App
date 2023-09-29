const questions = [
  {
    question:
      "Where does the President of the United States live while in office?",
    Answer: [
      { text: "The White House", correct: true },
      { text: "The Black House", correct: false },
      { text: "The White Eagle", correct: false },
      { text: "The White Elephant", correct: false },
    ],
  },
  {
    question: "What is a brontosaurus?",
    Answer: [
      { text: "A elephant", correct: false },
      { text: "An eagle", correct: false },
      { text: "A dog", correct: false },
      { text: "A dinosaur", correct: true },
    ],
  },
  {
    question: "What type of fish is Nemo?",
    Answer: [
      { text: "A sea-horse", correct: false },
      { text: "A Goldfish", correct: false },
      { text: "A Dolphin", correct: false },
      { text: "A clownfish", correct: true },
    ],
  },
  {
    question: "What do caterpillars turn into?",
    Answer: [
      { text: "Mosquitoes", correct: false },
      { text: "Butterflies", correct: true },
      { text: "Bees", correct: false },
      { text: "Moths", correct: false },
    ],
  },
];
const questionElem = document.querySelector(".question");
const answerBtn = document.querySelector(".ans-btn");
const next = document.querySelector(".nxt");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  next.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElem.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.Answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  next.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  console.log(e.target);

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  next.style.display = "block";
}

function showScore(){
    resetState()
    questionElem.innerHTML = `Your score is ${score} out of ${questions.length}!`
    next.innerHTML= "Play Again"
    next.style.display="block"
}
function handleNextBtn(){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
next.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextBtn()
    }else{
        startQuiz()
    }
})
startQuiz();
