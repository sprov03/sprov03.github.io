// var divPos = {};
// var offset = $("#canvas").offset();
// $('#canvas').mousemove(function(e){
//     divPos = {
//         left: e.pageX - offset.left,
//         top: e.pageY - offset.top
//     };
// });





// the selector used to select where to append my moles
var $canvas = $('#canvas>div:eq(2)');

function createMole (xcord,id) { 

// declaring variable properties

	// canvas.after appends after the last div created
	$canvas.after('<div id="' + id + '"></div>');
	var $this = $('#' + id);
	var thisObj = this;
	this.id = 'mole';
	this.clearId = '';
	this.width = 30;
	this.height = 30;
	this.top = 30;
	this.left = xcord;

// paints the object with all properties in mind
	this.paint = function(){
		$this.css({
			'display':'block',
			'width': this.width + 'px',
			'height': this.height + 'px',
			'position': 'absolute',
			'top': this.top + 'px',
			'left': this.left + 'px'//,
		});// $this.css
	}// this.paint

// decides if should fall or switch to running
	this.fall = function () {

		if(this.top > 500){

			clearInterval(this.clearId);

			if($this.hasClass('dead') === false){

				wmol.tallyGotAway();

				this.clearId = setInterval(function() {
					thisObj.run();
				},50); 
			}

		}else{
			this.top += 5;
			$this.css('top',this.top + 'px');
		}
	}// end fall

// destroyes the js object and the html element
	this.destroy = function () {
		$this.remove();
		clearInterval(this.clearId);
		delete this;
	}

// process of making mole run
	this.run = function () {

		$this.off('click');
		$this.addClass('running1');
		
		if(this.left > 900){

			clearInterval(this.clearId);
			this.destroy();

		}

		else{

			this.left +=5;
			$this.toggleClass('running2');
			$this.css('left',this.left + 'px');

		}
	}

// functions to run at instantiation
	this.paint();

	$this.addClass('alive');

	this.clearId = setInterval(function(){
		thisObj.fall();
	},50);
};
var wmol = {
	totMoles: 0,// for making new ids for each mole
	score: 0,
	gotAway: 0,
	numMoles:0,  // for each round
	initalMoles: 0,
	startRoundId: '',
	round: 0,

	tallyScore: function() {
		this.score +=1;
		$('#score').text('Score: ' + this.score);
	},

	tallyGotAway: function() {
		this.gotAway += 1;
		$('#got_away').text('Got Away: ' + this.gotAway);
	},

	makeMole: function() {
		this.totMoles +=1;
		var rand = Math.floor(Math.random()*800);
		newMoleId = 'mole'+ this.totMoles;
		new createMole(rand,newMoleId);
	},

	startRound: function(extra) {

		this.numMoles = 0;
		this.initalMoles = 5 + extra;
		this.round += 1;

		this.startRoundId = setInterval(function() {

			if(wmol.numMoles < wmol.initalMoles){
				wmol.makeMole();
			}

			else{
				clearInterval(wmol.startRoundId);
			}

			wmol.numMoles +=1;

		},500);
	},
	die: function(id) {
		$(id).addClass('dead');
	}
}

$('#start').click(function(){
	wmol.startRound(wmol.round);
	//newMole('newMoleId');
});

$('#canvas').click(function(event){
	var $target = $(event.target);
	if(!$target.hasClass('dead') && !$target.hasClass('running1') && $target.hasClass('alive')){
		wmol.die("#" + event.target.id);
		wmol.tallyScore();
	}
});
// function newMole(id) {
// 	$canvas.after('<div id="' + id + '" class="newMole"></div>');
// 	var $this = $('#' + id);
// 	var thisObj = this;
// 	this.id = 'mole';
// 	// this.clearId = '';
// 	this.width = 30;
// 	this.height = 30;
// 	this.top = 30;
// 	this.left = 400;

// 	$this.addClass('alive');
// 	$this.css({
// 		"background": 'green',
// 		"position": "absolute",
// 		"width": this.width,
// 		"height": this.height,
// 		"top": this.top,
// 		"left": this.left,
// 	});

// }

// $(selector).playKeyframe([
//     'trapdoor-sequence 1s linear 0s infinite',
//     {
//       name: 'ball-roll',
//       duration: "3s",
//       timingFunction: 'ease',
//       iterationCount: 1
//     }
// ], complete);
// $(selector).playKeyframe({
//     name: 'trapdoor-sequence', // name of the keyframe you want to bind to the selected element
//     duration: '1s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
//     timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
//     delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
//     iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
//     direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
//     fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
//     complete: function(){} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
// });
// $(selector).playKeyframe(
//     'trapdoor-sequence 1s linear 0s infinite normal forwards',
//     complete
// );
// var supportedFlag = $.keyframe.isSupported();
// $.keyframe.debug = true;
// $.keyframe.define([{
//     name: 'roll-clockwise',
//     '0%': {
//         'margin-left' : '0px',
//         'background-color' : 'red',
//         'transform' : 'rotate(0deg)'
//     },
//     '100%': {
//         'margin-left' : '600px',
//         'transform' : 'rotate(360deg)'
//     }
//     },{
//     name: 'roll-anti-clockwise',
//     '0%': {
//         'margin-left' : '0px',
//         'background-color' : 'red',
//         'transform' : 'rotate(0deg)'
//     },
//     '100%': {
//         'margin-left' : '600px',
//         'transform' : 'rotate(-360deg)'
//     }
//     }
// ]);






















