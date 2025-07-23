Ext.define('SIF360.store.ufor.TableInterventoS', {
    extend: 'Ext.data.Store',
    model: 'SIF360.model.ufor.TableIntervento',
    storeId: 'tableInterventoS',
    proxy: {
        type: 'ajax',
        api: {
            create: 'app/php/ufor/tableintervento_insert.php', // Called when saving new records
            read: 'app/php/ufor/tableintervento_read.php', // Called when reading existing records
            update: 'app/php/ufor/tableintervento_update.php', // Called when updating existing records
            destroy: 'app/php/ufor/tableintervento_destroy.php' // Called when deleting existing records
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
            this.proxy.extraParams['n_ufor'] = SIF360.config.Runtime.getUforSelectedId();
        },
        
        /*write: function(store, operation){
            this.fireEvent('store_end_write');
            console.log('store_end_write event');
            
        }*/
        /*datachanged: {
            fn: function(store, rec, op, fields, details, eOpts){
                // run this only if desired fields have changed
                if (fields && fields.some(function(item){
                        return /^amount/.test(item); // if field name starts with 'amount'
                        //return ['field_1', 'or_field_2', 'percentage_3'].indexOf(item) >= 0; // validation based on custom names, of course that still can be done using RegEx
                  })
                ) {
                    // custom number round function, see bellow why
                    var total = Ext.Number.round(rec.get('amount_one') * rec.get('amount_two') / 100);

                    rec.set('total', total);
                }

                var cd_array=["pi","p","m","g","sg"];
                var s_tot_array=[0,0,0,0,0,0,0,0,0,0];
                var tot = 0;
                for (cd = 0; cd < cd_array.length; cd++) {
                    var cd_tot = 0
                    for (s = 0; s < 10; s++) {
                        var auv =  store.get('auv_'+cd_array[cd]+'s'+s);
                        cd_tot += auv;
                        s_tot_array[s] += auv;
                        tot += auv;
                    }
                    store.set('auv_tot_'+cd_array[cd],cd_tot);
                }
                for (s = 0; s < 10; s++) {
                    store.set('auv_tot_s'+s,s_tot_array[s]);
                }
                store   .set('auv_tot',tot);
            },
            single: true
        }*/
    },
    sorters: ['n_interv'],
    
    
});