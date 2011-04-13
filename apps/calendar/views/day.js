// ==========================================================================
// Project:   Calendar.DayView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

sc_require('views/reservation');

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Calendar.DayView = SC.View.extend(SC.Border,
/** @scope Calendar.DayView.prototype */ {

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
    context = context.end();
	
    sc_super();
  },

  childViews: 'reservationScrollView addButtonView'.w(),

  reservationScrollView: SC.ScrollView.extend({
    layout: { top: 30, bottom: 50, left: 10, right: 10 },

    hasHorizontalScroller: NO,
    borderStyle: SC.BORDER_NONE,

    contentView: SC.ListView.extend({
      rowHeight: 56,
      contentBinding: '.parentView.parentView.parentView.content.reservations',
      target: 'parentView.parentView.parentView',
      action: 'editReservation',
      exampleView: Calendar.ReservationView
    })
  }),

  addButtonView: SC.ButtonView.extend({
    layout: { bottom: 20, centerX: 0, height: 24, width: 140 },

    title: 'Add Hyridizations',
    target: 'parentView',
    action: 'addReservation',
    isEnabledBinding: '.parentView.content.canAddHybridizations',
    toolTipBinding: '.parentView.content.canAddMessage'
  }),

  addReservation: function() {
    var reservation = Calendar.store.createRecord(Calendar.Reservation, {});
    reservation.set('reservationDate', this.getPath('content.date'));
    Calendar.reservationController.set( 'day', this.get('content') );
    Calendar.reservationController.set('content', reservation);
    pane = Calendar.getPath('mainPage.reservation');
    pane.append().awake() ;
  },

  editReservation: function() {
    var reservation = this.getPath('reservationScrollView.contentView.selection.firstObject');
    if( SC.none(reservation) ) return;

    Calendar.reservationController.set('content', reservation);
    Calendar.reservationController.set( 'day', this.get('content') );
    Calendar.reservationController.set( 'savedAttributes', SC.copy(reservation.get('attributes')) );
    pane = Calendar.getPath('mainPage.reservation');
    pane.append().awake() ;
  }
});
