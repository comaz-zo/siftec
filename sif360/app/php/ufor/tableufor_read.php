<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('start', 'sif360.tableufor_read.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $n_piano = $_POST['n_piano'];
    $n_ufor = $_POST['n_ufor'];

    $sql = "SELECT ufor.*, (piano.anno_val-piano.anno_in) as piano_durata, piano.rit_priorita as piano_rit_priorita FROM ufor join piano on ufor.n_piano = piano.n_piano WHERE piano.n_piano = $n_piano AND ufor.n_ufor = $n_ufor";    // #9
    $handler->debug($sql, 'sif360');
    $result = array(); // #10



    if ($resultdb = $db->query($sql)) { // #11

        while($record = $resultdb->fetch()){
            $result[]= $record;
        }

    } else {
        die("Error executing the query");
    }

    echo json_encode($result);

    $handler->debug($result, 'sif360');

?>
