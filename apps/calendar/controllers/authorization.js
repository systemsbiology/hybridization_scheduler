// ==========================================================================
// Project:   Calendar.authorizationController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Calendar.authorizationController = SC.ObjectController.create(
/** @scope Calendar.authorizationController.prototype */ {

  checkAuthorization: function() {
    SC.Request.getUrl('/scheduler/authorization.json')
      .header({'Accept': 'application/json'}).json()
      .notify(this, 'didCheckAuthorization')
      .send();
  },

  didCheckAuthorization: function(response) {
    if(SC.ok(response)) {
      if( response.get('body').role == "admin" ) Calendar.set('admin', YES);
      else Calendar.set('admin', NO);
    } 
  }
}) ;
