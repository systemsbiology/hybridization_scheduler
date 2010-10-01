// ==========================================================================
// Project:   Calendar - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

// This page describes the main user interface for your application.  
Calendar.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'sceneView'.w(),

    sceneView: SC.SceneView.design({
      scenes: "loading ready".w(),
      nowShowingBinding: "Calendar.currentScene"
    }),
  }),

  loading: SC.View.design({
    childViews: 'message'.w(),

    message: SC.LabelView.design({
      layout: { width: 400, height: 32, centerX: 0, centerY: 0 },
      controlSize: SC.LARGE_CONTROL_SIZE,
      fontWeight: SC.BOLD_WEIGHT,
      textAlign: SC.ALIGN_CENTER,
      value: 'Loading...'
    })
  }),

  ready: SC.View.design({
    childViews: 'toolbar calendar'.w(),
    
    toolbar: SC.ToolbarView.design({
      layout: { width: 802, height: 40, centerX: 0, centerY: -250 },
      
      childViews: 'leftButton appTitle refreshButton rightButton'.w(),

      leftButton: SC.ButtonView.design({
        layout: { left: 10, centerY: 0, width: 44, height: 24 },
        titleMinWidth: 36,
        icon: 'arrow_left',
        target: 'Calendar.daysController',
        action: 'backward'	
      }),	
      
      appTitle: SC.LabelView.design({
        layout: { width: 400, height: 24, centerX: 0, centerY: 0 },
        controlSize: SC.LARGE_CONTROL_SIZE,
        textAlign: SC.ALIGN_CENTER,
        value: 'Hybridization Calendar'
      }),
      
      refreshButton: SC.ButtonView.design({
        layout: { left: 520, width: 100, centerY: 0, height: 24 },
        title: 'Refresh',
        target: 'Calendar.initialDataController',
        action: 'refreshReservations'
      }),

      rightButton: SC.ButtonView.design({
        layout: { right: 10, centerY: 0, width: 44, height: 24 },
        titleMinWidth: 36,
        icon: 'arrow_right',
        target: 'Calendar.daysController',
        action: 'forward'	
      }),	
    }),
    
    calendar: SC.GridView.design(SC.Border, {
      firstResponder: 'Calendar.daysController',

      layout: { width: 802, height: 502, centerX: 0, centerY: 20 },
      
      columnWidth: 200,
      rowHeight: 250,
      
      contentBinding: 'Calendar.daysController.arrangedObjects',
      exampleView: Calendar.DayView
    })
  }),

  // Using create here instead of design so that SCUI.DatePickerView's init method
  // runs prior to setting the content for the hybridization controller. Otherwise,
  // date field gets initialized to null the first time the pane is displayed (but
  // not subsequent times).
  reservation: SC.PanelPane.create({
    layout: { centerX: 0, centerY: 0, width: 450, height: 500 },

    contentView: SC.View.design({
      childViews: 'title dateField dateLabel sampleTypeLabel sampleTypeFields descriptionLabel descriptionField numberOfSamplesField numberOfSamplesLabel numberOfChipsField numberOfChipsLabel warningMessage infoMessage deleteButton blockButton cancelButton saveButton'.w(),

      title: SC.LabelView.design({
        layout: { centerX: 0, top: 10, width: 200, height: 32 },
        textAlign: SC.ALIGN_CENTER,
        controlSize: SC.LARGE_CONTROL_SIZE,

        valueBinding: 'Calendar.reservationController.dialogTitle'
      }),

      dateLabel: SC.LabelView.design({
        layout: { left: 20, top: 50, width: 100, height: 24 },

        value: 'Date'
      }),

      dateField: SCUI.DatePickerView.design({
        layout: { left: 150, top: 50, height: 24, width: 120 },
        dateFormat: '%m/%d/%Y',
        dateBinding: 'Calendar.reservationController.reservationDate',
      }),

      sampleTypeLabel: SC.LabelView.design({
        layout: { left: 20, top: 170, height: 24, width: 120 },
        value: 'Sample Type',
      }),

      sampleTypeFields: SC.ScrollView.design({
        layout: { left: 150, top: 170, height: 120, right: 10 },
        borderStyle: SC.BORDER_NONE,

        contentView: SC.RadioView.design({
          layoutBinding: 'Calendar.reservationController.sampleTypeLayout',

          itemsBinding: 'Calendar.reservationController.sampleTypeChoices',
          itemTitleKey: 'name',
          itemValueKey: 'type',
          itemIsEnabledKey: 'enabled',
          valueBinding: 'Calendar.reservationController.sampleType',
        })
      }),

      infoMessage: SC.LabelView.design({
        layout: { left: 20, right: 20, top: 300, height: 60 },
        iconBinding: 'Calendar.reservationController.infoIcon',
        valueBinding: 'Calendar.reservationController.infoMessage'
      }),
        
      warningMessage: SC.LabelView.design({
        layout: { left: 20, right: 20, top: 370, bottom: 40 },
        iconBinding: 'Calendar.reservationController.warningIcon',
        valueBinding: 'Calendar.reservationController.warningMessage'
      }),
        
      descriptionLabel: SC.LabelView.design({
        layout: { left: 20, top: 86, height: 20, width: 120 },
        value: 'Description'
      }),

      descriptionField: SC.TextFieldView.design({
        layout: { left: 150, top: 86, width: 200, height: 20 },
        valueBinding: 'Calendar.reservationController.description'
      }),

      numberOfSamplesLabel: SC.LabelView.design({
        layout: { left: 20, top: 114, height: 20, width: 120 },
        value: 'Number of samples'
      }),

      numberOfSamplesField: SC.TextFieldView.design({
        layout: { left: 150, top: 114, width: 100, height: 20 },
        valueBinding: 'Calendar.reservationController.sampleNumber'
      }),

      numberOfChipsLabel: SC.LabelView.design({
        layout: { left: 20, top: 142, height: 20, width: 120 },
        value: 'Number of chips'
      }),

      numberOfChipsField: SC.TextFieldView.design({
        layout: { left: 150, top: 142, width: 100, height: 20 },
        valueBinding: 'Calendar.reservationController.chipNumber'
      }),

      deleteButton: SC.ButtonView.design({
        layout: { bottom: 10, left: 10, width: 100, height: 24 },
        title: 'Delete',
        target: 'Calendar.reservationController',
        action: 'destroy',
        isVisibleBinding: 'Calendar.reservationController.isEditing'
      }),

      blockButton: SC.ButtonView.design({
        layout: { bottom: 10, left: 120, width: 100, height: 24 },
        title: 'Block Day',
        target: 'Calendar.reservationController',
        action: 'block',
        isVisibleBinding: 'Calendar.admin'
      }),

      cancelButton: SC.ButtonView.design({
        layout: { bottom: 10, right: 120, width: 100, height: 24 },
        title: 'Cancel',
        target: 'Calendar.reservationController',
        action: 'cancel',
      }),

      saveButton: SC.ButtonView.design({
        layout: { bottom: 10, right: 10, width: 100, height: 24 },
        title: 'Save',
        isDefault: YES,
        isEnabledBinding: 'Calendar.reservationController.canSave',
        target: 'Calendar.reservationController',
        action: 'save'
      })
    })
  }),
});
