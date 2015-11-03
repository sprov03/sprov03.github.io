"use strict"
var screenHeight = screen.height;
var screenWidth = screen.width;
var buttonWidth = 0;


var tall = screen.height*.95; // 530px
var wide = tall*.81132;		   // 430px

$('main').css('height', tall + 'px');
$('main').css('width', wide + 'px');
$('header').css('height',tall*.1887 + 'px');
$('select').css('width',wide*.2325 + 'px');
$('#simon').css('height',tall*.8113 + 'px');
$('#simon').css('width',wide + 'px');
$('.lights').css('height',tall*.3733 + 'px');
$('.lights').css('width',wide*.4651 + 'px');
$('.lights').css('top',tall*.01886 + 'px');
$('.lights').css('left',wide*.02325 + 'px');
$('#start').css('height',tall*.3210 + 'px');
$('#start').css('width',wide*.3953 + 'px');
$('#start').css('top',tall*.24528 + 'px');
$('#start').css('left',wide*.30232 + 'px');
$('#current').css('width',wide*.1744 + 'px');
$('#max').css('width',wide*.1744 + 'px');

var topSmall = tall * .01886;
var leftSmall = wide * .02326;
var topBig = tall * .41509;
var leftBig = wide * .51163;



function light (idName, onColor, offColor, divSelector, slot) {
	var lightId = this;
	this.id = idName;
	this.on = onColor;
	this.off = offColor;
	this.div = divSelector;
	this.lightOn = false;
	this.slot = slot;
	this.position = [
			function positionOne (){
				lightId.div.css('top',topSmall + 'px');
				lightId.div.css('left',leftSmall + 'px');
				lightId.div.css('transform','rotate(0deg)');
				return lightId;	
			},
			function positionTwo (){
				lightId.div.css('top',topSmall + 'px');
				lightId.div.css('left',leftBig + 'px');
				lightId.div.css('transform','rotate(90deg)');
				return lightId;	
			},
			function positionThree (){
				lightId.div.css('top',topBig + 'px');
				lightId.div.css('left',leftSmall + 'px');
				lightId.div.css('transform','rotate(270deg)');
				return lightId;	
			},
			function positionFour (){
				lightId.div.css('top',topBig + 'px');
				lightId.div.css('left',leftBig + 'px');
				lightId.div.css('transform','rotate(180deg)');
				return lightId;	
			}];
	this.animateLight = function() {
				this.lightOn = true;
				this.paintLight();
				var thisLight = this;
				setTimeout(function() {
					thisLight.lightOn = false;
					thisLight.paintLight();
				},500);
			};
	this.paintLight = function() {
				this.position[this.slot]();
				var lightState;
				if (this.lightOn){
					lightState = this.on;
				}
				else {
					lightState = this.off;
				}
				this.div.css('background',lightState);
				return this;
			};			
}// end for light
var simon = {
	lights: [],
	lightOrder: [],
	playerCounter: 0,
	deg: 0,
	degOp: 0,
	clearSimon: '',
	clearStart: '',
	spinning: false,
	changeArrayMode: 0,
	lvl: 0,
	changeLightPositionsInLightArray: function () {
			if(this.changeArrayMode === 1){
				var temp = simon.lights[0];
				simon.lights.shift();
				simon.lights.push(temp);
				simon.lights.forEach(function(element,i) {
					element.slot = i;
					element.paintLight();
				});
			}
	},
	computerTurn: function () {
		var num = Math.floor(Math.random()*4);
		var light = simon.lights[num];
		simon.lightOrder.push(light);
		simon.playLightOrder(0);
	},
	playLightOrder: function(i) {
		if (i < simon.lightOrder.length){
			this.changeLightPositionsInLightArray(this.changeArrayMode);//      start();
			var light = simon.lightOrder[i];
			simon.lights.forEach(function(element,i){
				if(light.id === element.id){
					element.lightOn = true;
					element.position[i]().paintLight();
					setTimeout(function() {
						element.lightOn = false;
						element.paintLight();
					},500);
				}
				else{
					element.lightOn = false;
					element.position[i]().paintLight();
				}
			});
			i +=1;
			setTimeout(function () {
				simon.playLightOrder(i);
			},750);
		} 
	},
	getObjFromData: function(id) {
		for(var i = 0; i < 4; i+=1){
			if(this.lights[i].id === id){
				return this.lights[i];
			}
		}
	},
	youLose: function() {
		simon.playerCounter = 0;
		simon.lightOrder = [];
		$('#current>p').text(simon.lightOrder.length);
		$('#play').text('start');
	},
	tallyScore: function() {
		var $max = $("#max>p");
		$('#current>p').text(simon.lightOrder.length);
		if (simon.lightOrder.length > Number($max.text())){
			$max.text(simon.lightOrder.length);
		}	
	},
	spin: function() {

		this.clearSimon = setInterval(function() {
			simon.deg += simon.getSpeed();
			document.getElementById('simon').style.transform = 'rotate(' + simon.deg + 'deg)';
		},30);
		this.clearStart = setInterval(function() {
			simon.degOp -= simon.getSpeed();
			document.getElementById('start').style.transform = 'rotate(' + simon.degOp + 'deg)';
		},30);
	},
	getSpeed: function () {
		var speed;
		if (simon.lvl === 0){
			speed = 0;
		}
		else if (simon.lvl === 1){
			speed = 1;
		}
		else if (simon.lvl === 3){
			speed = 10;
		}
		else if (simon.lvl === 2){
			speed = simon.lightOrder.length;
		}
		return speed;
	},
	clearSpin: function() {
		if(this.spinning){
			clearInterval(this.clearSimon);
			clearInterval(this.clearStart);
		}
	},
	changeModeFunction: function (mode){
		if(mode === "Easy"){this.intensity(0,0,0);}
		else if(mode === "Normal" ) {this.intensity(1,0,1);}
		else if(mode === "Hard" ) {this.intensity(2,1,2);}
		else if(mode === "Insane" ) {this.intensity(3,1,3);}
	},
	intensity: function(spin,changeButtons,lvl) {

		this.changeArrayMode = changeButtons;
		this.lvl = lvl;

		this.clearSpin();
		this.spin();

		(this.spin === 0)? this.spinning = false: this.spinning = true;
	}
};// end of Simon Object

