sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'ingokiesewetter101.productfaqapp',
            componentId: 'ProductFAQList',
            contextPath: '/ProductFAQ'
        },
        CustomPageDefinitions
    );
});