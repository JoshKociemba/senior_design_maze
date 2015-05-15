//start contains the x, y for where the character should start
//and end contains the x, y for the end game point
function loadMaze(mazeImg, start, end) {	
	//Creating game canvas
	var canvas = document.getElementById("maze-canvas");
	var context = canvas.getContext("2d");
	var mazeWidth = 790;
	var mazeHeight = 530;
	var score = 0;
	canvas.width = 790;
	canvas.height = 530;
	
	var characterImage_obj = {
		'source': null,
		'current': 1,
		'total_frames': 7,
		'width': 24,
		'height': 24
	};
	
	console.log("Start: (" + start.x + ", " + start.y + ")");
	console.log("End: (" + end.x + ", " + end.y + ")");
	
	$(".screen").css("visibility","hidden");
	$(".menu").css("visibility","hidden");
	$(".button").css("visibility","hidden");
	$(".arrow").css("visibility","hidden");
	$("#game").css("visibility","visible");
	
	//Game Background
	//function drawMazeAndRectangle(rectX, rectY) {
	var mazeReady = false;
	var mazeImage = new Image();
	mazeImage.onload = function () {
		mazeReady = true;
	};
	mazeImage.src = mazeImg;
	
	//Draw character
	var characterReady = false;
	var characterImage = new Image();
	characterImage.onload = function () {
		characterImage_obj.source = characterImage;
		characterReady = true;
	};
	//characterImage.src = "images/sprite_sheet.png";
	characterImage.src = "images/sprite.png";
	
	//Question Tile
	var questionReady = false;
	var questionImage = new Image();
	questionImage.onload = function () {
		questionReady = true;
	};
	questionImage.src = "images/question.png";
	
	//Exit Tile
	var endReady = false;
	var endImage = new Image();
	endImage.onload = function () {
		endReady = true;
	};
	endImage.src = "images/end.png";
	
	//Game Objects
	var character = {
		speed: 500
	};
	var question1 = {};
	var question2 = {};
	var question3 = {};
	//var end = {};
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
		character.x = start.x;
		character.y = start.y;
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
		makeWhite(600, 245, 50, 50);
		context.font = "20px Arial";
		context.fillStyle = "black";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillText("Carbon: ", 200, 600);
	};
	
	
	var collisiondetect = function(destX, destY) {
		var spritewidth = 22;
		var spriteheight = 24;
		var imgData = context.getImageData(destX, destY, spritewidth, spriteheight);
		var data = imgData.data;
		var canmove = 1;
		if (destX >= 0 && destX <= mazeWidth - spritewidth && destY >= 0 && destY <= mazeHeight - spriteheight) { // check whether the rectangle would move inside the bounds of the canvas
			for (var i = 0; i < 4 * spritewidth * spriteheight; i += 4) { // look at all pixels
				if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
					canmove = 0; // 0 means: the rectangle can't move
					break;
				}	
			}
		}
		else {
			canmove = 0;
		}
		
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
			character.x <= (question1.x + 15)
			&& question1.x <= (character.x + 15)
			&& character.y <= (question1.y + 15)
			&& question1.y <= (character.y + 15)
		) {
			++questionsHit;
			newquestion();
		}
		if (
			character.x <= (question2.x + 15)
			&& question2.x <= (character.x + 15)
			&& character.y <= (question2.y + 15)
			&& question2.y <= (character.y + 15)
		) {
			++questionsHit;
			newquestion();
		}
		if (
			character.x <= (question3.x + 15)
			&& question3.x <= (character.x + 15)
			&& character.y <= (question3.y + 15)
			&& question3.y <= (character.y + 15)
		) {
			++questionsHit;
			newquestion();
		}
		if (
			character.x <= (end.x + 15)
			&& end.x <= (character.x + 15)
			&& character.y <= (end.y + 15)
			&& end.y <= (character.y + 15)
		) {
			reset();
			makeWhite(0, 0, canvas.width, canvas.height);
			$(".menu").css("visibility","hidden");
			$("#game").css("visibility","hidden");
			$("#dummy-outro-q").css("visibility","visible");
			$("#outro").css("visibility","visible");
			reset();
			exit();
		}
	};
	
	function createTimer() {
					intervalVar = setInterval(function () {
					makeWhite(235, mazeHeight + 10, 50, 50);
					if (score < 1) {
						makeWhite(0, 0, canvas.width, canvas.height);
						context.font = "40px Arial";
						context.fillStyle = "red";
						context.textAlign = "center";
						context.textBaseline = "middle";
						context.fillText("Carbon Time's Up!", 0, 0);
						return;
					}
					context.font = "20px Arial";
					if (score <= 20 && score > 10) {
						context.fillStyle = "orangered";
					}
					else if (score <= 10) {
						context.fillStyle = "red";
						}
						else {
							context.fillStyle = "green";
						}
						context.textAlign = "center";
						context.textBaseline = "middle";
						context.fillText(score, 300, 300)
						score--;
					}, 1000);
				}
	/*			
	function draw_anim(context, x, y, iobj) {
		if (iobj.source != null)
			context.drawImage(iobj.source, iobj.current * iobj.width, 0,
							  iobj.width, iobj.height,
							  x, y, iobj.width, iobj.height);
		iobj.current = (iobj.current + 1) % iobj.total_frames;
	}
	
	function on_body_load() {
		setInterval((function (c, i) {
			return function () {
				draw_anim(c, character.x, character.y, i);
			};
		})(context, characterImage_obj), 600 / 2);
	}
	*/
		
	var render = function () {
		if (mazeReady) {
			context.drawImage(mazeImage, 0, 0);
		}
	
		if (characterReady) {
			context.drawImage(characterImage, character.x, character.y);
			//draw_anim(context, character.x, character.y, characterImage_obj);
		}
		
		if (endReady) {
			context.drawImage(endImage, end.x, end.y);
		}
		
		if (questionReady) {
			//context.drawImage(questionImage, question1.x, question1.y)
			//context.drawImage(questionImage, question2.x, question2.y)
			//context.drawImage(questionImage, question3.x, question3.y)
		}
	};

	var main = function () {
		var now = Date.now();
		var delta = now - then;
		
		update(delta / 5000);
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
	createTimer();
	reset();
	
	main();
}
