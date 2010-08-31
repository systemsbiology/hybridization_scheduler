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

  reservations: [],

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
      recordType: Scheduler.Reservation,
      conditions: "reservationDate > {dayStart} AND reservationDate < {dayEnd} AND (sampleNumber > 0 OR chipNumber > 0)",
      parameters: {dayStart: dayStart, dayEnd: dayEnd},
    });

    results = Scheduler.store.find(query);
    this.set('reservations', results);
  },

  // check whether hybridizations can be added each time a new
  // reservation for this day is added
  reservationNumberDidChange: function() {
    var types = Scheduler.store.find(Scheduler.SampleType),
        canAddHybridizations = NO,
        day = this;

    types.forEach(function(type) {
      if( type.isAvailableForDay(day) ) canAddHybridizations = YES;
    });

    this.set('canAddHybridizations', canAddHybridizations);
  }.observes('reservations.length'),

  canAddMessage: function() {
    if( this.get('canAddHybridizations') ) return ""
    else return "The maximum number of hybridizations have already been reserved."
  }.property('canAddHybridizations').cacheable(),

}) ;
