
<?php
    require("../db_con.php"); // #1
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();

    session_start(); // #2



    $json = json_decode(file_get_contents('php://input'));


    $n_piano = (int)$json->n_piano;
    $tipo  = (int)$json->tipo;
    $sub_tipo = (int)$json->sub_tipo;
    $titolo = (string)$json->titolo;
    $descr = (string)$json->descr;

    $resultdb   = array();


    $str = "INSERT INTO obiettivo"
                ."(n_piano,"
                ." n_obiett, "
                ." tipo,"
                ." sub_tipo,"
                ." titolo,"
                ." descr)"
            ." VALUES"
                ."($n_piano,"
                ." COALESCE((SELECT MAX(n_obiett) + 1 FROM obiettivo WHERE n_piano=$n_piano),0),"
                ." $tipo,"
                ." $sub_tipo,"
                ." '$titolo',"
                ." '$descr');";

    $handler->debug($str, 'tableufor_insert.query');

    $resultdb = $db->query($str);

    $handler->debug($resultdb, 'tableufor_insert.query');

    echo json_encode($resultdb);

?>
