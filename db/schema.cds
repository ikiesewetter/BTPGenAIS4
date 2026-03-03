namespace IngoKiesewetter_1_01;

using { S4HCP_ServiceOrder_Odata } from '../srv/external/S4HCP_ServiceOrder_Odata.cds';

using { cuid } from '@sap/cds/common';

entity CustomerMessage : cuid
{
    customerMessageID : Integer
        @mandatory;
    titleEnglish : String(40);
    customerName : String(40);
    productName : String(100);
    summaryEnglish : String(1000);
    messageCategory : String(50);
    messageUrgency : String(20);
    messageSentiment : String(20);
    titleCustomerLanguage : String(40);
    customerId : String(36);
    productId : String(36);
    summaryCustomerLanguage : String(1000);
    originatingCountry : String(10);
    sourceLanguage : String(10);
    fullMessageCustomerLanguage : String(5000);
    fullMessageEnglish : String(5000);
    suggestedResponseEnglish : String(5000);
    suggestedResponseCustomerLanguage : String(5000);
    S4HCP_ServiceOrder : Association to one S4HCP_ServiceOrder_Odata.A_ServiceOrder;
}

annotate CustomerMessage with @assert.unique :
{
    customerMessageID : [ customerMessageID ],
};
