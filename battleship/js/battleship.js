"use strict"

var width = $('#game_container').width();
var numShips = 0;
var playerTurn = false;

function submitFire() {
	var $target = $(event.target);

	if ($target.hasClass("ship")){

		$target.addClass('hit');
	}else{

		$target.addClass('miss');
	}
}

function randomSquare () {

	for(var i = 0; i < 5; i+=1){

		var randRow = Math.floor(Math.random()*5);
		var randCol = Math.floor(Math.random()*10);

		$('#computer_table tr:eq(' + randRow +') td:eq(' + randCol + ')').addClass("ship");
	}
}
function placeShip() {
	$(event.target).css('background', 'pink');
}


$('#game_container').click(function() {

	var targetTag = $(event.target).prop('tagName');
	var tableId = $(event.target).parent('tr').parent('tbody').parent().prop('id');

	if( targetTag === 'TD' && tableId === 'computer_table' && playerTurn){
		submitFire();
	}
	if( targetTag === 'TD' && tableId === 'player_table' && numShips < 5){
		placeShip();
		numShips +=1;
		if (numShips === 4){
			playerTurn = true;
		}
	}
});	


$('table').css('height',width/2 + 'px');
randomSquare();


/******************************  Notes  and  other  stuff ****************************\
Clicking on the #game_board causes it to change color, need to filter events before sending
them to submitFire();

should do space ships instead of battle ship shapes

also you can select the hole table some how on a click near the edges





*/







