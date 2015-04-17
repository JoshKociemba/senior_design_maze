$( document ).ready(function() {
	
    function displayNextMenu() {
		$(".menu").css("visibility","hidden");
		x = (x === menu.length - 1) ? 0 : x + 1;
		$(menu[x]).css("visibility","visible");
	}
	
	function startTimer() {
		setInterval(displayNextMenu, 3000);
	}
	
	var menu = ["#main-menu", "#fuel-place-menu", "#place-atmo-menu", "#atmo-biomass-menu", "#end-menu"];
	var x = 0;
	
	$(menu[x]).css("visibility","visible");
	startTimer();
});