//  window.onload = function() { init() };

// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1RWfz6fPQYVH3PsadeEnw8LUKF95B8NgyG3ndRxW94Uw/pubhtml';

//       function init() {
//         Tabletop.init( { key: public_spreadsheet_url,
//                          callback: showInfo,
//                          simpleSheet: true } );
//       }

//       function showInfo(data) {
//         // data comes through as a simple array since simpleSheet is turned on
//         alert("Successfully processed " + data.length + " rows!")
//         document.getElementById("food").innerHTML = "<strong>Foods:</strong> " + [ data[0].name, data[1].name, data[2].name ].join(", ");
//         console.log(data);
//       }

//       document.write("The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a>");    

// initialize tabletop library
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1RWfz6fPQYVH3PsadeEnw8LUKF95B8NgyG3ndRxW94Uw/pubhtml';
function init() {
		Tabletop.init( { key: public_spreadsheet_url,
                   callback: readData,
                   simpleSheet: true } );
	}

// read data
var input;
function readData(data, tabletop) { 
	console.log(data);
	input = data;
	showQuiz();
	selectAnswer();
}

function showQuiz() {
	for (i=0; i < input.length; i++) {
		$(".content").append("<h3 class='question'>" + input[i].question + "</h3>");
		$(".content").append("<span id='option-a'>" + input[i].a + "</span><br />");
		$(".content").append("<span id='option-b'>" + input[i].b + "</span><br />");
		$(".content").append("<span id='option-c'>" + input[i].c + "</span><br />");
		$(".content").append("<span id='option-d'>" + input[i].d + "</span><br />");
	}
}

function selectAnswer() {
	$("span").click(function() {
		if (!$(this).hasClass("selected")) {
			$(this).css("background-color", "yellow");
			$(this).addClass("selected");
		} else {
			$(this).css("background-color", "white");
			$(this).toggleClass("selected");
		}
	});
}

function checkAnswer() {
	ans = $(this).hasClass("selected");
	for (i=0; i < input.length; i++) {
		if (ans == input[i].answer) {
			$(".content").append("<p>" + input[i].correct + "</p>");
		} else {
			$(".content").append("<p>" + input[i].incorrect + "</p>");
		}
	}
	
}

$(document).ready(function(){
	init();
	$('button').click(checkAnswer);
})