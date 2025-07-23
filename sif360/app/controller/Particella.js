/**
 * Map controller
 * Used to manage map layers and showing their related views
 */

Ext.require([
    'GeoExt.selection.FeatureModel'
]);

Ext.define('SIF360.controller.Particella', {
    extend: 'Ext.app.Controller',

    models: [
        'particella.LayerParticella',
        'particella.TableParticella'
    ],
    stores: [
        'particella.LayerParticellaS',
        'particella.TableParticellaS'
    ],

    views: [
        'Map',
        'particella.LayerList',
        'particella.Edit',
    ],

    init: function() {
        var me = this;

        me.listen({
            controller: {
                 // select and close piano
                '*':{
                    map_created: me.loadStores,
                    map_destroyed: me.unloadStores,
                },
            },
            component:{
                // select particellare from menu
                'treepanel': {
                    itemclick: function(tree, record){
                        switch(record.get('id')) {
                            case 'particellare':
                                me.onMenuTreeParticellaItemSelect();
                                break;
                            default:
                        }
                    }
                },

                // double click on list row zoom to feature
                'particellalayerlist': {
                    itemclick: me.zoomFeature,
                    itemdblclick: me.editFeature,
                },

                // click on useredit save button update
                'particellaeditparticella button[action=save]': {
                    click: me.updateFeature
                },
            },

        });

        this.getParticellaTableParticellaSStore().addListener('write',this.refreshLayer, this);

        console.log('Particella controller init');

    },


    //
    // Add layer to map when piano is selected
    //

    loadStores: function(){

        var me = this;

        //
        // init Layer store and add layer to map

        /*var saveStrategy = new OpenLayers.Strategy.Save({
            onCommit: function() {
                saveStrategy.layer.refresh();
            }
        });*/

        // Add Piano layer

        vecLayer = new OpenLayers.Layer.Vector(
            "Particellare",
            {
                strategies: [new OpenLayers.Strategy.Fixed()/*,saveStrategy*/],
                protocol: new OpenLayers.Protocol.WFS({
                    version: "1.1.0",
                    url: SIF360.config.Runtime.getPianoSelectedWfsAddr(),
                    featurePrefix: 'sif360', //geoserver worspace name
                    featureType: "particella", //geoserver Layer Name
                    srsName: "EPSG:32633",
                    featureNS: "it.f360.sif360", // Edit Workspace Namespace URI
                    geometryName: "the_geog" // field in Feature Type details with type "Geometry"
                }),

                filter: new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.EQUAL_TO,
                            property: "n_piano",
                            value: SIF360.config.Runtime.getPianoSelectedId()
                }),

                styleMap: new OpenLayers.StyleMap({
                    'default':new OpenLayers.Style(
                        {
                            strokeColor: "#ff2222",
                            strokeOpacity: 1,
                            strokeWidth: 3,
                            fillColor: "#FFFFFF",
                            fillOpacity: 0,
                            //label with n_part
                            label : "${n_part}",
                            fontSize: "16px",
                            fontColor: "#ff2222",
                            fontFamily: "Courier New, monospace",
                            //fontWeight: "bold",
                        },
                        {
                            rules:[
                                new OpenLayers.Rule({
                                    minScaleDenominator: 20000,
                                    symbolizer: {
                                        strokeWidth: 1,
                                        fontSize: "0px"
                                    }
                                }),
                                new OpenLayers.Rule({
                                    maxScaleDenominator: 20000,
                                    symbolizer: {
                                        strokeWidth: 3,
                                        fontSize: "15px"
                                    }
                                })
                            ]
                        }
                    ),
                    'select':new OpenLayers.Style(
                        {
                            strokeColor: "#ff2222",
                            strokeOpacity: 1,
                            strokeWidth: 3,
                            fillColor: "#ff2222",
                            fillOpacity: 0.5,
                            //label with n_part
                            label : "${n_part}",
                            fontSize: "16px",
                            fontColor: "#ff2222",
                            fontFamily: "Courier New, monospace",
                            fontWeight: "bold",
                        },
                        {
                            rules:[
                                new OpenLayers.Rule({
                                    minScaleDenominator: 20000,
                                    symbolizer: {
                                        strokeWidth: 1,
                                        fontSize: "0px"
                                    }
                                }),
                                new OpenLayers.Rule({
                                    maxScaleDenominator: 20000,
                                    symbolizer: {
                                        strokeWidth: 3,
                                        fontSize: "15px"
                                    }
                                })
                            ]
                        }
                    )
                })
            }
        );

        // manually bind store to layer
        me.getParticellaLayerParticellaSStore().bind(vecLayer);
        console.log('Store particella bound');

        //add layer to the Map panel

        var pm = Ext.ComponentQuery.query('panelmap')[0];
        pm.map.addLayer(vecLayer);
        console.log('Layer particella added');

        //nascondi layer all'Inizio
        vecLayer.setVisibility(false);

        //add layer to map select feature control
        var sc = pm.map.getControlsBy("id", "layerSelectControl")[0];
        var currLayers = sc.layers;
        if ( currLayers != null) {
              currLayers.push(vecLayer);
              sc.setLayer(currLayers);
        } else {
              sc.setLayer([layer]);
        }

        // create particella layerlist

        var pll = new SIF360.view.particella.LayerList({
            selModel: new GeoExt.selection.FeatureModel({
                selectControl: sc
            })
        });

        // add particella layerlist to eastRegion
        var er = Ext.getCmp('eastRegion');
        er.add([pll]);

        //
        // init table store

        me.getParticellaTableParticellaSStore().load();
        console.log('Store particella table loaded');



    },

    //
    // Remove layer from map when piano is closed
    //

    unloadStores: function(){

        var me = this;

        //
        // unbind layer store and remove layer form map

        // manually unbind store to layer
        me.getParticellaLayerParticellaSStore().unbind();

        //
        // unbind table store
        me.getParticellaTableParticellaSStore().removeAll();

    },

    //
    // Show layer attribute table
    //

    onMenuTreeParticellaItemSelect: function() {

        var me = this;

        var pm = Ext.ComponentQuery.query('panelmap')[0];

        //unselect all
        var sc = pm.map.getControlsBy("id", "layerSelectControl")[0];
        sc.unselectAll();

        // expand eastRegion particella layerlist
        var pll = Ext.ComponentQuery.query('particellalayerlist')[0];
        pll.expand();




        //move on top particella layer

        var vecLayer = pm.map.getLayersByName('Particellare')[0];
        pm.map.raiseLayer(vecLayer, pm.map.layers.length);
        vecLayer.setVisibility(true);
        vecLayer.redraw();
        console.log("Strati particella select");


    },


    //
    // zoom feature managment
    //

    zoomFeature: function(grid, record) {
        //var view = Ext.widget('particellalayeredit');
        var me = this;
        var extent = record.raw.geometry.bounds;

        var pm = Ext.ComponentQuery.query('panelmap')[0];
        pm.map.zoomToExtent(extent);

    },

    //
    // edit feature managment
    //

    editFeature: function(grid, record) {
        console.log("edit particella");
        //var view = Ext.widget('particellalayeredit');
        var me = this;
        //select on store
        var tps = me.getParticellaTableParticellaSStore();
        var record = tps.getAt(tps.find('n_part',record.get('n_part')));
        var view = Ext.widget('particellaeditparticella');
        view.down('form').loadRecord(record);
    },


    updateFeature: function(button) {
        var me = this;
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        win.mask("Saving to web-database... Please wait...", 'Saving');

        record.set(values);
        var tps = me.getParticellaTableParticellaSStore();
        if(tps.getModifiedRecords().length>0){
            tps.sync({
                success:function(){
                    console.log("particella sync success");
                    win.unmask();
                    win.close();
                }
            });
        }else{
            win.unmask();
            win.close();
        }
    },

    refreshLayer: function(){
        var me = this;

        var pm = Ext.ComponentQuery.query('panelmap')[0];
        var vecLayer = pm.map.getLayersByName('Particellare')[0];
        vecLayer.refresh({force: true});
        console.log('particella layer refreshed');

    }



});
