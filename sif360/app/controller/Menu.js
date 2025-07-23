Ext.define('SIF360.controller.Menu', {
    extend: 'Ext.app.Controller',



    views: [
        'menu.Tree',
        'piano.EditPiano',
        'coltura.ListColtura',
        'coltura.ListColturaSys',
        'obiettivo.ListObiettivo',

    ],

    init: function() {
        var me = this;

        me.listen({
            controller: {

            },
            component:{
                // select ufor from menu
                'treepanel': {
                    itemclick: function(tree, record){
                        me.onMenuTreeUforItemSelect(record.get('id'));
                    }
                },


            },

        });

        console.log('Menu controller init');

    },

    onMenuTreeUforItemSelect: function(item) {
        var me = this;

        switch(item) {

            case 'obiettivi':

                var view = Ext.widget('obiettivolistobiettivo');

                break;
            case 'lookuptable':
                //force lup reload
                var lup_store = Ext.getStore('lookuptable.LookuptableS');
                lup_store.load();
                var view = Ext.widget('lookuptablelistrecord');

                break;
            default:


        }
    },
});
