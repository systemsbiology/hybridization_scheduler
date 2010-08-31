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

  sampleNumber: SC.Record.attr(Number, {key: 'sample_number'}),

  chipNumber: SC.Record.attr(Number, {key: 'chip_number'}),

  displayName: function() {
    var userLogin = this.get('userLogin') || "",
        sampleNumber = this.get('sampleNumber') || "",
        sampleTypeName = this.get('sampleType') && this.get('sampleType').get('name') || "";

    return userLogin + ": " + sampleNumber + " " + sampleTypeName;
  }.property('userLogin', 'sampleNumber', 'sampleType').cacheable(),

  isWithinCapacity: function() {
    var type = this.get('sampleType'),
        day = Scheduler.reservationController.get('day');

    if( SC.none(type) || SC.none(day) ) return YES;

    if( type.isWithinCapacityForDay(day) ) return YES;
    else return NO;
  }.property('sampleNumber', 'chipNumber', 'sampleType', 'reservationDate').cacheable(),

  warningMessage: function() {
    var type = this.get('sampleType'),
        day = Scheduler.reservationController.get('day');

    if( SC.none(type) || SC.none(day) ) return "";

    return type.warningMessageForDay(day);
  }.property('sampleNumber', 'chipNumber', 'sampleType', 'reservationDate').cacheable(),

  warningIcon: function() {
    if( this.get('warningMessage') == "" ) return ''
    else return 'sc-icon-alert-16'
  }.property('isWithinCapacity').cacheable(),

  infoMessage: function() {
    var ret = "",
        day = Scheduler.reservationController.get('day'),
        types = Scheduler.store.find(Scheduler.SampleType);

    types.forEach(function(type) {
      ret += type.availabilityMessageForDay(day);
    });

    return ret;
  }.property().cacheable(),

  infoIcon: function() {
    if( this.get('infoMessage') == "" ) return ''
    else return 'sc-icon-info-16'
  }.property('isWithinCapacity').cacheable(),

  isValid: function() {
    var sampleType = this.get('sampleType'),
        sampleNumber = this.get('sampleNumber'),
        chipNumber = this.get('chipNumber');

    if( sampleType && this._isNumber(sampleNumber) && this._isNumber(chipNumber) ) return YES
    else return NO
  }.property('sampleType', 'sampleNumber', 'chipNumber').cacheable(),

  _isNumber: function(o) {
      return typeof o === 'number' && isFinite(o);
  }
  
}) ;

Scheduler.RESERVATIONS_QUERY = SC.Query.create({recordType: Scheduler.Reservation, orderBy: 'name ASC'});
