// ==========================================================================
// Project:   Calendar
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Calendar = SC.Application.create(
  /** @scope Calendar.prototype */ {

  NAMESPACE: 'Calendar',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  //store: SC.Store.create().from(SC.Record.fixtures)
  store: SC.Store.create({
  	commitRecordsAutomatically: NO
  }).from('Calendar.DataSource'),
  
  // is the current user an admin?
  admin: null
}) ;
