// ==========================================================================
// Project:   Scheduler.Requirement
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Scheduler.Requirement = SC.Record.extend(
/** @scope Scheduler.Requirement.prototype */ {

  primaryKey: 'id',

  sampleType: SC.Record.toOne('Scheduler.SampleType', {key: 'sample_type_id'}),

  resourceState: SC.Record.toOne('Scheduler.ResourceState', {key: 'resource_state_id'})

}) ;

Scheduler.REQUIREMENTS_QUERY = SC.Query.create({recordType: Scheduler.Requirement});
