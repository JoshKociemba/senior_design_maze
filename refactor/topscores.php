<?php
    $db = mysql_connect('oniddb.cws.oregonstate.edu', 'kociembj-db', 'ufXTJKFS0nHVoZls') or die('Failed to connect: ' . mysql_error()); 
        mysql_select_db('kociembj-db') or die('Failed to access database');
 
     //This query grabs the top 10 scores, sorting by score and timestamp.
    $query = "SELECT * FROM maze ORDER by score DESC, ts ASC LIMIT 10";
    $result = mysql_query($query) or die('Query failed: ' . mysql_error());
 
    //We find our number of rows
    $result_length = mysql_num_rows($result); 
    
	//Table headers
	echo "<p class='p2'> Username \t Highscore </p><br>";
	
    //And now iterate through our results
    for($i = 0; $i < $result_length; $i++)
    {
         $row = mysql_fetch_array($result);
         echo "<p class='p1'>" . $row['username'] . "\t" . $row['score'] . "</p>"; // And output them
    }
    echo "<br>";
?>
