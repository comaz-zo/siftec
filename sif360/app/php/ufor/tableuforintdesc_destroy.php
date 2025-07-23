
<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'sif360.tabeluforintdesc_delete.php');

    require("../db_con.php"); // #1
    
    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'sif360');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);

            
            $resultdb   = array();
            
            $query = "DELETE FROM ufor_int_desc"
                    ." WHERE (n_ufor = $n_ufor AND n_piano = $n_piano  AND n_desc = $n_desc );";
            $handler->debug($query, 'tabeluforintdesc_delete.query');
            
            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'sif360');
            array_push($result,$resultdb);
        }
    }



    echo json_encode($result);

?>