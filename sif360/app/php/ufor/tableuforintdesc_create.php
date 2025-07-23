
<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'sif360.tabeluforintdesc_create.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'sif360');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);


            $resultdb   = array();

            $query = "INSERT INTO ufor_int_desc (n_piano,n_ufor,n_desc,n_obiett,i_s_spp,i_s_dsc,i_s_int,i_s_tip,i_s_mod,i_s_str,i_s_cdim,i_s_ind)"
                    ."VALUES ($n_piano,$n_ufor,COALESCE((SELECT MAX(n_desc) + 1 FROM ufor_int_desc WHERE n_piano=$n_piano AND n_ufor=$n_ufor),1),$n_obiett,$i_s_spp,$i_s_dsc,$i_s_int,$i_s_tip,$i_s_mod,$i_s_str,$i_s_cdim,'$i_s_ind');";
            $handler->debug($query, 'sif360');

            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'sif360');
            array_push($result,$resultdb);
        }
    }



    echo json_encode($result);

?>
