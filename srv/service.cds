using { IngoKiesewetter_1_01 as my } from '../db/schema.cds';

@path: '/service/ingoKiesewetter_1_01'
@requires: 'authenticated-user'
service ingoKiesewetter_1_01Srv {
  @odata.draft.enabled
  entity CustomerMessage as projection on my.CustomerMessage;
}