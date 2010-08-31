// ==========================================================================
// Project:   Scheduler.ResourceState
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Scheduler.ResourceState = SC.Record.extend(
/** @scope Scheduler.ResourceState.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String),

  sampleLimit: SC.Record.attr(Number, {key: 'sample_limit'}),

  chipLimit: SC.Record.attr(Number, {key: 'chip_limit'}),
  
  resource: SC.Record.toOne('Scheduler.Resource', {key: 'resource_id'}),

  requirements: function() {
    var query, ret;

    query = SC.Query.create({
      recordType: Scheduler.Requirement,
      conditions: "resourceState = {resourceState}",
      parameters: {resourceState: this},
    });

    ret = Scheduler.store.find(query);

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
    var fullName = this.get('fullName'),
        sampleLimit = this.get('sampleLimit'),
        chipLimit = this.get('chipLimit'),
        ret;

    ret = fullName + " is limited to";

    if( sampleLimit ) {
      ret += " " + sampleLimit + " samples"; 

      if( chipLimit) ret += " and " + chipLimit + " chips";
    } else if( chipLimit) ret += " " + chipLimit + " chips";

    ret += ". ";

    return ret;
  }.property('sampleLimit', 'chipLimit', 'fullName').cacheable(),
}) ;

Scheduler.RESOURCE_STATES_QUERY = SC.Query.create({recordType: Scheduler.ResourceState});
