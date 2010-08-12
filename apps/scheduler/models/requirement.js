// ==========================================================================
// Project:   Scheduler.Requirement
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Scheduler.Requirement = SC.Record.extend(
/** @scope Scheduler.Requirement.prototype */ {

  primaryKey: 'id',

  sampleType: SC.Record.toOne('Scheduler.SampleType', {key: 'sample_type_id'}),

  resourceState: SC.Record.toOne('Scheduler.ResourceState', {key: 'resource_state_id'}),

  atCapacity: function(day) {
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

    if( (sampleLimit && samples >= sampleLimit) ||
        (chipLimit && chips >= chipLimit) ) {
      return YES;
    } else return NO;
  }

}) ;

Scheduler.REQUIREMENTS_QUERY = SC.Query.create({recordType: Scheduler.Requirement});
