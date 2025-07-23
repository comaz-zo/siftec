Ext.define('SIF360.model.coltura.TableColtura', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'n_piano', type : 'int'},
        {name:'n_coltura', type : 'int'},
        {name:'codice', type: 'string'},
        {name:'nome', type: 'string'},
        {name:'obiett1', type : 'int'},
        {name:'obiett2', type : 'int'},
        {name:'obiett3', type : 'int'},
        {name:'obiett4', type : 'int'},
        {name:'obiett5', type : 'int'},
        {name:'indirizzo', type : 'string'},
    ]
});
