var timerDisplay;
var score;
var currentQuestion;
var intervalID;
var time;
var isCorrect;
var userScore;


if(window.localStorage.getItem("highscores") === null){
  window.localStorage.setItem("highscores", JSON.stringify({}))
}

function endgame() {
  clearInterval(intervalID); 
  getInitials()
}

function getInitials() {
  document.getElementsByTagName("main")[0].innerHTML = "";
  const footer = document.getElementById("endgame");
  footer.innerHTML = `<h2>Game Over</h2><p>Your Final Score is ${userScore}</p><input type="text" placeholder="Enter Your Initials" id="initials"></input><button onclick="saveScore()">Save</button>`
}

function saveScore() {
  let initials = document.getElementById("initials").value;
  const hs = JSON.parse(window.localStorage.getItem("highscores"))
  if(hs[initials]) {
    //if there are initials in the hs
    if(hs[initials] < userScore) {
      hs[initials] = userScore;
    }
  } else {
    hs[initials] = userScore;
  }
  //saves to highscores local storage
  window.localStorage.setItem("highscores", JSON.stringify(hs));  
  displayHighScores()
}

function displayHighScores() {
  const hs = JSON.parse(window.localStorage.getItem("highscores"))
  const keys = Object.keys(hs)
  const hsli = keys.map(key => `<li>${key} : ${hs[key]}</li>`)
  document.getElementById("endgame").innerHTML = "";
  document.getElementsByTagName("main")[0].innerHTML = `<h1>HIGHSCORES</h1><ul id="highscores"></ul><button onclick="clearScores()">CLEAR HIGHSCORES</button>`
  document.getElementById("highscores").innerHTML += hsli.join("");
  document.getElementById("highscores").innerHTML += "<button onclick='startQuiz()'>Play Again</button>"
}

function clearScores() {
  window.localStorage.setItem("highscores", "{}")
  document.getElementsByTagName("main")[0].innerHTML = "<button onclick='startQuiz()'>Play Again</button>"
}

// var questionText = document.querySelector("#questionText");
// var currentQuestion = 0;
// const startcard = document.querySelector("#start-card");


// //select each card div by id and assign to variables
// const startContainer = document.querySelector(".startContainer");
// const questionContainer = document.querySelector(".questionContainer");
// const scoreCard = document.querySelector("#score-card");
// const leaderboardCard = document.querySelector("#leaderboard-card");
// const choiceContainer = document.querySelector("#choiceContainer");
// document.getElementById("startbutton").style="display:inline-block";

  
//   //these variables are required globally
//   var intervalID;
//   var time;



 

  let quizQuestions = [
    // question 1
    {
        question: "What is the square root of 144?",
        choices: [ "5", "7", "9", "12" ],
        correct: "12"
    },
    // question 2
    {
        question: "What is King Tuts real name?",
        choices: ["Tutillity", "Tutankhaten", "Ramses II", "Khufu"],
        correct: "Tutankhaten"
    },
    // question 3
    {
        question: "What is the ruler of Greek Mythology?",
        choices: ["Odin", "Perseus", "Amateratsu", "Zeus"],
        correct: "Zeus"
    },
    // question 4
    {
        question: "What race does Aragorn belong to?",
        choices: ["Human", "Hobbit",  "Dúnedain", "homunculus"],
        correct: "Dúnedain"
    },
    // question 5
    {
        question: "What was Dwayne the Rock Johnson Dad's Nickname during his Wrestling Career?",
        choices: ["The Storm", "Rocky", "Stone Cold", "The Demon"],
        correct: "Rocky"
    },
    // question 6
    {
        question: "What was the first DIRECT ACT that the British issue to America that taxed N=newspapers, die, pamphlets, legal documents, and more?",
        choices: ["Sugar Act","Stamp Act","Currency Act","Quartering Act"],
        correct: "Stamp Act"
    },
    // question 7
    {
        question: "What is the most popular game in the world?",
        choices: ["Tetris", "Pong", "Grand Theft Auto 5","Minecraft"],
        correct: "Minecraft"
    },
    // question 8
    {
        question: "What is the most popular game fish in America?",
        choices: ["Bass","Northern Pike","Walleye","Musky"],
        correct: "Bass"
    },
    // question 9
    {
        question: "What word in the English Dictionary has the largest amount of letters, at a staggering 190,000 letters? The word stands for ...>",
        choices: ["titin","jafrellgrete","muzanite","tribrelacost", ],
        correct: "titin"
    },
    // question 10
    {
        question: "What was the answer to the first question?",
        choices: [ "9", "13", "11", "12" ],
        correct: "12"
    }
];



//function to start timer
function setTime() {
//reset time, userscore, and current question (so you can restart quiz by calling this function)
intervalID = setInterval(function() {
  if(time <= 0) {
    endgame();
}
  time--;
  timerDisplay.textContent = `Time: ${time}`;
}, 1000);
}




function startQuiz() {
  document.getElementsByTagName("main")[0].innerHTML = `<h1 id="timer">Time: 0</h1><h1 id="score">Score: 0</h1>
  <button id="startbutton" onclick="startQuiz()">Click Here To Start</button>
  <div id="quiz"></div>`
  currentQuestion = 0;
  time = 90;
  userScore = 0;
  timerDisplay = document.querySelector("#timer")
  score = document.querySelector("#score")
  setTime()
  displayQuestion()
  document.getElementById("startbutton").style="display:none"
}

function displayQuestion() {
  if(currentQuestion < quizQuestions.length) {
    let questionDiv = document.getElementById("quiz")
    let q = quizQuestions[currentQuestion]
    let qText = q.question
    const qChoices = q.choices
    const qAnswer = q.correct
    let buttonHTML = "";
    for (i = 0; i < 4; i++) {
        buttonHTML += `<button style="width:50%;padding:10px 0;background:white;font-weight:bold;" onclick="checkAnswer(currentQuestion,'${quizQuestions[currentQuestion].choices[i]}')">${quizQuestions[currentQuestion].choices[i]}</button><br>`
        //creates buttons
      }
    questionDiv.innerHTML = `<h2>${qText}</h2>`
    questionDiv.innerHTML += buttonHTML;
  } else {
    endgame()
  }
}

// function play(){
//   if(currentQuestion < quizQuestions.length) {

    
//      //adds question title to HTML
//      questionText.textContent = quizQuestions[currentQuestion].question;
//      let buttonHTML = "";
//      //For loop to create buttons and append to selection divs
//      for (i = 0; i < 4; i++) {
//        // let q = quizQuestions[currentQuestion];
//        let answer = quizQuestions[currentQuestion].choices[i];
//        buttonHTML += `<button style="width:25%;padding:10px 0;background:white;font-weight:bold;" onclick="checkAnswer(currentQuestion,'${answer}')">${quizQuestions[currentQuestion].choices[i]}</button>`
//        //creates buttons
//      }
//      choiceContainer.innerHTML = buttonHTML;
//   } else {
//     endgame();
//   }
// }



function checkAnswer(index,answer) {
  if(answer == quizQuestions[index].correct){
    isCorrect = true;
  }
  else {
    isCorrect = false;
  }
  displayResult();
  displayQuestion();
}

function displayResult() {
  if(isCorrect){
    userScore ++;
  }
  score.textContent = `Score: ${userScore}`;
  currentQuestion++;
}

