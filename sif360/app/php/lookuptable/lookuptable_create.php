
<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'sif360.lookuptable_create.php');

    require("../db_con.php"); // #1
    
    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'sif360');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);

            
            $resultdb   = array();
            
            $query = "INSERT INTO lookuptable (n_piano,table_n,field_n,code_v,text_v)"
                    ."VALUES ($n_piano,'$table_n','$field_n',$code_v,'$text_v');";
            $handler->debug($query, 'sif360');
            
            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'sif360');
            array_push($result,$resultdb);
        }
    }



    echo json_encode($result);

?>