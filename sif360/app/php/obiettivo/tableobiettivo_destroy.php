
<?php
    require("../db_con.php"); // #1
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();

    session_start(); // #2

    

    $json = json_decode(file_get_contents('php://input'));


    $n_piano = (int)$json->n_piano;
    $n_obiett  = (int)$json->n_obiett;
    $tipo  = (int)$json->tipo;
    $sub_tipo = (int)$json->sub_tipo;
    $titolo = (string)$json->titolo;
    $descr = (string)$json->descr;

    $resultdb   = array();

    
    $str = "DELETE FROM obiettivo"
            ." WHERE (n_piano = $n_piano AND n_obiett = $n_obiett );";

    $handler->debug($str, 'tableufor_update.query');

    $resultdb = $db->query($str);

    $handler->debug($resultdb, 'tableufor_update.query');

    echo json_encode($resultdb);

?>