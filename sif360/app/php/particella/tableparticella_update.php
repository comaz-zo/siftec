<?php
    require("../db_con.php"); // #1

    session_start(); // #2

    $json = json_decode(file_get_contents('php://input'));
    //var_dump($json);

    $n_piano = (int)$json->n_piano;
    $n_part  = (int)$json->n_part;
    $n_compr  = (int)$json->n_compr;

    $resultdb   = array();


    $str = "UPDATE particella SET n_part=$n_part, n_compresa=$n_compresa where (n_part = $n_part AND n_piano = $n_piano )";


    $resultdb = $db->query($str);

    echo json_encode($resultdb);

?>
