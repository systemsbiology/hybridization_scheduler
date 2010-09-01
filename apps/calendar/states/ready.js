// ==========================================================================
// Project:   Calendar.READY
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  Ready to display the calendar UI

  @extends SC.Responder
  @version 0.1
*/
Calendar.READY = SC.Responder.create(
/** @scope Calendar.READY.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    Calendar.getPath('mainPage.mainPane').append() ;
  },
  
  willLoseFirstResponder: function() {
    // Called when this state loses first responder
  },
  
  // ..........................................................
  // EVENTS
  //
  
  // add event handlers here
  someAction: function() {
    
  }
  
}) ;
