$( document ).ready(function() {
	function showMenu(id) {
		$(".menu").css("visibility","hidden");
		$(id).css("visibility","visible");
	}
	
	//MAZE FUNCTIONS//
	//NOTE: loadMaze is from maze.js
	function naturalGasMaze() {
		loadMaze(maze, bg-img, start, end);
		fuelPlaceMenu();
	}
	
	function houseMaze() {
		loadMaze(maze, bg-img, start, end);
		placeAtmoMenu();
	}
	
	function carbonDioxideMaze() {
		loadMaze(maze, bg-img, start, end);
		atmoBiomassMenu();
	}
	
	function sheepMaze() {
		loadMaze(maze, bg-img, start, end);
		endMenu();
	}
	
	//MENU FUNCTIONS//
	function fuelPlaceMenu() {
		showMenu("#fuel-place-menu");
		document.getElementById('house').onclick = function() {
		   houseMaze();
		}​;​
	}
	
	function placeAtmoMenu() {
		showMenu("#place-atmo-menu");
		document.getElementById('co2').onclick = function() {
		   carbonDioxideMaze();
		}​;​
	}
	
	function atmoBiomassMenu() {
		showMenu("#atmo-biomass-menu");
		document.getElementById('sheep').onclick = function() {
		   sheepMaze();
		}​;​
	}
	
	function endMenu() {
		showMenu("#end-menu");
		document.getElementById('credits-end').onclick = function() {
		   showMenu("#credits-menu");
		}​;​
		document.getElementById('play-again').onclick = function() {
		   startGame();
		}​;​
	}

	//START GAME & FOSSIL FUEL MENU//
	function startGame() {
		document.getElementById('credits-start').onclick = function() {
		   showMenu("#credits-menu");
		}​;​
		document.getElementById('natural-gas').onclick = function() {
		   naturalGasMaze();
		}​;​
	}
	
	//MAIN//
	startGame();
});
