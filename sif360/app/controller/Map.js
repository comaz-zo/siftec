Ext.define('SIF360.controller.Map', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.window.MessageBox',
        'GeoExt.Action',
        'SIF360.view.help.Action',
        'SIF360.view.Map'
    ],

    id:'controllermap',

    models: [

    ],
    stores: [

    ],

    views: [
        'Map'
    ],

    init: function() {
        var me = this;

        me.listen({
            controller: {
                 // select and close piano
                '*':{
                    piano_selected: me.createMap,
                    piano_closed: me.destroyMap,
                },
            },
            component:{

            },

        });

        console.log('Map controller init');
        me.callParent(arguments);
    },


    createMap: function() {
        var me = this;
        var items = [];
        var ctrl;

        var geographic = new OpenLayers.Projection(SIF360.config.Runtime.getPianoSelectedOrigEpsg());
        var destProj = new OpenLayers.Projection(SIF360.config.Runtime.getPianoSelectedDestEpsg());
        var extent = new OpenLayers.Bounds(
                                        SIF360.config.Runtime.getPianoSelectedBoundL(),
                                        SIF360.config.Runtime.getPianoSelectedBoundB(),
                                        SIF360.config.Runtime.getPianoSelectedBoundR(),
                                        SIF360.config.Runtime.getPianoSelectedBoundT()
        );

        //OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

        var new_map = new OpenLayers.Map({
            allOverlays: false,
            fallThrough: false,
            maxExtent:extent,
            restrictedExtent:extent,
            units:'m',
            wrapDateLine:false,
            projection:destProj,
            controls: [
                        new OpenLayers.Control.Navigation(),
                        new OpenLayers.Control.PanZoomBar(),
                        new OpenLayers.Control.LayerSwitcher({'ascending':false}),
                        new OpenLayers.Control.OverviewMap(),
                        new OpenLayers.Control.KeyboardDefaults(),
                        new OpenLayers.Control.Attribution()
                    ],
        });

        var layers = [];

        // Map baselayers creation

        /*
        The URL reads the value you entered as the "URI" when you created the workspace in GeoServer (You are accessing your workspace).
        Depending on the URI you gave to the workspace,the URL changes. The GIS in "GIS:pipelines" is the name of the Store where your
        layer is contained.Also the Pipelines is the name of the layer. The structure of accessing data in GeoServer is clear
        Workspace > Store > Layer According to your URI and URL ,if you remove GIS there will be an error because
        it will be impossible to locate the workspace needed.
        */


        var wms_addr = SIF360.config.Runtime.getPianoSelectedOfdWms();
        var wms_layer = SIF360.config.Runtime.getPianoSelectedOfdLayer();
        var wms_attribution = SIF360.config.Runtime.getPianoSelectedOfdLayerAttribution();

        var ortofoto_layer = new OpenLayers.Layer.WMS(
            "Ortofoto",
            wms_addr,
            {
                layers: wms_layer,
                isBaseLayer: true,
            },
            {
              attribution: wms_attribution
            }
        );
        layers.push(ortofoto_layer);

        var wms_addr = SIF360.config.Runtime.getPianoSelectedWmsAddr();
        var wms_layer = SIF360.config.Runtime.getPianoSelectedWmsChmLayer();
        var wms_attribution = SIF360.config.Runtime.getPianoSelectedWmsChmLayerAttribution();

        var chm_layer = new OpenLayers.Layer.WMS(
            "CHM LiDAR",
            wms_addr,
            {
                layers: wms_layer,
                isBaseLayer: true,
                format: "image/jpeg"
            },
            {
              attribution: wms_attribution
            }
        );
        layers.push(chm_layer);

        var wms_layer = SIF360.config.Runtime.getPianoSelectedWmsVolumeHaLayer();
        var wms_attribution = SIF360.config.Runtime.getPianoSelectedWmsVolumeHaLayerAttribution();
        var volume_ha_layer = new OpenLayers.Layer.WMS(
            "Volume m3/ha",
            wms_addr,
            {
                layers: wms_layer,
                isBaseLayer: true,
                format: "image/jpeg"
            },
            {
              attribution: wms_attribution
            }
        );
        layers.push(volume_ha_layer);

        var wms_layer = SIF360.config.Runtime.getPianoSelectedWmsPesoSeccoHaLayer();
        var wms_attribution = SIF360.config.Runtime.getPianoSelectedWmsPesoSeccoHaLayerAttribution();
        var peso_secco_ha_layer = new OpenLayers.Layer.WMS(
            "Peso secco t/ha",
            wms_addr,
            {
                layers: wms_layer,
                isBaseLayer: true,
                format: "image/jpeg"
            },
            {
              attribution: wms_attribution
            }
        );
        layers.push(peso_secco_ha_layer);


        new_map.addLayers(layers);
        //new_map.addLayer(new OpenLayers.Layer.OSM());
        //new_map.zoomToMaxExtent();



        //  for(var i = 1; i < new_map.layers.length; i++)
        //  {
        //     layers = new_map.layers.getAt(i);
        //     layers.set("legendURL","http://localhost/geoserver/wms?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + map.layers[i].params["LAYERS"]);
        //   }




        //------------------------------------------------------------------------
        // Select feature control
        //------------------------------------------------------------------------

        var sc = new OpenLayers.Control.SelectFeature(
            [],
            {
                //add ID
                id: 'layerSelectControl',
            }
        );

        new_map.addControl(sc);

        //------------------------------------------------------------------------
        // Action buttons
        //------------------------------------------------------------------------

        //
        // ZoomToMaxExtent control, a "button" control
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: new_map,
            text: "max extent",
            tooltip: "zoom to max extent"
        })));

        items.push("-");

        //
        // Navigation control
        items.push(Ext.create('Ext.button.Button',Ext.create('GeoExt.Action', {
            text: "nav",
            control: new OpenLayers.Control.Navigation(),
            map: new_map,
            // button options
            toggleGroup: "draw",
            allowDepress: false,
            pressed: true,
            tooltip: "navigate",
            // check item options
            group: "draw",
            checked: true
        })));

        items.push("-");

        //
        // Navigation history - two "button" controls
        ctrl = new OpenLayers.Control.NavigationHistory();
        new_map.addControl(ctrl);

        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "previous",
            control: ctrl.previous,
            disabled: true,
            tooltip: "previous in history"
        })));

        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "next",
            control: ctrl.next,
            disabled: true,
            tooltip: "next in history"
        })));
        items.push("->");

        //
        // Edits buttons
        //items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
        //    text: "SAVE",
        //    handler: function() {
        //        Ufors.commitChanges();
        //        saveStrategy.save();
        //    }
        //})));

        //
        // Help action
        items.push(
            Ext.create('Ext.button.Button', Ext.create('SIF360.view.help.Action', {
                windowContentEl: "help"
            }))
        );



        //--------------------------------------------------------------------------
        // create panelmap view
        //--------------------------------------------------------------------------

        var pm = new SIF360.view.Map({
            map: new_map,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: items,
                style: {
                    border: 0,
                    padding: 0
                }
            }]
        });

        // add panelmap  to westRegion
        var cr = Ext.getCmp('centerRegion');
        cr.add([pm]);

        console.log(pm);
        console.log('map created');

        this.fireEvent('map_created');


    },

    destroyMap: function() {
        Ext.apply('panelmap', {
            map: null,
            dockedItems: [{

            }]
        });

        this.fireEvent('map_destroyed');
        console.log('map destroyed');
    }


});
