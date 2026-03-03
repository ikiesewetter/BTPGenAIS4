sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ingokiesewetter101.productfaqapp',
            componentId: 'ProductFAQObjectPage',
            contextPath: '/ProductFAQ'
        },
        CustomPageDefinitions
    );
});