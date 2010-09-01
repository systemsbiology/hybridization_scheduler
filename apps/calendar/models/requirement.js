// ==========================================================================
// Project:   Calendar.Requirement
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Calendar.Requirement = SC.Record.extend(
/** @scope Calendar.Requirement.prototype */ {

  primaryKey: 'id',

  sampleType: SC.Record.toOne('Calendar.SampleType', {key: 'sample_type_id'}),

  resourceState: SC.Record.toOne('Calendar.ResourceState', {key: 'resource_state_id'}),

  atCapacity: function(day) {
    return this._checkCapacity(day, false);
  },

  overCapacity: function(day) {
    return this._checkCapacity(day, true);
  },

  _checkCapacity: function(day, allowFull) {
    if(!day) return NO;

    var reservations = day.get('reservations'),
        samples = 0,
        chips = 0,
        resourceState = this.get('resourceState');

    resourceState.get('requirements').forEach(function(requirement) {
      sampleType = requirement.get('sampleType');

      reservations.forEach(function(reservation) {
        if(reservation.get('sampleType') === sampleType) {
          samples += reservation.get('sampleNumber');
          chips += reservation.get('chipNumber');
        }
      });
    });

    var sampleLimit = resourceState.get('sampleLimit');
    var chipLimit = resourceState.get('chipLimit');

    if(allowFull) {
      if( (sampleLimit && samples > sampleLimit) ||
          (chipLimit && chips > chipLimit) ) {
        return YES;
      } else return NO;
    } else {
      if( (sampleLimit && samples >= sampleLimit) ||
          (chipLimit && chips >= chipLimit) ) {
        return YES;
      } else return NO;
    }
  },

  exceedsMessage: function() {
    var type = this.get('sampleType'),
        state = this.get('resourceState');
    
    return state.get('limitMessage');
  }.property().cacheable(),
}) ;

Calendar.REQUIREMENTS_QUERY = SC.Query.create({recordType: Calendar.Requirement});
