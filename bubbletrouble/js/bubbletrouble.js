//document.addEventListener( 'DOMContentLoaded', function () {


"use strict";

var counter = 0;
	//*************************  Key Events  *************************\\

	$(document).keyup(function (event){
		processKeyUp(event.keyCode);
	});

	$(document).keydown(function (event){
		processKeyDown(event.keyCode);
	});

	function processKeyDown(event){
		if(event === 39) {	
							if (gameObject.movingRightFlag === false){
								gameObject.stopMovingLeft();
								square.ft = 15;
								square.ftMax = 216;
								square.ftSize = 1;
								gameObject.movingRightFlag = true;
							}
						}
		if(event === 37){
							if (gameObject.movingLeftFlag === false) {
								gameObject.stopMovingRight();
								square.ft = 15;
								square.ftMax = 216;
								square.ftSize = 1;
								gameObject.movingLeftFlag = true;	
							}
						}
		(event === 32) && gameObject.jump();
		(event === 13) && new gameObject.fire();
		// if (event ===13) {
		// 	setInterval (function(){
		// 		counter++;
		// 		console.log(counter);
		// 		new gameObject.fire();
		// 	},1);
		// }
		// if(event === 48) gameOver();
	}
	function processKeyUp(event){
		(event === 39) && gameObject.stopMovingRight();
		(event === 37) && gameObject.stopMovingLeft();
	}


		//************************  Variable Declarations  ****************\\

	var requestAnimationFrame =  window.requestAnimationFrame ||
		            			 window.mozRequestAnimationFrame ||
		            			 window.webkitRequestAnimationFrame ||
		            			 window.msRequestAnimationFrame;

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	// var controller = document.getElementById("myController");


	/**
	 *  Sizing for diffrent devices
	 *
	 *  Gets the size of the canvas_container that is set by bootstrap
	 *  and used that to set the canvas width and height.
	 */
	c.setAttribute('width', $('#canvas_container').width());
	c.setAttribute('height', ctx.canvas.width * .45);
	var cx = ctx.canvas.width;
	var cy = ctx.canvas.height;

	/**
	 *  Set cSizing (canvas sizing) off the smallest dimention / 100.	
	 *	cSizing is just a canvas unit used to make game scaleable.
	 */
	var cSizing = cy;
	cSizing *= .01;
	cy *= .01;
	cx *= .01;

	/**
	 *	Sizing for the controller based of the sizing of the canvas
	 *
	 *
	 */
	// controller.style.width = String(ctx.canvas.width) + "px";
	// controller.style.height = String(ctx.canvas.width * .45) + "px";
	// controller.style.top = "1px";
	// controller.style.left = "1px";
	// document.getElementById('dPadUp').style.left    = String(200 * cSizing) + "px";
	// document.getElementById('dPadUp').style.top     = String(40 * cSizing) + "px";
	// document.getElementById('dPadLeft').style.left  = String(5 * cSizing) + "px";
	// document.getElementById('dPadLeft').style.top   = String(50 * cSizing) + "px";
	// document.getElementById('dPadRight').style.left = String(16.5 * cSizing) + "px";
	// document.getElementById('dPadRight').style.top  = String(50 * cSizing) + "px";
	// document.getElementById('dPadDown').style.left  = String(200 * cSizing) + "px";
	// document.getElementById('dPadDown').style.top   = String(60 * cSizing) + "px";
	// var buttons = document.getElementsByClassName('controller_button');

 //    for (var i = 0; i < buttons.length; i++) {
	// 	buttons[i].style.width = String(8 * cSizing) + "px";
	// 	buttons[i].style.height= String(8 * cSizing) + "px";
 //    }

 // ********************  Controller listeners  ************************\\


