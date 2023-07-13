
//after all questions are answered quiz will say "well done"
    //quiz will ask for initials to save final score
    //data will be stored in local memory
    //button will ask if user wants to restart quiz and take user back to initial page with "start quiz" button


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
        correctAnswer: 'numbers and strings',
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
        choices: ['Indent as little as you can', 'Do not use brackets in your code', 'Capitalize all of your variables', 'Comment out your code'],
        correctAnswer: 'Comment out your code' 
    }
]
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
var goBack = document.createElement('button');
goBack.textContent = 'Back to Start';
recordPage.appendChild(goBack);

var checkAnswer = function() {
    console.log('This: ', this.innerText);
    console.log("Correct: ",questions[questionIndex].correctAnswer);
    allCheckBtns.forEach(function(btn){
        btn.removeEventListener('click', checkAnswer);
    })

    if (this.innerText === questions[questionIndex].correctAnswer) {
        console.log('Correct answer choice');
        document.getElementById('result').innerHTML = 'Correct';
        nextBtn.style.display = "block";
        if (questionIndex < 6) {
            questionIndex++;
            console.log('current question', questionIndex);
        } else {
            endBanner.textContent = "Congratulations on completing the Quiz!";
            gameOver();
        }
        score++;
        console.log('score right:', score);
        nextQuestion();
        
    } else {
        //if result is wrong subtract 10 seconds from second var(timer)
        second -= 10;
        console.log('Wrong answer choice');
        document.getElementById('result').innerHTML = 'Wrong';
        nextBtn.style.display = "block";
        if (questionIndex < 6) {
            questionIndex++;
            console.log('current question', questionIndex);
        } else {
            endBanner.textContent = "Congratulations on completing the Quiz!";
            gameOver();
        }
        console.log('score wrong:', score);
        nextQuestion();
    }
    // add check to make sure time doesn't go below zero
    if (second <= 0) {
        gameOver();
        document.getElementById('timer').innerHTML = 0;
        endBanner.textContent = "Time's Up!";
    }
}

var nextQuestion = function() {
    nextBtn.addEventListener('click', function() {
    displayQuiz();
})}

var gameOver = function() {
    clearInterval(startTimer);
    endBanner.style.display = "block";
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
    console.log('gameOver is being run');
}

submitBtn.addEventListener('click', function(){
    quizBody.style.display = 'none';
    submitPage.style.display = 'block';
    submitPage.children[0].textContent = "Your Final Score " + score;
    endBanner.textContent = "";
})

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
        console.log(initialScores);
    } else {
        console.log(parsedScores);
        parsedScores.scores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(parsedScores));
        console.log(parsedScores);
    } 
    showScores();
})

//function displays scores stored in local storage after quiz is finished as well as after clicking high scores button
var showScores = function() {
    var allScores = JSON.parse(localStorage.getItem('scores'));

    for (var i = 0; i < allScores.scores.length; i++) {
        var record = document.createElement('li');
        record.textContent = allScores.scores[i].name + ' ' + allScores.scores[i].score;
        highScores.appendChild(record);
        console.log(record);
    }
}

//function takes user to high scores page after clicking view high scores button
viewScores.addEventListener('click',function(){
    recordPage.style.display = 'block';
    hideBtn();
    viewScores.removeEventListener('click', showScores());
        
})

//function returns user to quiz begining after viewing high scores
goBack.addEventListener('click', function(){
    location.reload();
});


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
} 

//function runs the quiz timer
var quizTimer = function() {
    console.log('quiz timer is starting');
    startTimer = setInterval(function(){

        if (second === 0){
            document.getElementById('timer').innerHTML = 0;
            console.log('You have run out of time!');
            //create html elemnt instead of alert
            gameOver();
            endBanner.style.display = "block";
            endBanner.textContent = "Time's Up!"

        }
        document.getElementById('timer').innerHTML = second;
        //console.log(second);
        second--;
    }, 1000);
}

//following function hides the Start Quiz button after it is pressed to make quiz more aesthetically pleasing
function hideBtn () {
    startQuizBtn.setAttribute('style', 'display:none');
}
//this adds an event listener to the start quiz button to begin the quiz when clicked once
startQuizBtn.addEventListener('click', function() {
    console.log('quiz start button works');
    hideBtn(); 
    quizTimer();
    displayQuiz();
});