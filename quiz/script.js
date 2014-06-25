// initialize tabletop library
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1RWfz6fPQYVH3PsadeEnw8LUKF95B8NgyG3ndRxW94Uw/pubhtml';
function init() {
		Tabletop.init( { key: public_spreadsheet_url,
                   callback: readData,
                   simpleSheet: true } );
	}

// read data
var input;
var ans;
var score = 0;
var currentQuestion = 0;

function readData(data, tabletop) { 
	input = data;
	displayQuestion();
}

function displayQuestion() {
	$(".quiz").html("<h3 class='question'>" + (currentQuestion+1) + ". " + input[currentQuestion].question + "</h3>" +
		"<p class='score'>Score: " + score + "</p>" +
		"<span id='option-a'>" + input[currentQuestion].a + "</span><br />" +
		"<span id='option-b'>" + input[currentQuestion].b + "</span><br />" +
		"<span id='option-c'>" + input[currentQuestion].c + "</span><br />" +
		"<span id='option-d'>" + input[currentQuestion].d + "</span><br />" +
		"<button id='hint' onclick='showHint()'>Need a hint?</button>" + 
		"<button id='submit'>Check my answer</button>" +
		"<div class='answer'></div>");
	selectAnswer();
	submitAnswer();
}

function displayScore(){
    $('.score').html("<p>Score: " + score + "</p>");
}

function selectAnswer() {
	$("li").click(function() {
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
	});
}

function showHint() {
	$(".answer").html(input[currentQuestion].hint);
}

function submitAnswer() {
	$("#submit").click(function() {
		checkAnswer();
	});
}

function checkAnswer() {
	if ($(".selected").length > 0) {
		ans = $(".selected").html();
		if (ans == input[currentQuestion].answer) {
			// increment score
			score+=10;
			displayScore();

			$(".answer").html("<p>CORRECT! " + input[currentQuestion].correct + "</p><p>Correct Answer: " + input[currentQuestion].answer + "</p>");
		} else {
			$(".answer").html("<p>INCORRECT! " + input[currentQuestion].incorrect + "</p><p>Correct Answer: " + input[currentQuestion].answer + "</p>");
		}

		// 'next' button
		if (currentQuestion != (input.length-1)) {
			$(".answer").append("<button id='next' onclick='nextQuestion()'>Next</button>");
		} else {
			$(".answer").append("<p></p>");
		}
	} else {
		console.log("NOOOO");
	}
}

function nextQuestion() {
	currentQuestion++;
	displayQuestion();
}

$(document).ready(function(){
	init();
})