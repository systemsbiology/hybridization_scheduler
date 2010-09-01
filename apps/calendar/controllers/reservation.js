// ==========================================================================
// Project:   Calendar.reservationController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Calendar */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Calendar.reservationController = SC.ObjectController.create(
/** @scope Calendar.reservationController.prototype */ {

  day: null,

  cancel: function() {
    // discard the reservation that was being created
    this.get('content').destroy();
    Calendar.getPath('mainPage.addReservation').remove() ;
  },

  save: function() {
    if( this.get('isValid') ) {
      Calendar.store.commitRecords();
      Calendar.getPath('mainPage.addReservation').remove() ;
    } else {
      SC.AlertPane.warn("Please enter all fields in the form.");
    }
  },

  sampleTypeChoices: function() {
    var ret = [],
        day = this.get('day'),
        types = Calendar.store.find(Calendar.SampleType);

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

    return { height: choices*28 };
  }.property().cacheable(),

}) ;
