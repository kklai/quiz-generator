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
var currentQuestion = 0;
function readData(data, tabletop) { 
	console.log(data);
	input = data;
	displayQuestion();
	selectAnswer();
	buttonClick();
}

/*function showQuiz() {
	for (i=0; i < input.length; i++) {
		$(".content").append("<h3 class='question'>" + input[i].question + "</h3>");
		$(".content").append("<span id='option-a'>" + input[i].a + "</span><br />");
		$(".content").append("<span id='option-b'>" + input[i].b + "</span><br />");
		$(".content").append("<span id='option-c'>" + input[i].c + "</span><br />");
		$(".content").append("<span id='option-d'>" + input[i].d + "</span><br />");
		$(".content").append("<button id='submit'>Check my answer</button>");
		$(".content").append("<div class='answer'></div>");
	}
}*/

function displayQuestion() {
	$(".content").html("<h3 class='question'>" + input[currentQuestion].question + "</h3>" +
		"<span id='option-a'>" + input[currentQuestion].a + "</span><br />" +
		"<span id='option-b'>" + input[currentQuestion].b + "</span><br />" +
		"<span id='option-c'>" + input[currentQuestion].c + "</span><br />" +
		"<span id='option-d'>" + input[currentQuestion].d + "</span><br />" +
		"<button id='submit'>Check my answer</button>" +
		"<div class='answer'></div>");
	/*for (i=0; i < input.length; i++) {
		$(".content").append("<h3 class='question'>" + input[i].question + "</h3>");
		$(".content").append("<span id='option-a'>" + input[i].a + "</span><br />");
		$(".content").append("<span id='option-b'>" + input[i].b + "</span><br />");
		$(".content").append("<span id='option-c'>" + input[i].c + "</span><br />");
		$(".content").append("<span id='option-d'>" + input[i].d + "</span><br />");
		$(".content").append("<button id='submit'>Check my answer</button>");
		$(".content").append("<div class='answer'></div>");
	}*/
}

function selectAnswer() {
	$("span").click(function(event) {
		event.preventDefault();
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
	});
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
			$(".answer").html("<p>" + input[currentQuestion].correct + "</p>" + "<button id='next'>Next</button>");
			currentQuestion++;

		} else {
			$(".answer").html("<p>" + input[currentQuestion].incorrect + "</p>" + "<button id='next'>Next</button>");
			currentQuestion++;
		}
		
	} else {
		console.log("NOOOO");
	}
		/*for (i=0; i < input.length; i++) {
			console.log(input[i].answer);
			console.log(ans);

			if (ans == input[i].answer) {
				$(".answer").html("<p>" + input[i].correct + "</p>");
				currentQuestion++;

			} else {
				$(".answer").html("<p>" + input[i].incorrect + "</p>");
				currentQuestion++;
			}
			displayQuestion();
		}
		return false;
	} else {
		console.log("NOOOO");
	}*/
}

function nextQuestion() {
	$("#next").click(function() {
		currentQuestion++;
		displayQuestion();
	});
}

$(document).ready(function(){
	init();
})