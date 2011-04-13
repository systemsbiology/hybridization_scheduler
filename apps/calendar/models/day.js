// ==========================================================================
// Project:   Calendar.Day
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document your Model here)

  @extends SC.Object
  @version 0.1
*/
Calendar.Day = SC.Object.extend(
/** @scope Calendar.Day.prototype */ {

  reservations: [],

  blocked: NO,

  canAddHybridizations: YES,

  init: function() {
    sc_super();
    this.loadReservations();
  },

  formattedDate: function() {
    return this.get('date').toFormattedString("%a %m/%d");
  }.property('date').cacheable(),

  loadReservations: function() {
    var results, query, dayStart, dayEnd,
        date = this.get('date'),
        day = date.get('day'),
        month = date.get('month'),
        year = date.get('year');

    dayStart = SC.DateTime.create({ day: day, month:month, year:year, hour:0 });
    dayEnd = dayStart.advance({hour:24});

    query = SC.Query.create({
      recordType: Calendar.Reservation,
      conditions: "reservationDate > {dayStart} AND reservationDate < {dayEnd} AND (sampleNumber > 0 OR chipNumber > 0 OR blocking = YES)",
      parameters: {dayStart: dayStart, dayEnd: dayEnd}
    });

    results = Calendar.store.find(query);
    this.set('reservations', results);
    if(results.get('length') > 0) this.reservationNumberDidChange();
  },

  // check whether hybridizations can be added each time 
  // the reservations change
  reservationNumberDidChange: function() {
    // Admins are all-powerful
    if( Calendar.get('admin') ) {
      this.set('canAddHybridizations', YES);
      return;
    }
    
    var types = Calendar.store.find(Calendar.SampleType),
        canAddHybridizations = NO,
        blocked = NO,
        day = this;

    types.forEach(function(type) {
      if( type.isAvailableForDay(day) ) canAddHybridizations = YES;
    });

    var reservations = this.get('reservations');
    reservations.forEach(function(reservation) {
      if( reservation.get('blocking') ) {
        canAddHybridizations = NO;
        blocked = YES;
      }
    })

    this.set('canAddHybridizations', canAddHybridizations);
    this.set('blocked', blocked);
  }.observes('reservations.length'),

  canAddMessage: function() {
    if( this.get('blocked') ) return "Hybridizations aren't available";
    else if( this.get('canAddHybridizations') ) return "";
    else return "The maximum number of hybridizations have already been reserved.";
  }.property('canAddHybridizations','blocked').cacheable()

}) ;
