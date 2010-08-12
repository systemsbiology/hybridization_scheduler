// ==========================================================================
// Project:   Scheduler.SampleType
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Scheduler.SampleType = SC.Record.extend(
/** @scope Scheduler.SampleType.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String),

  requirements: function() {
    var query, ret;

    query = SC.Query.create({
      recordType: Scheduler.Requirement,
      conditions: "sampleType = {sampleType}",
      parameters: {sampleType: this},
    });

    ret = Scheduler.store.find(query);

    return ret;
  }.property().cacheable(),

  tooManyOtherSampleTypes: function(day) {
    var query,
        reservations;
   
    query = SC.Query.create({
      recordType: Scheduler.Reservation,
      conditions: "reservationDate = {reservationDate} AND id != null",
      parameters: {reservationDate: day.get('date')}
    });

    reservations = Scheduler.store.find(query);

    uniqueTypes = reservations.mapProperty('sampleType').uniq();

    // the current sample type is excluded
    uniqueTypes.removeObject(this);

    if(uniqueTypes.get('length') >= 2) return YES;
    else return NO;
  },

  isAvailableForDay: function(day) {
    if( this.tooManyOtherSampleTypes(day) ) return NO;

    var ret = YES,
        requirements = this.get('requirements');

    requirements.forEach(function(requirement) {
      if( requirement.atCapacity(day) ) ret = NO;
    });

    return ret;
  }

}) ;

Scheduler.SAMPLE_TYPES_QUERY = SC.Query.create({recordType: Scheduler.SampleType, orderBy: 'name ASC'});