var red = new light('red','#f00','#400',$('#red'),0);
var yellow = new light('yellow','#ff0','#440',$('#yellow'),1);
var green = new light('green','#0f0','#040',$('#green'),2);
var blue = new light('blue','#00f','#004',$('#blue'),3);
simon.lights.push(red,green,blue,yellow);

$('.lights').click(function() {
	simon.changeLightPositionsInLightArray(simon.changeArrayMode);
	var tempObj = simon.getObjFromData($(this).data('color'));
	tempObj.animateLight();
	if (simon.playerCounter < simon.lightOrder.length){
		
		if($(this).data('color') !== simon.lightOrder[simon.playerCounter].id){

			simon.youLose();
		}
		else if (simon.playerCounter == simon.lightOrder.length-1){

			simon.tallyScore();
			simon.playerCounter = 0;
			setTimeout (simon.computerTurn,1000);
		}
		else{

			simon.playerCounter+=1;
		}
	}
});
$('#play').click(function() {
	if($(this).text() === 'start'){
		$(this).text('Quit');
		setTimeout(simon.computerTurn,500);
	} else if($(this).text() === 'Quit'){
		$(this).text('start');
		simon.playerCounter=0;
		simon.lightOrder=[];
		$('#current>p').text(simon.lightOrder.length);	
	}
});
$('#mode').change(function(event) {
	simon.changeModeFunction($('#mode').val());
});


simon.lights.forEach(function(element,i) {
	element.position[i]().paintLight();
});	

