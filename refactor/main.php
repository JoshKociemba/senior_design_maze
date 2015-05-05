<!DOCTYPE html>
<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="style/main.css">
	<script src="script/maze.js"></script>
	<script src="script/menu.js"></script>
	
	<title>Capstone HTML5 Maze</title>
</head>
<body>
    <div id="body">
		<!--MENUS-->
		<div class="menu" id="main-menu">
			<h1>A-MAZE-ing Energy!</h1>
			<p>Welcome to A-MAZE-ing Energy! You will navigate though a series of mazes to
				get a better idea of the carbon cycle! Finish the maze before the time
				runs out. To get more time, answer more questions and do so correctly!
				To begin, click on the fossil fuel below:
			</p>
			<div class="button" id="natural-gas">Natural Gas</div><br>
			<div class="credits button" id="credits-start">Credits</div>
			<div class="leader button" id="leader-start">Leaderboard</div>
		</div>
		<div class="menu" id="fuel-place-menu">
			<h1>Using the Fossil Fuels</h1>
			<p>There are many different ways to use fossil fuels. From making a car go to
				powering a whole city with a power plant. In this case we are going to
				explore how natural gas is used in heating your own home!
			</p>
			<div class="button" id="house">House</div><br>
		</div>
		<div class="menu" id="place-atmo-menu">
			<h1>Carbon in the Atmosphere</h1>
			<p>When using the fossil fuels, carbon can be released in many ways into the
				atmosphere. The way that most people think of is through carbon dioxide.
			</p>
			<div class="button" id="co2">Carbon Dioxide</div><br>
		</div>
		<div class="menu" id="atmo-biomass-menu">
			<h1>Moving to Biomass</h1>
			<p>From the atmosphere, carbon then enters into the biomass sector. Let's look
				at the example of a mammal, a sheep in particular!</p>
			<div class="button" id="sheep">Sheep</div><br>
		</div>
		<div class="menu" id="end-menu">
			<h1>There's another carbon molecule in the atmosphere!</h1>
			<p>Due to how our current energy system is set up, a lot of carbon is released into
				the atmosphere. We also have reasons to believe that Earth will never have the
				conditions to create our fossil fuel resources again. Because of this we want
				to look into renewable resources and limit our consumption of fossil fuels!
			</p>
			<div class="button" id="play-again">Play Again</div><br>
			<div class="credits button" id="credits-end">Credits</div>
		</div>
		<div class="menu" id="continue-menu">
			<h1>Congratulations!</h1>
			<p>You finished the maze in enough time! Are you ready for the next maze?<p>
			<div class="button" id="continue">CONTINUE</div>
		</div>
		<div class="menu" id="try-again-menu">
			<h1>Carbon TIME's out!</h1>
			<p>You didn't finish this maze in the time alotted. Please try it again! In
				order to get more "Carbon TIME" answer the questions correctly. Good
				luck!
			</p>
			<div class="button" id="try-again">TRY AGAIN</div>
		</div>
		<div class="menu" id="credits-menu">
			<h1>Credits</h1>
			<p class="p1">Katie Hughes</p><p class="p1">Joshua Kociemba</p><p class="p1">Tony Twyman</p>
			<p class="p2">Special Thanks To</p>
			<p class="p1">Energize Corvallis</p><p class="p1">Oregon State University</p><br>
			<div class="button" id="credits-back">Main Menu</div>
		</div>
		<div class="menu" id="leader-menu">
			<?php session_start(); 
				require "config.php"; //Connection Script, include in every file!
			 	include 'topscores.php';?>
			<div class="button" id="leader-back">Main Menu</div>
		</div>
		
		<!--THE ACTUAL CANVAS FOR THE MAZE-->
		<div id="game">
			<canvas id="maze-canvas">HTML5 not supported by your browser.</canvas>
			<noscript>Javascript is disabled.</noscript>
		</div>
    </div>
</body>
</html>
