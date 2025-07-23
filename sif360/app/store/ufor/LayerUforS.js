Ext.define('SIF360.store.ufor.LayerUforS', {
    extend: 'GeoExt.data.FeatureStore',
    model: 'SIF360.model.ufor.LayerUfor',
    sorters: ['n_ufor'],
    autoLoad: true
});