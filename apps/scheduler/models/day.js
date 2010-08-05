// ==========================================================================
// Project:   Scheduler.Day
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document your Model here)

  @extends SC.Object
  @version 0.1
*/
Scheduler.Day = SC.Object.extend(
/** @scope Scheduler.Day.prototype */ {

  formattedDate: function() {
  	return this.get('date').toFormattedString("%a %m/%d");
  }.property('date').cacheable(),

}) ;
