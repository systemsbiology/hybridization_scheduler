// ==========================================================================
// Project:   Calendar
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

sc_require('states/loading');

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Calendar.main = function main() {

  Calendar.getPath('mainPage.mainPane').append() ;

  Calendar.makeFirstResponder(Calendar.LOADING);

} ;

function main() { Calendar.main(); }
