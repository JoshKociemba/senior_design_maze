$( document ).ready(function() {
	var menus = ["#main-menu",
					"#fuel-place-menu",
					"#place-atmo-menu",
					// "#atmo-biomass-menu",
					"#end-menu"
				];
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
	
	function showMenu(id) {
		$(".menu").css("visibility","hidden");
		$("#game").css("visibility","hidden");
		$(id).css("visibility","visible");
		console.log("Show menu shows: "+id);
	}
	
	// function hideAllMenus() {
		// $(".menu").css("visibility","hidden");
	// }
	
	
	//MAZE FUNCTIONS//
	//NOTE: loadMaze is from maze.js
	function naturalGasMaze() {
		loadMaze(mazeImg, bgImg, start, end);
		//fuelPlaceMenu();
	}
	
	function houseMaze() {
		loadMaze(mazeImg, bgImg, start, end);
		//placeAtmoMenu();
	}
	
	function carbonDioxideMaze() {
		loadMaze(mazeImg, bgImg, start, end);
		//atmoBiomassMenu();
	}
	
	function sheepMaze() {
		loadMaze(mazeImg, bgImg, start, end);
		//endMenu();
	}
	
	
	//SET MENU BUTTON LISTENERS//
	document.getElementById('credits-start').onclick = function() {
	   showMenu("#credits-menu");
	};
	
	document.getElementById('natural-gas').onclick = function() {
	   naturalGasMaze();
	};
	
	document.getElementById('house').onclick = function() {
	   houseMaze();
	};
	
	document.getElementById('co2').onclick = function() {
	   carbonDioxideMaze();
	};

	document.getElementById('sheep').onclick = function() {
	   sheepMaze();
	};
	
	document.getElementById('credits-end').onclick = function() {
	   showMenu("#credits-menu");
	};
	
	document.getElementById('play-again').onclick = function() {
	   startGame();
	};
	
	document.getElementById('credits-back').onclick = function() {
	   showMenu("#main-menu");
	};
	
	document.getElementById('leader-start').onclick = function() {
	   showMenu("#leader-menu");
	};

	document.getElementById('leader-back').onclick = function() {
	   showMenu("#main-menu");
	};
	
	document.getElementById('continue').onclick = function() {
		x = (x === menus.length - 1) ? 0 : x + 1;
		console.log(x);
		console.log(menus[x]);
        showMenu(menus[x]);
	};
	
	document.getElementById('try-again').onclick = function() {
		showMenu(menus[x]);
	};
	
	
	//MENU FUNCTIONS - NECESSARY????//
	// function fuelPlaceMenu() {
		// showMenu("#fuel-place-menu");
	// }
	
	// function placeAtmoMenu() {
		// showMenu("#place-atmo-menu");
	// }
	
	// function atmoBiomassMenu() {
		// showMenu("#atmo-biomass-menu");
	// }
	
	// function endMenu() {
		// showMenu("#end-menu");
	// }

	//START GAME & FOSSIL FUEL MENU//
	function startGame() {
		showMenu("#main-menu");
	}
	
	//MAIN//
	startGame();
});
