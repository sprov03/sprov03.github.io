"use strict"

var width = $('#game_container').width();
var numShips = 0;
var playerTurn = false;
var compGuessArray = [];

function submitFireFromPlayer() {
	var $target = $(event.target);

	if ($target.hasClass("ship")){

		$target.addClass('hit');
	}else{

		$target.addClass('miss');
	}
}

function refreshComputerQuessArray() {
	for(var i = 0; i < 50; i++){
		compGuessArray.push(String(i));
	}
}

function pickSquare () {

	var lengthOfComputerArray = compGuessArray.length;
	var index = Math.floor(Math.random()*lengthOfComputerArray);
	var guess = compGuessArray[index];

	compGuessArray.splice(index, 1);

	if (guess.length < 2){
		guess =  "0" + guess;
	}

	// $targetSquare it the square the the computer is targeting
	var $targetSquare = $('#player_table tr:eq(' + guess[0] +') td:eq(' + guess[1] + ')');
	
	if ($targetSquare.hasClass("player_ship")) {

		$targetSquare.addClass('hit');
	}else {

		$targetSquare.addClass('miss');
	}

	playerTurn = true;
}

function randomSquare () {

	for(var i = 0; i < 5; i+=1){

		var randRow = Math.floor(Math.random()*5);
		var randCol = Math.floor(Math.random()*10);

		$('#computer_table tr:eq(' + randRow +') td:eq(' + randCol + ')').addClass("ship");
	}
}
function placeShip() {
	$(event.target).addClass('player_ship');
}


$('#game_container').click(function() {

	var targetTag = $(event.target).prop('tagName');
	var tableId = $(event.target).parent('tr').parent().parent().prop('id');

	if(targetTag === 'TD' && tableId === 'computer_table' && playerTurn){
		playerTurn = false;
		submitFireFromPlayer();
		pickSquare();
	}
	if(targetTag === 'TD' && tableId === 'player_table' && numShips <= 5){
		placeShip();
		numShips +=1;
		if (numShips === 5){
			playerTurn = true;
		}
	}
});	


$('table').css('height',width/2 + 'px');
randomSquare();
refreshComputerQuessArray();


/******************************  Notes  and  other  stuff ****************************\
Clicking on the #game_board causes it to change color, need to filter events before sending
them to submitFireFromPlayer();

should do space ships instead of battle ship shapes

also you can select the hole table some how on a click near the edges





*/







