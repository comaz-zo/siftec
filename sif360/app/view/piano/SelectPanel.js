Ext.define('SIF360.view.piano.SelectPanel', {
    extend : 'Ext.form.Panel',
    alias : 'widget.pianoselectpanel',
    

    tbar: [
        {
            xtype: 'combo',
            itemId: 'pianocombo',
            fieldLabel: 'Piano',
            allowBlank: false, 
            forceSelection : true,
            displayField: 'nome',
            valueField: 'n_piano',
            
            store: 'piano.TablePianoS'   
        },
        {
            itemId: 'select',
            text : 'Seleziona',
            formBind: true,
        },
        '->',
        {
            itemId: 'close',
            text : 'Chiudi',
            disabled: true
        }
    ]

});