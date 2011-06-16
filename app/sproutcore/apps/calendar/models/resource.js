// ==========================================================================
// Project:   Calendar.Resource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Calendar.Resource = SC.Record.extend(
/** @scope Calendar.Resource.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String)

}) ;

Calendar.RESOURCES_QUERY = SC.Query.create({recordType: Calendar.Resource});
