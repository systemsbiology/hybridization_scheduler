// ==========================================================================
// Project:   Scheduler.SampleType
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Scheduler.SampleType = SC.Record.extend(
/** @scope Scheduler.SampleType.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String),

}) ;

Scheduler.SAMPLE_TYPES_QUERY = SC.Query.create({recordType: Scheduler.SampleType, orderBy: 'name ASC'});
