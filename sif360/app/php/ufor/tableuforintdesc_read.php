<?php
    require("../db_con.php"); // #1

    session_start(); // #2

    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'sif360.tabeluforintdesc_read.php');

    $n_piano = $_POST['n_piano'];
    $n_ufor = $_POST['n_ufor'];
    
    $sql = "SELECT *
            FROM ufor_int_desc
            WHERE n_piano = $n_piano AND n_ufor = $n_ufor"; // #9

    $handler->debug($sql, 'sif360');

    $result = array(); // #10

    if ($resultdb = $db->query($sql)) { // #11

        while($record = $resultdb->fetch()){
            $result[]= $record;
        }

    } else {
        die("Error executing the query");
    }

    $handler->debug($result, 'sif360');

    echo json_encode($result);

    

?>