function handleStart(evt) {
  evt.preventDefault();
  var el = document.getElementById("myCanvas");
  var touches = evt.changedTouches;
  var yOff = -70;
  var xOff = 0;

  if(screen.width <= 768){

  	xOff = -17;
  } else if (screen.width <= 990) {

  	xOff = -((screen.width - 722) /2) -14;
  } else if (screen.width <= 1200) {

  	xOff = -((screen.width - 942) /2) - 3;
  }else {

  	xOff = -((screen.width - 1142) / 2) - 2;
  }
        
  for (var i = 0; i < touches.length; i++) {
  // console.log("clientX:" + ((evt.changedTouches[i].clientX / cSizing) + xOff) * cSizing);
  // console.log("clientY:" + ((evt.changedTouches[i].clientY / cSizing) + yOff) * cSizing);
  console.log("clientY:" + (evt.changedTouches[i].pageY + yOff));
  console.log("clientX:" + (evt.changedTouches[i].pageX + xOff));
  console.log(xOff);
  	for (var j = 0; j < gameObject.buttons.length; j++){
  		console.log("left:" + gameObject.buttons[j].left());
  		console.log("right:" + gameObject.buttons[j].right());
  		console.log("top:" + gameObject.buttons[j].top());
  		console.log("bottom:" + gameObject.buttons[j].bottom());
  		if (gameObject.buttons[j].left()  < evt.changedTouches[i].pageX + xOff && 
  			gameObject.buttons[j].right() > evt.changedTouches[i].pageX + xOff &&
  			gameObject.buttons[j].top()   < evt.changedTouches[i].pageY + yOff &&
  			gameObject.buttons[j].bottom()> evt.changedTouches[i].pageY + yOff)
  		{
  			var startAction = gameObject.buttons[j].startAction;
  			var endAction = gameObject.buttons[j].endAction;
  			gameObject[startAction]();
  			gameObject.ongoingTouches[evt.changedTouches[i].identifier] = endAction;
  		}
  	}
  	 console.log(evt.changedTouches[0]);

    // console.log("touchstart:");
    // ongoingTouches.push(copyTouch(touches[i]));
    // var color = colorForTouch(touches[i]);
    // ctx.beginPath();
    // ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    // ctx.fillStyle = color;
    // ctx.fill();
    // console.log("touchstart:");
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  console.log("touchended");
  console.log(evt.changedTouches[0].identifier);
  console.log(gameObject.ongoingTouches[evt.changedTouches[0].identifier]);
  gameObject[gameObject.ongoingTouches[evt.changedTouches[0].identifier]]();
  // gameObject[gameObject.ongoingTouches[0]]();
  // var el = document.getElementsByTagName("canvas")[0];
  // var ctx = el.getContext("2d");
  // var touches = evt.changedTouches;

  // for (var i = 0; i < touches.length; i++) {
  //   var color = colorForTouch(touches[i]);
  //   var idx = ongoingTouchIndexById(touches[i].identifier);

  //   if (idx >= 0) {
  //     ctx.lineWidth = 4;
  //     ctx.fillStyle = color;
  //     ctx.beginPath();
  //     ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
  //     ctx.lineTo(touches[i].pageX, touches[i].pageY);
  //     ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
  //     ongoingTouches.splice(idx, 1);  // remove it; we're done
  //   } else {
  //     log("can't figure out which touch to end");
  //   }
  // }
}



  var el = document.getElementById("myCanvas");
  el.addEventListener("touchstart",handleStart, false);
  // el.addEventListener("mousedown",handleStart,false);
  // $('myCanvas').on("mousedown", function () {
  // 	console.log("you clicked on the canvas game");
  // });
  el.addEventListener("touchend", handleEnd, false);
  // el.addEventListener("touchcancel", handleCancel, false);
  // el.addEventListener("touchmove", handleMove, false);

	var gameObject = {

		collisionCheckArray: [],
		playerObjectsArray: [],
		objArray: [],
		buttons: [],

		movingRightFlag: false,
		movingLeftFlag: false,
		collisionRightFlag: false,
		collisionLeftFlag: false,
		fallFlag: false,

		ongoingTouches: {
			0: 'doNothing',
			1: 'doNothing',
			2: 'doNothing',
			3: 'doNothing',
			4: 'doNothing',
			5: 'doNothing'
		}, //ongoingTouches

		button: function (x,y,width,height,color,startAction,endAction) {
			endAction = (endAction === undefined) ? 'doNothing' : endAction;

			this.x = x * cSizing;
			this.y = y * cSizing;
			this.width = width * cSizing;
			this.height = height * cSizing;
			this.xVel = 0;
			this.yVel = 0;
			this.color = color;
			this.startAction = startAction;
			this.endAction = endAction;

			this.top = gameObject.topBoundary;
			this.bottom = gameObject.bottomBoundary;
			this.left = gameObject.leftBoundary;
			this.right = gameObject.rightBoundary;

			this.drawSelf = function () {

				ctx.fillStyle = this.color;
				ctx.fillRect(this.x,this.y,this.width,this.height);
			},

			this.update = function () {

				this.drawSelf();
			}

			gameObject.buttons.push(this);
		},// backgroundObj

		firePressed: function (){
			new gameObject.fire();
		},// firePressed

		doNothing: function () {
		},// doNothing

		playerObj: function (x,y,width,height,color,iname1,file1,iname2,file2) {

			var that = this;

			/**
			 *  Loading Images to this obj
			 */
			var iname1 = new Image();
			iname1.src = file1;
			this.imgRunningLeft = iname1;

			var iname2 = new Image();
			iname2.src = file2;
			this.imgIdle = iname2;

			/**
			 *  Frame trackers Used for keeping track of how fast to flip threw images
			 */
			this.ft = 0;
			this.ftMax = 60;
			this.ftSize = 1;

			/**
			 *  Source dimensions for croping source image
			 */
			this.sx = 0;
			this.sy = 0;
			this.swidth = 64;
			this.sheight = 64;

			/**
			 *  Canvas positions and dimensions for placing the image to the canvas
			 */
			this.x = x * cSizing;
			this.y = y * cSizing;
			this.width = width * cSizing;
			this.height = height * cSizing;

			/**
			 *  Velocity values to create more realistic movement
			 */
			this.xVel = 0;
			this.yVel = 0;

			this.maxVelocity = cSizing * .5;
			this.accelerationXUnit = cSizing * .008;
			this.ftSizeConstant = cSizing * .14;

			/**
			 *  Velocicy after colisions
			 */
			this.newVelX = function () {
				return 0;
			} 
			this.newVelY = function () {
				return 0;
			}

			/**
			 *	Boundary functions that can be used as getters and setters
			 * 		for the edges of collision boarders to make it easier to 
			 *		understand and write the collision logic.
			 */
			this.top = gameObject.topBoundary;
			this.bottom = gameObject.bottomBoundary;
			this.left = gameObject.leftBoundary;
			this.right = gameObject.rightBoundary;

			this.drawSelf = function () {

				this.ft = (this.ft < this.ftMax - this.ftSize) ? this.ft + this.ftSize : 0;

				if (gameObject.movingRightFlag) {

					this.sx = 64 * Math.floor(10 * this.ft / this.ftMax);
					gameObject.flipSprite(this.imgRunningLeft,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height);
				}

				else if (gameObject.movingLeftFlag) {

					this.sx = 64 * Math.floor(10 * this.ft / this.ftMax);
					ctx.drawImage(this.imgRunningLeft,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height);
				}

				else {

					this.sx = 64 * Math.floor(11 * this.ft / this.ftMax);
					ctx.drawImage(this.imgIdle,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height);
				}
			}// this.drawSelf

			this.update = function () {
				
				gameObject.checkCollisions(this);
				this.tryToMove();
				this.drawSelf();
			}

			this.tryToMove = function () {

				(gameObject.fallFlag === false) && gameObject.fall(this);
				(gameObject.movingRightFlag === true && gameObject.collisionRightFlag === false) && gameObject.moveRight(this);
				(gameObject.movingLeftFlag  === true && gameObject.collisionLeftFlag  === false) && gameObject.moveLeft(this);
			}

			gameObject.objArray.push(this);
			gameObject.playerObjectsArray.push(this);
		},//playerObj

		backgroundObj: function (x,y,width,height,color) {

			this.x = x * cSizing;
			this.y = y * cSizing;
			this.width = width * cSizing;
			this.height = height * cSizing;
			this.xVel = 0;
			this.yVel = 0;
			this.color = color;

			this.top = gameObject.topBoundary;
			this.bottom = gameObject.bottomBoundary;
			this.left = gameObject.leftBoundary;
			this.right = gameObject.rightBoundary;

			this.drawSelf = function () {

				ctx.fillStyle = this.color;
				ctx.fillRect(this.x,this.y,this.width,this.height);
			},

			this.update = function () {

				this.drawSelf();
			}

			gameObject.objArray.push(this);
			gameObject.collisionCheckArray.push(this);
		},// backgroundObj

		flipSprite: function (img,sx,sy,swidth,sheight,dx,dy,dwidth,dheight) {

			ctx.save();
			ctx.scale(-1,1);
			ctx.drawImage(img,sx,sy,swidth,sheight,-dx - (cSizing*7),dy,dwidth,dheight);
			ctx.restore();
		},// flipSprite

		resolveCollision: function (obj, other, collision, newVel) {

			var objSide ;
			var objVel ;
			var otherSide ;
			var otherVel ;

			if (collision === 'bottom'){
				objSide = 'bottom';
				objVel = 'yVel';
				otherSide = 'top';
				otherVel = 'yVel';
			} else if (collision === 'top'){
				objSide = 'top';
				objVel = 'yVel';
				otherSide = 'bottom';
				otherVel = 'yVel';
			} else if (collision === 'right'){
				objSide = 'right';
				objVel = 'xVel';
				otherSide = 'left';
				otherVel = 'xVel';
			} else if (collision === 'left'){
				objSide = 'left';
				objVel = 'xVel';
				otherSide = 'right';
				otherVel = 'xVel';
			}

			var collisionY = 0;
			if (other[otherVel] === 0) {

				collision = other[otherSide]();
			} else {
				var xInital      = obj[objSide]();
				var deltaX       = other[otherSide]() - obj[objSide]();
				var percentMoved = (obj[objVel] / (obj[objVel] + other[otherVel]));
				collision = xInital + deltaX * percentMoved;
				// collision = other[otherSide]() - obj[objSide]() - other[otherSide]();
			}

			other[otherSide](collision);
			obj[objSide](collision);
			obj[objVel] = newVel;
		},// resolveCollision

		checkCollisionBottom: function (obj, other, newVel) {

			if (
				obj.right() > other.left() + other.xVel - obj.xVel - cSizing * .01 + cSizing * .01 && 
				obj.left() < other.right() + other.xVel - obj.xVel - cSizing * .01  && 
				obj.bottom() >= other.top() + other.yVel - obj.yVel - cSizing * .02 && 
				obj.bottom() <= other.top() + other.yVel
				) {

				gameObject.resolveCollision(obj, other, 'bottom', newVel);
				gameObject.fallFlag = true;
			}
		},// checkCollisionBottom

		checkCollisionTop: function (obj, other, newVel) {

			if (
				obj.right() > other.left() + other.xVel - obj.xVel - cSizing * .01 + cSizing * .01 && 
				obj.left() < other.right() + other.xVel - obj.xVel - cSizing * .01  && 
				obj.top() <= other.bottom() + other.yVel - obj.yVel - cSizing * .02 &&
				obj.top() >= other.bottom() + other.yVel
				) {

				gameObject.resolveCollision(obj, other, 'top', newVel);
				gameObject.fallFlag = true;
			}
		},// checkCollisionTop

		checkCollisionRight: function (obj, other, newVel) {
			
			if (
				obj.bottom() > other.top() + other.yVel - obj.yVel - cSizing * .02 &&
				obj.top() < other.bottom() + other.yVel - obj.yVel - cSizing * .02 &&
				obj.right() >= other.left() + other.xVel - obj.xVel - cSizing * .01 &&
				obj.right() <= other.left() + other.xVel 
				){

				gameObject.collisionRightFlag = true;

				gameObject.resolveCollision(obj, other, 'right', newVel);
			}	
		},// checkCollisionRight

		checkCollisionLeft: function (obj, other, newVel) {

			if (
				obj.bottom() > other.top() + other.yVel - obj.yVel - cSizing * .02 &&
				obj.top() < other.bottom() + other.yVel - obj.yVel - cSizing * .02 &&
				obj.left() <= other.right() + other.xVel - obj.xVel + cSizing * .01 &&
				obj.left() >= other.right() + other.xVel
				){

				gameObject.collisionLeftFlag = true;

				gameObject.resolveCollision(obj, other, 'left', newVel);
			}
		},// checkCollisionLeft

		rightPressed: function () {
			console.log("pressed left");
			if (gameObject.movingRightFlag === false){
				gameObject.stopMovingLeft();
				square.ft = 15;
				square.ftMax = 216;
				square.ftSize = 1;
				gameObject.movingRightFlag = true;
			}
		},// leftPressed

		moveLeft: function (obj) {

			if (obj.xVel > -obj.maxVelocity){
				obj.xVel -= obj.accelerationXUnit;
			}
			obj.x += obj.xVel;
			obj.ftSize = 7;
			var temp = cSizing * .7 / 6;
			// obj.ftSize = Math.floor(3 + Math.abs(obj.xVel) / (gameObject.ftSizeConstant));
			obj.ftSize = Math.floor(3 + Math.abs(obj.xVel) / (temp)); 
		},// moveLeft

		leftPressed: function () {
			if (gameObject.movingLeftFlag === false) {
				gameObject.stopMovingRight();
				square.ft = 15;
				square.ftMax = 216;
				square.ftSize = 1;
				gameObject.movingLeftFlag = true;	
			}
		},// rightPressed

		moveRight: function (obj) {

			if (obj.xVel < obj.maxVelocity){
				obj.xVel += obj.accelerationXUnit;
			}

			obj.x += obj.xVel;
			obj.ftSize = 7;
			var temp = cSizing * .7 / 6;
			// obj.ftSize = Math.floor(3 + Math.abs(obj.xVel) / (gameObject.ftSizeConstant));
			obj.ftSize = Math.floor(3 + Math.abs(obj.xVel) / (temp));
		},// moveRight

		stopMovingRight: function () {

			if(gameObject.movingRightFlag) {

				gameObject.movingRightFlag = false;
				square.xVel = 0;
				square.ftMax = 60;
				square.ftSize = 2;
				square.ft = 15;
			}
		},// stopMovingRight

		stopMovingLeft: function () {

			if(gameObject.movingLeftFlag) {

				gameObject.movingLeftFlag = false;
				square.xVel = 0;
				square.ftMax = 60;
				square.ftSize = 2;
				square.ft = 15;
			}
		},// stopMovingLeft

		fall: function (obj) {

			obj.yVel += cSizing * .02;
			obj.y += obj.yVel;
		},//this fall

		fire: function () {

			var that = this;
			this.color = 'black';
			
			/**
			 *  Canvas positions and dimensions for placing the image to the canvas
			 */
			this.x = square.right() - 2 * cSizing;
			this.y = square.top() + 2 * cSizing;
			this.width = 1 * cSizing;
			this.height = 1 * cSizing;

			/**
			 *  Velocity values to create more realistic movement
			 */
			this.xVel = - cSizing * 1;
			this.yVel = - cSizing * 1;

			/**
			 *  Velocicy after colisions
			 */
			this.newVelX = function () {
				return -this.xVel * .7;
			}
			this.newVelY = function () {
				return (this.yVel > cSizing * .5) ? -this.yVel * .7 : 0 ;
			}

			/**
			 *	Boundary functions that can be used as getters and setters
			 * 		for the edges of collision boarders to make it easier to 
			 *		understand and write the collision logic.
			 */
			this.top = gameObject.topBoundary;
			this.bottom = gameObject.bottomBoundary;
			this.left = gameObject.leftBoundary;
			this.right = gameObject.rightBoundary;

			this.drawSelf = function () {

				ctx.fillStyle = this.color;
				ctx.fillRect(this.x,this.y,this.width,this.height);
			}

			this.update = function () {

				gameObject.checkCollisions(this);
				this.tryToMove();
				this.drawSelf();
			}

			this.tryToMove = function () {

				(gameObject.fallFlag === false) && gameObject.fall(this);
				(gameObject.collisionRightFlag === false) && gameObject.moveRight(this);
			}

			gameObject.objArray.push(this);
			gameObject.playerObjectsArray.push(this);
		},// fire

		checkCollisions: function (obj) {
			
			gameObject.collisionRightFlag = false;
			gameObject.collisionLeftFlag = false;
			gameObject.fallFlag = false;
		
			gameObject.collisionCheckArray.forEach(function(element){

				gameObject.checkCollisionBottom(obj, element, obj.newVelY());
				gameObject.checkCollisionTop(obj, element, obj.newVelY());
				gameObject.checkCollisionRight(obj, element, obj.newVelX());
				gameObject.checkCollisionLeft(obj, element, obj.newVelX());
			});
		},// checkCollision

		jump: function() {

			square.yVel = -.9 * cSizing;
		},// jump

		paintCanvas: function () {

			ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
			gameObject.objArray.forEach(function (element) {

				element.update();
			});
			gameObject.buttons.forEach(function (element) {

				element.update();
			});
			requestAnimationFrame(gameObject.paintCanvas);
		},// paintCanvas



		topBoundary: function(topEdgeOfThis) {

			if(topEdgeOfThis !== undefined) {
				this.y = topEdgeOfThis;
			} else {
				return this.y;
			}
		}, // topBoundary

		bottomBoundary: function (bottomEdgeOfThis) {

			if (bottomEdgeOfThis !== undefined){
				this.y = bottomEdgeOfThis - this.height;
			} else {
				return this.y + this.height;
			}
		}, // bottomBoundary

		leftBoundary: function (leftEdgeOfThis) {

			if (leftEdgeOfThis !== undefined){
				this.x = leftEdgeOfThis;
			} else {
				return this.x;
			}
		}, // leftBoundary

		rightBoundary: function (rightEdgeOfThis) {

			if (rightEdgeOfThis !== undefined){
				this.x = rightEdgeOfThis - this.width;
			} else {
				return this.x + this.width;
			}
		} // rightBoundary
	}// end game object



	/**
	 *	Files to run at start of game
	 */


	var square = new gameObject.playerObj (35,70,7,7,'green','runningMonsterLeft','/img/runningMonster.png','idleMonster','/img/standingMonster.png');
	new gameObject.backgroundObj (150,70,10,20,'brown');
	new gameObject.backgroundObj (0,70,30,15,'red');
	new gameObject.backgroundObj (0,85,400,15,'brown');
	new gameObject.backgroundObj (50,70,10,4,'pink');
	new gameObject.backgroundObj (75,70,10,4,'yellow');

	new gameObject.button (180,50,10,10,'gray','jump');
	new gameObject.button (180,70,10,10,'gray','firePressed');
	new gameObject.button (30,50,10,10,'gray','rightPressed','stopMovingRight');
	new gameObject.button (10,50,10,10,'gray','leftPressed','stopMovingLeft');

	


	gameObject.paintCanvas();

//}, false );//document ready function
