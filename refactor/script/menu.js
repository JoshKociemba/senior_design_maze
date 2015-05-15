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

	var qs = [fossil_fuel,atmosphere,biomass,soil];
			  
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
	var fossilMazeImg = "images/fossilMaze.png";
	var atmoMazeImg = "images/atmoMaze.png";
	var bioMazeImg = "images/bioMaze.png";
	var soilMazeImg = "images/soilMaze.png";
	var mazeWidth = 790;
	var mazeHeight = 530;
	var cellNum = 20;
	var unit = mazeWidth/cellNum;
	var fossilStart = {
		x: 49,	//49
		y: 24	//24
	};
	var fossilEnd = {
		x: 20,
		y: 485
	};
	var soilStart = {
		x: 748,	//748
		y: 426	//426
	};
	var soilEnd = {
		x: 155,
		y: 26
	};
	var atmoStart = {
		x: 694, //694
		y: 23	//23
	};
	var atmoEnd = {
		x: 235,
		y: 486
	};
	var bioStart = {
		x: 20,	//20
		y: 104	//104
	};
	var bioEnd = {
		x: 723,
		y: 26
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
		loadMaze(fossilMazeImg, fossilStart, fossilEnd);
		//fuelPlaceMenu();
	}
	
	function soilMaze() {
		loadMaze(soilMazeImg, soilStart, soilEnd);
		//placeAtmoMenu();
	}
	
	function atmosphereMaze() {
		loadMaze(atmoMazeImg, atmoStart, atmoEnd);
		//atmoBiomassMenu();
	}
	
	function biomassMaze() {
		console.log("Calling biomass maze");
		loadMaze(bioMazeImg, bioStart, bioEnd);
		//endMenu();
	}

	//QUESTION FUNCTIONS//
	function loadQuestion_intro(index, io){
		q = qs[index]
 		$(".questions_intro").append("<form id='quiz'>\
								<p class='p_question'>" + q[io].question + "</p>\
								<label><input type='radio' name='q1' value='a' checked>" + q[io].a + "</input></label><br>\
								<label><input type='radio' name='q1' value='b'>" + q[io].b + "</input></label><br>\
								<label><input type='radio' name='q1' value='c'>" + q[io].c + "</input></label><br>\
								<label><input type='radio' name='q1' value='d'>" + q[io].d + "</input></label><br>\
								<input type='button'class='button' value='submit' id='check' visibility='visible' position='static'></input>\
							</form>");

	$("#check").click(function(event) {
		var ans = $('#quiz').serialize();
 		if (ans == 'q1=' + q[io].correct){
			$("#intro").css("visibility","visible");
			$("#correct").css("visibility","visible");
			$("#incorrect").css("visibility","hidden");
			$("#check").css("visibility","hidden");
			loadQuestion_outro(index, 1);
		}
		else{
			$("#incorrect").css("visibility","visible");
		}
	});
	}

	function loadQuestion_outro(index, io){
		q = qs[index]
 		$(".questions_outro").append("<form id='quiz'>\
								<p class='p_question'>" + q[io].question + "</p>\
								<label><input type='radio' name='q1' value='a' checked>" + q[io].a + "</input></label><br>\
								<label><input type='radio' name='q1' value='b'>" + q[io].b + "</input></label><br>\
								<label><input type='radio' name='q1' value='c'>" + q[io].c + "</input></label><br>\
								<label><input type='radio' name='q1' value='d'>" + q[io].d + "</input></label><br>\
								<input type='button'class='button' value='submit' id='check1' visibility='visible' position='static'></input>\
							</form>");

	$("#check1").click(function(event) {
		var ans = $('#quiz').serialize();
 		if (ans == 'q1=' + q[io].correct){
			$("#outro").css("visibility","visible");
			$("#correcto").css("visibility","visible");
			$("#incorrecto").css("visibility","hidden");
			$("#check1").css("visibility","hidden");
		}
		else{
			$("#incorrecto").css("visibility","visible");
		}
	});
	}
	
	//SET MENU BUTTON LISTENERS//
 	document.getElementById('fossil-fuel').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		loadQuestion_intro(0,0);
		$("#intro-q").css("visibility","visible");
		$("#intro").css("visibility","hidden");
		next_bool[FF_ATMO] = 1;
		arrow_bool[FF_ATMO] = 1;
	};
	
	document.getElementById('atmosphere').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		loadQuestion_intro(1,0);
		$("#intro-q").css("visibility","visible");
		$("#intro").css("visibility","hidden");
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
		
		loadQuestion_intro(2,0);
		$("#intro-q").css("visibility","visible");
		$("#intro").css("visibility","hidden");
		atmoVsoil++;
	};
	
	document.getElementById('soil').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		loadQuestion_intro(3,0);
		$("#intro-q").css("visibility","visible");
		$("#intro").css("visibility","hidden");
		next_bool[SOIL_ATMO] = 1;
		arrow_bool[SOIL_ATMO] = 1;
	};
	
 	document.getElementById('credits-end').onclick = function() {
 		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
	    $("#credits-menu").css("visibility","visible");
	    $("#credits-back").css("visibility","visible");
	    
	};
	
	document.getElementById('play-again').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		$("#main-screen").css("visibility","visible");
		$("#instructions").css("visibility","visible");
	   startGame();
	};
	
	 document.getElementById('credits-back').onclick = function() {
	    $(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		$("#credits-menu").css("visibility","hidden");
	    $("#credits-back").css("visibility","hidden");
		$("#end-screen").css("visibility","visible");
		$("#play-again").css("visibility","visible");
		$("#credits-end").css("visibility","visible");
	};

	document.getElementById('instructions').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		$("#instruction-menu").css("visibility","visible");
		$("#instructions").css("visibility","hidden");
		$("#instruc-back").css("visibility","visible");
		next_bool[FF_ATMO] = 1;
		arrow_bool[FF_ATMO] = 1;
	};
	
	document.getElementById('instruc-back').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		$("#instructions").css("visibility","visible");
		$("#main-screen").css("visibility","visible");
		showButton("#fossil-fuel");
		next_bool[FF_ATMO] = 1;
		arrow_bool[FF_ATMO] = 1;
	};
	/*
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
		$(".questions_intro").empty();
		$(".button").css("visibility","hidden");
		$("#container").css("visibility","hidden");
		$("#correct").css("visibility","hidden");
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
		var a = 0;
		$(".questions_outro").empty();
		$(".screen").css("visibility","hidden");
		$(".button").css("visibility","hidden");
		$("#container").css("visibility","hidden");
		$("#correcto").css("visibility","hidden");
		console.log(arrow_bool);
		
		while (pos < arrow_bool.length){
			if (arrow_bool[pos]) {
				$(arrows[pos]).css("visibility","visible");
				a++;
			}
			pos++;
		}
		$("#main-screen").css("visibility","visible");
		pos = 0;
		while (!bool && pos < next_bool.length){
			bool = next_bool[pos];
			pos++;
		}
		pos--;
		console.log(arrows.length);
		console.log(a);
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
					if (a == arrows.length)
						showButton("#finish");
					else showButton("#atmosphere");
					next_bool[SOIL_ATMO] = 0;
					break;
				 case BIO_ATMO:
					if (a == arrows.length)
						showButton("#finish");
					else showButton("#atmosphere");
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
	
	document.getElementById('finish').onclick = function() {
		$(".button").css("visibility","hidden");
		$(".screen").css("visibility","hidden");
		$(".arrow").css("visibility","hidden");
		$("#end-screen").css("visibility","visible");
		$("#play-again").css("visibility","visible");
		$("#credits-end").css("visibility","visible");
	};
	

	//START GAME & FOSSIL FUEL MENU//
	function startGame() {
		for (var i = 0; i < arrow_bool.length; i++) arrow_bool[i] = 0;
		for (var i = 0; i < next_bool.length; i++) next_bool[i] = 0;
		showButton("#fossil-fuel");
	}
	
	//MAIN//
	startGame();
});
