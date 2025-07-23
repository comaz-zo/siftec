Ext.define('SIF360.view.Viewport', {
    extend: 'Ext.Viewport',
    layout: 'border',
    defaults : {
        frame : true,
        split : true
    },
    requires: [
        'Ext.layout.container.Border',
        'Ext.resizer.Splitter',
        'SIF360.view.Header',
        'SIF360.view.login.LoginPanel',
        'SIF360.view.piano.SelectPanel',
        'SIF360.view.menu.Tree',
        'SIF360.view.Map',
        'SIF360.view.particella.LayerList',
        'SIF360.view.ufor.LayerList'
    ],

    items: [
        {
            xtype: 'panel',
            border: false,
            layout: 'fit',
            region : 'north',
            dockedItems: [
                {
                    xtype : 'sif360header',

                },
                {
                    xtype : 'loginloginpanel',
                     region : 'north',
                },
                {
                    xtype : 'pianoselectpanel',
                    region : 'north',
                }
            ]
        },
        {
            xtype : 'container',
            region : 'west',
            layout : 'fit',
            id : 'westRegion',
            width : 150,
            minWidth : 150,
            maxWidth : 300,
            hidden: true,
            items : {
                xtype : 'menutree',
            }
        },
        {
            xtype : 'container',
            region : 'center',
            layout : 'fit',
            id : 'centerRegion',
            hidden: true,
            items : [

            ]
        },
        {
            xtype : 'container',
            region : 'east',
            layout : 'accordion',
            id : 'eastRegion',
            width : 150,
            minWidth : 150,
            hidden: true,
            //maxWidth : 300,
            items : [

            ]
        }
    ],

    initComponent: function() {


        console.log('init viewport');
        this.callParent(arguments);


    }
});
