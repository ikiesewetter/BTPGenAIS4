sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"ingokiesewetter101/customermessages/test/integration/pages/CustomerMessageList",
	"ingokiesewetter101/customermessages/test/integration/pages/CustomerMessageObjectPage"
], function (JourneyRunner, CustomerMessageList, CustomerMessageObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('ingokiesewetter101/customermessages') + '/test/flpSandbox.html#ingokiesewetter101customermess-tile',
        pages: {
			onTheCustomerMessageList: CustomerMessageList,
			onTheCustomerMessageObjectPage: CustomerMessageObjectPage
        },
        async: true
    });

    return runner;
});

