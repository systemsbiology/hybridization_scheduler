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
  
  resource: SC.Record.toOne('Scheduler.Resource', {key: 'resource_id'}),

  requirements: function() {
    var query, ret;

    query = SC.Query.create({
      recordType: Scheduler.Requirement,
      conditions: "resourceState = {resourceState}",
      parameters: {resourceState: this},
    });

    ret = Scheduler.store.find(query);

    return ret;
  }.property().cacheable()
}) ;

Scheduler.RESOURCE_STATES_QUERY = SC.Query.create({recordType: Scheduler.ResourceState});
