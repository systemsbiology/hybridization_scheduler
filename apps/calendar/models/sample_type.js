// ==========================================================================
// Project:   Calendar.SampleType
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Calendar.SampleType = SC.Record.extend(
/** @scope Calendar.SampleType.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String),

  requirements: function() {
    var query, ret;

    query = SC.Query.create({
      recordType: Calendar.Requirement,
      conditions: "sampleType = {sampleType}",
      parameters: {sampleType: this}
    });

    ret = Calendar.store.find(query);

    return ret;
  }.property().cacheable(),

  tooManyOtherSampleTypes: function(day) {
    if(!day) return NO;

    var reservations = day.get('reservations');
   
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
  },

  isWithinCapacityForDay: function(day) {
    if( this.tooManyOtherSampleTypes(day) ) return NO;

    var ret = YES,
        requirements = this.get('requirements');

    requirements.forEach(function(requirement) {
      if( requirement.overCapacity(day) ) ret = NO;
    });

    return ret;
  },

  warningMessageForDay: function(day) {
    if( this.isWithinCapacityForDay(day) ) return "";

    var ret = "",
        requirements = this.get('requirements');

    requirements.forEach(function(requirement) {
      if( requirement.overCapacity(day) ) ret += requirement.get('exceedsMessage');
    });

    return ret;
  },

  availabilityMessageForDay: function(day) {
    var name = this.get('name');
    
    if( this.tooManyOtherSampleTypes(day) ) return name + " not available since too many other platforms are being used. ";

    var ret = "",
        requirements = this.get('requirements');

    requirements.forEach(function(requirement) {
      if( requirement.atCapacity(day) ) {
        ret += name + " not available since " + requirement.get('exceedsMessage');
      }
    });

    return ret;
  }

}) ;

Calendar.SAMPLE_TYPES_QUERY = SC.Query.create({recordType: Calendar.SampleType, orderBy: 'name ASC'});
