Ext.define('SIF360.store.obiettivo.TableObiettivoS', {
    extend: 'Ext.data.Store',
    model: 'SIF360.model.obiettivo.TableObiettivo',
    proxy: {
        type: 'ajax',
        api: {
            create: 'app/php/obiettivo/tableobiettivo_insert.php', // Called when saving new records
            read: 'app/php/obiettivo/tableobiettivo_read.php', // Called when reading existing records
            update: 'app/php/obiettivo/tableobiettivo_update.php', // Called when updating existing records
            destroy: 'app/php/obiettivo/tableobiettivo_destroy.php' // Called when deleting existing records
        },
        reader: {
            type: 'json',
        },

        /*writer: {
            type : 'json',
            writeAllFields : true,
            allowSingle : true,
            batch : true,
            writeRecords : function(request, data) {
                request.jsonData = data;
                console.log(request);
                return request;
            }
        },*/

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
            this.proxy.extraParams['n_piano'] = SIF360.config.Runtime.getPianoSelectedId();
        },

        /*write: function(store, operation){
            this.fireEvent('store_end_write');
            console.log('store_end_write event');

        }*/
    },
    sorters: ['titolo'],


});
