// ==========================================================================
// Project:   Calendar.daysController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

sc_require('models/day');

/** @class

  Controls what days are currently being displayed in the calendar.

  @extends SC.ArrayController
*/
Calendar.daysController = SC.ArrayController.create(
/** @scope Calendar.daysController.prototype */ {

  baseDate: SC.DateTime.create(),

  content: function() {
  	var ret = [],
        baseDate = this.get('baseDate'),
        startDate;
	
    startDate = baseDate.advance({day: -baseDate.get('dayOfWeek')});
    
    for(i=1;i<5;i++) {
      ret.pushObject(Calendar.Day.create({
        date: startDate.advance({day:i})
      }));
    }
    startDate = startDate.advance({day:7})
    for(i=1;i<5;i++) {
      ret.pushObject(Calendar.Day.create({
        date: startDate.advance({day:i})
      }));
    }
    
    return ret;
  }.property('baseDate').cacheable(),

  forward: function() {
  	var baseDate = this.get('baseDate');
	this.set('baseDate', baseDate.advance({day:7}));
  },
  
  backward: function() {
  	var baseDate = this.get('baseDate');
	this.set('baseDate', baseDate.advance({day:-7}));
  },
}) ;
