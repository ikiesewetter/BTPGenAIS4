using { S4HCP_ServiceOrder_Odata } from './external/S4HCP_ServiceOrder_Odata.cds';

using { IngoKiesewetter_1_01 as my } from '../db/schema.cds';

@path : '/service/ingoKiesewetter_1_01'
service ingoKiesewetter_1_01Srv
{
    @odata.draft.enabled
    entity CustomerMessage as
        projection on my.CustomerMessage;

    @cds.redirection.target
    entity A_ServiceOrder as
        projection on S4HCP_ServiceOrder_Odata.A_ServiceOrder
        {
            ServiceOrder,
            ServiceOrderDescription
        };
}

annotate ingoKiesewetter_1_01Srv with @requires :
[
    'authenticated-user'
];
