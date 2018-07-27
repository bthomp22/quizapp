
const STORE = [
  {
    question: 'Who is the oldest avenger?',
    answers: [
      "Iron man",
      "Captain America",
      "Thor",
      "Hulk"
    ],
    correctAnswer: 'Thor'
  },
  {
    question: 'What name does Thor give his team in Ragnorak?',
    answers: [
      'Avenger 2.0',
      'The Revengers',
      'Escape Squad Alpha',
      'Midguards mightiest heroes'
    ],
    correctAnswer: 'The Revengers'
  },
  {
    question: 'Who has the idea to first form the Avengers?',
    answers: [
      'Tony Stark',
      'Howard Stark',
      'Nick Fury',
      'Peter Parker'
    ],
    correctAnswer: 'Nick Fury'
  },
  {
    question: 'Which Avenger is controlled by Loki when he first appears in New York?',
    answers: [
      'Black Widow',
      'Hawkeye',
      'Captain America',
      'Falcon'
    ],
    correctAnswer: 'Hawkeye'
  },
  {
    question: 'Where is Tony Stark held captive while he builds his first Iron man prototype?',
    answers: [
      'Iran',
      'Afghanistan',
      'Russia',
      'Canada'
    ],
    correctAnswer: 'Afghanistan'
  },
  {
    question: "What is the Hulk's real name?",
    answers: [
      'Steve Rogers',
      'Bruce Banner',
      'Clint Barton',
      'Loki'
    ],
    correctAnswer: 'Bruce Banner'
  },
  {
    question: "Who is Thor's half sibling?",
    answers: [
      'Hela',
      'Odin',
      'Loki',
      'Heimdall'
    ],
    correctAnswer: 'Hela'
  },
  {
    question: "Where was Peter Quill born?",
    answers: [
      'Colorado',
      'Asguard',
      'Kansas',
      'Pawnee Indiana'
    ],
    correctAnswer: 'Colorado'
  },
  {
    question: "Where does Peter Parker live?",
    answers: [
      'Queens',
      'The Bronx',
      'Los Angeles',
      'Brooklyn'
    ],
    correctAnswer: 'Queens'
  },
  {
    question: 'Which infinity stone does Dr. Strange use?',
    answers: [
      'Soul Stone',
      'Power Stone',
      'Mind Stone',
      'Time Stone'
    ],
    correctAnswer: 'Time Stone'
  }
];


let questionNumber = 0;
let score = 0;
//how much does syntax matter in js when doing html?
function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
      <fieldset>
        <div class="top-choices">
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
              <span>${STORE[questionNumber].answers[0]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
              <span>${STORE[questionNumber].answers[1]}</span>
          </label>
        </div>
        <div class="bottom-choices">
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
              <span>${STORE[questionNumber].answers[2]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
              <span>${STORE[questionNumber].answers[3]}</span>
          </label>
        </div>
        <button type="submit" class="submitButton">Submit</button>
      </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}
function changeQuestionNumber () {
  questionNumber ++;
  $('.questionNumber').text(questionNumber+1);
}


function updateScore () {
  score ++;
  $('.score').text(score);
}

function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}
//ask about image URLS
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback">
   <p><b>Nice Job!</b><img class="pic" src="captain america.jpeg" alt="captain america thumbs up"/></p><button type=button class="nextButton">Next</button></div>`);
}


function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"> <p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span><img class="pic" src="hulk.jpg" alt="angry hulk"/></p><button type=button class="nextButton">Next</button></div>`);
}

function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback">
      <h3>Welcome to the Avengers!</h3>
      <p>You got ${score} / 10</p>
      <button class="restartButton">Restart Quiz</button>
      </div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback">
      <h3>Keep practicing and maybe you can become a Revenger</h3>
      <p>You got ${score} / 10</p>
      <button class="restartButton">Restart Quiz</button>
      </div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback">
      <h3>Sorry but you didn't quite cut it. You can still go join the Justice League though :)</h3>
      <p>You got ${score} / 10</p>
      <button class="restartButton">Restart Quiz</button>
      </div>`);
  }
}
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);



















