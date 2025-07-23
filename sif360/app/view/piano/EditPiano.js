Ext.define('SIF360.view.piano.EditPiano', {
    extend: 'Ext.window.Window',
    alias:  'widget.pianoeditpiano',
    width:  700,
    //height: 500,
    title:  'Dati Piano',
    layout: 'fit',
    layoutConfig : {
       //align : 'stretch'
    },
    autoShow: true,
    frame: true,
    modal:  true,
    constrain: true,
    store:  'piano.TablePianoS',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    tabPanel,
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
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});


//
// START OF FORM DEFINITION
//


var tabs = [
    {
        xtype : 'fieldcontainer',
        title : 'Dati Piano',
        //layout : 'form',
        bodyStyle : 'padding:6px 6px 0',
        defaults : {
            xtype : 'textfield',
            labelWidth : 200
        },
        layout       : 'fit',

        items : [
            {
                fieldLabel : 'ID Piano',
                name : 'n_piano',
                disabled: true
            },
            {
                fieldLabel : 'Proprieta',
                name : 'proprieta'
            },
            {
                fieldLabel : 'Nome',
                name : 'nome'
            },
            {
                fieldLabel : 'Anno Inizio',
                name : 'anno_in'
            },
            {
                fieldLabel : 'Anno Scadenza',
                name : 'anno_val'
            },
            {
                fieldLabel : 'Ritardamento priorità di piano',
                name : 'rit_priorita'
            },

        ]
    },
    {
        xtype : 'fieldcontainer',
        title : 'Sistema riferimento',
        //layout : 'form',
        bodyStyle : 'padding:6px 6px 0',
        defaults : {
            xtype : 'textfield',
            labelWidth : 200
        },
        layout       : 'fit',

        items : [

            {
                fieldLabel : 'EPSG originario dati',
                name : 'orig_epsg'
            },
            {
                fieldLabel : 'EPSG visualizzazione dati',
                name : 'dest_epsg'
            },
            {
                fieldLabel : 'Extent left',
                name : 'bound_l'
            },
            {
                fieldLabel : 'Extent bottom',
                name : 'bound_b'
            },
            {
                fieldLabel : 'Extent right',
                name : 'bound_r'
            },
            {
                fieldLabel : 'Extent top',
                name : 'bound_t'
            },

        ]
    },
    {
        xtype : 'fieldcontainer',
        title : 'WMS/WFS layers',
        //layout : 'form',
        bodyStyle : 'padding:6px 6px 0',
        defaults : {
            xtype : 'textfield',
            labelWidth : 200
        },
        layout       : 'fit',

        items : [

            {
                fieldLabel : 'Ortofoto: indirizzo WMS',
                name : 'ofd_wms'
            },
            {
                fieldLabel : 'Ortofoto: nome layer',
                name : 'ofd_layer'
            },
            {
                fieldLabel : 'Ortofoto: attribuzione layer',
                name : 'ofd_layer_attr'
            },
            {
                fieldLabel : 'Altri layer: indirizzo WMS',
                name : 'wms_addr'
            },
            {
                fieldLabel : 'CHM: nome layer',
                name : 'wms_chm_layer'
            },
            {
                fieldLabel : 'CHM: attribuzione layer',
                name : 'wms_chm_layer_attr'
            },
            {
                fieldLabel : 'Raster Volume secco/ha: nome layer',
                name : 'wms_volume_ha_layer'
            },
            {
                fieldLabel : 'Raster Volume secco/ha: attribuzione layer',
                name : 'wms_volume_ha_layer_attr'
            },
            {
                fieldLabel : 'Raster Peso secco/ha: nome layer',
                name : 'wms_peso_secco_ha_layer'
            },
            {
                fieldLabel : 'Raster Peso secco/ha: attribuzione layer',
                name : 'wms_peso_secco_ha_layer_attr'
            },
            {
                fieldLabel : 'Layer WFS: indirizzo',
                name : 'wfs_addr'
            },
        ]
    },
    /*{
        xtype : 'fieldcontainer',
        title : 'SLD styles',
        //layout : 'form',
        bodyStyle : 'padding:6px 6px 0',
        defaults : {
            xtype : 'textfield',
            labelWidth : 200
        },
        layout       : 'fit',

        items : [
            {
                fieldLabel : 'Stile Piano',
                xtype     : 'textareafield',
                name : 'sld_piano'
            },
            {
                fieldLabel : 'Stile Particella',
                xtype     : 'textareafield',
                name : 'sld_particella'
            },
            {
                fieldLabel : 'Stile Particella selezionata',
                xtype     : 'textareafield',
                name : 'sld_particella_selected'
            },
            {
                fieldLabel : 'Stile UFOR',
                xtype     : 'textareafield',
                name : 'sld_ufor'
            },
            {
                fieldLabel : 'Stile UFOR selezionata',
                xtype     : 'textareafield',
                name : 'sld_ufor_selected'
            },
            {
                fieldLabel : 'Stile UFOR priorità',
                xtype     : 'textareafield',
                name : 'sld_priorita'
            },
            {
                fieldLabel : 'Stile Classi colturali',
                xtype     : 'textareafield',
                name : 'sld_coltura'
            }

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
