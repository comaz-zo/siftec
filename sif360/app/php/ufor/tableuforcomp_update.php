
<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'sif360.tableuforcomp_update.php');

    require("../db_con.php"); // #1
    
    session_start(); // #2

    

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'sif360');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);
            
            $resultdb   = array();
            
            $query = "UPDATE ufor_comp"
            ." SET cop_str1=$cop_str1, cop_str2=$cop_str2 "
            ." WHERE (n_piano = $n_piano AND n_ufor=$n_ufor AND id_specie=$id_specie);";
            $handler->debug($query, 'sif360');
            
            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'sif360');
            array_push($result,$resultdb);
        }
    }

    echo json_encode($result);
?>