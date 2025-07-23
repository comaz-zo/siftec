Ext.define('SIF360.model.ufor.TableIntervento', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'n_piano' , type :'int', persist:false},
        {name :'n_interv' , type :'int'},
        {name :'n_obiett' , type :'int'},
        {name :'n_mis' , type :'int'},
        {name :'n_ufor' , type :'int', persist:false},
        {name :'area_ha' , type :'float', persist:false},
        {name :'piano_durata' , type :'int', persist:false},
        {name :'priorita' , type :'float'},
        {name :'rit_priorita' , type :'float', persist:false},
        {name :'legn_pv' , type :'float'},
        {name :'legn_vha' , type :'float'},
        {name :'legn_pha' , type :'float'},
        {name :'legn_v' , type :'float'},
        {name :'legn_p' , type :'float'},  
        {name :'util_ps' , type :'float'},
        {name :'util_sup' , type :'float'},
        {name :'util_int' , type :'float'},
        {name :'u_legnv' , type :'float'},
        {name :'u_legnp' , type :'float'},
        {name :'util_n' , type :'float'},
        {name :'int_gest' , type :'float'},
        {name :'i_s1_spp' , type :'int'},
        {name :'i_s1_dsc' , type :'int'},
        {name :'i_s1_int' , type :'int'},
        {name :'i_s1_tip' , type :'int'},
        {name :'i_s1_mod' , type :'int'},
        {name :'i_s1_str' , type :'int'},
        {name :'i_s1_cdim' , type :'int'},
        {name :'i_s1_ind' , type :'string'},
        {name :'i_s2_spp' , type :'int'},
        {name :'i_s2_dsc' , type :'int'},
        {name :'i_s2_int' , type :'int'},
        {name :'i_s2_tip' , type :'int'},
        {name :'i_s2_mod' , type :'int'},
        {name :'i_s2_str' , type :'int'},
        {name :'i_s2_cdim' , type :'int'},
        {name :'i_s2_ind' , type :'string'},
        {name :'i_s3_spp' , type :'int'},
        {name :'i_s3_dsc' , type :'int'},
        {name :'i_s3_int' , type :'int'},
        {name :'i_s3_tip' , type :'int'},
        {name :'i_s3_mod' , type :'int'},
        {name :'i_s3_str' , type :'int'},
        {name :'i_s3_cdim' , type :'int'},
        {name :'i_s3_ind' , type :'string'},
        {name :'i_s4_spp' , type :'int'},
        {name :'i_s4_dsc' , type :'int'},
        {name :'i_s4_int' , type :'int'},
        {name :'i_s4_tip' , type :'int'},
        {name :'i_s4_mod' , type :'int'},
        {name :'i_s4_str' , type :'int'},
        {name :'i_s4_cdim' , type :'int'},
        {name :'i_s4_ind' , type :'string'},
        {name :'i_s5_spp' , type :'int'},
        {name :'i_s5_dsc' , type :'int'},
        {name :'i_s5_int' , type :'int'},
        {name :'i_s5_tip' , type :'int'},
        {name :'i_s5_mod' , type :'int'},
        {name :'i_s5_str' , type :'int'},
        {name :'i_s5_cdim' , type :'int'},
        {name :'i_s5_ind' , type :'string'},
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
        {name:'auv_tot_pi', type :'float', persist:false,},
        {name:'auv_tot_p', type :'float', persist:false,},
        {name:'auv_tot_m', type :'float', persist:false,},
        {name:'auv_tot_g', type :'float', persist:false,},
        {name:'auv_tot_sg', type :'float', persist:false,},
        {name:'auv_tot_s0', type :'float', persist:false,},
        {name:'auv_tot_s1', type :'float', persist:false,},
        {name:'auv_tot_s2', type :'float', persist:false,},
        {name:'auv_tot_s3', type :'float', persist:false,},
        {name:'auv_tot_s4', type :'float', persist:false,},
        {name:'auv_tot_s5', type :'float', persist:false,},
        {name:'auv_tot_s6', type :'float', persist:false,},
        {name:'auv_tot_s7', type :'float', persist:false,},
        {name:'auv_tot_s8', type :'float', persist:false,},
        {name:'auv_tot_s9', type :'float', persist:false,},
        {name:'auv_tot', type :'float', persist:false,},
        {name :'p_pis0' , type :'float', persist:false,},
        {name :'p_pis1' , type :'float', persist:false,},
        {name :'p_pis2' , type :'float', persist:false,},
        {name :'p_pis3' , type :'float', persist:false,},
        {name :'p_pis4' , type :'float', persist:false,},
        {name :'p_pis5' , type :'float', persist:false,},
        {name :'p_pis6' , type :'float', persist:false,},
        {name :'p_pis7' , type :'float', persist:false,},
        {name :'p_pis8' , type :'float', persist:false,},
        {name :'p_pis9' , type :'float', persist:false,},
        {name :'p_ps0' , type :'float', persist:false,},
        {name :'p_ps1' , type :'float', persist:false,},
        {name :'p_ps2' , type :'float', persist:false,},
        {name :'p_ps3' , type :'float', persist:false,},
        {name :'p_ps4' , type :'float', persist:false,},
        {name :'p_ps5' , type :'float', persist:false,},
        {name :'p_ps6' , type :'float', persist:false,},
        {name :'p_ps7' , type :'float', persist:false,},
        {name :'p_ps8' , type :'float', persist:false,},
        {name :'p_ps9' , type :'float', persist:false,},
        {name :'p_ms0' , type :'float', persist:false,},
        {name :'p_ms1' , type :'float', persist:false,},
        {name :'p_ms2' , type :'float', persist:false,},
        {name :'p_ms3' , type :'float', persist:false,},
        {name :'p_ms4' , type :'float', persist:false,},
        {name :'p_ms5' , type :'float', persist:false,},
        {name :'p_ms6' , type :'float', persist:false,},
        {name :'p_ms7' , type :'float', persist:false,},
        {name :'p_ms8' , type :'float', persist:false,},
        {name :'p_ms9' , type :'float', persist:false,},
        {name :'p_gs0' , type :'float', persist:false,},
        {name :'p_gs1' , type :'float', persist:false,},
        {name :'p_gs2' , type :'float', persist:false,},
        {name :'p_gs3' , type :'float', persist:false,},
        {name :'p_gs4' , type :'float', persist:false,},
        {name :'p_gs5' , type :'float', persist:false,},
        {name :'p_gs6' , type :'float', persist:false,},
        {name :'p_gs7' , type :'float', persist:false,},
        {name :'p_gs8' , type :'float', persist:false,},
        {name :'p_gs9' , type :'float', persist:false,},
        {name :'p_sgs0' , type :'float', persist:false,},
        {name :'p_sgs1' , type :'float', persist:false,},
        {name :'p_sgs2' , type :'float', persist:false,},
        {name :'p_sgs3' , type :'float', persist:false,},
        {name :'p_sgs4' , type :'float', persist:false,},
        {name :'p_sgs5' , type :'float', persist:false,},
        {name :'p_sgs6' , type :'float', persist:false,},
        {name :'p_sgs7' , type :'float', persist:false,},
        {name :'p_sgs8' , type :'float', persist:false,},
        {name :'p_sgs9' , type :'float', persist:false,},
        {name:'p_tot_pi', type :'float', persist:false,},
        {name:'p_tot_p', type :'float', persist:false,},
        {name:'p_tot_m', type :'float', persist:false,},
        {name:'p_tot_g', type :'float', persist:false,},
        {name:'p_tot_sg', type :'float', persist:false,},
        {name:'p_tot_s0', type :'float', persist:false,},
        {name:'p_tot_s1', type :'float', persist:false,},
        {name:'p_tot_s2', type :'float', persist:false,},
        {name:'p_tot_s3', type :'float', persist:false,},
        {name:'p_tot_s4', type :'float', persist:false,},
        {name:'p_tot_s5', type :'float', persist:false,},
        {name:'p_tot_s6', type :'float', persist:false,},
        {name:'p_tot_s7', type :'float', persist:false,},
        {name:'p_tot_s8', type :'float', persist:false,},
        {name:'p_tot_s9', type :'float', persist:false,},
        {name:'p_tot', type :'float', persist:false,},
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
        {name:'dp_tot_pi', type :'float', persist:false,},
        {name:'dp_tot_p', type :'float', persist:false,},
        {name:'dp_tot_m', type :'float', persist:false,},
        {name:'dp_tot_g', type :'float', persist:false,},
        {name:'dp_tot_sg', type :'float', persist:false,},
        {name:'dp_tot_s0', type :'float', persist:false,},
        {name:'dp_tot_s1', type :'float', persist:false,},
        {name:'dp_tot_s2', type :'float', persist:false,},
        {name:'dp_tot_s3', type :'float', persist:false,},
        {name:'dp_tot_s4', type :'float', persist:false,},
        {name:'dp_tot_s5', type :'float', persist:false,},
        {name:'dp_tot_s6', type :'float', persist:false,},
        {name:'dp_tot_s7', type :'float', persist:false,},
        {name:'dp_tot_s8', type :'float', persist:false,},
        {name:'dp_tot_s9', type :'float', persist:false,},
        {name:'dp_tot', type :'float', persist:false,},
        {name :'vp_pis0' , type :'float', persist:false,},
        {name :'vp_pis1' , type :'float', persist:false,},
        {name :'vp_pis2' , type :'float', persist:false,},
        {name :'vp_pis3' , type :'float', persist:false,},
        {name :'vp_pis4' , type :'float', persist:false,},
        {name :'vp_pis5' , type :'float', persist:false,},
        {name :'vp_pis6' , type :'float', persist:false,},
        {name :'vp_pis7' , type :'float', persist:false,},
        {name :'vp_pis8' , type :'float', persist:false,},
        {name :'vp_pis9' , type :'float', persist:false,},
        {name :'vp_ps0' , type :'float', persist:false,},
        {name :'vp_ps1' , type :'float', persist:false,},
        {name :'vp_ps2' , type :'float', persist:false,},
        {name :'vp_ps3' , type :'float', persist:false,},
        {name :'vp_ps4' , type :'float', persist:false,},
        {name :'vp_ps5' , type :'float', persist:false,},
        {name :'vp_ps6' , type :'float', persist:false,},
        {name :'vp_ps7' , type :'float', persist:false,},
        {name :'vp_ps8' , type :'float', persist:false,},
        {name :'vp_ps9' , type :'float', persist:false,},
        {name :'vp_ms0' , type :'float', persist:false,},
        {name :'vp_ms1' , type :'float', persist:false,},
        {name :'vp_ms2' , type :'float', persist:false,},
        {name :'vp_ms3' , type :'float', persist:false,},
        {name :'vp_ms4' , type :'float', persist:false,},
        {name :'vp_ms5' , type :'float', persist:false,},
        {name :'vp_ms6' , type :'float', persist:false,},
        {name :'vp_ms7' , type :'float', persist:false,},
        {name :'vp_ms8' , type :'float', persist:false,},
        {name :'vp_ms9' , type :'float', persist:false,},
        {name :'vp_gs0' , type :'float', persist:false,},
        {name :'vp_gs1' , type :'float', persist:false,},
        {name :'vp_gs2' , type :'float', persist:false,},
        {name :'vp_gs3' , type :'float', persist:false,},
        {name :'vp_gs4' , type :'float', persist:false,},
        {name :'vp_gs5' , type :'float', persist:false,},
        {name :'vp_gs6' , type :'float', persist:false,},
        {name :'vp_gs7' , type :'float', persist:false,},
        {name :'vp_gs8' , type :'float', persist:false,},
        {name :'vp_gs9' , type :'float', persist:false,},
        {name :'vp_sgs0' , type :'float', persist:false,},
        {name :'vp_sgs1' , type :'float', persist:false,},
        {name :'vp_sgs2' , type :'float', persist:false,},
        {name :'vp_sgs3' , type :'float', persist:false,},
        {name :'vp_sgs4' , type :'float', persist:false,},
        {name :'vp_sgs5' , type :'float', persist:false,},
        {name :'vp_sgs6' , type :'float', persist:false,},
        {name :'vp_sgs7' , type :'float', persist:false,},
        {name :'vp_sgs8' , type :'float', persist:false,},
        {name :'vp_sgs9' , type :'float', persist:false,},
        {name:'vp_tot_pi', type :'float', persist:false,},
        {name:'vp_tot_p', type :'float', persist:false,},
        {name:'vp_tot_m', type :'float', persist:false,},
        {name:'vp_tot_g', type :'float', persist:false,},
        {name:'vp_tot_sg', type :'float', persist:false,},
        {name:'vp_tot_s0', type :'float', persist:false,},
        {name:'vp_tot_s1', type :'float', persist:false,},
        {name:'vp_tot_s2', type :'float', persist:false,},
        {name:'vp_tot_s3', type :'float', persist:false,},
        {name:'vp_tot_s4', type :'float', persist:false,},
        {name:'vp_tot_s5', type :'float', persist:false,},
        {name:'vp_tot_s6', type :'float', persist:false,},
        {name:'vp_tot_s7', type :'float', persist:false,},
        {name:'vp_tot_s8', type :'float', persist:false,},
        {name:'vp_tot_s9', type :'float', persist:false,},
        {name:'vp_tot', type :'float', persist:false,},
        {name :'pp_pis0' , type :'float', persist:false,},  
        {name :'pp_pis1' , type :'float', persist:false,},
        {name :'pp_pis2' , type :'float', persist:false,},
        {name :'pp_pis3' , type :'float', persist:false,},
        {name :'pp_pis4' , type :'float', persist:false,},
        {name :'pp_pis5' , type :'float', persist:false,},
        {name :'pp_pis6' , type :'float', persist:false,},
        {name :'pp_pis7' , type :'float', persist:false,},
        {name :'pp_pis8' , type :'float', persist:false,},
        {name :'pp_pis9' , type :'float', persist:false,},
        {name :'pp_ps0' , type :'float', persist:false,},
        {name :'pp_ps1' , type :'float', persist:false,},
        {name :'pp_ps2' , type :'float', persist:false,},
        {name :'pp_ps3' , type :'float', persist:false,},
        {name :'pp_ps4' , type :'float', persist:false,},
        {name :'pp_ps5' , type :'float', persist:false,},
        {name :'pp_ps6' , type :'float', persist:false,},
        {name :'pp_ps7' , type :'float', persist:false,},
        {name :'pp_ps8' , type :'float', persist:false,},
        {name :'pp_ps9' , type :'float', persist:false,},
        {name :'pp_ms0' , type :'float', persist:false,},
        {name :'pp_ms1' , type :'float', persist:false,},
        {name :'pp_ms2' , type :'float', persist:false,},
        {name :'pp_ms3' , type :'float', persist:false,},
        {name :'pp_ms4' , type :'float', persist:false,},
        {name :'pp_ms5' , type :'float', persist:false,},
        {name :'pp_ms6' , type :'float', persist:false,},
        {name :'pp_ms7' , type :'float', persist:false,},
        {name :'pp_ms8' , type :'float', persist:false,},
        {name :'pp_ms9' , type :'float', persist:false,},
        {name :'pp_gs0' , type :'float', persist:false,},
        {name :'pp_gs1' , type :'float', persist:false,},
        {name :'pp_gs2' , type :'float', persist:false,},
        {name :'pp_gs3' , type :'float', persist:false,},
        {name :'pp_gs4' , type :'float', persist:false,},
        {name :'pp_gs5' , type :'float', persist:false,},
        {name :'pp_gs6' , type :'float', persist:false,},
        {name :'pp_gs7' , type :'float', persist:false,},
        {name :'pp_gs8' , type :'float', persist:false,},
        {name :'pp_gs9' , type :'float', persist:false,},
        {name :'pp_sgs0' , type :'float', persist:false,},
        {name :'pp_sgs1' , type :'float', persist:false,},
        {name :'pp_sgs2' , type :'float', persist:false,},
        {name :'pp_sgs3' , type :'float', persist:false,},
        {name :'pp_sgs4' , type :'float', persist:false,},
        {name :'pp_sgs5' , type :'float', persist:false,},
        {name :'pp_sgs6' , type :'float', persist:false,},
        {name :'pp_sgs7' , type :'float', persist:false,},
        {name :'pp_sgs8' , type :'float', persist:false,},
        {name :'pp_sgs9' , type :'float', persist:false,},
        {name:'pp_tot_pi', type :'float', persist:false,},
        {name:'pp_tot_p', type :'float', persist:false,},
        {name:'pp_tot_m', type :'float', persist:false,},
        {name:'pp_tot_g', type :'float', persist:false,},
        {name:'pp_tot_sg', type :'float', persist:false,},
        {name:'pp_tot_s0', type :'float', persist:false,},
        {name:'pp_tot_s1', type :'float', persist:false,},
        {name:'pp_tot_s2', type :'float', persist:false,},
        {name:'pp_tot_s3', type :'float', persist:false,},
        {name:'pp_tot_s4', type :'float', persist:false,},
        {name:'pp_tot_s5', type :'float', persist:false,},
        {name:'pp_tot_s6', type :'float', persist:false,},
        {name:'pp_tot_s7', type :'float', persist:false,},
        {name:'pp_tot_s8', type :'float', persist:false,},
        {name:'pp_tot_s9', type :'float', persist:false,},
        {name:'pp_tot', type :'float', persist:false,},

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
        
        // first calculus: auv totals, p data and totals
        for (cd = 0; cd < cd_array.length; cd++) {
            //global per dimensional class
            var auv_cd_tot = 0,
                p_cd_tot = 0,
                dp_cd_tot =0,
                vp_cd_tot =0,
                pp_cd_tot = 0; 
            for (s = 0; s < 10; s++) {
                //auv stima volume
                var auv =  record.get('auv_'+cd_array[cd]+'s'+s);
                auv_cd_tot += auv;
                auv_s_tot_array[s] += auv;
                auv_tot += auv;
                
                //p stima peso
                var p = auv*v2p_conv_array[s];
                record.set('p_'+cd_array[cd]+'s'+s,p);
                p_cd_tot += p;
                p_s_tot_array[s] += p;
                p_tot += p;
                
                //dp_p dimensionamento prelievo * volume
                var dp = record.get('dp_'+cd_array[cd]+'s'+s);
                dp_cd_tot += auv*dp;
                dp_s_tot_array[s] += auv*dp;
                dp_tot += auv*dp;
                
                //vp_p volume prelevato
                var vp = auv*dp;
                record.set('vp_'+cd_array[cd]+'s'+s,vp);
                vp_cd_tot += vp;
                vp_s_tot_array[s] += vp;
                vp_tot += vp;
                
                //pp_p peso prelevato
                var pp = vp*v2p_conv_array[s];
                record.set('pp_'+cd_array[cd]+'s'+s,pp);
                pp_cd_tot += pp;
                pp_s_tot_array[s] += pp;
                pp_tot += pp;  
                
                
                
            }
            // totali per classe dimensionale
            record.set('auv_tot_'+cd_array[cd],auv_cd_tot);
            record.set('p_tot_'+cd_array[cd],p_cd_tot);
            record.set('dp_tot_'+cd_array[cd],auv_cd_tot>0?dp_cd_tot/auv_cd_tot:0);
            record.set('vp_tot_'+cd_array[cd],vp_cd_tot);
            record.set('pp_tot_'+cd_array[cd],pp_cd_tot);
            
        }
        for (s = 0; s < 10; s++) {
            //totali per specie
            record.set('auv_tot_s'+s,auv_s_tot_array[s]);
            record.set('p_tot_s'+s,p_s_tot_array[s]);
            record.set('dp_tot_s'+s,auv_s_tot_array[s]>0?dp_s_tot_array[s]/auv_s_tot_array[s]:0);
            record.set('vp_tot_s'+s,vp_s_tot_array[s]);
            record.set('pp_tot_s'+s,pp_s_tot_array[s]);
        }
        // totali complessivi
        record.set('auv_tot',auv_tot);
        record.set('p_tot',p_tot);
        record.set('dp_tot',auv_tot>0?vp_tot/auv_tot:0);  
        record.set('vp_tot',vp_tot);
        record.set('pp_tot',pp_tot);
        
        
        // general calculs: intervento totals
        var superficie = record.get('area_ha'); 
        
        //legname
        var legn_vha = record.get('legn_pv')*vp_tot;
        var legn_pha = (vp_tot-legn_vha)*pp_tot/vp_tot;   
        record.set('legn_vha',legn_vha);
        record.set('legn_pha',legn_pha);
        record.set('legn_v',legn_vha*superficie);
        record.set('legn_p',legn_pha*superficie);
        
        //utilizzazioni
        
        var util_ps = record.get('util_ps');
        var util_sup = util_ps*superficie;
        var util_int = record.get('piano_durata')*record.get('priorita')*record.get('rit_priorita')/(superficie/(util_ps*superficie));   
        var u_legnv = legn_vha*util_sup;
        var u_legnp = legn_pha*util_sup;
        var util_n = superficie/util_sup;
        var int_gest = vp_tot/(record.get('piano_durata')*record.get('priorita')*record.get('rit_priorita'))*util_sup;  
        
        record.set('util_sup',util_sup);
        record.set('util_int',util_int);
        record.set('u_legnv',u_legnv);
        record.set('u_legnp',u_legnp);
        record.set('util_n',util_n);
        record.set('int_gest',int_gest);
    
    },
    
});