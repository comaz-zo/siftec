<?php
    require("../db_con.php"); // #1

    session_start(); // #2


    $n_piano = $_POST['n_piano'];
    
    $sql = "SELECT * FROM obiettivo  WHERE n_piano = $n_piano "; // #9
    $result = array(); // #10

    if ($resultdb = $db->query($sql)) { // #11

        while($record = $resultdb->fetch()){
            $result[]= $record;
        }

    } else {
        die("Error executing the query");
    }


    echo json_encode($result);

?>