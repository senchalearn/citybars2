var CB;
Ext.application({

    launch: function() {
        CB = this;
        CB.cards = Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: 'card',
            items: [{
                // the list card
                id: 'listCard',
                layout: 'fit',
                items: [{
                    // main top toolbar
                    xtype: 'toolbar',
                    docked: 'top',
                    title: 'Please wait'
                    // will get added once city known
                }, {
                    // the list itself
                    // gets bound to the store once city known
                    id: 'dataList',
                    xtype: 'list',
                    store: null
                }]
            }, {
                // the details card
                id: 'detailCard',
                items: [{
                    // detail page also has a toolbar
                    docked : 'top',
                    xtype: 'toolbar',
                    title: ''
                }, {
                    // textual detail
                }]
            }]
        });
    }

});