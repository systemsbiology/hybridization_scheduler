// ==========================================================================
// Project:   Calendar.initialDataController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Calendar.initialDataController = SC.ObjectController.create(
/** @scope Calendar.initialDataController.prototype */ {

  results: [],

  load: function() {
    var results = [],
      queries = [
        Calendar.REQUIREMENTS_QUERY,
        Calendar.RESERVATIONS_QUERY,
        Calendar.RESOURCES_QUERY,
        Calendar.RESOURCE_STATES_QUERY,
        Calendar.SAMPLE_TYPES_QUERY
      ];

    queries.forEach( function(query) {
      var result = Calendar.store.find(query);
      result.addObserver('status', query, Calendar.LOADING.loadingComplete);
      results.pushObject(result);
    });

    this.set('results', results);
  }

}) ;
