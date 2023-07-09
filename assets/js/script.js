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
var startQuizBtn = document.querySelector('#start-quiz');
//why did getElementById not work?

//this array holds the possible quiz questions in an array of objects
//the questions are objects containing key value pairs of the question, choices and correct answer
//the choices key has a value that is an object containing key value pairs of the answer choices
var questions = [
    {
        question: 'Q 1',
        choices: {
            a: 'choice a',
            b: 'choice b',
            c: 'choice c',
            d: 'choice d',
        },
        correctAnswer: 'a',
    },
    {
        question: 'Q 2',
        choices: {
            a: 'choice a',
            b: 'choice b',
            c: 'choice c',
            d: 'choice d',
        },
        correctAnswer: 'a',
    },
    {
        question: 'Q 3',
        choices: {
            a: 'choice a',
            b: 'choice b',
            c: 'choice c',
            d: 'choice d',
        },
        correctAnswer: 'a',
    },
    {
        question: 'Q 4',
        choices: {
            a: 'choice a',
            b: 'choice b',
            c: 'choice c',
            d: 'choice d',
        },
        correctAnswer: 'a',
    },
    {
        question: 'Q 5',
        choices: {
            a: 'choice a',
            b: 'choice b',
            c: 'choice c',
            d: 'choice d',
        },
        correctAnswer: 'a',
    },
    {
        question: 'Q 6',
        choices: {
            a: 'choice a',
            b: 'choice b',
            c: 'choice c',
            d: 'choice d',
        },
        correctAnswer: 'a',
    },
    {
        question: 'Q 7',
        choices: {
            a: 'choice a',
            b: 'choice b',
            c: 'choice c',
            d: 'choice d',
        },
        correctAnswer: 'a',
    },
]

var quizTimer = function() {
    console.log('quiz timer is starting');
    var second = 100;
    var timerStart = setInterval(function(){
        document.querySelector('#timer').innerHTML = second;
        second--;

        if (second == 0){
            //clear timer
            clearInterval(timerStart);
            document.querySelector('#timer').innerHTML = '';
            alert('You have run out of time!');
            //why is my alert popping up at 2 seconds displayed?
        }
    }, 1000);
}

var showQuestion = function(){
    console.log('quiz will show question when start btn clicked');
    document.querySelector('.question').innerHTML = questions[0[0]];
    console.log(questions[0].);

}; 
//this adds an event listener to the start quiz button to begin the quiz when clicked once
startQuizBtn.addEventListener('click', function() {
    console.log('quiz start button works');
    startQuizBtn.style.visibility = 'hidden'; 
    quizTimer();
    showQuestion();
});