<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('start', 'sif360.tableparticella_read.php');
    require("../db_con.php"); // #1

    session_start(); // #2

    $n_piano = $_POST['n_piano'];

    $sql = "SELECT n_part, n_piano, n_compresa FROM particella  WHERE n_piano = $n_piano"; // #9
    $handler->debug($sql, 'sif360.tabelufor_read.php');
    $result = array(); // #10

    if ($resultdb = $db->query($sql)) { // #11

        while($record = $resultdb->fetch()){
            $result[]= $record;
        }

    } else {
        die("Error executing the query");
    }

    echo json_encode($result);
    $handler->debug($result, 'sif360.tableparticella_read.php');

?>
