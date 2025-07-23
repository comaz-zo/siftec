Ext.define('SIF360.view.ufor.GridPanelComp', { 
    extend: 'Ext.grid.Panel',
    store: 'ufor.TableUforCompS',  
    alias:  'widget.uforgridpanelcomp',  
    selType: 'rowmodel',
    singleSelect: true,
    columns: [
        {
            header: 'Specie',
            sortable: true,
            dataIndex: 'id_specie'
        },
        {
            header: 'Cop Str 1',
            sortable: true,
            dataIndex: 'cop_str1'
        },
        {
            header: 'Cop Str 2',
            sortable: true,
            dataIndex: 'cop_str2'
        },
    ]
}); 