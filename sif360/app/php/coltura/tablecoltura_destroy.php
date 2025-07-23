
<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'sif360.tablecoltura_destroy.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'sif360');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);


            $resultdb   = array();

            $query = "DELETE FROM coltura"
                    ." WHERE (n_coltura = $n_coltura AND n_piano = $n_piano);";
            $handler->debug($query, 'tabeluforintdesc_delete.query');

            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'sif360');
            array_push($result,$resultdb);
        }
    }



    echo json_encode($result);

?>
