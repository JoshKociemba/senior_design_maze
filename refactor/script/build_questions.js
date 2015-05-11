var qs = [fossil_fuel, atmosphere, biomass, soil];
$( document ).ready(function() {  //change to a function that takes the questions in later
	q = qs[Math.floor(Math.random()*4)];
	io = Math.floor(Math.random()*2);
	$(".questions").append("<form>\
								<p>" + q[io].question + "</p>\
								<input type='radio' name='" + q[io].name + "' value='a'>" + q[io].a + "</input><br>\
								<input type='radio' name='" + q[io].name + "' value='b'>" + q[io].b + "</input><br>\
								<input type='radio' name='" + q[io].name + "' value='c'>" + q[io].c + "</input><br>\
								<input type='radio' name='" + q[io].name + "' value='d'>" + q[io].d + "</input><br>\
								<input type='submit' value='submit'></input>\
							</form>");
});

$(".questions").submit(function(event) {
/* 	if soil[0].name = soil[0].correct
		show correct menu
	else
		show incorrect menu */
});