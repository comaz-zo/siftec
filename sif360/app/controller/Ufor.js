/**
 * Map controller
 * Used to manage map layers and showing their related views
 */
Ext.define('SIF360.controller.Ufor', {
    extend: 'Ext.app.Controller',

    models: [
        'ufor.LayerUfor',
        'ufor.TableUfor',
        'ufor.TableUforComp',
        'ufor.TableIntervento',
    ],
    stores: [
        'ufor.LayerUforS',
        'ufor.TableUforS',
        'ufor.TableUforCompS',
        'ufor.TableUforIntDescS',
    ],

    views: [
        'Map',
        'ufor.LayerList',
        'ufor.EditUfor',
        'ufor.EditDescrizione',
        'ufor.EditComposizione',
        'ufor.GridPanelComp',
        'ufor.ListIntervento',
        'ufor.EditIntervento',
    ],

    menu_selection: "ufor",

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
                // select ufor from menu
                'treepanel': {
                    itemclick: function(tree, record){
                        item = record.get('id');
                        switch(item) {
                            case 'ufor':
                            case 'interventi':
                                me.onMenuTreeUforItemSelect(item);
                                break;
                            default:
                        }

                    }
                },

                // double click on list row zoom to feature
                'uforlayerlist': {
                    itemclick: me.zoomFeature,
                    itemdblclick: me.editFeature,
                },

                // edit ufor save
                'uforeditufor button[action=save]': {
                    click: me.updateFeature
                },

                // edit intervento save
                'uforeditintervento button[action=save]': {
                    click: me.updateIntervento
                },
                /*'uforeditintervento button[action=cancel]': {
                    click: function(button) {
                            var grid = Ext.ComponentQuery.query('uforlistintervento')[0].down('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();

                    }
                },*/

                'uforeditcomposizione button[action=ok]': {
                    click: function(button) {
                        var win    = button.up('window');
                        form   = win.down('form'),
                        record = form.getRecord(),
                        values = form.getValues();
                        record.set(values);
                        var grid = Ext.ComponentQuery.query('uforeditufor')[0].down('grid');
                        grid.getView().refresh();
                        win.close();
                    }
                },
                'uforeditcomposizione button[action=cancel]': {
                    click: function(button) {
                        var win    = button.up('window');
                        win.close();
                    }
                },

                'uforeditdescrizione button[action=ok]': {
                    click: function(button) {
                        var win    = button.up('window');
                        form   = win.down('form'),
                        record = form.getRecord(),
                        values = form.getValues();
                        record.set(values);
                        var grid = Ext.ComponentQuery.query('uforeditintervento')[0].down('grid');
                        grid.getView().refresh();
                        win.close();
                    }
                },
                'uforeditdescrizione button[action=cancel]': {
                    click: function(button) {
                        var win    = button.up('window');
                        win.close();
                    }
                },



            },

        });

        this.getUforTableUforSStore().addListener('write',this.refreshLayer, this);
        //this.getUforTableInterventoSStore().addListener('write',this.refreshLayer, this);

        console.log('Ufor controller init');

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
            "Ufor",
            {
                strategies: [new OpenLayers.Strategy.Fixed()/*,saveStrategy*/], //BBOX
                protocol: new OpenLayers.Protocol.WFS({
                    version: "1.1.0",
                    url: SIF360.config.Runtime.getPianoSelectedWfsAddr(),
                    featurePrefix: 'sif360', //geoserver worspace name
                    featureType: "ufor", //geoserver Layer Name
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
                            strokeColor: "#FFFFFF",
                            strokeOpacity: 1,
                            strokeWidth: 3,
                            fillColor: "#FFFFFF",
                            fillOpacity: 0,
                            //label with n
                            label : "${n_ufor}",
                            fontSize: "16px",
                            fontColor: "#FFFFFF",
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
                            strokeColor: "#FFFFFF",
                            strokeOpacity: 1,
                            strokeWidth: 3,
                            fillColor: "#FFFFFF",
                            fillOpacity: 0.5,
                            //label with n_part
                            label : "${n_ufor}",
                            fontSize: "16px",
                            fontColor: "#FFFFFF",
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
        // auto load sld (NOT WORKS WITH LABELS)
        /*debugger;
        var format = new OpenLayers.Format.SLD.v1_0_0_GeoServer();
        var sld = format.read(SIF360.config.Runtime.getPianoSelectedSld_ufor());
        for (var l in sld.namedLayers)
          vecLayer.styleMap.styles["default"] = sld.namedLayers[l].userStyles[0];//use 0 if there's only one user styles
        sld = format.read(SIF360.config.Runtime.getPianoSelectedSld_ufor_selected());
        for (var l in sld.namedLayers)
          vecLayer.styleMap.styles["select"] = sld.namedLayers[l].userStyles[0];//use 0 if there's only one user styles*/


        // manually bind store to layer
        me.getUforLayerUforSStore().bind(vecLayer);
        console.log('Store ufor bound');

        //add layer to the Map panel

        var pm = Ext.ComponentQuery.query('panelmap')[0];
        pm.map.addLayer(vecLayer);

        console.log('Layer ufor added');



        //add layer to map select feature control
        var sc = pm.map.getControlsBy("id", "layerSelectControl")[0];
        var currLayers = sc.layers;
        if ( currLayers != null) {
              currLayers.push(vecLayer);
              sc.setLayer(currLayers);
        } else {
              sc.setLayer([layer]);
        }

        //manage double click on layer feature
        var handler = new OpenLayers.Handler.Click(
            vecLayer, {
              click: function(evt) {
                var sel_feature = this.selectedFeatures[0];
                SIF360.config.Runtime.setUforSelectedId(sel_feature.attributes['n_ufor']);

              },
              dblclick: function(evt) {

                var sel_feature = this.selectedFeatures[0];
                SIF360.config.Runtime.setUforSelectedId(sel_feature.attributes['n_ufor']);
                me.editFeatureByNUfor(sel_feature.attributes['n_ufor']);

              }
            },{
               single: false
              ,double: true
              ,stopSingle: false
              ,stopDouble: true
            }
        );
        handler.activate();

        // create ufor layerlist

        var ull = new SIF360.view.ufor.LayerList({
            selModel: new GeoExt.selection.FeatureModel({
                selectControl: sc
            })
        });

        // add ufor layerlist to eastRegion
        var er = Ext.getCmp('eastRegion');
        er.add([ull]);
        ull.expand();


        // add ufor layerlist to eastRegion
        //var er = Ext.getCmp('eastRegion');
        //er.add([{xtype: 'uforlayerlist'}]);


        //
        // init ufor table store

        //me.getUforTableUforSStore().load();
        //console.log('Store ufor table loaded');


    },

    //
    // Remove layer from map when piano is closed
    //

    unloadStores: function(){

        var me = this;

        //
        // unbind layer store and remove layer form map

        // manually unbind store to layer
        me.getUforLayerUforSStore().unbind();


        console.log('Layer ufor removed');

        //
        // unbind table store
        me.getUforTableUforSStore().removeAll();

    },

    //
    // Show layer attribute table
    //

    onMenuTreeUforItemSelect: function(item) {

        var me = this;



        //store the menu selection
        me.menu_selection = item;

        var pm = Ext.ComponentQuery.query('panelmap')[0];

        //unselect all
        var sc = pm.map.getControlsBy("id", "layerSelectControl")[0];
        sc.unselectAll();

        // expand eastRegion ufor layerlist
        var ull = Ext.ComponentQuery.query('uforlayerlist')[0];
        ull.expand();


        //move on top ufor layer
        var vecLayer = pm.map.getLayersByName('Ufor')[0];

        //change the stylemap of ufor layer
        switch(me.menu_selection) {
            case 'ufor':
                break;

            case 'interventi':
                break;

            default:
        }

        // redraw layer
        pm.map.raiseLayer(vecLayer, pm.map.layers.length);
        vecLayer.setVisibility(true);
        vecLayer.redraw();

        console.log("ufor layer redraw");


    },


    //
    // zoom feature managment
    //

    zoomFeature: function(grid, record) {
        //var view = Ext.widget('uforlayeredit');
        var me = this;
        var extent = record.raw.geometry.bounds;

        var pm = Ext.ComponentQuery.query('panelmap')[0];
        pm.map.zoomToExtent(extent);
        console.log("zoom to feature: "+extent);

    },

    //
    // edit feature managment
    //

    editFeature: function(grid, record) {
        console.log("edit ufor");
        //var view = Ext.widget('uforlayeredit');
        var me = this;
        var selected_ufor = record.get('n_ufor');
        SIF360.config.Runtime.setUforSelectedId(selected_ufor);
        me.editFeatureByNUfor(selected_ufor);
    },

    editFeatureByNUfor: function(n_ufor) {
        // load store based on menu selction
        // select view based on menu selection
        var me = this;
        SIF360.config.Runtime.setUforSelectedId(n_ufor);
        var tps = me.getUforTableUforSStore();
        tps.load({
            scope: this,
            callback: function(){
                var record = tps.getAt(tps.find('n_ufor',n_ufor));
                switch(me.menu_selection) {
                    case 'ufor':
                        //pre-load comp store
                        var comp_store = me.getUforTableUforCompSStore();
                        comp_store.load({
                            scope: this,
                            callback: function(){
                                //open ufor edit form
                                var view = Ext.create('widget.uforeditufor');
                                view.down('form').loadRecord(record);
                            }
                        });
                        break;

                    case 'interventi':
                        //pre-loas desc interv store
                        var intdesc_store = me.getUforTableUforIntDescSStore();
                        intdesc_store.load({
                            scope: this,
                            callback: function(){
                                //open intervento edit form
                                var view = Ext.create('widget.uforeditintervento');
                                //not editable field calculus
                                record.updateInterventoCalculatedFields();
                                view.down('form').loadRecord(record);
                            }
                        });
                        break;

                    default:
                }
            }
        });
    },


    updateFeature: function(button) {
        var me = this;
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);

        var tps = me.getUforTableUforSStore();
         tps.sync();

        //sync desc
        var comp_store = me.getUforTableUforCompSStore();
        comp_store.sync();

        win.unmask();
        win.close();


    },

    refreshLayer: function(){
        var me = this;

        var pm = Ext.ComponentQuery.query('panelmap')[0];
        var vecLayer = pm.map.getLayersByName('Ufor')[0];
        vecLayer.refresh({force: true});
        console.log('ufor layer refreshed');
    },

    updateIntervento: function(button) {
        debugger;
        var me = this;
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        win.mask("Saving to web-database... Please wait...", 'Saving');

        record.set(values);

        var tps = me.getUforTableUforSStore();
        tps.sync();

        //sync desc
        var intdesc_store = me.getUforTableUforIntDescSStore();
        intdesc_store.sync();

        win.unmask();
        win.close();
    },
});
