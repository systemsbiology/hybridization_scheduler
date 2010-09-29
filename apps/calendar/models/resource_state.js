// ==========================================================================
// Project:   Calendar.ResourceState
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Calendar.ResourceState = SC.Record.extend(
/** @scope Calendar.ResourceState.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String),

  sampleLimit: SC.Record.attr(Number, {key: 'sample_limit'}),

  chipLimit: SC.Record.attr(Number, {key: 'chip_limit'}),
  
  resource: SC.Record.toOne('Calendar.Resource', {key: 'resource_id'}),

  requirements: function() {
    var query, ret;

    query = SC.Query.create({
      recordType: Calendar.Requirement,
      conditions: "resourceState = {resourceState}",
      parameters: {resourceState: this},
    });

    ret = Calendar.store.find(query);

    return ret;
  }.property().cacheable(),

  fullName: function() {
    var name = this.get('name'),
        resource = this.get('resource'),
        ret;

    ret = resource.get('name');

    if(name) ret += " (" + name + ")";

    return ret;
  }.property('name', 'resource').cacheable(),

  limitMessage: function() {
    var resourceName = this.getPath('resource.name'),
        sampleLimit = this.get('sampleLimit'),
        chipLimit = this.get('chipLimit'),
        resourceNumber = this.getPath('resource.number'),
        stateName = this.get('name'),
        ret;

    ret = resourceName + " ";

    if( stateName ) {
      ret += "needs to be at " + stateName;
    }

    if( sampleLimit ) {
      if( stateName ) ret += " and ";

      ret += "is limited to " + sampleLimit + " samples"; 

      if( chipLimit) ret += " and " + chipLimit + " chips";
    } else if( chipLimit) {
      if( stateName ) ret += " and ";

      ret += "is limited to " + chipLimit + " chips";
    }

    ret += ". ";

    return ret;
  }.property('sampleLimit', 'chipLimit', 'fullName').cacheable(),
}) ;

Calendar.RESOURCE_STATES_QUERY = SC.Query.create({recordType: Calendar.ResourceState});
