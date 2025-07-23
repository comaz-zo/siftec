
<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('table ufor update init', 'sif360.tabelufor_update.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $json_arr = json_decode(file_get_contents('php://input'),true);

    $handler->debug($json_arr, 'sif360');

    $result = array();

    if (! empty($json_arr)) {
        foreach ($json_arr as $elem) {
            extract($elem);

            $resultdb   = array();

            $query = "UPDATE ufor"
                    ." SET n_ufor=$n_ufor,"
                        ." n_strato='$n_strato',"
                        ." uso_for=$uso_for,"
                        ." con_est1=$con_est1,"
                        ." con_est2=$con_est2,"
                        ." con_est3=$con_est3,"
                        ." con_est4=$con_est4,"
                        ." t_for=$t_for,"
                        ." gov=$gov,"
                        ." str_ver=$str_ver,"
                        ." dis_or=$dis_or,"
                        ." fert=$fert,"
                        ." str2=$str2,"
                        ." h_sep_s=$h_sep_s,"
                        ." pia_str2=$pia_str2,"
                        ." statura=$statura,"
                        ." h_dom=$h_dom,"
                        ." cop_str1=$cop_str1,"
                        ." cop_str2=$cop_str2,"
                        ." pres_rin=$pres_rin,"
                        ." rin_s1s=$rin_s1s,"
                        ." rin_s1p=$rin_s1p,"
                        ." rin_s2s=$rin_s2s,"
                        ." rin_s2p=$rin_s2p,"
                        ." rin_s3s=$rin_s3s,"
                        ." rin_s3p=$rin_s3p,"
                        ." rin_s4s=$rin_s4s,"
                        ." rin_s4p=$rin_s4p,"
                        ." rin_s5s=$rin_s5s,"
                        ." rin_s5p=$rin_s5p,"
                        ." cron_mbs=$cron_mbs,"
                        ." cron_bi=$cron_bi,"
                        ." cron_ced=$cron_ced,"
                        ." n_matr=$n_matr,"
                        ." n_poll=$n_poll,"
                        ." n_cepp=$n_cepp,"
                        ." cat_dim=$cat_dim,"
                        ." f_prod=$f_prod,"
                        ." accessibil=$accessibil,"
                        ." spec_uso=$spec_uso,"
                        ." area_ha=$area_ha,"
                        ." g_ha=$g_ha,"
                        ." h_mean=$h_mean,"
                        ." v_ha=$v_ha,"
                        ." v_tot=$v_tot,"
                        ." ps_ha=$ps_ha,"
                        ." ps_tot=$ps_tot,"
                        ." i_perc=$i_perc,"
                        ." note='$note',"

                        ." priorita=$priorita,"
                        ." legme_pv=$legme_pv,"
                        ." util_ps=$util_ps,"
                        ." is_s0=$is_s0,"
                        ." is_s1=$is_s1,"
                        ." is_s2=$is_s2,"
                        ." is_s3=$is_s3,"
                        ." is_s4=$is_s4,"
                        ." is_s5=$is_s5,"
                        ." is_s6=$is_s6,"
                        ." is_s7=$is_s7,"
                        ." is_s8=$is_s8,"
                        ." is_s9=$is_s9,"
                        ." auv_pis0=$auv_pis0,"
                        ." auv_pis1=$auv_pis1,"
                        ." auv_pis2=$auv_pis2,"
                        ." auv_pis3=$auv_pis3,"
                        ." auv_pis4=$auv_pis4,"
                        ." auv_pis5=$auv_pis5,"
                        ." auv_pis6=$auv_pis6,"
                        ." auv_pis7=$auv_pis7,"
                        ." auv_pis8=$auv_pis8,"
                        ." auv_pis9=$auv_pis9,"
                        ." auv_ps0=$auv_ps0,"
                        ." auv_ps1=$auv_ps1,"
                        ." auv_ps2=$auv_ps2,"
                        ." auv_ps3=$auv_ps3,"
                        ." auv_ps4=$auv_ps4,"
                        ." auv_ps5=$auv_ps5,"
                        ." auv_ps6=$auv_ps6,"
                        ." auv_ps7=$auv_ps7,"
                        ." auv_ps8=$auv_ps8,"
                        ." auv_ps9=$auv_ps9,"
                        ." auv_ms0=$auv_ms0,"
                        ." auv_ms1=$auv_ms1,"
                        ." auv_ms2=$auv_ms2,"
                        ." auv_ms3=$auv_ms3,"
                        ." auv_ms4=$auv_ms4,"
                        ." auv_ms5=$auv_ms5,"
                        ." auv_ms6=$auv_ms6,"
                        ." auv_ms7=$auv_ms7,"
                        ." auv_ms8=$auv_ms8,"
                        ." auv_ms9=$auv_ms9,"
                        ." auv_gs0=$auv_gs0,"
                        ." auv_gs1=$auv_gs1,"
                        ." auv_gs2=$auv_gs2,"
                        ." auv_gs3=$auv_gs3,"
                        ." auv_gs4=$auv_gs4,"
                        ." auv_gs5=$auv_gs5,"
                        ." auv_gs6=$auv_gs6,"
                        ." auv_gs7=$auv_gs7,"
                        ." auv_gs8=$auv_gs8,"
                        ." auv_gs9=$auv_gs9,"
                        ." auv_sgs0=$auv_sgs0,"
                        ." auv_sgs1=$auv_sgs1,"
                        ." auv_sgs2=$auv_sgs2,"
                        ." auv_sgs3=$auv_sgs3,"
                        ." auv_sgs4=$auv_sgs4,"
                        ." auv_sgs5=$auv_sgs5,"
                        ." auv_sgs6=$auv_sgs6,"
                        ." auv_sgs7=$auv_sgs7,"
                        ." auv_sgs8=$auv_sgs8,"
                        ." auv_sgs9=$auv_sgs9,"
                        ." dp_pis0=$dp_pis0,"
                        ." dp_pis1=$dp_pis1,"
                        ." dp_pis2=$dp_pis2,"
                        ." dp_pis3=$dp_pis3,"
                        ." dp_pis4=$dp_pis4,"
                        ." dp_pis5=$dp_pis5,"
                        ." dp_pis6=$dp_pis6,"
                        ." dp_pis7=$dp_pis7,"
                        ." dp_pis8=$dp_pis8,"
                        ." dp_pis9=$dp_pis9,"
                        ." dp_ps0=$dp_ps0,"
                        ." dp_ps1=$dp_ps1,"
                        ." dp_ps2=$dp_ps2,"
                        ." dp_ps3=$dp_ps3,"
                        ." dp_ps4=$dp_ps4,"
                        ." dp_ps5=$dp_ps5,"
                        ." dp_ps6=$dp_ps6,"
                        ." dp_ps7=$dp_ps7,"
                        ." dp_ps8=$dp_ps8,"
                        ." dp_ps9=$dp_ps9,"
                        ." dp_ms0=$dp_ms0,"
                        ." dp_ms1=$dp_ms1,"
                        ." dp_ms2=$dp_ms2,"
                        ." dp_ms3=$dp_ms3,"
                        ." dp_ms4=$dp_ms4,"
                        ." dp_ms5=$dp_ms5,"
                        ." dp_ms6=$dp_ms6,"
                        ." dp_ms7=$dp_ms7,"
                        ." dp_ms8=$dp_ms8,"
                        ." dp_ms9=$dp_ms9,"
                        ." dp_gs0=$dp_gs0,"
                        ." dp_gs1=$dp_gs1,"
                        ." dp_gs2=$dp_gs2,"
                        ." dp_gs3=$dp_gs3,"
                        ." dp_gs4=$dp_gs4,"
                        ." dp_gs5=$dp_gs5,"
                        ." dp_gs6=$dp_gs6,"
                        ." dp_gs7=$dp_gs7,"
                        ." dp_gs8=$dp_gs8,"
                        ." dp_gs9=$dp_gs9,"
                        ." dp_sgs0=$dp_sgs0,"
                        ." dp_sgs1=$dp_sgs1,"
                        ." dp_sgs2=$dp_sgs2,"
                        ." dp_sgs3=$dp_sgs3,"
                        ." dp_sgs4=$dp_sgs4,"
                        ." dp_sgs5=$dp_sgs5,"
                        ." dp_sgs6=$dp_sgs6,"
                        ." dp_sgs7=$dp_sgs7,"
                        ." dp_sgs8=$dp_sgs8,"
                        ." dp_sgs9=$dp_sgs9,"
                        ." n_coltura=$n_coltura"
                    ." WHERE (n_ufor = $n_ufor AND n_piano = $n_piano );";


            $handler->debug($query, 'sif360');

            $resultdb = $db->query($query);
            $handler->debug($resultdb, 'sif360');
            array_push($result,$resultdb);
        }
    }

    echo json_encode($result);

    /*$n_piano = (int)$json->n_piano;
    $n_ufor  = (int)$json->n_ufor;
    $n_strato  = (int)$json->n_strato;
    $uso_for  = (int)$json->uso_for;
    $con_est1 = (int)$json->con_est1;
    $con_est2 = (int)$json->con_est2;
    $con_est3 = (int)$json->con_est3;
    $con_est4 = (int)$json->con_est4;
    $t_for = (int)$json->t_for;
    $gov = (int)$json->gov;
    $str_ver = (int)$json->str_ver;
    $dis_or = (int)$json->dis_or;
    $fert = (int)$json->fert;
    $str2 = (int)$json->str2;
    $h_sep_s = (int)$json->h_sep_s;
    $pia_str2 = (int)$json->pia_str2;
    $statura = (int)$json->statura;
    $h_dom = (int)$json->h_dom;
    $cop_str1 = (int)$json->cop_str1;
    $cop_str2 = (int)$json->cop_str2;
    $pres_rin = (int)$json->pres_rin;
    $rin_s1s = (int)$json->rin_s1s;
    $rin_s1p = (int)$json->rin_s1p;
    $rin_s2s = (int)$json->rin_s2s;
    $rin_s2p = (int)$json->rin_s2p;
    $rin_s3s = (int)$json->rin_s3s;
    $rin_s3p = (int)$json->rin_s3p;
    $rin_s4s = (int)$json->rin_s4s;
    $rin_s4p = (int)$json->rin_s4p;
    $rin_s5s = (int)$json->rin_s5s;
    $rin_s5p = (int)$json->rin_s5p;
    $cron_mbs = (int)$json->cron_mbs;
    $cron_bi = (int)$json->cron_bi;
    $cron_ced = (int)$json->cron_ced;
    $n_matr = (int)$json->n_matr;
    $n_poll = (int)$json->n_poll;
    $n_cepp = (int)$json->n_cepp;
    $cat_dim = (int)$json->cat_dim;
    $f_prod = (int)$json->f_prod;
    $accessibil = (int)$json->accessibil;
    $spec_uso = (int)$json->spec_uso;
    $area_ha = (float)$json->area_ha;
    $g_ha = (float)$json->g_ha;
    $h_mean = (float)$json->h_mean;
    $v_ha = (float)$json->v_ha;
    $v_tot = (float)$json->v_tot;
    $ps_ha = (float)$json->ps_ha;
    $ps_tot = (float)$json->ps_tot;
    $i_perc = (float)$json->i_perc;
    $note = (string)$json->note;*/


    /*$resultdb   = array();



    //$handler->debug($str, 'tableufor_update.query');

    $resultdb = $db->query($str);

    $handler->debug($resultdb, 'sif360.tabelufor_update.php');

    echo json_encode($resultdb);*/

?>
