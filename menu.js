$( document ).ready(function(){	
	var canvas = document.getElementById("maze-canvas");
	var context = canvas.getContext("2d");
	var mazeWidth = 250;
	var mazeHeight = 250;
	var intervalVar;
		
	function drawMazeAndRectangle(rectX, rectY) {
	    makeWhite(0, 0, canvas.width, canvas.height);
	    var mazeImg = new Image();
	    mazeImg.onload = function () {
		context.drawImage(mazeImg, 0, 0);
		drawRectangle(rectX, rectY, "#000001");
		context.beginPath();
		context.arc(89, 153, 7, 0, 2 * Math.PI, false);
		context.closePath();
		context.fillStyle = '#F37321';
		context.fill();
	    };
	    mazeImg.src = "maze.png";
			
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

	drawMenuAndRectangle(67, 3);
	window.addEventListener("keydown", moveRect, true);
	
	createTimer(20);
});
