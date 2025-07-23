Ext.define('SIF360.store.piano.TablePianoS', {
    extend: 'Ext.data.Store',
    model: 'SIF360.model.piano.TablePiano',
    proxy: {
        type: 'ajax',
        api: {
            //create: 'app/php/piano/tablepiano_create.php', // Called when saving new records
            read: 'app/php/piano/tablepiano_read.php', // Called when reading existing records
            update: 'app/php/piano/tablepiano_update.php', // Called when updating existing records
            //destroy: 'app/php/piano/tablepiano_destroy.php' // Called when deleting existing records
        },
        reader: {
            type: 'json',
        },

        writer: {
            type : 'json',
            allowSingle : false,
        },

        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST',
        },

        success: function(conn, response, options, eOpts) {
            console.log('success');
            Ext.Msg.show({
                title:'Success!',
                msg: conn.responseText,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },

        failure: function(conn, response, options, eOpts) {
            console.log('failure');
            Ext.Msg.show({
                title:'Error!',
                msg: conn.responseText,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },

        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        },

    },

    listeners: {
        beforeload: function(store, operation){
            console.log("select piani for user " + SIF360.config.Runtime.getLoggedUser());
            this.proxy.extraParams['i_utente'] = SIF360.config.Runtime.getLoggedUser();
        }
    },

    autoLoad: false,
    autoDestroy: true
});
