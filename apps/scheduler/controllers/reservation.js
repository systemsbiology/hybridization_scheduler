// ==========================================================================
// Project:   Scheduler.reservationController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Scheduler */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Scheduler.reservationController = SC.ObjectController.create(
/** @scope Scheduler.reservationController.prototype */ {

  day: null,

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
    var ret = [],
        day = Scheduler.reservationController.get('day'),
        types = Scheduler.store.find(Scheduler.SampleType);

    types.forEach(function(type) {
      var availability = type.isAvailableForDay(day);

      ret.pushObject(SC.Object.create({
        type: type,
        enabled: availability,
        name: type.get('name')  
      }));
    });

    return ret;
  }.property().cacheable(),

  sampleTypeLayout: function() {
    var choices = this.get('sampleTypeChoices').get('length');

    return { left: 150, top: 142, height: choices*28, width: 300 };
  }.property().cacheable(),

}) ;
