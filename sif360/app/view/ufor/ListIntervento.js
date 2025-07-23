Ext.define('SIF360.view.ufor.ListIntervento' ,{
    extend: 'Ext.window.Window', 
    alias: 'widget.uforlistintervento',
    title: 'Elenco intervento della ufor',   
    
    height : 350,
    width  : 550,
    
    autoShow: true, 
    frame: false,
    modal:  true,
    border: false,
    layout : 'fit',
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'gridpanel',
                //alias: 'widget.obiettivogridobiettivo',
                store: 'ufor.TableInterventoS',  
                columns: [
                    {
                        header: "Intervento",
                        dataIndex: "n_interv",
                        flex: 1
                    },
                    {
                        header: "Obiettivo",
                        dataIndex: "n_obiett",
                        flex: 1,
                    },
                    {
                        header: "Missione",
                        dataIndex: "n_mis",
                        flex: 1
                    },
                    {
                        xtype: 'actioncolumn',
                        width: 40,
                        items: [{
                            icon: 'resources/images/icons/Modify.gif',
                            handler: function(grid, rowIndex, colindex) {
                                var record = grid.getStore().getAt(rowIndex);
                                var view = Ext.widget('uforeditintervento');
                                record.updateInterventoCalculatedFields();
                                view.down('form').loadRecord(record);
                            }
                        }]
                    },
                    {
                        xtype: 'actioncolumn',
                        width: 40,
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
                        }]
                    }
                ],

                loadMask: true,
                selType: 'rowmodel',
                singleSelect : true,
                stripeRows   : true,
                bbar: {
                    xtype : 'pagingtoolbar',
                    store: 'ufor.TableInterventoS',
                    dock: 'bottom',
                    displayInfo : true
                },
                listeners    : {
                    containercontextmenu: function(view, e) {
                        e.stopEvent();
                        if (!view.conCtxMenu) { 
                            view.conCtxMenu = Ext.create('Ext.menu.Menu', {
                                items : [
                                    {
                                        text    : 'Insert Record',
                                        handler : function(){
                                            var newIntervento = Ext.create("SIF360.model.ufor.TableIntervento");
                                            newIntervento.set('n_piano', SIF360.config.Runtime.getPianoSelectedId());
                                            newIntervento.set('n_ufor', SIF360.config.Runtime.getUforSelectedId());
                                            view.store.insert(view.store.count, newIntervento);
                                            var edit_view = Ext.widget('uforeditintervento');
                                            edit_view.down('form').loadRecord(newIntervento);
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
                }
            }
        ];

        this.buttons = [

        ];

        this.callParent(arguments);
    }
});

