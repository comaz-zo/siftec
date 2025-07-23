Ext.define('SIF360.controller.Coltura', {
    extend: 'Ext.app.Controller',

    id:'controllercoltura',

    models: [
        'coltura.TableColtura',
        'coltura.TableColturaSys',
    ],
    stores: [
        'coltura.TableColturaS',
        'coltura.TableColturaSysS',
    ],

    views: [
        'coltura.ListColtura',
        'coltura.ListColturaSys',
        'coltura.EditColtura',
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

                // click on coltura gridpanel
                'colturalistcoltura gridpanel': {
                    //containercontextmenu: me.grid_coltura_container_doRowCtxMenu,
                },
                'treepanel': {
                    itemclick: function(tree, record){
                        item = record.get('id');
                        switch(item) {
                          case 'coltura':

                              var view = Ext.widget('colturalistcoltura');

                              break;
                            case 'coltura_sys':
                                    me.getColturaTableColturaSysSStore().load();
                                    var view = Ext.widget('colturalistcolturasys');

                                    break;
                            default:
                        }

                    }
                },




                // click on editcoltura save button update
                'colturaeditcoltura button[action=save]': {
                    click: function(button) {
                        var me = this;
                        var win    = button.up('window'),
                            form   = win.down('form'),
                            record = form.getRecord(),
                            values = form.getValues();

                        win.mask("Saving to web-database... Please wait...", 'Saving');

                        record.set(values);

                        var tps = me.getColturaTableColturaSStore();
                        if(tps.getModifiedRecords().length>0){
                            tps.sync({
                                success:function(){
                                    console.log("coltura sync ended");
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
                'colturaeditcoltura button[action=cancel]': {
                    click: function(button) {
                            var grid = Ext.ComponentQuery.query('colturalistcoltura')[0].down('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();

                    }
                },

            },
        });

        console.log('Coltura controller init');

    },

    loadStores: function(){

        var me = this;
        me.getColturaTableColturaSStore().load();
        console.log('Store coltura loaded');
    },

    unloadStores: function(){

        var me = this;

        //
        // unbind table store
        me.getColturaTableColturaSStore().removeAll();
        console.log('Store coltura unloaded');
    },

});
