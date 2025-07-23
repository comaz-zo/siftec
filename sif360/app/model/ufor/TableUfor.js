Ext.define('SIF360.model.ufor.TableUfor', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'n_piano', type : 'int'},
        {name :'n_ufor', type : 'int'},
        {name :'n_strato', type : 'string'},
        {name :'uso_for', type: 'int'},
        {name :'con_est1', type: 'int'},
        {name :'con_est2', type: 'int'},
        {name :'con_est3', type: 'int'},
        {name :'con_est4', type: 'int'},
        {name :'t_for', type: 'int'},
        {name :'gov', type: 'int'},
        {name :'str_ver', type: 'int'},
        {name :'dis_or', type: 'int'},
        {name :'fert', type: 'int'},
        {name :'str2', type: 'int'},
        {name :'h_sep_s', type: 'int'},
        {name :'pia_str2', type: 'int'},
        {name :'statura', type: 'int'},
        {name :'h_dom', type: 'int'},
        {name :'cop_str1', type: 'int'},
        {name :'cop_str2', type: 'int'},
        {name :'pres_rin', type: 'int'},
        {name :'rin_s1s', type: 'int'},
        {name :'rin_s1p', type: 'int'},
        {name :'rin_s2s', type: 'int'},
        {name :'rin_s2p', type: 'int'},
        {name :'rin_s3s', type: 'int'},
        {name :'rin_s3p', type: 'int'},
        {name :'rin_s4s', type: 'int'},
        {name :'rin_s4p', type: 'int'},
        {name :'rin_s5s', type: 'int'},
        {name :'rin_s5p', type: 'int'},
        {name :'cron_mbs', type: 'int'},
        {name :'cron_bi', type: 'int'},
        {name :'cron_ced', type: 'int'},
        {name :'n_matr', type: 'int'},
        {name :'n_poll', type: 'int'},
        {name :'n_cepp', type: 'int'},
        {name :'cat_dim', type: 'int'},
        {name :'f_prod', type: 'int'},
        {name :'accessibil', type: 'int'},
        {name :'spec_uso', type: 'int'},
        {name :'area_ha', type: 'float'},
        {name :'g_ha', type: 'float'},
        {name :'h_mean', type: 'float'},
        {name :'v_ha', type: 'float'},
        {name :'v_tot', type: 'float'},
        {name :'ps_ha', type: 'float'},
        {name :'ps_tot', type: 'float'},
        {name :'i_perc', type: 'float'},
        {name :'note', type: 'string'},
        {name :'piano_durata' , type :'int', persist:false},
        {name :'piano_rit_priorita' , type :'int', persist:false},
        {name :'priorita' , type :'float'},
        {name :'legme_pv' , type :'float'},
        {name :'legme_vha' , type :'float', persist:false},
        {name :'legna_pha' , type :'float', persist:false},
        {name :'legme_v' , type :'float', persist:false},
        {name :'legna_p' , type :'float', persist:false},
        {name :'util_ps' , type :'float'},
        {name :'util_sup' , type :'float', persist:false},
        {name :'util_int' , type :'float', persist:false},
        {name :'u_legme_v' , type :'float', persist:false},
        {name :'u_legna_p' , type :'float', persist:false},
        {name :'util_n' , type :'float', persist:false},
        {name :'int_gest' , type :'float', persist:false},
        {name :'is_s0' , type :'int'},
        {name :'is_s1' , type :'int'},
        {name :'is_s2' , type :'int'},
        {name :'is_s3' , type :'int'},
        {name :'is_s4' , type :'int'},
        {name :'is_s5' , type :'int'},
        {name :'is_s6' , type :'int'},
        {name :'is_s7' , type :'int'},
        {name :'is_s8' , type :'int'},
        {name :'is_s9' , type :'int'},
        {name :'auv_pis0' , type :'float'},
        {name :'auv_pis1' , type :'float'},
        {name :'auv_pis2' , type :'float'},
        {name :'auv_pis3' , type :'float'},
        {name :'auv_pis4' , type :'float'},
        {name :'auv_pis5' , type :'float'},
        {name :'auv_pis6' , type :'float'},
        {name :'auv_pis7' , type :'float'},
        {name :'auv_pis8' , type :'float'},
        {name :'auv_pis9' , type :'float'},
        {name :'auv_ps0' , type :'float'},
        {name :'auv_ps1' , type :'float'},
        {name :'auv_ps2' , type :'float'},
        {name :'auv_ps3' , type :'float'},
        {name :'auv_ps4' , type :'float'},
        {name :'auv_ps5' , type :'float'},
        {name :'auv_ps6' , type :'float'},
        {name :'auv_ps7' , type :'float'},
        {name :'auv_ps8' , type :'float'},
        {name :'auv_ps9' , type :'float'},
        {name :'auv_ms0' , type :'float'},
        {name :'auv_ms1' , type :'float'},
        {name :'auv_ms2' , type :'float'},
        {name :'auv_ms3' , type :'float'},
        {name :'auv_ms4' , type :'float'},
        {name :'auv_ms5' , type :'float'},
        {name :'auv_ms6' , type :'float'},
        {name :'auv_ms7' , type :'float'},
        {name :'auv_ms8' , type :'float'},
        {name :'auv_ms9' , type :'float'},
        {name :'auv_gs0' , type :'float'},
        {name :'auv_gs1' , type :'float'},
        {name :'auv_gs2' , type :'float'},
        {name :'auv_gs3' , type :'float'},
        {name :'auv_gs4' , type :'float'},
        {name :'auv_gs5' , type :'float'},
        {name :'auv_gs6' , type :'float'},
        {name :'auv_gs7' , type :'float'},
        {name :'auv_gs8' , type :'float'},
        {name :'auv_gs9' , type :'float'},
        {name :'auv_sgs0' , type :'float'},
        {name :'auv_sgs1' , type :'float'},
        {name :'auv_sgs2' , type :'float'},
        {name :'auv_sgs3' , type :'float'},
        {name :'auv_sgs4' , type :'float'},
        {name :'auv_sgs5' , type :'float'},
        {name :'auv_sgs6' , type :'float'},
        {name :'auv_sgs7' , type :'float'},
        {name :'auv_sgs8' , type :'float'},
        {name :'auv_sgs9' , type :'float'},
        {name :'dp_pis0' , type :'float'},
        {name :'dp_pis1' , type :'float'},
        {name :'dp_pis2' , type :'float'},
        {name :'dp_pis3' , type :'float'},
        {name :'dp_pis4' , type :'float'},
        {name :'dp_pis5' , type :'float'},
        {name :'dp_pis6' , type :'float'},
        {name :'dp_pis7' , type :'float'},
        {name :'dp_pis8' , type :'float'},
        {name :'dp_pis9' , type :'float'},
        {name :'dp_ps0' , type :'float'},
        {name :'dp_ps1' , type :'float'},
        {name :'dp_ps2' , type :'float'},
        {name :'dp_ps3' , type :'float'},
        {name :'dp_ps4' , type :'float'},
        {name :'dp_ps5' , type :'float'},
        {name :'dp_ps6' , type :'float'},
        {name :'dp_ps7' , type :'float'},
        {name :'dp_ps8' , type :'float'},
        {name :'dp_ps9' , type :'float'},
        {name :'dp_ms0' , type :'float'},
        {name :'dp_ms1' , type :'float'},
        {name :'dp_ms2' , type :'float'},
        {name :'dp_ms3' , type :'float'},
        {name :'dp_ms4' , type :'float'},
        {name :'dp_ms5' , type :'float'},
        {name :'dp_ms6' , type :'float'},
        {name :'dp_ms7' , type :'float'},
        {name :'dp_ms8' , type :'float'},
        {name :'dp_ms9' , type :'float'},
        {name :'dp_gs0' , type :'float'},
        {name :'dp_gs1' , type :'float'},
        {name :'dp_gs2' , type :'float'},
        {name :'dp_gs3' , type :'float'},
        {name :'dp_gs4' , type :'float'},
        {name :'dp_gs5' , type :'float'},
        {name :'dp_gs6' , type :'float'},
        {name :'dp_gs7' , type :'float'},
        {name :'dp_gs8' , type :'float'},
        {name :'dp_gs9' , type :'float'},
        {name :'dp_sgs0' , type :'float'},
        {name :'dp_sgs1' , type :'float'},
        {name :'dp_sgs2' , type :'float'},
        {name :'dp_sgs3' , type :'float'},
        {name :'dp_sgs4' , type :'float'},
        {name :'dp_sgs5' , type :'float'},
        {name :'dp_sgs6' , type :'float'},
        {name :'dp_sgs7' , type :'float'},
        {name :'dp_sgs8' , type :'float'},
        {name :'dp_sgs9' , type :'float'},
        {name :'n_coltura' , type :'int'},
        {name :'auv_tot_pi', type :'float', persist:false},
        {name :'auv_tot_p', type :'float', persist:false},
        {name :'auv_tot_m', type :'float', persist:false},
        {name :'auv_tot_g', type :'float', persist:false},
        {name :'auv_tot_sg', type :'float', persist:false},
        {name :'auv_tot_s0', type :'float', persist:false},
        {name :'auv_tot_s1', type :'float', persist:false},
        {name :'auv_tot_s2', type :'float', persist:false},
        {name :'auv_tot_s3', type :'float', persist:false},
        {name :'auv_tot_s4', type :'float', persist:false},
        {name :'auv_tot_s5', type :'float', persist:false},
        {name :'auv_tot_s6', type :'float', persist:false},
        {name :'auv_tot_s7', type :'float', persist:false},
        {name :'auv_tot_s8', type :'float', persist:false},
        {name :'auv_tot_s9', type :'float', persist:false},
        {name :'auv_tot', type :'float', persist:false},
        {name :'p_pis0' , type :'float', persist:false},
        {name :'p_pis1' , type :'float', persist:false},
        {name :'p_pis2' , type :'float', persist:false},
        {name :'p_pis3' , type :'float', persist:false},
        {name :'p_pis4' , type :'float', persist:false},
        {name :'p_pis5' , type :'float', persist:false},
        {name :'p_pis6' , type :'float', persist:false},
        {name :'p_pis7' , type :'float', persist:false},
        {name :'p_pis8' , type :'float', persist:false},
        {name :'p_pis9' , type :'float', persist:false},
        {name :'p_ps0' , type :'float', persist:false},
        {name :'p_ps1' , type :'float', persist:false},
        {name :'p_ps2' , type :'float', persist:false},
        {name :'p_ps3' , type :'float', persist:false},
        {name :'p_ps4' , type :'float', persist:false},
        {name :'p_ps5' , type :'float', persist:false},
        {name :'p_ps6' , type :'float', persist:false},
        {name :'p_ps7' , type :'float', persist:false},
        {name :'p_ps8' , type :'float', persist:false},
        {name :'p_ps9' , type :'float', persist:false},
        {name :'p_ms0' , type :'float', persist:false},
        {name :'p_ms1' , type :'float', persist:false},
        {name :'p_ms2' , type :'float', persist:false},
        {name :'p_ms3' , type :'float', persist:false},
        {name :'p_ms4' , type :'float', persist:false},
        {name :'p_ms5' , type :'float', persist:false},
        {name :'p_ms6' , type :'float', persist:false},
        {name :'p_ms7' , type :'float', persist:false},
        {name :'p_ms8' , type :'float', persist:false},
        {name :'p_ms9' , type :'float', persist:false},
        {name :'p_gs0' , type :'float', persist:false},
        {name :'p_gs1' , type :'float', persist:false},
        {name :'p_gs2' , type :'float', persist:false},
        {name :'p_gs3' , type :'float', persist:false},
        {name :'p_gs4' , type :'float', persist:false},
        {name :'p_gs5' , type :'float', persist:false},
        {name :'p_gs6' , type :'float', persist:false},
        {name :'p_gs7' , type :'float', persist:false},
        {name :'p_gs8' , type :'float', persist:false},
        {name :'p_gs9' , type :'float', persist:false},
        {name :'p_sgs0' , type :'float', persist:false},
        {name :'p_sgs1' , type :'float', persist:false},
        {name :'p_sgs2' , type :'float', persist:false},
        {name :'p_sgs3' , type :'float', persist:false},
        {name :'p_sgs4' , type :'float', persist:false},
        {name :'p_sgs5' , type :'float', persist:false},
        {name :'p_sgs6' , type :'float', persist:false},
        {name :'p_sgs7' , type :'float', persist:false},
        {name :'p_sgs8' , type :'float', persist:false},
        {name :'p_sgs9' , type :'float', persist:false},
        {name :'p_tot_pi', type :'float', persist:false},
        {name :'p_tot_p', type :'float', persist:false},
        {name :'p_tot_m', type :'float', persist:false},
        {name :'p_tot_g', type :'float', persist:false},
        {name :'p_tot_sg', type :'float', persist:false},
        {name :'p_tot_s0', type :'float', persist:false},
        {name :'p_tot_s1', type :'float', persist:false},
        {name :'p_tot_s2', type :'float', persist:false},
        {name :'p_tot_s3', type :'float', persist:false},
        {name :'p_tot_s4', type :'float', persist:false},
        {name :'p_tot_s5', type :'float', persist:false},
        {name :'p_tot_s6', type :'float', persist:false},
        {name :'p_tot_s7', type :'float', persist:false},
        {name :'p_tot_s8', type :'float', persist:false},
        {name :'p_tot_s9', type :'float', persist:false},
        {name :'p_tot', type :'float', persist:false},
        {name :'dp_tot_pi', type :'float', persist:false},
        {name :'dp_tot_p', type :'float', persist:false},
        {name :'dp_tot_m', type :'float', persist:false},
        {name :'dp_tot_g', type :'float', persist:false},
        {name :'dp_tot_sg', type :'float', persist:false},
        {name :'dp_tot_s0', type :'float', persist:false},
        {name :'dp_tot_s1', type :'float', persist:false},
        {name :'dp_tot_s2', type :'float', persist:false},
        {name :'dp_tot_s3', type :'float', persist:false},
        {name :'dp_tot_s4', type :'float', persist:false},
        {name :'dp_tot_s5', type :'float', persist:false},
        {name :'dp_tot_s6', type :'float', persist:false},
        {name :'dp_tot_s7', type :'float', persist:false},
        {name :'dp_tot_s8', type :'float', persist:false},
        {name :'dp_tot_s9', type :'float', persist:false},
        {name :'dp_tot', type :'float', persist:false},
        {name :'vp_pis0' , type :'float', persist:false},
        {name :'vp_pis1' , type :'float', persist:false},
        {name :'vp_pis2' , type :'float', persist:false},
        {name :'vp_pis3' , type :'float', persist:false},
        {name :'vp_pis4' , type :'float', persist:false},
        {name :'vp_pis5' , type :'float', persist:false},
        {name :'vp_pis6' , type :'float', persist:false},
        {name :'vp_pis7' , type :'float', persist:false},
        {name :'vp_pis8' , type :'float', persist:false},
        {name :'vp_pis9' , type :'float', persist:false},
        {name :'vp_ps0' , type :'float', persist:false},
        {name :'vp_ps1' , type :'float', persist:false},
        {name :'vp_ps2' , type :'float', persist:false},
        {name :'vp_ps3' , type :'float', persist:false},
        {name :'vp_ps4' , type :'float', persist:false},
        {name :'vp_ps5' , type :'float', persist:false},
        {name :'vp_ps6' , type :'float', persist:false},
        {name :'vp_ps7' , type :'float', persist:false},
        {name :'vp_ps8' , type :'float', persist:false},
        {name :'vp_ps9' , type :'float', persist:false},
        {name :'vp_ms0' , type :'float', persist:false},
        {name :'vp_ms1' , type :'float', persist:false},
        {name :'vp_ms2' , type :'float', persist:false},
        {name :'vp_ms3' , type :'float', persist:false},
        {name :'vp_ms4' , type :'float', persist:false},
        {name :'vp_ms5' , type :'float', persist:false},
        {name :'vp_ms6' , type :'float', persist:false},
        {name :'vp_ms7' , type :'float', persist:false},
        {name :'vp_ms8' , type :'float', persist:false},
        {name :'vp_ms9' , type :'float', persist:false},
        {name :'vp_gs0' , type :'float', persist:false},
        {name :'vp_gs1' , type :'float', persist:false},
        {name :'vp_gs2' , type :'float', persist:false},
        {name :'vp_gs3' , type :'float', persist:false},
        {name :'vp_gs4' , type :'float', persist:false},
        {name :'vp_gs5' , type :'float', persist:false},
        {name :'vp_gs6' , type :'float', persist:false},
        {name :'vp_gs7' , type :'float', persist:false},
        {name :'vp_gs8' , type :'float', persist:false},
        {name :'vp_gs9' , type :'float', persist:false},
        {name :'vp_sgs0' , type :'float', persist:false},
        {name :'vp_sgs1' , type :'float', persist:false},
        {name :'vp_sgs2' , type :'float', persist:false},
        {name :'vp_sgs3' , type :'float', persist:false},
        {name :'vp_sgs4' , type :'float', persist:false},
        {name :'vp_sgs5' , type :'float', persist:false},
        {name :'vp_sgs6' , type :'float', persist:false},
        {name :'vp_sgs7' , type :'float', persist:false},
        {name :'vp_sgs8' , type :'float', persist:false},
        {name :'vp_sgs9' , type :'float', persist:false},
        {name :'vp_tot_pi', type :'float', persist:false},
        {name :'vp_tot_p', type :'float', persist:false},
        {name :'vp_tot_m', type :'float', persist:false},
        {name :'vp_tot_g', type :'float', persist:false},
        {name :'vp_tot_sg', type :'float', persist:false},
        {name :'vp_tot_s0', type :'float', persist:false},
        {name :'vp_tot_s1', type :'float', persist:false},
        {name :'vp_tot_s2', type :'float', persist:false},
        {name :'vp_tot_s3', type :'float', persist:false},
        {name :'vp_tot_s4', type :'float', persist:false},
        {name :'vp_tot_s5', type :'float', persist:false},
        {name :'vp_tot_s6', type :'float', persist:false},
        {name :'vp_tot_s7', type :'float', persist:false},
        {name :'vp_tot_s8', type :'float', persist:false},
        {name :'vp_tot_s9', type :'float', persist:false},
        {name :'vp_tot', type :'float', persist:false},
        {name :'pp_pis0' , type :'float', persist:false},
        {name :'pp_pis1' , type :'float', persist:false},
        {name :'pp_pis2' , type :'float', persist:false},
        {name :'pp_pis3' , type :'float', persist:false},
        {name :'pp_pis4' , type :'float', persist:false},
        {name :'pp_pis5' , type :'float', persist:false},
        {name :'pp_pis6' , type :'float', persist:false},
        {name :'pp_pis7' , type :'float', persist:false},
        {name :'pp_pis8' , type :'float', persist:false},
        {name :'pp_pis9' , type :'float', persist:false},
        {name :'pp_ps0' , type :'float', persist:false},
        {name :'pp_ps1' , type :'float', persist:false},
        {name :'pp_ps2' , type :'float', persist:false},
        {name :'pp_ps3' , type :'float', persist:false},
        {name :'pp_ps4' , type :'float', persist:false},
        {name :'pp_ps5' , type :'float', persist:false},
        {name :'pp_ps6' , type :'float', persist:false},
        {name :'pp_ps7' , type :'float', persist:false},
        {name :'pp_ps8' , type :'float', persist:false},
        {name :'pp_ps9' , type :'float', persist:false},
        {name :'pp_ms0' , type :'float', persist:false},
        {name :'pp_ms1' , type :'float', persist:false},
        {name :'pp_ms2' , type :'float', persist:false},
        {name :'pp_ms3' , type :'float', persist:false},
        {name :'pp_ms4' , type :'float', persist:false},
        {name :'pp_ms5' , type :'float', persist:false},
        {name :'pp_ms6' , type :'float', persist:false},
        {name :'pp_ms7' , type :'float', persist:false},
        {name :'pp_ms8' , type :'float', persist:false},
        {name :'pp_ms9' , type :'float', persist:false},
        {name :'pp_gs0' , type :'float', persist:false},
        {name :'pp_gs1' , type :'float', persist:false},
        {name :'pp_gs2' , type :'float', persist:false},
        {name :'pp_gs3' , type :'float', persist:false},
        {name :'pp_gs4' , type :'float', persist:false},
        {name :'pp_gs5' , type :'float', persist:false},
        {name :'pp_gs6' , type :'float', persist:false},
        {name :'pp_gs7' , type :'float', persist:false},
        {name :'pp_gs8' , type :'float', persist:false},
        {name :'pp_gs9' , type :'float', persist:false},
        {name :'pp_sgs0' , type :'float', persist:false},
        {name :'pp_sgs1' , type :'float', persist:false},
        {name :'pp_sgs2' , type :'float', persist:false},
        {name :'pp_sgs3' , type :'float', persist:false},
        {name :'pp_sgs4' , type :'float', persist:false},
        {name :'pp_sgs5' , type :'float', persist:false},
        {name :'pp_sgs6' , type :'float', persist:false},
        {name :'pp_sgs7' , type :'float', persist:false},
        {name :'pp_sgs8' , type :'float', persist:false},
        {name :'pp_sgs9' , type :'float', persist:false},
        {name :'pp_tot_pi', type :'float', persist:false},
        {name :'pp_tot_p', type :'float', persist:false},
        {name :'pp_tot_m', type :'float', persist:false},
        {name :'pp_tot_g', type :'float', persist:false},
        {name :'pp_tot_sg', type :'float', persist:false},
        {name :'pp_tot_s0', type :'float', persist:false},
        {name :'pp_tot_s1', type :'float', persist:false},
        {name :'pp_tot_s2', type :'float', persist:false},
        {name :'pp_tot_s3', type :'float', persist:false},
        {name :'pp_tot_s4', type :'float', persist:false},
        {name :'pp_tot_s5', type :'float', persist:false},
        {name :'pp_tot_s6', type :'float', persist:false},
        {name :'pp_tot_s7', type :'float', persist:false},
        {name :'pp_tot_s8', type :'float', persist:false},
        {name :'pp_tot_s9', type :'float', persist:false},
        {name :'pp_tot', type :'float', persist:false},
    ],

    updateInterventoCalculatedFields: function(){
        //
        // UPDATE CALCULATED FIELDS
        //
        var record = this;

        //species total arrays
        var cd_array=["pi","p","m","g","sg"];
        var auv_s_tot_array=[0,0,0,0,0,0,0,0,0,0];
        var p_s_tot_array=[0,0,0,0,0,0,0,0,0,0];
        var dp_s_tot_array=[0,0,0,0,0,0,0,0,0,0];
        var vp_s_tot_array=[0,0,0,0,0,0,0,0,0,0];
        var pp_s_tot_array=[0,0,0,0,0,0,0,0,0,0];

        var v2p_conv_array = [0.85,1.10,1.00,0.90,1.10,1.10,0.95,1.00,0.95,0.90]

        //global totals
        var auv_tot = 0,
            p_tot = 0,
            dp_tot = 0,
            vp_tot = 0,
            pp_tot = 0;

        /*/SQL query generator
        var sql_ufor_tot = "SELECT piano.n_piano,n_ufor,";
        var sql_auv_s_tot_array=["","","","","","","","","",""];
        var sql_p_s_tot_array=["","","","","","","","","",""];
        var sql_dp_s_tot_array=["","","","","","","","","",""];
        var sql_vp_s_tot_array=["","","","","","","","","",""];
        var sql_pp_s_tot_array=["","","","","","","","","",""];

        var sql_auv_cd_tot_array=["","","","",""];
        var sql_p_cd_tot_array=["","","","",""];
        var sql_dp_cd_tot_array=["","","","",""];
        var sql_vp_cd_tot_array=["","","","",""];
        var sql_pp_cd_tot_array=["","","","",""];

        var sql_auv_tot = "",
            sql_p_tot = "",
            sql_dp_tot = "",
            sql_vp_tot = "",
            sql_pp_tot = "";
        */
        // first calculus: auv totals, p data and totals
        for (cd = 0; cd < cd_array.length; cd++) {
            //global per dimensional class
            var auv_cd_tot = 0,
                p_cd_tot = 0,
                dp_cd_tot =0,
                vp_cd_tot =0,
                pp_cd_tot = 0;

            for (s = 0; s < 10; s++) {

                var sql_field="";

                //
                //auv stima volume
                var auv =  record.get('auv_'+cd_array[cd]+'s'+s);
                auv_cd_tot += auv;
                auv_s_tot_array[s] += auv;
                auv_tot += auv;
                /*/SQL query generator
                sql_field = 'auv_'+cd_array[cd]+'s'+s;
                sql_auv_cd_tot_array[cd]+=sql_field+'+';
                sql_auv_s_tot_array[s]+=sql_field+'+';
                sql_auv_tot += sql_field+'+';
                */

                //
                //p stima peso
                var p = auv*v2p_conv_array[s];
                record.set('p_'+cd_array[cd]+'s'+s,p);
                p_cd_tot += p;
                p_s_tot_array[s] += p;
                p_tot += p;
                /*/SQL query generator
                sql_field ='auv_'+cd_array[cd]+'s'+s+'*'+v2p_conv_array[s];
                sql_p_cd_tot_array[cd]+=sql_field+'+';
                sql_p_s_tot_array[s]+=sql_field+'+';
                sql_p_tot +=sql_field+'+';
                */

                //
                //dp_p dimensionamento prelievo pesato per volume
                var dp = record.get('dp_'+cd_array[cd]+'s'+s)/100;
                dp_cd_tot += auv*dp;
                dp_s_tot_array[s] += auv*dp;
                dp_tot += auv*dp;
                /*/SQL query generator
                sql_field ='(auv_'+cd_array[cd]+'s'+s+'*'+'dp_'+cd_array[cd]+'s'+s+'/100)';
                sql_dp_cd_tot_array[cd]+=sql_field+'+';
                sql_dp_s_tot_array[s]+=sql_field+'+';
                sql_dp_tot += sql_field+'+';
                */

                //
                //vp_p volume prelevato
                var vp = auv*dp;
                record.set('vp_'+cd_array[cd]+'s'+s,vp);
                vp_cd_tot += vp;
                vp_s_tot_array[s] += vp;
                vp_tot += vp;
                /*/SQL query generator
                sql_field ='(auv_'+cd_array[cd]+'s'+s+'*'+'dp_'+cd_array[cd]+'s'+s+'/100)';
                sql_vp_cd_tot_array[cd]+=sql_field+'+';
                sql_vp_s_tot_array[s]+=sql_field+'+';
                sql_vp_tot += sql_field+'+';
                */

                //
                //pp_p peso prelevato
                var pp = vp*v2p_conv_array[s];
                record.set('pp_'+cd_array[cd]+'s'+s,pp);
                pp_cd_tot += pp;
                pp_s_tot_array[s] += pp;
                pp_tot += pp;
                /*/SQL query generator
                sql_field ='(auv_'+cd_array[cd]+'s'+s+'*'+'dp_'+cd_array[cd]+'s'+s+'/100)'+'*'+v2p_conv_array[s];
                sql_pp_cd_tot_array[cd]+=sql_field+'+';
                sql_pp_s_tot_array[s]+=sql_field+'+';
                sql_pp_tot += sql_field+'+';
                */

            }
            // totali per classe dimensionale
            record.set('auv_tot_'+cd_array[cd],auv_cd_tot);
            record.set('p_tot_'+cd_array[cd],p_cd_tot);
            record.set('dp_tot_'+cd_array[cd],auv_cd_tot>0?dp_cd_tot/auv_cd_tot*100:0);
            record.set('vp_tot_'+cd_array[cd],vp_cd_tot);
            record.set('pp_tot_'+cd_array[cd],pp_cd_tot);

        }
        for (s = 0; s < 10; s++) {
            //totali per specie
            record.set('auv_tot_s'+s,auv_s_tot_array[s]);
            record.set('p_tot_s'+s,p_s_tot_array[s]);
            record.set('dp_tot_s'+s,auv_s_tot_array[s]>0?dp_s_tot_array[s]/auv_s_tot_array[s]*100:0);
            record.set('vp_tot_s'+s,vp_s_tot_array[s]);
            record.set('pp_tot_s'+s,pp_s_tot_array[s]);
        }
        // totali complessivi
        record.set('auv_tot',auv_tot);
        record.set('p_tot',p_tot);
        record.set('dp_tot',auv_tot>0?vp_tot/auv_tot*100:0);
        record.set('vp_tot',vp_tot);
        record.set('pp_tot',pp_tot);

        /*/
        //SQL query generator
        //

        // auv
        for (cd = 0; cd < cd_array.length; cd++) {
            sql_ufor_tot+=sql_auv_cd_tot_array[cd];
            sql_ufor_tot+='as auv_tot_'+cd_array[cd]+',';
        }
        for (s = 0; s < 10; s++) {
            sql_ufor_tot+=sql_auv_s_tot_array[s];
            sql_ufor_tot+='as auv_tot_s'+s+',';
        }
        sql_ufor_tot+=sql_auv_tot;
        sql_ufor_tot+='as auv_tot,';
        // p
        for (cd = 0; cd < cd_array.length; cd++) {
            sql_ufor_tot+=sql_p_cd_tot_array[cd];
            sql_ufor_tot+='as p_tot_'+cd_array[cd]+',';
        }
        for (s = 0; s < 10; s++) {
            sql_ufor_tot+=sql_p_s_tot_array[s];
            sql_ufor_tot+='as p_tot_s'+s+',';
        }
        sql_ufor_tot+=sql_p_tot;
        sql_ufor_tot+='as p_tot,';

        // dp
        for (cd = 0; cd < cd_array.length; cd++) {
            sql_ufor_tot+="CASE WHEN ("+sql_auv_cd_tot_array[cd]+") > 0 ";
            sql_ufor_tot+="THEN ("+sql_dp_cd_tot_array[cd]+")/("+sql_auv_cd_tot_array[cd]+")*100 ";
            sql_ufor_tot+="ELSE 0 ";
            sql_ufor_tot+='END as dp_tot_'+cd_array[cd]+',';
        }
        for (s = 0; s < 10; s++) {
            sql_ufor_tot+="CASE WHEN ("+sql_auv_s_tot_array[s]+") > 0 ";
            sql_ufor_tot+="THEN ("+sql_dp_s_tot_array[s]+")/("+sql_auv_s_tot_array[s]+")*100 ";
            sql_ufor_tot+="ELSE 0 ";
            sql_ufor_tot+='END as dp_tot_s'+s+',';
        }
        sql_ufor_tot+="CASE WHEN ("+sql_auv_tot+") > 0 ";
        sql_ufor_tot+="THEN ("+sql_dp_tot+")/("+sql_auv_tot+")*100 ";
        sql_ufor_tot+="ELSE 0 ";
        sql_ufor_tot+='END as dp_tot,';

        // vp
        for (cd = 0; cd < cd_array.length; cd++) {
            sql_ufor_tot+=sql_vp_cd_tot_array[cd];
            sql_ufor_tot+='as vp_tot_'+cd_array[cd]+',';
        }
        for (s = 0; s < 10; s++) {
            sql_ufor_tot+=sql_vp_s_tot_array[s];
            sql_ufor_tot+='as vp_tot_s'+s+',';
        }
        sql_ufor_tot+=sql_vp_tot;
        sql_ufor_tot+='as vp_tot,';

        // pp
        for (cd = 0; cd < cd_array.length; cd++) {
            sql_ufor_tot+=sql_pp_cd_tot_array[cd];
            sql_ufor_tot+='as pp_tot_'+cd_array[cd]+',';
        }
        for (s = 0; s < 10; s++) {
            sql_ufor_tot+=sql_pp_s_tot_array[s];
            sql_ufor_tot+='as pp_tot_s'+s+',';
        }
        sql_ufor_tot+=sql_pp_tot;
        sql_ufor_tot+='as pp_tot,';
        */


        //-----------------------------------
        // general calculs: intervento totals
        //-----------------------------------

        var superficie = record.get('area_ha');

        //legname (abbrv legme)
        var legme_vha = record.get('legme_pv')/100*vp_tot;
        var legna_pha = vp_tot>0?((vp_tot-legme_vha)/vp_tot)*pp_tot:0;
        record.set('legme_vha',legme_vha);
        record.set('legna_pha',legna_pha);
        record.set('legme_v',legme_vha*superficie);
        record.set('legna_p',legna_pha*superficie);

        //utilizzazioni

        var util_ps = record.get('util_ps')/100;
        var util_sup = util_ps*superficie;
        var util_int = record.get('piano_durata')*record.get('priorita')*record.get('piano_rit_priorita')/(superficie/(util_ps*superficie));
        var u_legme_v = legme_vha*util_sup;
        var u_legna_p = legna_pha*util_sup;
        var util_n = superficie/util_sup;
        var int_gest = vp_tot/(record.get('piano_durata')*record.get('priorita')*record.get('piano_rit_priorita'))*util_sup;

        record.set('util_sup',util_sup);
        record.set('util_int',util_int);
        record.set('u_legme_v',u_legme_v);
        record.set('u_legna_p',u_legna_p);
        record.set('util_n',util_n);
        record.set('int_gest',int_gest);

        /*/
        // SQL
        //

        // legname (abbrv legme)

        sql_ufor_tot+='legme_pv/100*('+sql_vp_tot+')';
        sql_ufor_tot+=' as legme_vha,';

        sql_ufor_tot+="CASE WHEN ("+sql_vp_tot+") > 0 ";
        sql_ufor_tot+='THEN (((('+sql_vp_tot+') - (legme_pv/100*('+sql_vp_tot+')))/('+sql_vp_tot+'))*('+sql_pp_tot+'))';
        sql_ufor_tot+="ELSE 0 ";
        sql_ufor_tot+='END as legna_pha,';

        sql_ufor_tot+='legme_pv/100*('+sql_vp_tot+')*area_ha';
        sql_ufor_tot+=' as legme_v,';

        sql_ufor_tot+="CASE WHEN ("+sql_vp_tot+") > 0 ";
        sql_ufor_tot+='THEN (((('+sql_vp_tot+') - (legme_pv/100*('+sql_vp_tot+')))/('+sql_vp_tot+'))*('+sql_pp_tot+')*area_ha)';
        sql_ufor_tot+="ELSE 0 ";
        sql_ufor_tot+='END as legna_p,';

        //utilizzazioni

        sql_ufor_tot+='util_ps/100*area_ha';
        sql_ufor_tot+=' as util_sup,';

        sql_ufor_tot+='((anno_val-anno_in)*priorita*rit_priorita)/(area_ha/(util_ps/100*area_ha))';
        sql_ufor_tot+=' as util_int,';

        sql_ufor_tot+='legme_pv/100*('+sql_vp_tot+')*util_ps/100*area_ha';
        sql_ufor_tot+=' as u_legme_v,';

        sql_ufor_tot+="CASE WHEN ("+sql_vp_tot+") > 0 ";
        sql_ufor_tot+='THEN (((('+sql_vp_tot+') - (legme_pv/100*('+sql_vp_tot+')))/('+sql_vp_tot+'))*('+sql_pp_tot+')*util_ps/100*area_ha)';
        sql_ufor_tot+="ELSE 0 ";
        sql_ufor_tot+='END as u_legna_p,';

        sql_ufor_tot+='area_ha/(util_ps/100*area_ha)';
        sql_ufor_tot+=' as util_n,';

        sql_ufor_tot+='('+sql_vp_tot+')/((anno_val-anno_in)*priorita*rit_priorita)*(util_ps/100*area_ha)';
        sql_ufor_tot+=' as int_gest';

        //end of sql
        sql_ufor_tot+=' from ufor_int join piano on ufor_int.n_piano = piano.n_piano order by n_ufor;';
        console.log(sql_ufor_tot);
        */
    },
});
