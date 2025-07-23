Ext.define('SIF360.view.particella.LayerList' ,{
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.particellalayerlist',
    title: 'Particellare',
    
    store: 'particella.LayerParticellaS',
    
    columns: [
        {
            header: "N Particella",
            dataIndex: "n_part",
            flex: 1
        }
    ],
    collapsed: true,
    selType: 'featuremodel'
});