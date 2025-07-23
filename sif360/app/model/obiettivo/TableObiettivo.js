Ext.define('SIF360.model.obiettivo.TableObiettivo', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'n_piano', type : 'int'},
        {name:'n_obiett', type : 'int'},
        {name:'tipo', type: 'int'},
        {name:'sub_tipo', type: 'int'},
        {name:'titolo', type: 'string'},
        {name:'descr', type: 'string'}
    ]
});
