$( document ).ready(function(){	
	//Creating game canvas
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	var mazeWidth = 242;
	var mazeHeight = 242;
	canvas.width = mazeWidth*2;
	canvas.height = mazeHeight*2;
	document.body.appendChild(canvas);
	
	//Game Background
	//function drawMazeAndRectangle(rectX, rectY) {
	var mazeReady = false;
	var mazeImage = new Image();
	mazeImage.onload = function () {
		mazeReady = true;
	};
	mazeImage.src = "maze.png";
	
	//Draw character
	var characterReady = false;
	var characterImage = new Image();
	characterImage.onload = function () {
		characterReady = true;
	};
	characterImage.src = "sprite.png";
	
	//Question Tile
	var questionReady = false;
	var questionImage = new Image();
	questionImage.onload = function () {
		questionReady = true;
	};
	questionImage.src = "question.png";
	
	//Exit Tile
	var endReady = false;
	var endImage = new Image();
	endImage.onload = function () {
		endReady = true;
	};
	endImage.src = "end.png";
	
	//Game Objects
	var character = {
		speed: 100
	};
	var question1 = {};
	var question2 = {};
	var question3 = {};
	var end = {};
	var questionsHit = 0;
	
	//Keyboard Controls
	var keysDown = {};
	
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);
	
	//Reset game
	var reset = function () {
		character.x = (mazeWidth / 2) - 6;
		character.y = 2;
		end.x = (mazeWidth / 2) - 6;
		end.y = mazeHeight - 14;
		newquestion();
	};
	
		//Randomize question
	var newquestion = function() {
		
		question1.x = 32 + (Math.random() * (mazeWidth - 64));
		question1.y = 32 + (Math.random() * (mazeHeight - 64));

		question2.x = 32 + (Math.random() * (mazeWidth - 64));
		question2.y = 32 + (Math.random() * (mazeHeight - 64));

		question3.x = 32 + (Math.random() * (mazeWidth - 64));
		question3.y = 32 + (Math.random() * (mazeHeight - 64));
		
		//Timer placement and Questions Hit
		makeWhite(0, 245, mazeWidth, 15);
		context.fillStyle = "rgb(0, 0, 0)";
		context.font = "12px Helvetica";
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillText("Questions Hit: " + questionsHit, 0, 245);
	};
	
	var collisiondetect = function(destX, destY) {
		var imgData = context.getImageData(destX, destY, 12, 13);
		var data = imgData.data;
		var canmove = 1;
		if (destX >= 0 && destX <= mazeWidth - 12 && destY >= 0 && destY <= mazeHeight - 13) { // check whether the rectangle would move inside the bounds of the canvas
			for (var i = 0; i < 4 * 12 * 13; i += 4) { // look at all pixels
				if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
					canmove = 0; // 0 means: the rectangle can't move
					break;
				}	
				else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // lime: #00FF00
					canmove = 2; // 2 means: the end point is reached
					break;
				}
			}
		}
		else {
			canmove = 0;
		}
		
		makeWhite(0, 265, canvas.width, 15);
		context.fillStyle = "rgb(0, 0, 0)";
		context.font = "12px Helvetica";
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillText("X: " + Math.round(character.x) + "   Y:   " + Math.round(character.y) + "   Can move: " + canmove, 0, 265);
		
		return canmove;
	};
	
	var makeWhite = function(x, y, w, h) {
            context.beginPath();
            context.rect(x, y, w, h);
            context.closePath();
            context.fillStyle = "white";
            context.fill();
	};
	
	// Update game objects
	var update = function (modifier) {
		if (38 in keysDown || 87 in keysDown) { // Player holding up
			if (collisiondetect(character.x,character.y - character.speed * modifier) == 1) {
				character.y -= character.speed * modifier;
			}
		}
		if (40 in keysDown || 83 in keysDown) { // Player holding down
			if (collisiondetect(character.x,character.y + character.speed * modifier) == 1) {
				character.y += character.speed * modifier;
			}
		}
		if (37 in keysDown || 65 in keysDown) { // Player holding left
			if(collisiondetect(character.x - character.speed * modifier,character.y) == 1) {
				character.x -= character.speed * modifier;
			}
		}
		if (39 in keysDown || 68 in keysDown) { // Player holding right
			if(collisiondetect(character.x + character.speed * modifier,character.y) == 1) {
				character.x += character.speed * modifier;
			}
		}
		
		//Collision Detection
		if (
			character.x <= (question1.x + 8)
			&& question1.x <= (character.x + 8)
			&& character.y <= (question1.y + 8)
			&& question1.y <= (character.y + 8)
		) {
			++questionsHit;
			newquestion();
		}
		if (
			character.x <= (question2.x + 8)
			&& question2.x <= (character.x + 8)
			&& character.y <= (question2.y + 8)
			&& question2.y <= (character.y + 8)
		) {
			++questionsHit;
			newquestion();
		}
		if (
			character.x <= (question3.x + 8)
			&& question3.x <= (character.x + 8)
			&& character.y <= (question3.y + 8)
			&& question3.y <= (character.y + 8)
		) {
			++questionsHit;
			newquestion();
		}
		if (
			character.x <= (end.x + 8)
			&& end.x <= (character.x + 8)
			&& character.y <= (end.y + 8)
			&& end.y <= (character.y + 8)
		) {
			makeWhite(0, 0, canvas.width, canvas.height);
			context.font = "40px Arial";
			context.fillStyle = "blue";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText("Congratulations!", canvas.width / 2, canvas.height / 2);
			window.removeEventListener("keydown", moveRect, true);
		}
	};
		
	var render = function () {
		if (mazeReady) {
			context.drawImage(mazeImage, 0, 0);
		}
	
		if (characterReady) {
			context.drawImage(characterImage, character.x, character.y);
		}
		
		if (endReady) {
			context.drawImage(endImage, end.x, end.y);
		}
		
		if (questionReady) {
			context.drawImage(questionImage, question1.x, question1.y)
			context.drawImage(questionImage, question2.x, question2.y)
			context.drawImage(questionImage, question3.x, question3.y)
		}
	};

	var main = function () {
		var now = Date.now();
		var delta = now - then;
		
		update(delta / 1000);
		render();
		
		then = now;
		
		//Request again ASAP
		requestAnimationFrame(main);
	};
	
	//Cross browser crap
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	
	//Play
	var then = Date.now();
	reset();
	main();
});
