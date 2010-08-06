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
    childViews: 'toolbar calendar'.w(),
    
	toolbar: SC.ToolbarView.design({
	  layout: { width: 802, height: 40, centerX: 0, centerY: -250 },
	  
	  childViews: 'leftButton appTitle rightButton'.w(),

      leftButton: SC.ButtonView.design({
	    layout: { left: 10, centerY: 0, width: 44, height: 24 },
	    titleMinWidth: 36,
	    icon: 'arrow_left',
		
		target: 'Scheduler.daysController',
		action: 'backward'	
	  }),	
	  
	  appTitle: SC.LabelView.design({
	  	layout: { width: 400, height: 24, centerX: 0, centerY: 0 },
		controlSize: SC.LARGE_CONTROL_SIZE,
		textAlign: SC.ALIGN_CENTER,
	  	value: 'Hybridization Scheduler'
	  }),
	  
	  rightButton: SC.ButtonView.design({
	    layout: { right: 10, centerY: 0, width: 44, height: 24 },
	    titleMinWidth: 36,
	    icon: 'arrow_right',
		
		target: 'Scheduler.daysController',
		action: 'forward'	
	  }),	
	}),
	
	calendar: SC.GridView.design(SC.Border, {
	  layout: { width: 802, height: 502, centerX: 0, centerY: 20 },
	  
	  columnWidth: 200,
	  rowHeight: 250,
	  
	  contentBinding: 'Scheduler.daysController.arrangedObjects',
	  exampleView: Scheduler.DayView
	})
  })

});
