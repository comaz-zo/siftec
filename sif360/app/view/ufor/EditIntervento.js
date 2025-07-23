(function() {
    Ext.define('SIF360.view.ufor.EditIntervento', {
        extend: 'Ext.window.Window',
        alias:  'widget.uforeditintervento',
        width:  700,
        //height: 500,
        title:  'Dati Intervento',
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
                        gridDesc,
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

            var cd_array=["pi","p","m","g","sg"];
            var specie_array=["PI","QC","CA","AC","LE","SU","FR","EU","ALA","ACO"];
                //v_Ha tab
            var items_string = "";

            var tin = 5; //tab index Number (inizia da utlimo tab dei fieldsetContainer)

            //
            // V_HA TAB
            //

            var v_ha_tab = this.items[0].items[2].items[0];

            while (v_ha_tab.items.length>0){v_ha_tab.items.pop();}


            //first label row
            v_ha_tab.items.push({
                xtype: 'label',
                text: "Spp./c.dim."
            });
            for (s = 0; s < 10; s++) {
                v_ha_tab.items.push({
                    xtype: 'label',
                    text: specie_array[s]
                });
            }
            v_ha_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            //data rows with row total
            var current_tin = tin;
            for (cd = 0; cd < cd_array.length; cd++) {
                v_ha_tab.items.push({
                    xtype: 'label',
                    text: cd_array[cd]
                });
                for (s = 0; s < 10; s++) {
                    var field_tin = current_tin+s*5+cd; //ordino tab per colonne e poi per righe
                    v_ha_tab.items.push({
                        xtype: 'input_numberfield',
                        name: "auv_"+cd_array[cd]+"s"+s,
                        minValue: 0,
                        tabIndex : field_tin,
                    });
                    //incremento contatore totale tab index
                    tin++;
                }
                //row total calculated field
                v_ha_tab.items.push({
                    xtype: 'calc_numberfield',
                    name:'auv_tot_'+cd_array[cd],
                });
            }
            v_ha_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            for (s = 0; s < 10; s++) {
                v_ha_tab.items.push({
                    xtype: 'calc_numberfield',
                    name: "auv_tot_s"+s,

                });
            }
            v_ha_tab.items.push({
                xtype: 'calc_numberfield',
                name: "auv_tot",
            });

            //
            // P_HA TAB
            //

            var p_ha_tab = this.items[0].items[2].items[1];

            while (p_ha_tab.items.length>0){p_ha_tab.items.pop();}


            //first label row
            p_ha_tab.items.push({
                xtype: 'label',
                text: "Spp./c.dim."
            });
            for (s = 0; s < 10; s++) {
                p_ha_tab.items.push({
                    xtype: 'label',
                    text: specie_array[s]
                });
            }
            p_ha_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            //data rows with row total
            for (cd = 0; cd < cd_array.length; cd++) {
                p_ha_tab.items.push({
                    xtype: 'label',
                    text: cd_array[cd]
                });
                for (s = 0; s < 10; s++) {
                    p_ha_tab.items.push({
                        xtype: 'calc_numberfield',
                        name: "p_"+cd_array[cd]+"s"+s
                    });
                }
                //row total calculated field
                p_ha_tab.items.push({
                    xtype: 'calc_numberfield',
                    name:'p_tot_'+cd_array[cd],
                });
            }
            p_ha_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            for (s = 0; s < 10; s++) {
                p_ha_tab.items.push({
                    xtype: 'calc_numberfield',
                    name: "p_tot_s"+s,

                });
            }
            p_ha_tab.items.push({
                xtype: 'calc_numberfield',
                name: "p_tot",
            });


            //
            // DP TAB
            //

            var dp_p_tab = this.items[0].items[2].items[2];

            while (dp_p_tab.items.length>0){dp_p_tab.items.pop();}


            //first label row
            dp_p_tab.items.push({
                xtype: 'label',
                text: "Spp./c.dim."
            });
            for (s = 0; s < 10; s++) {
                dp_p_tab.items.push({
                    xtype: 'label',
                    text: specie_array[s]
                });
            }
            dp_p_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            var current_tin = tin;
            //data rows with row total
            for (cd = 0; cd < cd_array.length; cd++) {
                dp_p_tab.items.push({
                    xtype: 'label',
                    text: cd_array[cd]
                });
                for (s = 0; s < 10; s++) {
                    var field_tin = current_tin+s*5+cd; //ordino tab per colonne e poi per righe
                    dp_p_tab.items.push({
                        xtype: 'input_numberfield',
                        name: "dp_"+cd_array[cd]+"s"+s,
                        maxValue: 100,
                        minValue: 0,
                        tabIndex : field_tin
                    });
                    //incremento contatore totale tab index
                    tin++;
                }
                //row total calculated field
                dp_p_tab.items.push({
                    xtype: 'calc_numberfield',
                    name:'dp_tot_'+cd_array[cd],
                });
            }
            dp_p_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            for (s = 0; s < 10; s++) {
                dp_p_tab.items.push({
                    xtype: 'calc_numberfield',
                    name: "dp_tot_s"+s,

                });
            }
            dp_p_tab.items.push({
                xtype: 'calc_numberfield',
                name: "dp_tot",
            });


            //
            // VP_HA TAB
            //

            var vp_ha_tab = this.items[0].items[2].items[3];

            while (vp_ha_tab.items.length>0){vp_ha_tab.items.pop();}


            //first label row
            vp_ha_tab.items.push({
                xtype: 'label',
                text: "Spp./c.dim."
            });
            for (s = 0; s < 10; s++) {
                vp_ha_tab.items.push({
                    xtype: 'label',
                    text: specie_array[s]
                });
            }
            vp_ha_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            //data rows with row total
            for (cd = 0; cd < cd_array.length; cd++) {
                vp_ha_tab.items.push({
                    xtype: 'label',
                    text: cd_array[cd]
                });
                for (s = 0; s < 10; s++) {
                    vp_ha_tab.items.push({
                        xtype: 'calc_numberfield',
                        name: "vp_"+cd_array[cd]+"s"+s
                    });
                }
                //row total calculated field
                vp_ha_tab.items.push({
                    xtype: 'calc_numberfield',
                    name:'vp_tot_'+cd_array[cd],
                });
            }
            vp_ha_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            for (s = 0; s < 10; s++) {
                vp_ha_tab.items.push({
                    xtype: 'calc_numberfield',
                    name: "vp_tot_s"+s,

                });
            }
            vp_ha_tab.items.push({
                xtype: 'calc_numberfield',
                name: "vp_tot",
            });

            //
            // PP_HA TAB
            //

            var pp_ha_tab = this.items[0].items[2].items[4];

            while (pp_ha_tab.items.length>0){pp_ha_tab.items.pop();}


            //first label row
            pp_ha_tab.items.push({
                xtype: 'label',
                text: "Spp./c.dim."
            });
            for (s = 0; s < 10; s++) {
                pp_ha_tab.items.push({
                    xtype: 'label',
                    text: specie_array[s]
                });
            }
            pp_ha_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            //data rows with row total
            for (cd = 0; cd < cd_array.length; cd++) {
                pp_ha_tab.items.push({
                    xtype: 'label',
                    text: cd_array[cd]
                });
                for (s = 0; s < 10; s++) {
                    pp_ha_tab.items.push({
                        xtype: 'calc_numberfield',
                        name: "pp_"+cd_array[cd]+"s"+s
                    });
                }
                //row total calculated field
                pp_ha_tab.items.push({
                    xtype: 'calc_numberfield',
                    name:'pp_tot_'+cd_array[cd],
                });
            }
            pp_ha_tab.items.push({
                    xtype: 'label',
                    text: "Tot"
            });
            for (s = 0; s < 10; s++) {
                pp_ha_tab.items.push({
                    xtype: 'calc_numberfield',
                    name: "pp_tot_s"+s,

                });
            }
            pp_ha_tab.items.push({
                xtype: 'calc_numberfield',
                name: "pp_tot",
            });



            this.callParent(arguments);
        }
    });



    //
    // START OF FORM DEFINITION
    //



    var fieldsetUfor = {
        xtype: 'fieldset',
        title : 'Ufor',
        flex: 1,
        border: false,
        bodyStyle : 'padding:6px 6px 0',
        layout       : 'anchor',
        defaultType : 'field',
        defaults : {
            xtype : 'input_numberfield',
            labelWidth : 150,
            anchor: '100%'
        },
        items : [
                {
                    fieldLabel : 'Numero UFOR',
                    readOnly:true,
                    fieldStyle: 'background-color: #f2f2f2; background-image: none;',
                    name : 'n_ufor'
                },
                {
                    xtype: 'calc_numberfield',
                    readOnly:true,
                    fieldLabel : 'Superficie (ha)',
                    decimalPrecision: 2,
                    name : 'area_ha',
                    tabIndex : 0
                },
                {
                    fieldLabel : 'Classe colturale',
                    name : 'n_coltura',
                    xtype: 'combo',
                    store: 'coltura.TableColturaS',
                    valueField: "n_coltura",
                    displayField: "n_coltura",
                    tabIndex : 1

                },
                {
                    fieldLabel : 'Durata del piano (anni)',
                    readOnly:true,
                    fieldStyle: 'background-color: #f2f2f2; background-image: none;',
                    name : 'piano_durata'
                },
                {
                    fieldLabel : 'Priorità',
                    name : 'priorita',
                    minValue: 0,
                    maxValue: 3,
                    tabIndex : 2
                },
                {
                    fieldLabel : 'Ritardamento priorità di piano',
                    readOnly:true,
                    fieldStyle: 'background-color: #f2f2f2; background-image: none;',
                    name : 'piano_rit_priorita'
                },
        ]
    };

    var fieldsetIntervento = {
        xtype: 'fieldset',
        title : 'Dati intervento',
        flex: 1,
        border: false,
        bodyStyle : 'padding:6px 6px 0',
        layout       : 'anchor',
        defaultType : 'field',
        defaults : {
            xtype : 'input_numberfield',
            labelWidth : 150,
            anchor: '100%'
        },
        items : [
            {
                fieldLabel : 'Stima % volume prelevato utilizzabile come legname',
                xtype: 'input_numberfield',
                name : 'legme_pv',
                maxValue: 100,
                minValue: 0,
                tabIndex : 3
            },
            {
                xtype: 'calc_numberfield',
                fieldLabel : 'Legname (m3/ha)',
                name : 'legme_vha'
            },
            {
                xtype: 'calc_numberfield',
                fieldLabel : 'Legna (t/ha)',
                name : 'legna_pha'
            },
            {
                xtype: 'calc_numberfield',
                fieldLabel : 'Legname (m3)',
                name : 'legme_v'
            },
            {
                xtype: 'calc_numberfield',
                fieldLabel : 'Legna (t)',
                name : 'legna_p'
            },
        ]
    };

    var fieldsetUtilizzazioni = {
        xtype: 'fieldset',
        title : 'Utilizzazioni',
        flex: 1,
        border: false,
        bodyStyle : 'padding:6px 6px 0',
        defaultType : 'field',
        layout       : 'anchor',
        defaults : {
            xtype : 'input_numberfield',
            labelWidth : 150,
            anchor: '100%'
        },
        items : [
            {
                fieldLabel : 'Superficie Ufor (%) percorsa per utilizzazione',
                xtype: 'input_numberfield',
                name : 'util_ps',
                maxValue: 100,
                minValue: 0,
                tabIndex : 4
            },
            {
                xtype: 'calc_numberfield',
                fieldLabel : 'Superficie per util. (ha)',
                decimalPrecision: 2,
                name : 'util_sup'
            },
            {
                xtype: 'calc_numberfield',
                fieldLabel : 'Numero utilizzazioni',
                name : 'util_n'
            },
            /*{
                xtype: 'calc_numberfield',
                fieldLabel : 'Intensità di gestione (m3/anno)',
                name : 'int_gest'
            },*/
            {
                xtype: 'calc_numberfield',
                fieldLabel : 'Intervallo anni per util.',
                name : 'util_int'
            },
            {
                xtype: 'calc_numberfield',
                fieldLabel : 'Prelievo legname (m3) per util.',
                name : 'u_legme_v'
            },
            {
                xtype: 'calc_numberfield',
                fieldLabel : 'Prelievo legna (t) per util.',
                name : 'u_legna_p'
            },


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
            fieldsetIntervento,
            fieldsetUtilizzazioni
        ]
    };

    var gridDesc = {
        xtype: 'grid',
        title : 'Descrizioni intervento',
        layout : 'fit',
        forceFit: true,
        store: 'ufor.TableUforIntDescS',
        selType: 'rowmodel',
        singleSelect : true,
        columns: [
            {
                header: 'Numero',
                sortable: true,
                dataIndex: 'n_desc',
                autoSizeColumn: true
            },
            {
                header: 'Specie',
                sortable: true,
                dataIndex: 'i_s_spp',
                autoSizeColumn: true,
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return lookupTextV("piano","specie",value)
                }
            },
            {
                header: 'Descrizione',
                sortable: true,
                dataIndex: 'i_s_dsc',
                autoSizeColumn: true,
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return lookupTextV("intervento","i_s_dsc",value)
                }
            },
            /*{
                header: 'Intensità',
                sortable: true,
                dataIndex: 'i_s_int',
                autoSizeColumn: true
            },
            {
                header: 'Tipo',
                sortable: true,
                dataIndex: 'i_s_tip',
                autoSizeColumn: true
            },
            {
                header: 'Modalità',
                sortable: true,
                dataIndex: 'i_s_mod',
                autoSizeColumn: true
            },
            {
                header: 'Strato',
                sortable: true,
                dataIndex: 'i_s_str',
                autoSizeColumn: true
            },
            {
                header: 'C. dim.',
                sortable: true,
                dataIndex: 'i_s_cdim',
                autoSizeColumn: true
            },*/
            {
                header: 'Indicazioni',
                sortable: true,
                dataIndex: 'i_s_ind',
                autoSizeColumn: true
            },
            {
                xtype: 'actioncolumn',
                width: 10,
                items: [{
                    icon: 'resources/images/icons/Modify.gif',
                    handler: function(grid, rowIndex, colindex) {
                        var store = grid.getStore();
                        var record = grid.getStore().getAt(rowIndex);
                        var view = Ext.widget('uforeditdescrizione');
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
                                    //grid.store.sync();
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
                    var newRecord = Ext.create("SIF360.model.ufor.TableUforIntDesc");
                    newRecord.set('n_piano', SIF360.config.Runtime.getPianoSelectedId());
                    newRecord.set('n_ufor', SIF360.config.Runtime.getUforSelectedId());
                    newRecord.set('n_desc',view.store.max('n_desc')+1);
                    newRecord.set('i_s_spp',-1);
                    view.store.insert(view.store.count, newRecord);
                    var edit_view = Ext.widget('uforeditdescrizione');
                    edit_view.down('form').loadRecord(newRecord);
                }
            }
        ]
    };




    var tabs = [
        {
            xtype : 'fieldcontainer',
            title : 'V inventariale (m3/ha)',
            itemId: 'v_ha_tab',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'input_numberfield',
                width: 55,

            },
            layout       : {
                type: 'table',
                columns: 12,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            items : [

            ],


        },
        {
            xtype : 'fieldcontainer',
            title : 'P inventariale (t/ha)',
            itemId: 'p_ha_tab',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'input_numberfield',
                width: 55,

            },
            layout       : {
                type: 'table',
                columns: 12,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },

            items : [

            ]
        },
        {
            xtype : 'fieldcontainer',
            title : 'Dimensionamento prelievo (%)',
            itemId: 'dp_p_tab',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'input_numberfield',
                width: 55,

            },
            layout       : {
                type: 'table',
                columns: 12,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            items : [

            ]
        },
        {
            xtype : 'fieldcontainer',
            title : 'V prelevato (m3/ha)',
            itemId: 'vp_ha_tab',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'input_numberfield',
                width: 55,

            },
            layout       : {
                type: 'table',
                columns: 12,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            items : [

            ]
        },
        {
            xtype : 'fieldcontainer',
            title : 'P prelevato (t/ha)',
            itemId: 'pp_ha_tab',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'input_numberfield',
                width: 55,

            },
            layout       : {
                type: 'table',
                columns: 12,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            items : [

            ]
        },
        /*{
            xtype : 'fieldcontainer',
            title : 'V/ha prelevato per utilizzazione (m3)',
            itemId: 'vp_ha_util_tab',
            //layout : 'form',
            bodyStyle : 'padding:6px 6px 0',
            defaults : {
                xtype : 'input_numberfield',
                width: 55,

            },
            layout       : {
                type: 'table',
                columns: 12,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },

            items : [

            ]
        },*/

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
    };


    /**

    textfield definition

    **/

    Ext.define('inputNumberField', {
        extend:'Ext.form.field.Number',
        alias:'widget.input_numberfield',
        //allowDecimals : false,
        decimalPrecision: 1,
        hideTrigger: true,
        keyNavEnabled:false,
        mouseWheelEnabled: false,
        onBlur: function(e){
            this.callParent(arguments);
            var me = this;
            var win    = me.up('window'),
                form   = win.down('form'),
                record = form.getRecord();
                //values = form.getValues();


            e.stopPropagation();

            //
            // UPDATE FIELD VALUE
            //
            record.set(me.getName(),me.lastValue);


            //
            // update record calculated fields
            //

            record.updateInterventoCalculatedFields();

            form.loadRecord(record);
        }
    });


    Ext.define('calculatedNumberField', {
        extend:'Ext.form.field.Number',
        alias:'widget.calc_numberfield',
        readOnly:true,
        fieldStyle: 'background-color: #f2f2f2; background-image: none;',
        decimalPrecision: 1,
        onAdded: function(){
                this.suspendEvents();
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
    };

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

    };

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

})();
