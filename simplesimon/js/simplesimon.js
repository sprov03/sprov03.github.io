"use strict"
var blue = {
	"id" : 'blue',
	"off" : '#003',
	"on" : '#00f',
	"div" : $('#blue')
	};
var red = {
	"id" : 'red',
	"off" : '#300',
	"on" : '#f00',
	"div" : $('#red')
	};
var green = {
	"id" : 'green',
	"off" : '#030',
	"on" : '#0f0',
	"div" : $('#green')
	};
var yellow = {
	"id" : 'yellow',
	"off" :'#330',
	"on" : '#ff0',
	"div" : $('#yellow')
	};
var lightOrder = [];
var gameState = {
	"colors": [blue,red,green,yellow],
	"bool": [false,false,false,false]
	};	
var playerCounter = 0;
var deg = 0;
var degOp = 0;
var blinkCrazyId;

function positionOne (light){
	light.div.css('top','10px');
	light.div.css('left','10px');
	light.div.css('transform','rotate(0deg)');	
}
function positionTwo (light){
	light.div.css('top','10px');
	light.div.css('left','220px');
	light.div.css('transform','rotate(90deg)');	
}
function positionThree (light){
	light.div.css('top','220px');
	light.div.css('left','10px');
	light.div.css('transform','rotate(270deg)');	
}
function positionFour (light){
	light.div.css('top','220px');
	light.div.css('left','220px');
	light.div.css('transform','rotate(180deg)');	
}
var positions = [positionOne,positionTwo,positionThree,positionFour];


function animateLights(light){
		turnOffLights();
		changeLightPositionsInArray();
		lightOn(light);
		paintLights();
		lightTimeout();
}

		function turnOffLights () {
			gameState.bool.forEach(function (element,i,array){
				console.log('reseting all lights to off in gameState.bool' + i + '  ' + element);
				gameState.bool[i] = false;
			});
		}
		function changeLightPositionsInArray () {
			//var num = Math.floor(Math.random()*3);
			var temp = gameState.colors[0];
			//console.log(num);
			//gameState.colors.splice(num,1);
			gameState.colors.shift();
			gameState.colors.push(temp);
		}
		function lightOn (light) {//turns the targeted light on!!
			gameState.colors.forEach(function (element,i,array){
				if (element.id === light.id){;
					gameState.bool[i] = true;
				}
			});
		}
		function paintLights () {//repaints the lights dose not change anything
			gameState.colors.forEach(function (element,i,array) {
				positions[i](element);// putts the colors where they need to be;
				if(gameState.bool[i] === true){// paints the colors and if is true lights it up.
					paint(element, element.on);
				}
				else{
					paint(element, element.off);
				}
			});
		}
				function paint (light,lightState) {
					light.div.css('background',lightState);
				}

		function lightTimeout() {
			setTimeout(function() {
				turnOffLights();
				paintLights();	
			},300);
		}

		
function playLightOrder (i) {
	if (i < lightOrder.length){
		animateLights(lightOrder[i]);
		i +=1;
		setTimeout(function () {
			playLightOrder(i);
		},750);
	} else{

		playerTurn();
	}
}
function playerTurn () {
	playerCounter=0;
}
function youLose () {
	lightOrder = [];
	$('#current>p').text(lightOrder.length);
	$('#play').text('start');
	playerCounter = 0;
	turnOffLights();
	paintLights();
	blinkCrazy();
}
function blinkCrazy() {
	var start = $('#start');
	var body = $('body');
	blinkCrazyId = setInterval(function (){
		var num = Math.floor(Math.random()*4);
		var light = gameState.colors[num];
		turnOffLights();
		changeLightPositionsInArray();
		lightOn(light);
		paintLights();
		setTimeout(function() {
			turnOffLights();
			paintLights();
			body.css('background',light.on);
			start.css('background',light.on);
		},50);
	},100);
}
function getObjFromData (data) {
	for (var i = 0; i < 4; i+=1){
		if (data === gameState.colors[i].id){
			console.log(gameState.colors[i]);
			return gameState.colors[i];
		}
	}
}
function tallyScore () {
	var $max = $("#max>p");
	$('#current>p').text(lightOrder.length);
	if (lightOrder.length > Number($max.text())){
		$max.text(lightOrder.length);
	}
}
function clearBlinking() {
	clearInterval(blinkCrazyId);
	setTimeout(function(){
	$('#start').css('background','lightblue');
	$('body').css('background','gray');
	},50);
}
$('.lights').click(function() {
	var tempObj = getObjFromData($(this).data('color'));
	animateLights(tempObj);
	if($(this).data('color') !== lightOrder[playerCounter].id){
		youLose();
	}
	else if (playerCounter == lightOrder.length-1){
		tallyScore();
		playerCounter = 0;
		setTimeout (computerTurn,1000);
	}
	else{
		playerCounter+=1;
	}
});
$('#play').click(function() {
	if($(this).text() === 'start'){
		$(this).text('Quit');
		clearBlinking();
		setTimeout(computerTurn,500);
	} else if($(this).text() === 'Quit'){
		$(this).text('start');
		clearBlinking();
		playerCounter=0;
		lightOrder=[];
		$('#current>p').text(lightOrder.length);	
	}
});

function computerTurn () {
	var num = Math.floor(Math.random()*4);
	lightOrder.push(gameState.colors[num]);
	playLightOrder(0);
}
setInterval(function() {
	deg += lightOrder.length;
	document.getElementById('simon').style.transform = 'rotate(' + deg + 'deg)';
},30);
setInterval(function() {
	degOp -= lightOrder.length;
	document.getElementById('start').style.transform = 'rotate(' + degOp + 'deg)';
},30);







paintLights();
