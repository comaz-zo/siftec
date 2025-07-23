Ext.define('SIF360.view.particella.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.particellaeditparticella',

    title: 'Dati Particella',
    layout: 'fit',
    autoShow: true,
    modal: true,
    store: 'particella.TableParticellaS',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'n_part',
                        disabled: true,
                        fieldLabel: 'Numero particella'
                    },
                    {
                        xtype: 'textfield',
                        name : 'n_compresa',
                        fieldLabel: 'Numero compresa'
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
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});
