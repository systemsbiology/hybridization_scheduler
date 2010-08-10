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
      conditions: "reservationDate > {dayStart} AND reservationDate < {dayEnd}",
      parameters: {dayStart: dayStart, dayEnd: dayEnd},
    });

    results = Scheduler.store.find(query);
    this.set('reservations', results);
  },

  canAddHybridizations: function() {
    var uniqueTypes,
        reservations = this.get('reservations');

    uniqueTypes = reservations.mapProperty('sampleType').uniq().length;

    if(uniqueTypes >= 2) return NO
    else return YES
  }.property('reservations').cacheable(),

  addHybridizationsMessage: function() {
    if( this.get('canAddHybridizations') ) return ""
    else return "The maximum number of hybridizations have already been reserved."
  }.property('canAddHybridizations').cacheable(),

}) ;
