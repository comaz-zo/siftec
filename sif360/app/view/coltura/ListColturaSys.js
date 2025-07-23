(function() {
    Ext.define('SIF360.view.coltura.ListColturaSys' ,{
        extend: 'Ext.window.Window',
        alias: 'widget.colturalistcolturasys',
        title: 'Analisi sintetica delle Classi Colturali del piano',

        height : 650,
        width  : 900,

        autoShow: true,
        frame: false,
        modal:  true,
        border: false,
        constrain: true,
        layout : 'fit',

        initComponent: function() {
            this.items = [
                tabPanel
            ];

            this.buttons = [

            ];

            this.callParent(arguments);
            },



        });

        var tabs = [
           {
              xtype : 'fieldcontainer',
              title : 'Totale piano',
              //layout : 'form',
              layout       : 'fit',

              items : [
                {
                    xtype: 'gridpanel',
                    //alias: 'widget.colturagridcoltura',
                    store: 'coltura.TableColturaSysS',
                    columns: [
                        {
                            header: "Nome",
                            dataIndex: "nome",
                            locked   : true,
                            width: 300, autoSizeColumn: true, minWidth: 300
                        },
                        {
                            header: "ID",
                            dataIndex: "n_coltura",
                            autoSizeColumn: true,
                        },
                        {
                            header: "Codice",
                            dataIndex: "codice",
                            autoSizeColumn: true,
                        },
                        {
                            header: "N Ufor",
                            dataIndex: "num_ufor_tot",
                            autoSizeColumn: true,
                        },
                        {
                            header: "Superficie (ha)",
                            dataIndex: "sup_ha_tot",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        },
                        {
                            header: "Sup. SIC (ha)",
                            dataIndex: "sic_tot_ha",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        },
                        {
                            header: "Sup. ris int. (ha)",
                            dataIndex: "za_tot_ha",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        },
                        {
                            header: "V inv. tot (m3)",
                            dataIndex: "vol_inv_tot",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        },
                        {
                            header: "V inv. med (m3/ha)",
                            dataIndex: "vol_inv_med",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        },
                        {
                            header: "Prelievo V %",
                            dataIndex: "vol_prel_perc",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        },
                        {
                            header: "Prelievo V (m3)",
                            dataIndex: "vol_prel_tot",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        },
                        {
                            header: "Prelievo medio (m3/ha)",
                            dataIndex: "vol_prel_med",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        },
                        {
                            header: "Prelievo legname da opera (m3)",
                            dataIndex: "legme_v",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        },
                        {
                            header: "Prelievo legna da ardere (t peso fresco)",
                            dataIndex: "legna_p",
                            renderer:  Ext.util.Format.numberRenderer('0'),
                        }

                    ],

                    loadMask: true,
                    selType: 'rowmodel',
                    singleSelect : true,
                    stripeRows   : true,


                }
              ]
            },
            {
                   xtype : 'fieldcontainer',
                   title : 'Ufor priorità 1',
                   //layout : 'form',
                   layout       : 'fit',

                   items : [

                  {
                      xtype: 'gridpanel',
                      //alias: 'widget.colturagridcoltura',
                      store: 'coltura.TableColturaSysS',
                      columns: [
                          {
                              header: "Nome",
                              dataIndex: "nome",
                              locked   : true,
                              width: 300, autoSizeColumn: true, minWidth: 300
                          },
                          {
                              header: "ID",
                              dataIndex: "n_coltura",
                              autoSizeColumn: true,
                          },
                          {
                              header: "Codice",
                              dataIndex: "codice",
                              autoSizeColumn: true,
                          },
                          {
                              header: "N Ufor",
                              dataIndex: "num_ufor_tot_p1",
                              autoSizeColumn: true,
                          },
                          {
                              header: "Superficie (ha)",
                              dataIndex: "sup_ha_tot_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          },
                          {
                              header: "Sup. SIC (ha)",
                              dataIndex: "sic_tot_ha_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          },
                          {
                              header: "Sup. ris int. (ha)",
                              dataIndex: "za_tot_ha_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          },
                          {
                              header: "V inv. tot (m3)",
                              dataIndex: "vol_inv_tot_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          },
                          {
                              header: "V inv. med (m3/ha)",
                              dataIndex: "vol_inv_med_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          },
                          {
                              header: "Prelievo V %",
                              dataIndex: "vol_prel_perc_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          },
                          {
                              header: "Prelievo V (m3)",
                              dataIndex: "vol_prel_tot_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          },
                          {
                              header: "Prelievo medio (m3/ha)",
                              dataIndex: "vol_prel_med_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          },
                          {
                              header: "Prelievo legname da opera (m3)",
                              dataIndex: "legme_v_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          },
                          {
                              header: "Prelievo legna da ardere (t peso fresco)",
                              dataIndex: "legna_p_p1",
                              renderer:  Ext.util.Format.numberRenderer('0'),
                          }

                      ],

                      loadMask: true,
                      selType: 'rowmodel',
                      singleSelect : true,
                      stripeRows   : true,


                  }
                ]
              },
              {
                     xtype : 'fieldcontainer',
                     title : 'Ufor priorità 2',
                     //layout : 'form',
                     layout       : 'fit',

                     items : [

                    {
                        xtype: 'gridpanel',
                        //alias: 'widget.colturagridcoltura',
                        store: 'coltura.TableColturaSysS',
                        columns: [
                            {
                                header: "Nome",
                                dataIndex: "nome",
                                locked   : true,
                                width: 300, autoSizeColumn: true, minWidth: 300
                            },
                            {
                                header: "ID",
                                dataIndex: "n_coltura",
                                autoSizeColumn: true,
                            },
                            {
                                header: "Codice",
                                dataIndex: "codice",
                                autoSizeColumn: true,
                            },
                            {
                                header: "N Ufor",
                                dataIndex: "num_ufor_tot_p2",
                                autoSizeColumn: true,
                            },
                            {
                                header: "Superficie (ha)",
                                dataIndex: "sup_ha_tot_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            },
                            {
                                header: "Sup. SIC (ha)",
                                dataIndex: "sic_tot_ha_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            },
                            {
                                header: "Sup. ris int. (ha)",
                                dataIndex: "za_tot_ha_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            },
                            {
                                header: "V inv. tot (m3)",
                                dataIndex: "vol_inv_tot_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            },
                            {
                                header: "V inv. med (m3/ha)",
                                dataIndex: "vol_inv_med_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            },
                            {
                                header: "Prelievo V %",
                                dataIndex: "vol_prel_perc_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            },
                            {
                                header: "Prelievo V (m3)",
                                dataIndex: "vol_prel_tot_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            },
                            {
                                header: "Prelievo medio (m3/ha)",
                                dataIndex: "vol_prel_med_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            },
                            {
                                header: "Prelievo legname da opera (m3)",
                                dataIndex: "legme_v_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            },
                            {
                                header: "Prelievo legna da ardere (t peso fresco)",
                                dataIndex: "legna_p_p2",
                                renderer:  Ext.util.Format.numberRenderer('0'),
                            }

                        ],

                        loadMask: true,
                        selType: 'rowmodel',
                        singleSelect : true,
                        stripeRows   : true,


                    }
                  ]
                },
                {
                       xtype : 'fieldcontainer',
                       title : 'Ufor priorità 3',
                       //layout : 'form',
                       layout       : 'fit',

                       items : [

                      {
                          xtype: 'gridpanel',
                          //alias: 'widget.colturagridcoltura',
                          store: 'coltura.TableColturaSysS',
                          columns: [
                              {
                                  header: "Nome",
                                  dataIndex: "nome",
                                  locked   : true,
                                  width: 300, autoSizeColumn: true, minWidth: 300
                              },
                              {
                                  header: "ID",
                                  dataIndex: "n_coltura",
                                  autoSizeColumn: true,
                              },
                              {
                                  header: "Codice",
                                  dataIndex: "codice",
                                  autoSizeColumn: true,
                              },
                              {
                                  header: "N Ufor",
                                  dataIndex: "num_ufor_tot_p3",
                                  autoSizeColumn: true,
                              },
                              {
                                  header: "Superficie (ha)",
                                  dataIndex: "sup_ha_tot_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              },
                              {
                                  header: "Sup. SIC (ha)",
                                  dataIndex: "sic_tot_ha_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              },
                              {
                                  header: "Sup. ris int. (ha)",
                                  dataIndex: "za_tot_ha_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              },
                              {
                                  header: "V inv. tot (m3)",
                                  dataIndex: "vol_inv_tot_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              },
                              {
                                  header: "V inv. med (m3/ha)",
                                  dataIndex: "vol_inv_med_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              },
                              {
                                  header: "Prelievo V %",
                                  dataIndex: "vol_prel_perc_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              },
                              {
                                  header: "Prelievo V (m3)",
                                  dataIndex: "vol_prel_tot_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              },
                              {
                                  header: "Prelievo medio (m3/ha)",
                                  dataIndex: "vol_prel_med_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              },
                              {
                                  header: "Prelievo legname da opera (m3)",
                                  dataIndex: "legme_v_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              },
                              {
                                  header: "Prelievo legna da ardere (t peso fresco)",
                                  dataIndex: "legna_p_p3",
                                  renderer:  Ext.util.Format.numberRenderer('0'),
                              }

                          ],

                          loadMask: true,
                          selType: 'rowmodel',
                          singleSelect : true,
                          stripeRows   : true,


                      }
                    ]
                  }

            ];

          var tabPanel = {
              xtype: 'tabpanel',
              activeTab : 0,
              deferredRender : false,
              layoutOnTabChange : true,
              border            : false,
              flex              : 1,
              plain             : true,
              items             : tabs
          }

    /**
        Grid Lookup render function
    */

    function lookupTextV(table_n,field_n,code_v){
        var lkt_store = Ext.getStore('lookuptable.LookuptableS');
        var record = lkt_store.queryBy(function(record,id){
            var record = (record.get('table_n') == table_n && record.get('field_n') == field_n && record.get('code_v') == code_v );
            return record;
        });
        return (record.items.length)>0?record.items[0].get("text_v"):"---";
    }


})();
