Ext.define('SIF360.controller.Obiettivo', {
    extend: 'Ext.app.Controller',

    id:'controllerobiettivo',

    models: [
        'obiettivo.TableObiettivo',
    ],
    stores: [
        'obiettivo.TableObiettivoS',
    ],

    views: [
        'obiettivo.ListObiettivo',
        'obiettivo.EditObiettivo',
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

                // click on obiettivo gridpanel
                'obiettivolistobiettivo gridpanel': {
                    //containercontextmenu: me.grid_obiettivo_container_doRowCtxMenu,
                },



                // click on editobiettivo save button update
                'obiettivoeditobiettivo button[action=save]': {
                    click: function(button) {
                        var me = this;
                        var win    = button.up('window'),
                            form   = win.down('form'),
                            record = form.getRecord(),
                            values = form.getValues();

                        win.mask("Saving to web-database... Please wait...", 'Saving');

                        record.set(values);

                        var tps = me.getObiettivoTableObiettivoSStore();
                        if(tps.getModifiedRecords().length>0){
                            tps.sync({
                                success:function(){
                                    console.log("obiettivo sync ended");
                                    win.unmask();
                                    win.close();
                                },
                            });
                        }else{
                            win.unmask();
                            win.close();
                        }
                    }
                },
                'obiettivoeditobiettivo button[action=cancel]': {
                    click: function(button) {
                            var grid = Ext.ComponentQuery.query('obiettivolistobiettivo')[0].down('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();

                    }
                },

            },
        });

        console.log('Obiettivo controller init');

    },

    loadStores: function(){

        var me = this;
        me.getObiettivoTableObiettivoSStore().load();
        console.log('Store obiettivo loaded');
    },

    unloadStores: function(){

        var me = this;

        //
        // unbind table store
        me.getObiettivoTableObiettivoSStore().removeAll();
        console.log('Store obiettivo unloaded');
    },

});
