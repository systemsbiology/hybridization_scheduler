// ==========================================================================
// Project:   Scheduler - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

// This page describes the main user interface for your application.  
Scheduler.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'leftButton calendar rightButton'.w(),
    
	leftButton: SC.ButtonView.design({
	  	
	}),
	
	calendar: SC.GridView.design(SC.Border, {
	  layout: { width: 802, height: 502, centerX: 0, centerY: 0 },
	  
	  columnWidth: 200,
	  rowHeight: 250,
	  
	  contentBinding: 'Scheduler.daysController.arrangedObjects',
	  exampleView: Scheduler.DayView
	})
  })

});
