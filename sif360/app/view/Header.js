/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('SIF360.view.Header', {
    extend: 'Ext.Component',
    alias: 'widget.sif360header',

    dock: 'top',
    baseCls: 'sif360-header',

    config: {
        style:"background-color:white;",
    },
    initComponent: function() {
      Ext.applyIf(this, {
          html: '<img src="resources/images/header_image.jpg" style=" height: 100px; border:0;" alt="" >'
      });

        this.callParent(arguments);
    }
});
