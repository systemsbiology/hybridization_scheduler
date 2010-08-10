// ==========================================================================
// Project:   Scheduler
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Scheduler.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  Scheduler.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!
  Scheduler.store.find(Scheduler.SAMPLE_TYPES_QUERY);
  Scheduler.store.find(Scheduler.REQUIREMENTS_QUERY);
  Scheduler.store.find(Scheduler.RESERVATIONS_QUERY);
  Scheduler.store.find(Scheduler.RESOURCES_QUERY);
  Scheduler.store.find(Scheduler.RESOURCE_STATES_QUERY);

} ;

function main() { Scheduler.main(); }
