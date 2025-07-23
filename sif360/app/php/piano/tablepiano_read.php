<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('start', 'sif360.tablepiano_read.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $i_utente = $_POST['i_utente'];

    $sql = "SELECT piano.* FROM sif360.piano INNER JOIN sif360.utente_piano ON piano.n_piano = utente_piano.n_piano WHERE i_utente = '$i_utente'"; // #9
    $result = array(); // #10

    if ($resultdb = $db->query($sql)) { // #11

        while($piano = $resultdb->fetch()){
            $result[]= $piano;
        }

    } else {
        die("Error executing the query login");
    }

    echo json_encode($result); // #21

    $handler->debug($result, 'sif360.selectpiano.php');
?>
