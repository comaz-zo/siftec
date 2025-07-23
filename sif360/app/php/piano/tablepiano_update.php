
<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('init', 'sif360.tablepiano_update.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'tablepiano_update');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);

            $resultdb   = array();

            $query = "UPDATE piano SET"
            ." proprieta = '$proprieta', "
            ." nome = '$nome', "
            ." anno_in = $anno_in, "
            ." anno_val = $anno_val, "
            ." rit_priorita = $rit_priorita, "
            ." orig_epsg = '$orig_epsg', "
            ." dest_epsg = '$dest_epsg', "
            ." bound_l = $bound_l, "
            ." bound_b = $bound_b, "
            ." bound_r = $bound_r, "
            ." bound_t = $bound_t, "
            ." ofd_wms = '$ofd_wms', "
            ." ofd_layer = '$ofd_layer', "
            ." ofd_layer_attr = '$ofd_layer_attr', "
            ." wms_addr = '$wms_addr', "
            ." wms_chm_layer = '$wms_chm_layer', "
            ." wms_chm_layer_attr = '$wms_chm_layer_attr', "
            ." wms_volume_ha_layer = '$wms_volume_ha_layer', "
            ." wms_volume_ha_layer_attr = '$wms_volume_ha_layer_attr', "
            ." wms_peso_secco_ha_layer = '$wms_peso_secco_ha_layer', "
            ." wms_peso_secco_ha_layer_attr = '$wms_peso_secco_ha_layer_attr', "
            ." wfs_addr = '$wfs_addr', "
            ." sld_piano = '$sld_piano', "
            ." sld_ufor = '$sld_ufor', "
            ." sld_ufor_selected = '$sld_ufor_selected', "
            ." sld_particella = '$sld_particella', "
            ." sld_particella_selected = '$sld_particella_selected', "
            ." sld_priorita = '$sld_priorita', "
            ." sld_coltura = '$sld_coltura' "
            ." WHERE (n_piano = $n_piano );";

            $handler->debug($query, 'tablepiano_update');

            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'tablepiano_update');
            array_push($result,$resultdb);
        }
    }

    echo json_encode($result);


?>
