// ==========================================================================
// Project:   Calendar.ReservationView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Calendar.ReservationView = SC.View.extend(SC.Border,
/** @scope Calendar.ReservationView.prototype */ {

  backgroundColor: '#DDD',

  borderStyle: '#FFF',

  childViews: 'nameView'.w(),

  nameView: SC.LabelView.extend({
    escapeHTML: NO,
    contentBinding: '.parentView.content',
    contentValueKey: 'displayName'
  }),

});
