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
      reservations = content.get('reservations');
    }
    context = context.begin('div').addClass('day-view');
    context = context.begin('div').addClass('date').push(date).end();
    //context = context.begin('div').addClass('reservations');
    //reservations.forEach(function(reservation) {
    //  context = context.begin('div').addClass('reservation').push( reservation.get('userLogin') ).end();
    //});
    //context = context.end();
    context = context.end();
	
    sc_super();
  },

  childViews: 'reservationScrollView addButtonView'.w(),

  reservationScrollView: SC.ScrollView.extend({
    layout: { top: 30, bottom: 50, left: 10, right: 10 },

    hasHorizontalScroller: NO,
    borderStyle: SC.BORDER_NONE,

    contentView: SC.ListView.extend({
      contentBinding: '.parentView.parentView.parentView.content.reservations',
      contentValueKey: 'displayName'
    })
  }),

  addButtonView: SC.ButtonView.extend({
    layout: { bottom: 20, centerX: 0, height: 24, width: 140 },

    title: 'Add Hyridizations',
    target: 'parentView',
    action: 'addReservation',
    isEnabledBinding: '.parentView.content.canAddHybridizations',
    toolTipBinding: '.parentView.content.addHybridizationsMessage'
  }),

  addReservation: function() {
    var reservation = Scheduler.store.createRecord(Scheduler.Reservation, {});
    reservation.set('reservationDate', this.getPath('content.date'));
    Scheduler.hybridizationController.set('content', reservation);
    Scheduler.getPath('mainPage.addReservation').append() ;
  }
});
