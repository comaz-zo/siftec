Ext.define('SIF360.view.ufor.LayerList' ,{
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.uforlayerlist',
    title: 'Unità forestali',
    
    store: 'ufor.LayerUforS',
    
    columns: [
        {
            header: "N Ufor",
            dataIndex: "n_ufor",
            flex: 1
        }
    ],
    collapsed: true,
    selType: 'featuremodel'
});

