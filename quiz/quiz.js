var myQuestions = [
	{
		question: "What's the first step to cook rice?",
		answers: {
			a: 'Turning on the fire and leave it alone',
			b: 'Rinsing the rice and adding the water',
			c: 'Stirring quickly'
		},
		correctAnswer: 'b'
	},
	{
		question: "After you add the lid and turn down the temperature, you need to cook for ____ minutes.",
		answers: {
			a: '10',
			b: '20',
			c: '30'
		},
		correctAnswer: 'b'
	}
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;

		// for each question...
		for(var i=0; i<questions.length; i++){
			
			// first reset the list of answers
			answers = [];

			// for each available answer...
			for(letter in questions[i].answers){

				// ...add an html radio button
				answers.push(
					'<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
						+ letter + ': '
						+ questions[i].answers[letter]
					+ '</label>'
				);
			}

			// add this question and its answers to the output
			output.push(
				'<div class="question">' + questions[i].question + '</div>'
				+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
	}


	function showResults(questions, quizContainer, resultsContainer){
		
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelectorAll('.answers');
		
		// keep track of user's answers
		var userAnswer = '';
		var numCorrect = 0;
		
		// for each question...
		for(var i=0; i<questions.length; i++){

			// find selected answer
			userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
			
			// if answer is correct
			if(userAnswer===questions[i].correctAnswer){
				// add to the number of correct answers
				numCorrect++;
				
				// color the answers green
				answerContainers[i].style.color = 'lightgreen';
			}
			// if answer is wrong or blank
			else{
				// color the answers red
				answerContainers[i].style.color = 'red';
			}
		}

		// show number of correct answers out of total
		resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
	}

	// show questions right away
	showQuestions(questions, quizContainer);
	
	// on submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}

}

//Part2
var answer2 = new Array("3", "low") 
var userAnswer2 = new Array 
function checkAnswers() { 
userAnswer2[0] = document.myForm.quOne.value 
userAnswer2[1] = document.myForm.quTwo.value 
var count = answer2.length 
var correct = 0 
for (var i = 0;i<count;i++) { 
if(userAnswer2[i]==answer2[i]) { 
correct=correct+1 
} 
} 
alert("You got " + correct) 
} 

//part3
var chatDatabase;
$(init);

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

function init() {
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBZBuJRqZgqhMmf2r8kDh-bbzSqayGZA6g",
    authDomain: "best-learning-tool.firebaseapp.com",
    databaseURL: "https://best-learning-tool.firebaseio.com",
    projectId: "best-learning-tool",
    storageBucket: "best-learning-tool.appspot.com",
    messagingSenderId: "903760527283",
    appId: "1:903760527283:web:43583df24861068f4cd5c6",
    measurementId: "G-8TG7V959DN"
  };
  firebase.initializeApp(config);

  var chatDatabase = firebase.database().ref("question");
  
  // When the user presses enter on the message input, write the message to firebase.
  $("#messageInput").keypress(function (e) {
    
    var name = $("#nameInput").val();
    var msg = $("#messageInput").val();
    
    if (e.keyCode == 13 && name != "" && msg != "") {
      
      chatDatabase.push( {name:name, message:msg} );
      $("#messageInput").val("");
      
    }
    
  });

  // Add a callback that is triggered for each chat message.
  chatDatabase.on("child_added", function (newData) {
    
    console.log( newData ); //not much to see here, compressed information
    var message = newData.val();
    
    $("<li>")
      .addClass("message")
      .text(message.message)
      .prepend($("<em>")
      .text(message.name + ": "))
      .appendTo($("#messages"));
    
    $("#messages")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;
  });
   
}

