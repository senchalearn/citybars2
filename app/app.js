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
                    itemTpl:
                        '<img class="photo" src="http://src.sencha.io/40/{photo_url}" width="40" height="40"/>' +
                        '{name}<br/>' +
                        '<img src="{rating_img_url_small}"/>&nbsp;' +
                        '<small>{address1}</small>'
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

        // get the city
        CB.getCity(function (city) {
            CB.cards.query('#listCard toolbar')[0].setTitle(city + ' ' + BUSINESS_TYPE);
            // then use Yelp to get the businesses
            CB.getBusinesses(city, function (store) {
                // then bind data to list and show it
                CB.cards.query('#dataList')[0].setStore(store);
            });
        });

    },

    getCity: function (callback) {
        callback(DEFAULT_CITY);
        // this could now be a geo lookup to
        // get the nearest city
    },

    getBusinesses: function (city, callback) {

        Ext.define("Business", {
            extend: "Ext.data.Model",
            fields: [
                {name: "id", type: "int"},
                {name: "name", type: "string"},
                {name: "latitude", type: "string"},
                {name: "longitude", type: "string"},
                {name: "address1", type: "string"},
                {name: "address2", type: "string"},
                {name: "address3", type: "string"},
                {name: "phone", type: "string"},
                {name: "state_code", type: "string"},
                {name: "mobile_url", type: "string"},
                {name: "rating_img_url_small", type: "string"},
                {name: "photo_url", type: "string"},
            ]
        });

        var store = Ext.create('Ext.data.Store', {
            model: 'Business',
            autoLoad: true,
            proxy: {
                // call Yelp to get business data
                type: 'scripttag',
                url: 'http://api.yelp.com/business_review_search' +
                    '?ywsid=' + YELP_KEY +
                    '&term=' + escape(BUSINESS_TYPE) +
                    '&location=' + escape(city)
                ,
                reader: {
                    type: 'json',
                    root: 'businesses'
                }
            },
            listeners: {
                // when the records load, fire the callback
                load: function (store) {
                    callback(store);
                }
            }
        });

        Ext.create('Ext.LoadMask', Ext.getBody(), {
            store: store,
            msg: ''
        });

    }


});