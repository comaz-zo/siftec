Ext.define('SIF360.store.particella.LayerParticellaS', {
    extend: 'GeoExt.data.FeatureStore',
    model: 'SIF360.model.particella.LayerParticella',
    sorters: ['n_part'],
    autoLoad: true
});