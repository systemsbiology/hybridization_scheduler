// ==========================================================================
// Project:   Scheduler.ResourceState
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Scheduler.ResourceState = SC.Record.extend(
/** @scope Scheduler.ResourceState.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String),

  sampleLimit: SC.Record.attr(Number, {key: 'sample_limit'}),

  chipLimit: SC.Record.attr(Number, {key: 'chip_limit'}),
  
  resouce: SC.Record.toOne('Scheduler.Resource', {key: 'resource_id'})

}) ;

Scheduler.RESOURCE_STATES_QUERY = SC.Query.create({recordType: Scheduler.ResourceState});
