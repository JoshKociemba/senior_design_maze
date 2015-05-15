$( document ).ready(function() {
	var buttons = ["#fossil-fuel",
					"#atmosphere",
					"#biomass",
					"#soil",
					"#finish"
				];
	var arrows = ["#ff-atmo",
					"#atmo-bio",
					"#bio-soil",
					"#soil-atmo",
					"#bio-atmo"
				];
	
	var arrow_bool = [0,0,0,0,0];
	var next_bool = [0,0,0,0,0];
	var FF_ATMO = 0;
	var ATMO_BIO = 1;
	var BIO_SOIL = 2;
	var SOIL_ATMO = 3;
	var BIO_ATMO = 4;
	
	var atmoVsoil = 0;
	
	var x = 0;

	//these variables should be defined for each Maze function, but are currently
	//global since we don't have different mazes/bgImgs and therefore start/ends yet
	var mazeImg = "images/maze.png";
	var bgImg = "images/maze.png"; //this should be background but isn't used now
	var mazeWidth = 242;
	var mazeHeight = 242;
	var cellNum = 20;
	var unit = mazeWidth/cellNum;
	var start = {
		x: 5*unit+6,
		y: 2
	};
	var end = {
		x: 7*unit+6,
		y: 12*unit+6
	};
	
	function showButton(id) {
		$(".pink .button").css("visibility","hidden");
		$("#game").css("visibility","hidden");
		$(id).css("visibility","visible");
		console.log("Show button shows: "+id);
	}
	
	// function hideAllMenus() {
		// $(".menu").css("visibility","hidden");
	// }
	
	
	//MAZE FUNCTIONS//
	//NOTE: loadMaze is from maze.js
	function fossilFuelMaze() {
		loadMaze(mazeImg, bgImg, start, end);
		//fuelPlaceMenu();
	}
	
	function soilMaze() {
		loadMaze(mazeImg, bgImg, start, end);
		//placeAtmoMenu();
	}
	
	function atmosphereMaze() {
		loadMaze(mazeImg, bgImg, start, end);
		//atmoBiomassMenu();
	}
	
	function biomassMaze() {
		console.log("Calling biomass maze");
		loadMaze(mazeImg, bgImg, start, end);
		//endMenu();
	}
	
	
	//SET MENU BUTTON LISTENERS//
 	document.getElementById('fossil-fuel').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		$("#dummy-intro-q").css("visibility","visible");
		$("#intro").css("visibility","visible");
		next_bool[FF_ATMO] = 1;
		arrow_bool[FF_ATMO] = 1;
	};
	
	document.getElementById('atmosphere').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		$("#dummy-intro-q").css("visibility","visible");
		$("#intro").css("visibility","visible");
		next_bool[ATMO_BIO] = 1;
		arrow_bool[ATMO_BIO] = 1;
	};

	document.getElementById('biomass').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		
		if (atmoVsoil % 2 == 0) {
			next_bool[BIO_SOIL] = 1;
			arrow_bool[BIO_SOIL] = 1;
			console.log("bio->soil next");
		}
		else {
			next_bool[BIO_ATMO] = 1;
			arrow_bool[BIO_ATMO] = 1;
			console.log("bio->atmo next");
		}
		
		$("#dummy-intro-q").css("visibility","visible");
		$("#intro").css("visibility","visible");
		atmoVsoil++;
	};
	
	document.getElementById('soil').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		$("#dummy-intro-q").css("visibility","visible");
		$("#intro").css("visibility","visible");
		next_bool[SOIL_ATMO] = 1;
		arrow_bool[SOIL_ATMO] = 1;
	};
	
/* 	document.getElementById('credits-end').onclick = function() {
	   showButton("#credits-menu");
	}; */
	
	document.getElementById('play-again').onclick = function() {
	   startGame();
	};
	
	/* document.getElementById('credits-back').onclick = function() {
	   showButton("#main-menu");
	};
	
	document.getElementById('leader-start').onclick = function() {
	   showButton("#leader-menu");
	};

	document.getElementById('leader-back').onclick = function() {
	   showButton("#main-menu");
	}; */
	
	document.getElementById('continue').onclick = function() {
		x = (x === buttons.length - 1) ? 0 : x + 1;
		console.log(x);
		console.log(buttons[x]);
        showButton(buttons[x]);
	};
	
	document.getElementById('intro').onclick = function() {
		var pos = 0;
		var bool = 0;
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		console.log("intro button clicked");
		while (!bool && pos < next_bool.length){
			bool = next_bool[pos];
			pos++;
		}
		pos--;
		if (pos < next_bool.length) {
			switch (pos) {
				case FF_ATMO:
					fossilFuelMaze();
					break;
				case ATMO_BIO:
					atmosphereMaze();
					break;
				case BIO_SOIL:
					biomassMaze();
					break;
				case SOIL_ATMO:
					soilMaze();
					break;
				case BIO_ATMO:
					console.log("intro: bio->atmo");
					biomassMaze();
					break;
			}
		}
	};
	
	document.getElementById('outro').onclick = function() {
		var pos = 0;
		var bool = 0;
		$(".screen").css("visibility","hidden");
		$(".button").css("visibility","hidden");
		console.log(arrow_bool);
		while (pos < arrow_bool.length){
			if (arrow_bool[pos])
				$(arrows[pos]).css("visibility","visible");
			pos++;
		}
		$("#main-screen").css("visibility","visible");
		pos = 0;
		while (!bool && pos < next_bool.length){
			bool = next_bool[pos];
			pos++;
		}
		pos--;
		if (pos < next_bool.length) {
			switch (pos) {
				case FF_ATMO:
					showButton("#atmosphere");
					next_bool[FF_ATMO] = 0;
					break;
				case ATMO_BIO:
					showButton("#biomass");
					next_bool[ATMO_BIO] = 0;
					break; 
				case BIO_SOIL:
					showButton("#soil");
					console.log("in bio->soil");
					next_bool[BIO_SOIL] = 0;
					break; 
				case SOIL_ATMO:
					showButton("#atmosphere");
					next_bool[SOIL_ATMO] = 0;
					break;
				 case BIO_ATMO:
					showButton("#atmosphere");
					console.log("in bio->atmo");
					next_bool[BIO_ATMO] = 0;
					break;
			}
			//from bio, this is where it is determined what is next
			/* console.log(pos);
			if (pos == BIO_ATMO || pos == BIO_SOIL) {
				if (atmoVsoil % 2 == 1) 
					showButton("#soil");
				else showButton("#atmosphere");
			} */
		}
	};
	
	document.getElementById('try-again').onclick = function() {
		showButton(buttons[x]);
	};
	

	//START GAME & FOSSIL FUEL MENU//
	function startGame() {
		showButton("#fossil-fuel");
	}
	
	//MAIN//
	startGame();
});
