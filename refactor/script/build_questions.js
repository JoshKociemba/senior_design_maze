var qs = [fossil_fuel, atmosphere, biomass, soil];
$( document ).ready(function() {  //change to a function that takes the questions in later
	q = qs[Math.floor(Math.random()*4)];
	io = Math.floor(Math.random()*2);
	$(".questions").append("<form id='quiz'>\
								<p class='p_standard'>" + q[io].question + "</p>\
								<input type='radio' name='q1' value='a'>" + q[io].a + "</input><br>\
								<input type='radio' name='q1' value='b'>" + q[io].b + "</input><br>\
								<input type='radio' name='q1' value='c'>" + q[io].c + "</input><br>\
								<input type='radio' name='q1' value='d'>" + q[io].d + "</input><br>\
								<input type='submit' value='submit'></input>\
							</form>");

	$("#quiz").submit(function(event) {
		window.alert($("input:radio[name=q1]:checked").val())
 		if ($("input:radio[name=q1]:checked").val() == q[io].correct)
			window.alert("Correct");
		else
			window.alert("The correct answer is " + q[io].correct);
	});
});

