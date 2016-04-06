<?php
	$db = new PDO('mysql:host=localhost:3306;dbname=shertv_SPH-DBFinal;charset=utf8', 'root', 'root');
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	$projectID = ($_GET['id']);

	try {
		$query = $db->query( "SELECT * FROM `sp_projects`
													INNER JOIN `sp_projectURLs`
													ON (`sp_projects`.`projectID`=`sp_projectURLs`.`projectID`)
													INNER JOIN `sp_urls`
													ON (`sp_projectURLs`.`urlID`=`sp_urls`.`urlID`)
													WHERE `sp_projects`.`projectID` = $projectID");

		// selecting table sp_projects table, inner joining column projectID in tables sp_projects and sp_projectURLs
		// now joining table sp_urls to sp_projectURLs with column urlID
		$result = $query->fetchAll();
		echo json_encode( $result );
		//echo "<br>Done";
	} catch(PDOException $ex) {
		echo "An Error occured! <br>";
		echo $ex->getMessage();
	}
?>
