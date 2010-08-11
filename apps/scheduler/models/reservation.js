// ==========================================================================
// Project:   Scheduler.Reservation
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Scheduler.Reservation = SC.Record.extend(
/** @scope Scheduler.Reservation.prototype */ {

  primaryKey: 'id',
  
  reservationDate: SC.Record.attr(SC.DateTime, {key: 'date'}),

  userLogin: SC.Record.attr(String, {key: 'user_login'}),

  sampleType: SC.Record.toOne('Scheduler.SampleType', {key: 'sample_type_id'}),

  sampleNumber: SC.Record.attr(String, {key: 'sample_number'}),

  chipNumber: SC.Record.attr(String, {key: 'chip_number'}),

  displayName: function() {
    var userLogin = this.get('userLogin') || "",
        sampleNumber = this.get('sampleNumber') || "",
        sampleTypeName = this.get('sampleType') && this.get('sampleType').get('name') || "";

    return userLogin + ": " + sampleNumber + " " + sampleTypeName;
  }.property('userLogin', 'sampleNumber', 'sampleType').cacheable(),
}) ;

Scheduler.RESERVATIONS_QUERY = SC.Query.create({recordType: Scheduler.Reservation, orderBy: 'name ASC'});
