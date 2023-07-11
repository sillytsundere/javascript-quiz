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
var multiChoice = document.getElementById('answers');
//how to i select each of the li in the ul to add a click event listener?
var questionIndex = 0;
var choicesIndex = 0;

//this array holds the possible quiz questions in an array of objects
//the questions are objects containing key value pairs of the question, choices and correct answer
//the choices key has a value that is an object containing key value pairs of the answer choices
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

//using dot notation to access questions and answers
var currentQuestion = questions[questionIndex].question;
console.log(currentQuestion);
var ansChoices = questions[questionIndex].choices;
console.log(ansChoices);

var showQuestion = function(){
    console.log('quiz will show question when start btn clicked');
    document.getElementById('question').innerHTML = currentQuestion;
    console.log(currentQuestion);
    document.getElementById('choice-a').innerHTML = ansChoices[0];
    document.getElementById('choice-b').innerHTML = ansChoices[1];
    document.getElementById('choice-c').innerHTML = ansChoices[2];
    document.getElementById('choice-d').innerHTML = ansChoices[3];
    console.log(ansChoices);

    //can i put the event listener in here?
    //if(click var === correctAnswer) {
        //function to move to next question and answer set
    //} else {
        //subtract some number of seconds from second variable?
    //}

    //add event listener to inside of list element and make if-else statement for if click is on element that = correctAnswer then moves to next question and if clock is on element that does NTO equal correctAnswer time is taken from timer? scope might be a problem there
}; 

var quizTimer = function() {
    console.log('quiz timer is starting');
    var second = 5; //should i move this to the global scope?
    var startTimer = setInterval(function(){

        if (second === 0){
            //when i set the above value to -1 the timer will stop at 0 but when it is set to 0 the timer will stop at 2
            //clear timer
            document.getElementById('timer').innerHTML = 0;
            console.log('You have run out of time!');
            //create html elemnt instead of alert
            clearInterval(startTimer);
            //why is my alert popping up at 2 seconds displayed?
            //are the above 3 actions in the right order?
        }
        document.getElementById('timer').innerHTML = second;
        console.log(second);
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
    showQuestion();
});