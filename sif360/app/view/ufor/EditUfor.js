(function() {
    Ext.define('SIF360.view.ufor.EditUfor', {
        extend: 'Ext.window.Window',
        alias:  'widget.uforeditufor',
        width:  700,
        //height: 500,
        title:  'Dati Ufor',
        layout: 'fit',
        layoutConfig : {
           //align : 'stretch'
        },
        autoShow: true,
        frame: true,
        modal:  true,
        constrain: true,
        store:  'ufor.TableUforS',

        initComponent: function() {
            this.items = [
                {
                    xtype: 'form',
                    items: [
                        fieldsetContainer,
                        tabPanel
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
                    scope: this,
                    handler: this.close
                }
            ];

            this.callParent(arguments);
        }
    });

    /**
     * When combo box is used on a form with dynamic store (remote mode)
     * then sometimes the combobox store would load after the form data.
     * And in that case the setValue method of combobox will not
     * set the combobox value properly. This override makes sure that the
     * combobox store is completely loaded before calling the setValue method.
     */


    // clone an existing store
    function deepCloneStore (source) {
        source = Ext.isString(source) ? Ext.data.StoreManager.lookup(source) : source;

        var target = Ext.create(source.$className, {
            model: source.model,
        });

        target.add(Ext.Array.map(source.getRange(), function (record) {
            return record.copy();
        }));

        return target;
    }

    // clone LookuptableS store
    // bind new store to field
    // filter llokuptable to specific values of field
    function lkt_init_store(queryEvent, table_n, field_n) {
        var lkt_store = Ext.getStore('lookuptable.LookuptableS');
        var field_lkt_store = deepCloneStore (lkt_store)
        queryEvent.bindStore(field_lkt_store);
        queryEvent.store.clearFilter();
        queryEvent.store.filter("table_n",table_n,false,true);
        queryEvent.store.filter("field_n",field_n,false,true);

    }

    //
    // Combo with shared single database lookup table
    //
    Ext.define('lktCombo', {
        extend : 'Ext.form.ComboBox',
        xtype: 'lktcombo',
        queryMode : 'local',
        displayField : 'text_v',
        valueField: 'code_v',
        editable: false,
        lkt_table: "",
        lkt_field: "",
        listeners: {
          beforerender: function(queryEvent, eOpts) {
            lkt_init_store(queryEvent,queryEvent.lkt_table,queryEvent.lkt_field);
          }
        },
    });

    //
    // START OF FORM DEFINITION
    //



    var fieldsetUfor = {
        xtype: 'fieldset',
        title : 'UFOR',
        flex: 1,
        border: false,
        bodyStyle : 'padding:6px 6px 0',
        //layout       : 'fit',
        defaultType : 'field',
        defaults : {
            xtype : 'textfield',
            labelWidth : 150
        },
        items : [
                {
                    fieldLabel : 'Numero UFOR',
                    name : 'n_ufor'
                },
                {
                    fieldLabel : 'Strato',
                    name : 'n_strato'
                },
        ]
    };

    var fieldsetDatiGenerali = {
        xtype: 'fieldset',
        title : 'Dati generali',
        flex: 1,
        border: false,
        bodyStyle : 'padding:6px 6px 0',
        //layout       : 'fit',
        defaultType : 'field',
        defaults : {
            xtype : 'textfield',
            labelWidth : 150
        },
        items : [
                {
                    fieldLabel : 'Uso del suolo forestale',
                    name : 'uso_for',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "uso_for",

                },
                {
                    fieldLabel : 'Specifica uso suolo',
                    name : 'spec_uso',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "spec_uso",

                },
                {
                    fieldLabel : 'Tipo forestale',
                    name : 't_for',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "t_for",

                },
                {
                    fieldLabel : 'Governo',
                    name : 'gov',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "gov",

                }
        ]
    };

    var fieldsetContainer = {
        xtype        : 'container',
        layout       : 'hbox',
        layoutConfig : {
           align : 'stretch'
        },
        items  : [
            fieldsetUfor,
            fieldsetDatiGenerali
        ]
    };




    var tabs = [
        {
            xtype : 'fieldcontainer',
            title : 'Copertura',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'textfield',
                labelWidth : 200
            },
            layout       : 'fit',

            items : [
                {
                    fieldLabel : 'Distribuzione orizzontale',
                    name : 'dis_or',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "dis_or",

                },
                {
                    fieldLabel : 'Presenza strato secondario',
                    name : 'str2',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "str2",

                },
                {
                    fieldLabel : 'Piano strato secondario',
                    name : 'pia_str2',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "pia_str2",

                },
                {
                    fieldLabel : 'H seperazione strati (m)',
                    name : 'h_sep_s'
                },
                {
                    fieldLabel : 'Copertura strato principale (%)',
                    name : 'cop_str1'
                },
                {
                    fieldLabel : 'Copertura strato secondario (%)',
                    name : 'cop_str2'
                },

            ]
        },
        {
            xtype : 'fieldcontainer',
            title : 'Fustaia',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'textfield',
                labelWidth : 200
            },
            layout       : 'fit',

            items : [
                {
                    fieldLabel : 'Struttura verticale',
                    name : 'str_ver',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "str_ver",

                },
                {
                    fieldLabel : 'Stadio Cronologico strato superiore',
                    name : 'cron_mbs',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "cron_mbs",

                },
                {
                    fieldLabel : 'Stadio Cronologico strato inferiore (biplano)',
                    name : 'cron_bi',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "cron_bi",

                }

            ]
        },
        {
            xtype : 'fieldcontainer',
            title : 'Ceduo',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'textfield',
                labelWidth : 200
            },
            layout       : 'fit',

            items : [
                {
                    fieldLabel : 'Stato cronologico accrescimentale',
                    name : 'cron_ced',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "cron_ced",

                },


            ]
        },
        {
            xtype : 'fieldcontainer',
            title : 'Fertilità',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'textfield',
                labelWidth : 200
            },
            layout       : 'fit',

            items : [
                {
                    fieldLabel : 'Fertilità',
                    name : 'fert',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "fert",

                },
                {
                    fieldLabel : 'Condizionamenti Est. 1',
                    name : 'con_est1',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "con_est",

                },
                {
                    fieldLabel : 'Condizionamenti Est. 2',
                    name : 'con_est2',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "con_est",

                },
                {
                    fieldLabel : 'Condizionamenti Est. 3',
                    name : 'con_est3',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "con_est",

                },
                {
                    fieldLabel : 'Condizionamenti Est. 4',
                    name : 'con_est4',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "con_est",

                },



            ]
        },
        {
            xtype : 'fieldcontainer',
            title : 'Rinnovazione',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'textfield',
                labelWidth : 200
            },
            layout       : 'fit',

            items : [
                {
                    fieldLabel : 'Presenza rinnovazione',
                    name : 'pres_rin',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "pres_rin",

                },
                {
                    fieldLabel : 'Specie in rinnovazione',
                    name : 'rin_s1s',
                    xtype: 'lktcombo',
                    lkt_table: "specie",
                    lkt_field: "specie",

                },
                {
                    fieldLabel : 'Grado di rinnovazione',
                    name : 'rin_s1p',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "rin_sp",

                },
                {
                    fieldLabel : 'Specie in rinnovazione',
                    name : 'rin_s2s',
                    xtype: 'lktcombo',
                    lkt_table: "specie",
                    lkt_field: "specie",

                },
                {
                    fieldLabel : 'Grado di rinnovazione',
                    name : 'rin_s2p',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "rin_sp",

                },
                {
                    fieldLabel : 'Specie in rinnovazione',
                    name : 'rin_s3s',
                    xtype: 'lktcombo',
                    lkt_table: "specie",
                    lkt_field: "specie",

                },
                {
                    fieldLabel : 'Grado di rinnovazione',
                    name : 'rin_s3p',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "rin_sp",

                },
                {
                    fieldLabel : 'Specie in rinnovazione',
                    name : 'rin_s4s',
                    xtype: 'lktcombo',
                    lkt_table: "specie",
                    lkt_field: "specie",

                },
                {
                    fieldLabel : 'Grado di rinnovazione',
                    name : 'rin_s4p',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "rin_sp",

                },
                {
                    fieldLabel : 'Specie in rinnovazione',
                    name : 'rin_s5s',
                    xtype: 'lktcombo',
                    lkt_table: "specie",
                    lkt_field: "specie",

                },
                {
                    fieldLabel : 'Grado di rinnovazione',
                    name : 'rin_s5p',
                    xtype: 'lktcombo',
                    lkt_table: "ufor",
                    lkt_field: "rin_sp",

                },
            ]
        },
        {
            xtype : 'fieldcontainer',
            title : 'Composizione',
            items :
            [
                {
                    xtype: 'grid',
                    title : 'Specie',
                    layout : 'fit',
                    forceFit: true,
                    store: 'ufor.TableUforCompS',
                    selType: 'rowmodel',
                    singleSelect : true,

                    columns: [
                        {
                            header: 'Specie',
                            sortable: true,
                            dataIndex: 'id_specie',
                            flex: 3,
                            renderer: function(value, metaData, record, row, col, store, gridView){
                                return lookupTextV("specie","specie",value)
                            }
                        },
                        {
                            header: 'Cop Strato principale',
                            sortable: true,
                            dataIndex: 'cop_str1',
                            flex: 3,
                            renderer: function(value, metaData, record, row, col, store, gridView){
                                return lookupTextV("ufor_comp","cop_str",value)
                            }
                        },
                        {
                            header: 'Cop Strato secondario',
                            sortable: true,
                            dataIndex: 'cop_str2',
                            flex: 3,
                            renderer: function(value, metaData, record, row, col, store, gridView){
                                return lookupTextV("ufor_comp","cop_str",value)
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            flex: 1,
                            items: [{
                                icon: 'resources/images/icons/Modify.gif',
                                handler: function(grid, rowIndex, colindex) {
                                    var store = grid.getStore();
                                    var record = grid.getStore().getAt(rowIndex);
                                    var view = Ext.widget('uforeditcomposizione');
                                    view.down('form').loadRecord(record);
                                    view.down('fieldset').getComponent('field_id_specie').disable();
                                }
                            }]
                        },
                        {
                            xtype: 'actioncolumn',
                            flex: 1,
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
                            }]
                        }
                    ],
                    tools: [
                        {
                            type : 'plus',
                            itemId : 'addrecord',
                            callback: function(view,button,e) {
                                var newRecord = Ext.create("SIF360.model.ufor.TableUforComp");
                                newRecord.set('n_piano', SIF360.config.Runtime.getPianoSelectedId());
                                newRecord.set('n_ufor', SIF360.config.Runtime.getUforSelectedId());
                                view.store.insert(view.store.count, newRecord);
                                var edit_view = Ext.widget('uforeditcomposizione');
                                edit_view.down('form').loadRecord(newRecord);
                            }
                        }
                    ]

                }
            ]
        }
    ];

    var tabPanel = {
        xtype: 'tabpanel',
        activeTab : 0,
        deferredRender : false,
        layoutOnTabChange : true,
        border            : false,
        flex              : 1,
        plain             : true,
        items             : tabs
    }

    function lookupTextV(table_n,field_n,code_v){
        var lkt_store = Ext.getStore('lookuptable.LookuptableS');
        var record = lkt_store.queryBy(function(record,id){
             var record = (record.get('table_n') == table_n && record.get('field_n') == field_n && record.get('code_v') == code_v );
            return record;
        });
        return (record.items.length)>0?record.items[0].get("text_v"):"---";
    }

})();
