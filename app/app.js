var CB;
Ext.application({

    launch: function() {
        CB = this;
        Ext.create('Ext.Panel', {
            fullscreen: true,
            html: 'Hello world'
        });
    }

});