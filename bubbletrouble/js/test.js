document.addEventListener( 'DOMContentLoaded', function () {


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
	var cSizing = (cx <= cy) ? cx : cy ;
	cSizing *= .01;
	cy *= .01;
	cx *= .01;


	var gameObject = {

		collisionCheckArray: [],
		playerObjectsArray: [],
		objArray: [],

		movingRightFlag: false,
		movingLeftFlag: false,
		collisionRightFlag: false,
		collisionLeftFlag: false,
		fallFlag: false,

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
	


	gameObject.paintCanvas();

}, false );//document ready function
