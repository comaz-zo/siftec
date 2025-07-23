(function() {
    Ext.define('SIF360.view.obiettivo.ListObiettivo' ,{
        extend: 'Ext.window.Window',
        alias: 'widget.obiettivolistobiettivo',
        title: 'Elenco obiettivi del piano',

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
                    store: 'obiettivo.TableObiettivoS',
                    columns: [
                        /*{
                            header: "ID",
                            dataIndex: "n_obiett",
                            flex: 1
                        },*/
                        {
                            header: "Obiettivo",
                            dataIndex: "titolo",
                            flex: 5,
                        },
                        {
                            header: "Tipo",
                            dataIndex: "tipo",
                            flex: 3,
                            sortable: true,
                            autoSizeColumn: true,
                            renderer: function(value, metaData, record, row, col, store, gridView){
                                return lookupTextV("obiettivo","tipo",value)
                            }
                        },
                        {
                            header: "Sotto tipo",
                            dataIndex: "sub_tipo",
                            flex: 3,
                            sortable: true,
                            autoSizeColumn: true,
                            renderer: function(value, metaData, record, row, col, store, gridView){
                                return lookupTextV("obiettivo","sub_tipo",value)
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            //width: 40,
                            items: [{
                                icon: 'resources/images/icons/Modify.gif',
                                handler: function(grid, rowIndex, colindex) {
                                    var record = grid.getStore().getAt(rowIndex);
                                    var view = Ext.widget('obiettivoeditobiettivo');
                                    view.down('form').loadRecord(record);
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
                                                grid.store.sync();
                                            }
                                       }
                                    );
                                }
                            }],
                            flex: 1
                        }
                    ],

                    loadMask: true,
                    selType: 'rowmodel',
                    singleSelect : true,
                    stripeRows   : true,
                    bbar: {
                        xtype : 'pagingtoolbar',
                        store: 'obiettivo.TableObiettivoS',
                        dock: 'bottom',
                        displayInfo : true
                    },
                    /*listeners    : {
                        containercontextmenu: function(view, e) {
                            e.stopEvent();
                            if (!view.conCtxMenu) {
                                view.conCtxMenu = Ext.create('Ext.menu.Menu', {
                                    items : [
                                        {
                                            text    : 'Insert Record',
                                            handler : function(){
                                                var newObiettivo = Ext.create("SIF360.model.obiettivo.TableObiettivo");
                                                newObiettivo.set('n_piano', SIF360.config.Runtime.getPianoSelectedId());
                                                view.store.insert(view.store.count, newObiettivo);
                                                var edit_view = Ext.widget('obiettivoeditobiettivo');
                                                edit_view.down('form').loadRecord(newObiettivo);
                                            }
                                        },
                                    ]
                                });
                            }
                            view.conCtxMenu.showAt(e.getXY());
                        },
                        destroy         : function(thisGrid) {
                            if (thisGrid.conCtxMenu) {
                                thisGrid.conCtxMenu.destroy();
                            }
                        }
                    },*/
                    tools: [
                        {
                            type : 'plus',
                            itemId : 'addrecord',
                            callback: function(view,button,e) {
                                var newObiettivo = Ext.create("SIF360.model.obiettivo.TableObiettivo");
                                newObiettivo.set('n_piano', SIF360.config.Runtime.getPianoSelectedId());
                                view.store.insert(view.store.count, newObiettivo);
                                var edit_view = Ext.widget('obiettivoeditobiettivo');
                                edit_view.down('form').loadRecord(newObiettivo);
                            }
                        }
                    ]
                }
            ];

            this.buttons = [

            ];

            this.callParent(arguments);
        },



    });


    /**
        Grid Lookup render function
    */

    function lookupTextV(table_n,field_n,code_v){
        var lkt_store = Ext.getStore('lookuptable.LookuptableS');
        var record = lkt_store.queryBy(function(record,id){
            var record = (record.get('table_n') == table_n && record.get('field_n') == field_n && record.get('code_v') == code_v );
            return record;
        });
        return (record.items.length)>0?record.items[0].get("text_v"):"---";
    }


})();
