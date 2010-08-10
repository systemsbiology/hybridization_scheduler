// ==========================================================================
// Project:   Scheduler.Resource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Scheduler.Resource = SC.Record.extend(
/** @scope Scheduler.Resource.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String),

}) ;

Scheduler.RESOURCES_QUERY = SC.Query.create({recordType: Scheduler.Resource});
