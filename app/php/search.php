<?php
	$db = new PDO('mysql:host=localhost:3306;dbname=shertv_SPH-DBFinal;charset=utf8', 'root', 'root');
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	$query = ($_GET['query']);

	try {
		$query = $db->query( "SELECT * FROM `sp_projects` WHERE `projectName` LIKE '%$query%' LIMIT 24");
		$result = $query->fetchAll();
		echo json_encode( $result );
		//echo "<br>Done";
	} catch(PDOException $ex) {
		echo "An Error occured! <br>";
		echo $ex->getMessage();
	}
?>
