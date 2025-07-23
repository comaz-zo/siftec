/**
 * Help Window with static content using 'contentEl' property.
 * @extends Ext.window.Window
 */
Ext.define('SIF360.view.help.Window', {
    extend: 'Ext.window.Window',
    alias : 'widget.sif360_helpwindow',
    initComponent: function() {
        Ext.apply(this, {
            bodyCls: "sif360-helpwindow",
            closeAction: "hide",
            layout: 'fit',
            maxWidth: 600,
            title: "Help"
        });
        this.callParent(arguments);
    }
});
