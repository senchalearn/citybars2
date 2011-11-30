var CB;
Ext.application({

    launch: function() {
        CB = this;
        CB.cards = Ext.create('Ext.Panel', {
            fullscreen: true,
            html: 'Hello world'
        });
    }

});