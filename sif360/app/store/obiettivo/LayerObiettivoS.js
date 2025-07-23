Ext.define('SIF360.store.ufor.LayerObiettivoS', {
    extend: 'GeoExt.data.FeatureStore',
    model: 'SIF360.model.ufor.LayerObiettivo',
    sorters: ['n_obiet'],
    autoLoad: true
});