// ==========================================================================
// Project:   Scheduler.DayView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Scheduler.DayView = SC.View.extend(SC.Border,
/** @scope Scheduler.DayView.prototype */ {

  contentDisplayProperties: 'date'.w(),
  
  render: function(context, firstTime) {
  	var date = '';
	
	var content = this.get('content');
	if(content) {
	  date = content.get('formattedDate');
	}
  	context = context.begin('div').addClass('day-view');
    context = context.begin('div').addClass('date').push(date).end();
    context = context.end();
	
	sc_super();
  },

  childViews: 'addButton'.w(),

  addButton: SC.ButtonView.extend({
    layout: { bottom: 20, centerX: 0, height: 24, width: 140 },

    title: 'Add Hybridizations'
  })
});
