Ext.define('SIF360.model.lookuptable.Lookuptable', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'n_piano', type : 'int'},
        {name:'table_n', type : 'string'},
        {name:'field_n', type : 'string'},
        {name:'code_v', type : 'int'},
        {name:'text_v', type : 'string'} 
    ]
});
