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
      firstResponder: 'Scheduler.daysController',

      layout: { width: 802, height: 502, centerX: 0, centerY: 20 },
      
      columnWidth: 200,
      rowHeight: 250,
      
      contentBinding: 'Scheduler.daysController.arrangedObjects',
      exampleView: Scheduler.DayView
    })
  }),

  // Using create here instead of design so that SCUI.DatePickerView's init method
  // runs prior to setting the content for the hybridization controller. Otherwise,
  // date field gets initialized to null the first time the pane is displayed (but
  // not subsequent times).
  addReservation: SC.PanelPane.create({
    layout: { centerX: 0, centerY: 0, width: 450, height: 400 },

    contentView: SC.View.design({
      childViews: 'title dateField dateLabel sampleTypeLabel sampleTypeFields numberOfSamplesField numberOfSamplesLabel numberOfChipsField numberOfChipsLabel cancelButton saveButton'.w(),

      title: SC.LabelView.design({
        layout: { centerX: 0, top: 10, width: 200, height: 32 },
        textAlign: SC.ALIGN_CENTER,
        controlSize: SC.LARGE_CONTROL_SIZE,

        value: 'Add Hybridizations'
      }),

      dateLabel: SC.LabelView.design({
        layout: { left: 20, top: 50, width: 100, height: 24 },

        value: 'Date'
      }),

      dateField: SCUI.DatePickerView.design({
        layout: { left: 150, top: 50, height: 24, width: 120 },
        dateFormat: '%m/%d/%Y',
        dateBinding: 'Scheduler.reservationController.reservationDate',
      }),

      sampleTypeLabel: SC.LabelView.design({
        layout: { left: 20, top: 142, height: 24, width: 120 },
        value: 'Sample Type',
      }),

      sampleTypeFields: SC.RadioView.design({
        layoutBinding: 'Scheduler.reservationController.sampleTypeLayout',

        itemsBinding: 'Scheduler.reservationController.sampleTypeChoices',
        itemTitleKey: 'name',
        itemValueKey: 'type',
        valueBinding: 'Scheduler.reservationController.sampleType',
      }),

      numberOfSamplesLabel: SC.LabelView.design({
        layout: { left: 20, top: 86, height: 20, width: 120 },
        value: 'Number of samples'
      }),

      numberOfSamplesField: SC.TextFieldView.design({
        layout: { left: 150, top: 86, width: 100, height: 20 },
        valueBinding: 'Scheduler.reservationController.sampleNumber'
      }),

      numberOfChipsLabel: SC.LabelView.design({
        layout: { left: 20, top: 114, height: 20, width: 120 },
        value: 'Number of chips'
      }),

      numberOfChipsField: SC.TextFieldView.design({
        layout: { left: 150, top: 114, width: 100, height: 20 },
        valueBinding: 'Scheduler.reservationController.chipNumber'
      }),

      cancelButton: SC.ButtonView.design({
        layout: { bottom: 10, right: 120, width: 100, height: 24 },
        title: 'Cancel',
        target: 'Scheduler.reservationController',
        action: 'cancel'
      }),

      saveButton: SC.ButtonView.design({
        layout: { bottom: 10, right: 10, width: 100, height: 24 },
        title: 'Save',
        isDefault: YES,
        target: 'Scheduler.reservationController',
        action: 'save'
      })
    })
  }),
});
