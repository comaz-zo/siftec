Ext.define('SIF360.config.Runtime',{
    singleton : true,
    config : {
        //geoserver_address
        geoserverAddress: "ec2-54-229-214-225.eu-west-1.compute.amazonaws.com",


        //login
        loggedIn : false,
        loggedUser : "",
        loggedUserName : "",
        loggedUserLevel: 0,

        //piano
        PianoSelected: false,
        PianoSelectedId: -1,
        PianoSelectedOrigEpsg: "",
        PianoSelectedDestEpsg: "",
        PianoSelectedBoundL: -1,
        PianoSelectedBoundB: -1,
        PianoSelectedBoundR: -1,
        PianoSelectedBoundT: -1,
        PianoSelectedOfdWms: "",
        PianoSelectedOfdLayer: "",
        PianoSelectedOfdLayerAttribution: "",
        PianoSelectedWmsAddr: "",
        PianoSelectedWmsChmLayer: "",
        PianoSelectedWmsVolumeHaLayer: "",
        PianoSelectedWmsPesoSeccoHaLayer: "",
        PianoSelectedWmsChmLayerAttribution: "",
        PianoSelectedWmsVolumeHaLayerAttribution: "",
        PianoSelectedWmsPesoSeccoHaLayerAttribution: "",
        PianoSelectedWfsAddr: "",
        PianoSelectedSld_piano: "",
        PianoSelectedSld_ufor: "",
        PianoSelectedSld_ufor_selected: "",
        PianoSelectedSld_particella: "",
          PianoSelectedSld_particella_selected: "",
        PianoSelectedSld_priorita: "",
        PianoSelectedSld_coltura: "",

        //ufor
        UforSelectedId: -1,
    },
    constructor : function(config){
        this.initConfig(config);
    }
});
