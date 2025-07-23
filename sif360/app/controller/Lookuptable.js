Ext.define('SIF360.controller.Lookuptable', {
    extend: 'Ext.app.Controller',
    
    id:'controllerlookuptable',

    models: [
        'lookuptable.Lookuptable',
    ],
    stores: [
        'lookuptable.LookuptableS',
    ],
    
    views: [
        'lookuptable.ListRecord',
        'lookuptable.EditRecord',
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
                'lookuptableeditrecord button[action=ok]': {
                    click: function(button) {
                        var win    = button.up('window');
                        form   = win.down('form'),
                        record = form.getRecord(),
                        values = form.getValues();
                        record.set(values);
                        var grid = Ext.ComponentQuery.query('lookuptablelistrecord')[0].down('grid'); 
                        grid.getView().refresh();
                        win.close();
                    } 
                },
                'lookuptableeditrecord button[action=cancel]': {
                    click: function(button) {
                        var win    = button.up('window');
                        win.close();
                    }
                },
                
                
                'lookuptablelistrecord button[action=save]': {
                    click: function(button) {
                        var win    = button.up('window');
                        var me = this;
                        me.getLookuptableLookuptableSStore().sync();
                        win.close();
                    } 
                },
                'lookuptablelistrecord button[action=cancel]': {
                    click: function(button) {
                        var win    = button.up('window');
                        win.close();
                    }
                },
                

            }, 
        });
        
        console.log('Lookputable controller init');
        
    },
    
    loadStores: function(){
        
        var me = this;
        me.getLookuptableLookuptableSStore().load();
        console.log("Store Lookuptable loaded ");
    },
    
    unloadStores: function(){
        
        var me = this;

        //
        // unbind table store 
        me.getLookuptableLookuptableSStore().removeAll();
        console.log('Store Lookuptable unloaded');
    },

});
    