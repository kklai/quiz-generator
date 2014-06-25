// initialize tabletop library
function init() {
		Tabletop.init( { key: url,
                   callback: readData,
                   simpleSheet: true } );
	}

// read data
var input;
var ans;
var currentQuestion = 0;
function readData(data, tabletop) { 
	console.log(data);
	input = data;
	displayQuestion();
}

function displayQuestion() {
	qnumber = currentQuestion + 1;
	$(".quiz-container").html("<div class='qhead'><div class='number'>" + qnumber + "</div></div><div class='question'>" + input[currentQuestion].question + "</div>" +
		"<ol class='answers'><li id='option-a'>" + input[currentQuestion].a + "</li>" +
		"<li id='option-b'>" + input[currentQuestion].b + "</li>" +
		"<li id='option-c'>" + input[currentQuestion].c + "</li>" +
		"<li id='option-d'>" + input[currentQuestion].d + "</li></ol>" +
		"<button id='hint' class='hintbutton' onclick='showHint()'>Need a hint?</button>" + 
		"<button id='submit' class='hintbutton'>Check my answer</button>" +
		"<div class='answer'></div>");
	selectAnswer();
	buttonClick();
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

function buttonClick() {
	$("#submit").click(function() {
		checkAnswer();
	});
}

function checkAnswer() {
	if ($(".selected").length > 0) {
		ans = $(".selected").html();
		if (ans == input[currentQuestion].answer) {
			if (currentQuestion != (input.length-1)) {
				$(".answer").html("<p>The answer was " + input[currentQuestion].answer + "<br>" + input[currentQuestion].correct + "</p>" + "<button id='next' onclick='nextQuestion()'>Next</button>");
			} else {
				$(".answer").html("<p>The answer was " + input[currentQuestion].answer + "<br>" + input[currentQuestion].correct + "</p>");
			}
		} else {
			if (currentQuestion != (input.length-1)) {
				$(".answer").html("<p>The answer was " + input[currentQuestion].answer + "<br>" + input[currentQuestion].incorrect + "</p>" + "<button id='next' onclick='nextQuestion()'>Next</button>");
			} else {
				$(".answer").html("<p>The answer was " + input[currentQuestion].answer + "<br>" + input[currentQuestion].incorrect + "</p><p>Thanks for doing this quiz!");
			}
		}
		
	} else {
		console.log("NOOOO");
	}
}

function nextQuestion() {
	currentQuestion++;
	displayQuestion();
}