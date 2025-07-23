(function() {
    Ext.define('SIF360.view.lookuptable.ListRecord' ,{
        extend: 'Ext.window.Window',
        alias: 'widget.lookuptablelistrecord',
        title: 'Tabella decodifica del piano',

        height : 350,
        width  : 550,

        autoShow: true,
        frame: false,
        modal:  true,
        constrain: true,
        border: false,
        layout : 'fit',

        initComponent: function() {
            this.items = [
                {
                    xtype: 'gridpanel',
                    //alias: 'widget.obiettivogridobiettivo',
                    store: 'lookuptable.LookuptableS',
                    plugins: [
                        Ext.create('Ext.grid.plugin.RowEditing', {
                            clicksToMoveEditor: 1,
                            autoCancel: false,
                            /*listeners: {
                                validateedit: function( editor, context, e){
                                    grid_store = context.grid.getStore();

                                    key_uniqueness = grid_store.queryBy(function(record,id){
                                        return (record.get('table_n') == context.newValues.table_n && record.get('field_n') == context.newValues.field_n && record.get('code_v') == context.newValues.code_v);
                                    }).length;
                                    if(key_uniqueness>1){
                                        Ext.Msg.alert('Edit', 'Modifica annullata: valori tabella, campo, codice duplicati.');
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }
                            }*/
                        })
                    ],

                    columns: [
                        {
                            header: "Tabella",
                            dataIndex: "table_n",
                            flex: 2,
                            /*editor: {
                                // defaults to textfield if no xtype is supplied
                                allowBlank: false
                            }*/
                        },
                        {
                            header: "Campo",
                            dataIndex: "field_n",
                            flex: 2,
                            /*editor: {
                                // defaults to textfield if no xtype is supplied
                                allowBlank: false
                            }*/
                        },
                        {
                            header: "Codice",
                            dataIndex: "code_v",
                            flex: 1,
                            /*editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowBlank: false
                            }*/
                        },
                        {
                            header: "Decodifica",
                            dataIndex: "text_v",
                            flex: 3,
                            editor: {
                                // defaults to textfield if no xtype is supplied
                                allowBlank: true
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            //width: 40,
                            items: [{
                                icon: 'resources/images/icons/Modify.gif',
                                handler: function(grid, rowIndex, colindex, item, e, record) {
                                    var record = grid.getStore().getAt(rowIndex);
                                    //var view = Ext.widget('lookuptableeditrecord');
                                    //view.down('form').loadRecord(record);
                                    plugin = grid.editingPlugin;
                                    plugin.startEdit(record,0);
                                }
                            }],
                            flex: 1
                        },
                        {
                            xtype: 'actioncolumn',
                            //width: 40,
                            items: [{
                                icon: 'resources/images/icons/Delete.gif',
                                handler: function(grid, rowIndex, colindex) {
                                    var record = grid.getStore().getAt(rowIndex);
                                    Ext.MessageBox.confirm(
                                       'Confirm delete',
                                       'Are you sure?',
                                       function(btn) {
                                            if (btn == 'yes') {
                                                grid.store.remove(record);
                                            }
                                       }
                                    );
                                }
                            }],
                            flex: 1
                        }
                    ],

                    features: [{
                        ftype: 'grouping',
                        // You can customize the group's header.
                        groupHeaderTpl: '{name} ({children.length})',
                        enableNoGroups:true,
                        enableGroupingMenu : false,
                        startCollapsed:false,
                        collapsible : false
                    }],



                    stripeRows   : true,



                    tools: [
                        {
                            type : 'plus',
                            itemId : 'addrecord',
                            callback: function(view,button,e) {
                                var newRecord = Ext.create("SIF360.model.lookuptable.Lookuptable");
                                newRecord.set('n_piano', SIF360.config.Runtime.getPianoSelectedId());
                                view.store.insert(view.store.count, newRecord);
                                var edit_view = Ext.widget('lookuptableeditrecord');
                                edit_view.down('form').loadRecord(newRecord);
                            }
                        }
                    ]
                }
            ];

            this.buttons = [
                {
                    text: 'Save',
                    action: 'save'
                },
                {
                    text: 'Cancel',
                    action: 'cancel',
                }
            ];

            this.callParent(arguments);
        },



    });

})();
