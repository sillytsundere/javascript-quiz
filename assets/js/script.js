//this array holds the possible quiz questions in an array of objects
//the questions are objects containing key value pairs of the question, choices and correct answer
//the choices key holds a value of an array of the possible choices
var questions = [
    {
        question: 'Which of the following is not a commonly used data type?',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        correctAnswer: 'alerts',
    },
    {
        question: 'The condition in an "if/else" statement is enclosed within ___.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        correctAnswer: 'parentheses',
    },
    {
        question: 'Arrays in JavaScript can be used to store ___.',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswer: 'all of the above',
    },
    {
        question: 'String values must be enclosed within ___ when being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        correctAnswer: 'quotes',
    },
    {
        question: 'A useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: 'console.log',
    },
    {
        question: 'What is an object?',
        choices: ['A type of website', 'A datatype that can store complex data', 'A type of operator', 'A method within Javascript'],
        correctAnswer: 'A datatype that can store complex data',
    },
    {
        question: 'What is a best practice to make your code more accessable and easier to read for other developers?',
        choices: ['Indent as little as you can', 'Do not use brackets in your code', 'Capitalize all of your variables', 'Write comments in your code'],
        correctAnswer: 'Write comments in your code' 
    }
]
//selecting all necessary elements to run functions
var startQuizBtn = document.getElementById('start-quiz');
var multiChoice = document.getElementById('answers');
var allCheckBtns = document.querySelectorAll('.check-btn')
var endBanner = document.querySelector('.end-banner');
var nextBtn = document.querySelector('.next-btn');
var submitBtn = document.querySelector('.submit-btn');
var quizBody = document.querySelector('.container');
var submitPage = document.querySelector('.submission');
var scoreBtn = document.querySelector('.submit-score');
var recordPage = document.querySelector('.score-record');
var highScores = document.querySelector('#high-scores');
var viewScores = document.querySelector('#view-scores');
var questionIndex = 0;
var second = 100;
var startTimer;
var score = 0
//next three lines of code create and append a back to start button to the high scores page at the end of the quiz or after clicking the view high scores button
var goBack = document.createElement('button');
goBack.textContent = 'Back to Start';
recordPage.appendChild(goBack);

//this function displays the quiz questions and answers upon starting the quiz and each time the next question button is pressed as well as runs the check answer function which checks for the correct answer and removes the event listener from the answer choice buttons to reduce error
function displayQuiz() {
    multiChoice.style.display = 'block';
    //using dot notation to access questions and answers
    var currentQuestion = questions[questionIndex].question;
    var ansChoices = questions[questionIndex].choices;
    document.getElementById('question').innerHTML = currentQuestion;
    document.getElementById('choice-a').innerHTML = ansChoices[0];
    document.getElementById('choice-b').innerHTML = ansChoices[1];
    document.getElementById('choice-c').innerHTML = ansChoices[2];
    document.getElementById('choice-d').innerHTML = ansChoices[3];
    document.getElementById('result').innerHTML = '';

    allCheckBtns.forEach(function (btn) {
        btn.addEventListener('click', checkAnswer);
    });
    viewScores.setAttribute('style', 'display:none');
} 

//function runs the quiz timer
var quizTimer = function() {
    startTimer = setInterval(function(){

        if (second === 0){
            document.getElementById('timer').innerHTML = 0;
            //create html elemnt instead of alert
            gameOver();
            endBanner.style.display = "block";
            endBanner.textContent = "Time's Up!"
            
        }
        document.getElementById('timer').innerHTML = second;
        second--;
    }, 1000);
}

//following function hides the Start Quiz button after it is pressed to make quiz more aesthetically pleasing
function hideBtn () {
    startQuizBtn.setAttribute('style', 'display:none');
}

var checkAnswer = function() {
    allCheckBtns.forEach(function(btn){
        btn.removeEventListener('click', checkAnswer);
    })
    //this part of if else statement checks if answer is correct and adds a point to user's score
    if (this.innerText === questions[questionIndex].correctAnswer) {
        document.getElementById('result').innerHTML = 'Correct';
        nextBtn.style.display = "block";
        if (questionIndex < 6) {
            questionIndex++;
        } else {
            endBanner.textContent = "Congratulations on completing the Quiz!";
            gameOver();
        }
        score++;
        nextQuestion();   
    } else {
        //if answer is wrong subtract 10 seconds from second var(timer) and no amount is added to score
        second -= 10;
        document.getElementById('result').innerHTML = 'Wrong';
        nextBtn.style.display = "block";
        if (questionIndex < 6) {
            questionIndex++;
        } else {
            endBanner.textContent = "Congratulations on completing the Quiz!";
            gameOver();
        }
        nextQuestion();
    }
    // add check to make sure time doesn't go below zero
    if (second <= 0) {
        gameOver();
        document.getElementById('timer').innerHTML = 0;
        endBanner.textContent = "Time's Up!";
    }
}

//function takes user to next question once clicked
var nextQuestion = function() {
    nextBtn.addEventListener('click', function() {
    displayQuiz();
})}

//function displays respective message and stops timer once quiz is finished
var gameOver = function() {
    clearInterval(startTimer);
    endBanner.style.display = "block";
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
    viewScores.setAttribute('style', 'display:none');
}

//function displays scores stored in local storage after quiz is finished as well as after clicking high scores button
var showScores = function() {
    var allScores = JSON.parse(localStorage.getItem('scores'));

    for (var i = 0; i < allScores.scores.length; i++) {
        var record = document.createElement('li');
        record.textContent = allScores.scores[i].name + ' ' + allScores.scores[i].score;
        highScores.appendChild(record);
    }
}

//function takes user from last question of quiz to page where they can submit their score
submitBtn.addEventListener('click', function(){
    quizBody.style.display = 'none';
    submitPage.style.display = 'block';
    submitPage.children[0].textContent = "Your Final Score " + score;
    endBanner.textContent = "";
})

//function stores scores with paired initials into local storage and then displays them on high scores page
scoreBtn.addEventListener('click', function(){
    submitPage.style.display = 'none';
    recordPage.style.display = 'block';

    var initials = document.querySelector('#initials').value;
    
    var scores = window.localStorage.getItem('scores');
    
    var parsedScores = JSON.parse(scores);
    console.log(parsedScores);
    var newScore = {
        name: initials,
        score: score
    };
        
    if (!parsedScores){
        var initialScores = {
            scores: []
        }
        initialScores.scores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(initialScores));
    } else {
        parsedScores.scores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(parsedScores));
    } 
    showScores();
})

//function takes user to high scores page after clicking view high scores button
viewScores.addEventListener('click',function(){
    recordPage.style.display = 'block';
    hideBtn();
    showScores();
    viewScores.setAttribute('style', 'display:none'); 
})

//function returns user to quiz begining after viewing high scores
goBack.addEventListener('click', function(){
    location.reload();
});

//this adds an event listener to the start quiz button to begin the quiz when clicked once
startQuizBtn.addEventListener('click', function() {
    hideBtn(); 
    quizTimer();
    displayQuiz();
});