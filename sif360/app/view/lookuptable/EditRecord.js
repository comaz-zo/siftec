Ext.define('SIF360.view.lookuptable.EditRecord', {
    extend: 'Ext.window.Window',
    alias:  'widget.lookuptableeditrecord',
    width:  700,
    //height: 500,
    title:  'Dati Record Tabella decodifica',
    layout: 'fit',
    layoutConfig : {
       //align : 'stretch'
    },
    autoShow: true,
    frame: true,
    modal:  true,
    constrain: true,
    store:  'lookuptable.LookuptableS',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    fieldsetRecord,
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Ok',
                action: 'ok'
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




var fieldsetRecord = {
    xtype: 'fieldset',
    title : 'Record',
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
                fieldLabel: "Tabella",
                name: "table_n",
            },
            {
                fieldLabel: "Campo",
                name: "field_n",
            },
            {
                fieldLabel: "Codice",
                name: "code_v",
            },
            {
                fieldLabel: "Decodifica",
                name: "text_v",
            },

    ]
};
