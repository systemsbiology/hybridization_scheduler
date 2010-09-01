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

  isEditing: function() {
    var reservation = this.get('content');

    if(reservation && reservation.get('status') === SC.Record.READY_CLEAN) return YES
    else return NO
  }.property().cacheable(),

  dialogTitle: function() {
    if( this.get('isEditing') ) return "Edit Hybridization"
    else return "Add Hybridization"
  }.property().cacheable(),

  cancel: function() {
    var reservation = this.get('content');

    if(reservation.get('status') === SC.Record.READY_NEW) {
      // discard the reservation that was being created
      reservation.destroy();
    }    

    Calendar.getPath('mainPage.reservation').remove() ;
  },

  destroy: function() {
    this.get('content').destroy();
    Calendar.store.commitRecords();
    Calendar.getPath('mainPage.reservation').remove() ;
  },

  save: function() {
    if( this.get('isValid') ) {
      Calendar.store.commitRecords();
      Calendar.getPath('mainPage.reservation').remove() ;
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

    return { height: choices*20 };
  }.property().cacheable(),

}) ;
