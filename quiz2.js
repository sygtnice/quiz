let score;
let currentQuestionIndex = -1;
let gameState = "start";

const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;
const BUTTON_WIDTH = GAME_WIDTH * 0.8;
const BUTTON_HEIGHT = GAME_HEIGHT * 0.1;


const SPACING = 30;
const NUM_QUESTIONS = 3;
const QUESTIONS = [  "What is the largest glacier in the world?",  "What percentage of the world's population lives in urban areas?",  "What is the most common type of plastic found in the ocean?"];
const CHOICES = [  ["Lambert-Fisher Glacier", "Jakobshavn Glacier", "Vatnajökull Glacier"],
  ["33%", "50%", "70%"],
  ["Polyethylene terephthalate (PET)", "Polyvinyl chloride (PVC)", "Polystyrene (PS)"]
];
const ANSWERS = ["Vatnajökull Glacier", "50%", "Polyethylene terephthalate (PET)"];
const COLORS = [  [0, 82, 147], [207, 30, 53], [242, 131, 0],
   [255, 185, 0], [0, 114, 54], [114, 46, 114],
  [204, 45, 62], [38, 38, 38], [239, 89, 55],
  [0, 125, 197], [129, 198, 68], [241, 90, 36]
];
const CORRECT_COLOR = [89, 196, 163];
const INCORRECT_COLOR = [234, 96, 96];


let questions;
let buttons;



function setup() {
  createCanvas(GAME_WIDTH, GAME_HEIGHT);
  setupQuestions();
  setupButtons();
}

function draw() {
  background(COLORS[0]);
  if (gameState === "start") {
    drawStartScreen();
    drawScore();
  } else if (gameState === "question") {
    drawQuestionScreen();
    drawScore();
  } else if (gameState === "game over") {
    drawGameOverScreen();
  }
}


function drawScore() {
  textSize(24);
  fill(255);
  textAlign(RIGHT, TOP);
  text("Score: " + score, width - 20, 20);
}

function mouseClicked() {
  if (gameState === "start") {
    gameState = "question";
    currentQuestionIndex = 0;
  } else if (gameState === "question") {
    checkAnswer();
  } else if (gameState === "game over") {
    gameState = "start";
    score = 0;
    currentQuestionIndex = 0;
  }
}


function setupQuestions() {
  questions = [];
  for (let i = 0; i < NUM_QUESTIONS; i++) {
    const question = QUESTIONS[i];
    const choices = CHOICES[i];
    const answer = ANSWERS[i];
    questions.push({question, choices, answer});
  }
  shuffle(questions, true);
}

function setupButtons() {
  buttons = [1, 2, 3].map(i => ({
    text: "",
    x: 0,
    y: 0,
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    fillColor: COLORS[i]
  }));
}


const QUESTION_FONT_SIZE = GAME_WIDTH * 0.03;
const CHOICE_FONT_SIZE = GAME_WIDTH * 0.04;
const SCORE_FONT_SIZE = GAME_WIDTH * 0.03;

function drawStartScreen() {
  textSize(QUESTION_FONT_SIZE);
  fill(255);
  text("Start Quiz", width/2, height/2);
}

function drawQuestionScreen() {
  const currentQuestion = questions[currentQuestionIndex];
  const startY = height / 2 - (BUTTON_HEIGHT * currentQuestion.choices.length + SPACING * (currentQuestion.choices.length - 1)) / 2;

  textSize(QUESTION_FONT_SIZE);
  fill(255);
  textAlign(CENTER, CENTER);
  text(currentQuestion.question, width / 2, height / 6);

  noStroke();

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const x = width/2 - BUTTON_WIDTH/2;
    const y = startY + (BUTTON_HEIGHT + SPACING) * i;
    fill(buttons[i].fillColor);
    rect(x, y, BUTTON_WIDTH, BUTTON_HEIGHT);

    fill(255);
    textSize(CHOICE_FONT_SIZE);
    textAlign(CENTER, CENTER);
    text(currentQuestion.choices[i], x + BUTTON_WIDTH/2, y + BUTTON_HEIGHT/2);

    if (mouseX > x && mouseX < x + BUTTON_WIDTH && mouseY > y && mouseY < y + BUTTON_HEIGHT) {
      buttons[i].fillColor = COLORS[i + 3]; // Change color on hover
    } else {
      buttons[i].fillColor = COLORS[i + 1]; // Reset to original color
    }
  }
}

function drawScore() {
  textSize(SCORE_FONT_SIZE);
  fill(255);
  textAlign(RIGHT, TOP);
  text("Score: " + score, width - GAME_WIDTH * 0.05, GAME_HEIGHT * 0.05);
}

function drawGameOverScreen() {
  textSize(QUESTION_FONT_SIZE);
  textAlign(CENTER, CENTER);
  fill(255);
  text("Final Score: " + score, width/2, height/2);
}


function checkAnswer() {
const currentQuestion = questions[currentQuestionIndex];
for (let i = 0; i < currentQuestion.choices.length; i++) {
const x = width/2 - BUTTON_WIDTH/2;
const y = height/2 + (BUTTON_HEIGHT + SPACING) * i;
if (mouseX > x && mouseX < x + BUTTON_WIDTH && mouseY > y && mouseY < y + BUTTON_HEIGHT) {
  if (currentQuestion.choices[i] === currentQuestion.answer) {
    score += 10;
    buttons[i].fillColor = CORRECT_COLOR;
  } else {
    buttons[i].fillColor = INCORRECT_COLOR;
  }
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      gameState = "game over";
    }
  }, 1000);
  break;
}
}
}

