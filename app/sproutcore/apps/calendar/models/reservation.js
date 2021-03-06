// ==========================================================================
// Project:   Calendar.Reservation
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Calendar.Reservation = SC.Record.extend(
/** @scope Calendar.Reservation.prototype */ {

  primaryKey: 'id',

  reservationDate: SC.Record.attr(SC.DateTime, {key: 'date'}),

  userLogin: SC.Record.attr(String, {key: 'user_login'}),

  description: SC.Record.attr(String),

  sampleType: SC.Record.toOne('Calendar.SampleType', {key: 'sample_type_id'}),

  sampleNumber: SC.Record.attr(Number, {key: 'sample_number'}),

  chipNumber: SC.Record.attr(Number, {key: 'chip_number'}),

  blocking: SC.Record.attr(Boolean, {defaultValue: NO}),

  displayName: function() {
    var description = this.get('description') || "",
        sampleNumber = this.get('sampleNumber') || "",
        chipNumber = this.get('chipNumber') || "",
        sampleTypeName = this.get('sampleType') && this.get('sampleType').get('name') || "";

    return description + ": " + sampleNumber + " (" + chipNumber + ")<br>" + sampleTypeName;
  }.property('userLogin', 'sampleNumber', 'sampleType').cacheable(),

  isWithinCapacity: function() {
    var type = this.get('sampleType'),
        day = Calendar.reservationController.get('day');

    if( SC.none(type) || SC.none(day) ) return YES;

    if( type.isWithinCapacityForDay(day) ) return YES;
    else return NO;
  }.property('sampleNumber', 'chipNumber', 'sampleType', 'reservationDate').cacheable(),

  canSave: function() {
    // Admins are all-powerful
    if( Calendar.get('admin') ) return YES;
    else return this.get('isWithinCapacity');
  }.property('isWithinCapacity').cacheable(),

  warningMessage: function() {
    var type = this.get('sampleType'),
        day = Calendar.reservationController.get('day');

    if( SC.none(type) || SC.none(day) ) return "";

    return type.warningMessageForDay(day);
  }.property('sampleNumber', 'chipNumber', 'sampleType', 'reservationDate').cacheable(),

  warningIcon: function() {
    if( this.get('warningMessage') == "" ) return ''
    else return 'sc-icon-alert-16'
  }.property('isWithinCapacity').cacheable(),

  infoMessage: function() {
    var ret = "",
        day = Calendar.reservationController.get('day'),
        types = Calendar.store.find(Calendar.SampleType);

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
        chipNumber = this.get('chipNumber'),
        description = this.get('description');

    if( description && description.length > 0 && sampleType && this._isNumber(sampleNumber) &&
      this._isNumber(chipNumber) ) return YES;
    else return NO
  }.property('sampleType', 'sampleNumber', 'chipNumber').cacheable(),

  _isNumber: function(o) {
      return typeof o === 'number' && isFinite(o);
  }
  
}) ;

Calendar.RESERVATIONS_QUERY = SC.Query.create({recordType: Calendar.Reservation, orderBy: 'name ASC'});
