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
	$(".quiz").html("<h3 class='question'>" + input[currentQuestion].question + "</h3>" +
		"<span id='option-a'>" + input[currentQuestion].a + "</span><br />" +
		"<span id='option-b'>" + input[currentQuestion].b + "</span><br />" +
		"<span id='option-c'>" + input[currentQuestion].c + "</span><br />" +
		"<span id='option-d'>" + input[currentQuestion].d + "</span><br />" +
		"<button id='hint' onclick='showHint()'>Need a hint?</button>" + 
		"<button id='submit'>Check my answer</button>" +
		"<div class='answer'></div>");
	selectAnswer();
	buttonClick();
}

function selectAnswer() {
	$("span").click(function() {
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
				$(".answer").html("<p>The answer was " + input[currentQuestion].answer + "<br>" + input[currentQuestion].incorrect + "</p>");
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