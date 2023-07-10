//Quiz will start when "start button" is pressed
//questions will remain hidden until quiz starts
//upon quiz starting the "start quiz" button will become hidden
//quiz container will display questions and multiple choice answers
//user will select an answer and if incorrect time will be taken off the timer
//upon selecting an answer user will be presented with incorrect or correct message and a "next question" button
//after all questions are answered quiz will say "well done"
    //quiz will display final score
    //quiz will ask for initials to save final score
    //data will be stored in local memory
    //button will ask if user wants to restart quiz and take user back to initial page with "start quiz" button

//This selects the start quiz button
var startQuizBtn = document.getElementById('start-quiz');
//why did getElementById not work?

//this array holds the possible quiz questions in an array of objects
//the questions are objects containing key value pairs of the question, choices and correct answer
//the choices key has a value that is an object containing key value pairs of the answer choices
var questions = [
    {
        question: 'Commonly used data types include:',
        choices: {
            a: 'strings',
            b: 'booleans',
            c: 'alerts',
            d: 'numbers',
        },
        correctAnswer: 'c',
    },
    {
        question: 'The condition in an "if/else" statement is enclosed within ___.',
        choices: {
            a: 'quotes',
            b: 'curly brackets',
            c: 'parentheses',
            d: 'square brackets',
        },
        correctAnswer: 'parentheses',
    },
    {
        question: 'Arrays in JavaScript can be used to store ___.',
        choices: {
            a: 'numbers and strings',
            b: 'other arrays',
            c: 'booleans',
            d: 'all of the above',
        },
        correctAnswer: 'a',
    },
    {
        question: 'String values must be enclosed within ___ when being assigned to variables.',
        choices: {
            a: 'commas',
            b: 'curly brackets',
            c: 'quotes',
            d: 'parentheses',
        },
        correctAnswer: 'quotes',
    },
    {
        question: 'A useful tool used during development and debugging for printing content to the debugger is:',
        choices: {
            a: 'JavaScript',
            b: 'terminal/bash',
            c: 'for loops',
            d: 'console.log',
        },
        correctAnswer: 'console.log',
    },
    {
        question: 'What is an object?',
        choices: {
            a: 'A type of website',
            b: 'A datatype that can store complex data',
            c: 'A type of operator',
            d: 'A method within Javascript',
        },
        correctAnswer: 'A datatype that can store complex data'
    },
    {
        question: 'What is a best practice to make your code more accessable and easier to read for other developers?',
        choices: {
            a: 'Indent as little as you can',
            b: 'Do not use brackets in your code',
            c: 'Capitalize all of your variables',
            d: 'Comment out your code'
        },
        correctAnswer: 'Comment out your code' 
    }
]

var quizTimer = function() {
    console.log('quiz timer is starting');
    var second = 5;
    var startTimer = setInterval(function(){
        document.querySelector('#timer').innerHTML = second;
        second--;

        if (second === 0){
            //when i set the above value to -1 the timer will stop at 0 but when it is set to 0 the timer will stop at 2
            clearInterval(startTimer);
            //clear timer
            document.querySelector('#timer').innerHTML = '';
            alert('You have run out of time!');
            //why is my alert popping up at 2 seconds displayed?
        }
    }, 1000);
}

var showQuestion = function(){
    console.log('quiz will show question when start btn clicked');
    document.querySelector('.question').innerHTML = questions[0].choices[0];
    console.log(questions[0].choices[0]);
}; 

function hideBtn () {
    startQuizBtn.setAttribute('style', 'display:none');
}
//this adds an event listener to the start quiz button to begin the quiz when clicked once
startQuizBtn.addEventListener('click', function() {
    console.log('quiz start button works');
    hideBtn(); 
    quizTimer();
    showQuestion();
});