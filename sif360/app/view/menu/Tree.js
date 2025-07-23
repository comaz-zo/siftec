Ext.define('SIF360.view.menu.Tree', {
    extend : 'Ext.form.Panel',
    alias : 'widget.menutree',


    items : {
        xtype : 'treepanel',
        store : {
            root : {
                text : 'Root Node',
                expanded : true,
                children : [
                    {
                        itemId: 'strati',
                        text : 'Strati informativi',
                        children : [
                            {
                                text : 'Piano',
                                id: 'piano',
                                leaf : true
                            },
                            {
                                text : 'Unità Forestali',
                                id: 'ufor',
                                leaf : true
                            },
                            {
                                text : 'Particellare',
                                id: 'particellare',
                                leaf : true
                            }
                        ]
                    },
                    {
                        itemId: 'pianificazione',
                        text : 'Pianificazione',
                        children : [
                            {
                                text : 'Interventi',
                                id: 'interventi',
                                leaf : true
                            },
                            {
                                text : 'Classi Colturali',
                                id: 'coltura',
                                leaf : true
                            },
                            {
                                text : 'Analisi Classi Colturali',
                                id: 'coltura_sys',
                                leaf : true
                            },
                            {
                                text : 'Obiettivi',
                                id: 'obiettivi',
                                leaf : true
                            },
                            /*{
                                text : 'Indirizzi gestionali',
                                id: 'missioni',
                                leaf : true
                            }*/
                        ]
                    },
                    {
                        itemId: 'configurazioni',
                        text : 'Configurazioni',
                        children : [
                            {
                                text : 'Tabella decodifica',
                                id: 'lookuptable',
                                leaf : true
                            }
                        ]
                    },
                ]
            }
        },
        rootVisible : false
    }

});
