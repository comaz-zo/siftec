<?php

    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'sif360.lookuptable_read.php');

        require("../db_con.php"); // #1


    session_start(); // #2

    $n_piano = $_POST['n_piano'];

    
    $sql = "SELECT * FROM lookuptable WHERE n_piano = $n_piano 
            ORDER BY table_n, field_n, code_v" ; // #9 
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