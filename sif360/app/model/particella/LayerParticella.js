Ext.define('SIF360.model.particella.LayerParticella', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'n_piano', type : 'int'},
        {name:'n_part', type : 'int'},
        {name:'n_compresa', type : 'int'},
        'the_geog'
    ],
});
