$( document ).ready(function(){	
	var canvas = document.getElementById("maze-canvas");
	var sprites = [0, 0, 0, 0, 0, 0, 0];
	var loaded = false;
	var context = canvas.getContext("2d");
	var imagePaths = ["images/spr_glasses_shadow_1.png","images/spr_glasses_shadow_2.png", "images/spr_glasses_shadow_3.png", "images/spr_glasses_shadow_4.png", "images/spr_glasses_shadow_5.png", "images/spr_glasses_shadow_6.png", "images/spr_glasses_shadow_7.png",];
	var currRectX = 67;
	var currRectY = 3;
	//maze width must be adjusted to have carbon time show. The background image will cover it otherwise
	var mazeWidth = 625;
	var mazeHeight = 250;
	//maze displacement, used to move player object and end object
	var mazeDisX = 125;
	var mazeDisY = 75;
	var time = true;
	var frameCount = 0;
	var intervalVar;
	//music clip from www.FoolBoyMedia.co.uk
	var gameOver = new Audio('sounds/game_over.mp3');
	var bgs = new Audio('sounds/forest_song.wav');
	bgs.volume = .7;
	bgs.play();
	var index = 0
	var atomSpr = new Image();
	var sprReady = false
	atomSpr.onload = function () {sprReady = true;};
	atomSpr.src = "images/spr_glasses_shadow_2.png";
	var atom = { speed: 256};

	// Handle keyboard controls   
	var keysDown = {};

	addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	loadImages(imagePaths)
	
	function loadImages(paths){
  		paths.forEach(function(path){
    		var img = new Image;
    		img.onload = function(){
      			for(x = 0; x < paths.length; x++){
      				var sorc = img.src.split('.')
      				path = paths[x].split('.')
					if(path[0][path[0].length-1] == sorc[0][sorc[0].length-1]){
						sprites[x] = img
					}
      			}
      			if (sprites.length==paths.length) loaded = true;
      		}
      		img.src = path;
      	});
    }
    
	function reset() {
		atom.x = 67 + mazeDisX;
		atom.y = 3 + mazeDisY;
	}

	function render(bool, index){
		if(bool){
			context.drawImage(sprites[index], atom.x, atom.y, 12, 12);
		}
	}
	
	function drawMazeAndRectangle(rectX, rectY) {
	    makeWhite(0, 0, canvas.width, canvas.height);
	    var bgImg = new Image();
		bgImg.onload = function() {
		context.drawImage(bgImg, 0, 0);
		};
	    bgImg.src = "images/farm_bg.png"
	    var mazeImg = new Image();
	    mazeImg.onload = function () {
		context.drawImage(mazeImg, mazeDisX, mazeDisY);
		//drawRectangle(rectX, rectY, "#000001");
		context.beginPath();
		context.arc(89 + mazeDisX, 153 + mazeDisY, 7, 0, 2 * Math.PI, false);
		context.closePath();
		context.fillStyle = '#F37321';
		context.fill();
	    };
	    mazeImg.src = "images/maze.png";
			
			context.font = "20px Arial";
			context.fillStyle = "black";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText("Carbon: ", mazeWidth - 30, canvas.height / 7);
		
	}
	function drawRectangle(x, y, style) {
	    makeWhite(currRectX, currRectY, 12, 12);
	    currRectX = x;
	    currRectY = y;
	    context.beginPath();
	    context.rect(x, y, 12, 12);
	    context.closePath();
	    context.fillStyle = style;
	    context.fill();
	}
	function moveRect(e) {
	    var newX;
	    var newY;
	    /*var moving = false;
	    var movingAllowed;
	    if (38 in keysDown) { // Player holding up
			newY -= atom.speed * modifier;
			moving = true;
		}
		if (40 in keysDown) { // Player holding down
			newY += atom.speed * modifier;
			moving = true;
		}
		if (37 in keysDown) { // Player holding left
			newX -= atom.speed * modifier;
			moving = true;
		}
		if (39 in keysDown) { // Player holding right
			newX += atom.speed * modifier;
			moving = true;
		}
		if(moving){
			atom.x = newX;
			atom.y = newY;
			}*/
	    var movingAllowed;
	    e = e || window.event;
	    switch (e.keyCode) {
		case 38:   // arrow up key
		case 87: // W key
		    newX = atom.x;
		    newY = atom.y - 3;
		    break;
		case 37: // arrow left key
		case 65: // A key
		    newX = atom.x - 3;
		    newY = atom.y;
		    break;
		case 40: // arrow down key
		case 83: // S key
		    newX = atom.x;
		    newY = atom.y + 3;
		    break;
		case 39: // arrow right key
		case 68: // D key
		    newX = atom.x + 3;
		    newY = atom.y;
		    break;
	    }
	    movingAllowed = canMoveTo(newX, newY);
	    if (movingAllowed === 1) {      // 1 means 'the rectangle can move'
	    	makeWhite(atom.x, atom.y, 12, 12);
			atom.x = newX;
			atom.y = newY;
	   	}
	   	else if (movingAllowed === 2) { // 2 means 'the rectangle reached the end point'
			clearInterval(intervalVar);
			makeWhite(0, 0, canvas.width, canvas.height);
			context.font = "40px Arial";
			context.fillStyle = "blue";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText("Congratulations!", canvas.width / 2, canvas.height / 2);
			window.removeEventListener("keydown", moveRect, true);
	    }
	}
	function canMoveTo(destX, destY) {
		
	    var imgData = context.getImageData(destX, destY, 12, 12);
	    var data = imgData.data;
	    var canMove = 1; // 1 means: the rectangle can move
	    if (destX >= 0 && destX <= mazeWidth - 12 && destY >= 0 && destY <= mazeHeight - 12) {
		for (var i = 0; i < 4 * 12 * 12; i += 4) {
		    if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
			canMove = 0; // 0 means: the rectangle can't move
			break;
		    }
		    else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // #00FF00
			canMove = 2; // 2 means: the end point is reached
			break;
		    }
		}
	    }
	    else {
		canMove = 0;
	    }
	    return canMove;
	}
		
	function createTimer(seconds) {
		intervalVar = setInterval(function () {
			makeWhite(mazeWidth, 0, canvas.width - mazeWidth, canvas.height);
			if (seconds === 0) {
				time = false
				gameOver.volume = .35
				gameOver.play();
				clearInterval(intervalVar);
				window.removeEventListener("keydown", moveRect, true);
				makeWhite(0, 0, canvas.width, canvas.height);
				context.font = "40px Arial";
				context.fillStyle = "red";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText("Carbon Time's Up!", canvas.width / 4, canvas.height / 4);
				return;
			}
			context.font = "20px Arial";
			if (seconds <= 10 && seconds > 5) {
				context.fillStyle = "orangered";
				bgs.volume = .6
			}
			else if (seconds <= 5) {
				context.fillStyle = "red";
				bgs.volume = .4
			}
			else {
				context.fillStyle = "green";
			}
			context.textAlign = "center";
			context.textBaseline = "middle";
			var secondsToShow = seconds.toString();
			context.fillText(secondsToShow, mazeWidth + 20, canvas.height / 7);
			seconds--;
		}, 1000);
	}

	function makeWhite(x, y, w, h) {
		context.beginPath();
		context.rect(x, y, w, h);
		context.closePath();
		context.fillStyle = "white";
		context.fill();
	}

	//Main game loop
	function main(){
		var now = Date.now();
		//Used for animation
		if((now - frameCount) >= 110){
			frameCount = now;
			if(index == 6){
				index = 0;
			}
			else{
				index += 1;
			} 
		}
		//if there is still time we continue to render the atom
		if(time){
			render(loaded, index);
			}
		then = now;
		requestAnimationFrame(main);
	}

	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


	//draw the maze
	drawMazeAndRectangle(67, 3);

	
	var then = Date.now();
	frameCount = then
	//set position of atom
	reset();
	//start the main game loop
	main();
	window.addEventListener("keydown", moveRect, true);
	createTimer(60);
	
});
