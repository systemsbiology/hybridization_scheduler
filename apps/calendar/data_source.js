// ==========================================================================
// Project:   Calendar.DataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Calendar.DataSource = SC.DataSource.extend(
/** @scope Calendar.DataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {

    if (query === Calendar.SAMPLE_TYPES_QUERY) {
      SC.Request.getUrl('/scheduler/sample_types.json').header({
        'Accept': 'application/json'
      }).json().notify(this, 'didFetchQuery', store, query).send();

      return YES;
    } else if (query === Calendar.REQUIREMENTS_QUERY) {
      SC.Request.getUrl('/scheduler/requirements.json').header({
        'Accept': 'application/json'
      }).json().notify(this, 'didFetchQuery', store, query).send();

      return YES;
    } else if (query === Calendar.RESERVATIONS_QUERY) {
      SC.Request.getUrl('/scheduler/reservations.json').header({
        'Accept': 'application/json'
      }).json().notify(this, 'didFetchQuery', store, query).send();

      return YES;
    } else if (query === Calendar.RESOURCES_QUERY) {
      SC.Request.getUrl('/scheduler/resources.json').header({
        'Accept': 'application/json'
      }).json().notify(this, 'didFetchQuery', store, query).send();

      return YES;
    } else if (query === Calendar.RESOURCE_STATES_QUERY) {
      SC.Request.getUrl('/scheduler/resource_states.json').header({
        'Accept': 'application/json'
      }).json().notify(this, 'didFetchQuery', store, query).send();

      return YES;
    }

    return NO ; // return YES if you handled the query
  },

  didFetchQuery: function(response, store, query) {
  	if(SC.ok(response)) {
      store.loadRecords(query.recordType, response.get('body'));
      store.dataSourceDidFetchQuery(query);
    } else store.dataSourceDidErrorQuery(query, response);	
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    if (SC.kindOf(store.recordTypeFor(storeKey), Calendar.Reservation)) {
      SC.Request.postUrl('/scheduler/reservations.json')
        .header({
          'Accept': 'application/json'
        }).json()
        .notify(this, this.didCreateReservation, store, storeKey)
        .send( {reservation: store.readDataHash(storeKey)} );
      return YES;

    } else return NO;
  },
  
  didCreateReservation: function(response, store, storeKey) {
    if (SC.ok(response)) {
      var url = response.header('Location');
      store.dataSourceDidComplete(storeKey, response.get('body').reservation, url); // update url
   
    } else store.dataSourceDidError(storeKey, response);
  },

  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;