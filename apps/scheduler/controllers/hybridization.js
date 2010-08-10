// ==========================================================================
// Project:   Scheduler.hybridizationController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Scheduler.hybridizationController = SC.ObjectController.create(
/** @scope Scheduler.hybridizationController.prototype */ {

  cancel: function() {
    // discard the reservation that was being created
    this.get('content').destroy();
    Scheduler.getPath('mainPage.addReservation').remove() ;
  },

  save: function() {
    Scheduler.store.commitRecords();
    Scheduler.getPath('mainPage.addReservation').remove() ;
  },

  sampleTypeChoices: function() {
    return Scheduler.store.find(Scheduler.SampleType);
  }.property().cacheable(),

  sampleTypeLayout: function() {
    var choices = this.get('sampleTypeChoices').get('length');

    return { left: 150, top: 142, height: choices*28, width: 300 };
  }.property().cacheable(),
}) ;
