Ext.define('KitchenSink.view.ContentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'contentPanel',
    id: 'content-panel',
    autoScroll: true,

    tools: [{
        type: 'help',
        toast: true
    }]
});
