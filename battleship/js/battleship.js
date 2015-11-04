"use strict"

var width = $('#game_container').width();

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


$('#game_container').click(function() {

	submitFire(event);
});	


$('table').css('height',width/2 + 'px');
randomSquare();