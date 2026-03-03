sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"ingokiesewetter101/productfaqapp/test/integration/pages/ProductFAQList",
	"ingokiesewetter101/productfaqapp/test/integration/pages/ProductFAQObjectPage"
], function (JourneyRunner, ProductFAQList, ProductFAQObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('ingokiesewetter101/productfaqapp') + '/test/flpSandbox.html#ingokiesewetter101productfaqap-tile',
        pages: {
			onTheProductFAQList: ProductFAQList,
			onTheProductFAQObjectPage: ProductFAQObjectPage
        },
        async: true
    });

    return runner;
});

