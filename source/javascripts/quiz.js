// initialize tabletop library
function init() {
		Tabletop.init( { key: url,
                   callback: readData,
                   simpleSheet: true } );
	}

// read data
var input;
var ans;
var score = 0;
var currentQuestion = 0;
function readData(data, tabletop) { 
	console.log(data);
	input = data;
	displayQuestion();
}

function displayQuestion() {
	qnumber = currentQuestion + 1;
	$(".quiz-container").html("<div class='qhead'><div class='number'>" + qnumber + "</div><p class='score'>Score: " + score + "/" + input.length + "</p></div><div class='question'>" + input[currentQuestion].question + "</div>" +
		"<ol class='answers'><li id='option-a'>" + input[currentQuestion].a + "</li>" +
		"<li id='option-b'>" + input[currentQuestion].b + "</li>" +
		"<li id='option-c'>" + input[currentQuestion].c + "</li>" +
		"<li id='option-d'>" + input[currentQuestion].d + "</li></ol>" + 
		"<button id='submit' class='hintbutton'>Submit answer</button>" +
		"<button id='hint' class='hintbutton' onclick='showHint()'>Get a hint</button>" +
		"<div class='answer'></div>");
	selectAnswer();
	submitAnswer();
}

function displayScore(){
    $('.score').html("<p>Score: " + score + "/" + input.length + "</p>");
}

function selectAnswer() {
	$("li").click(function() {
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		$("#submit").css("background-color", "#dfdfe0").fadeIn();
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
			score++;
			displayScore();

			$(".answer").html("<p>CORRECT! " + input[currentQuestion].correct + "</p><p>Correct Answer: " + input[currentQuestion].answer + "</p>");
		} else {
			$(".answer").html("<p>INCORRECT! " + input[currentQuestion].incorrect + "</p><p>Correct Answer: " + input[currentQuestion].answer + "</p>");
		}

		// 'next' button
		if (currentQuestion != (input.length-1)) {
			$(".answer").append("<button id='next' class='hintbutton' onclick='nextQuestion()'>Next</button>");
		} else {
			$(".answer").append("<p>Thanks for doing this quiz!</p>");
		}
	}
}

function nextQuestion() {
	currentQuestion++;
	displayQuestion();
}