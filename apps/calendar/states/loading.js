// ==========================================================================
// Project:   Calendar.LOADING
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  Loading initial data from the back end

  @extends SC.Responder
  @version 0.1
*/
Calendar.LOADING = SC.Responder.create(
/** @scope Calendar.LOADING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    Calendar.initialDataController.load();
  },
  
  willLoseFirstResponder: function() {
    // Called when this state loses first responder
  },
  
  // ..........................................................
  // EVENTS
  //
  
  loadingComplete: function() {
    var ready = YES,
        results = Calendar.initialDataController.get('results');

    results.forEach( function(result) {
      if( !(result.get('status') & SC.Record.READY) ) ready = NO;
    });

    if(ready) Calendar.makeFirstResponder(Calendar.READY);
  }
  
}) ;
