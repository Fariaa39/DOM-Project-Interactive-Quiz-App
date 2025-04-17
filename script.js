// Quiz questions array
const questions = [
    {
        question: "What does DOM stand for?",
        answers: [
            "Document Object Model",
            "Digital Object Management",
            "Display Object Method",
            "Document Orientation Mode"
        ],
        correctAnswer: 0
    },
    {
        question: "Which method is used to select an element by its ID?",
        answers: [
            "document.querySelector()",
            "document.getElementByTagName()",
            "document.getElementById()",
            "document.findElement()"
        ],
        correctAnswer: 2
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: 2
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            "var",
            "let",
            "const",
            "All of the above"
        ],
        correctAnswer: 3
    },
    {
        question: "What is the result of 2 + '2' in JavaScript?",
        answers: [
            "4",
            "22",
            "NaN",
            "TypeError"
        ],
        correctAnswer: 1
    }
];

// DOM elements
const questionElement = document.querySelector('.question');
const answersContainer = document.querySelector('.answers-container');
const nextButton = document.querySelector('.next-btn');
const questionCounter = document.querySelector('.question-counter');
const scoreElement = document.querySelector('.score');

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;

// Initialize the quiz
function initQuiz() {
    showQuestion();
    updateCounter();
    updateScore();
}

// Display the current question and answers
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersContainer.innerHTML = '';
    
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
    
    selectedAnswerIndex = null;
    nextButton.disabled = true;
}

// Handle answer selection
function selectAnswer(index) {
    // Remove selected class from all buttons
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => button.classList.remove('selected'));
    
    // Add selected class to clicked button
    buttons[index].classList.add('selected');
    selectedAnswerIndex = index;
    nextButton.disabled = false;
}

// Move to the next question or show final score
function nextQuestion() {
    // Check if answer is correct
    if (selectedAnswerIndex === questions[currentQuestionIndex].correctAnswer) {
        score++;
        updateScore();
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        updateCounter();
    } else {
        showFinalScore();
    }
}

// Update question counter
function updateCounter() {
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// Update score display
function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

// Show final score
function showFinalScore() {
    questionElement.textContent = "Quiz Completed!";
    answersContainer.innerHTML = `
        <div class="final-score">
            Your final score is ${score} out of ${questions.length}
        </div>
    `;
    nextButton.style.display = 'none';
    questionCounter.textContent = '';
}

// Event listeners
nextButton.addEventListener('click', nextQuestion);

// Start the quiz
initQuiz();