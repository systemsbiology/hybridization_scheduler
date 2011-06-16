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

  savedAttributes: null,

  isEditing: function() {
    var reservation = this.get('content');

    if(reservation && reservation.get('status') === SC.Record.READY_NEW) return NO;
    else return YES;
  }.property().cacheable(),

  dialogTitle: function() {
    if( this.get('isEditing') ) return "Edit Hybridization";
    else return "Add Hybridization";
  }.property().cacheable(),

  cancel: function() {
    var reservation = this.get('content');

    if(reservation.get('status') === SC.Record.READY_NEW) {
      // discard the reservation that was being created
      reservation.destroy();
    } else {
      // Make an SC.Object so that forEach can be used
      var attributes = this.get('savedAttributes');

      reservation.beginEditing();
      attributes.forEach( function(key) {
        reservation.writeAttribute(key, attributes[key]);
      });
      reservation.endEditing();
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

  block: function() {
    var reservation = this.get('content');
    reservation.set('blocking', true);

    Calendar.store.commitRecords();
    Calendar.getPath('mainPage.reservation').remove();
  },
  sampleTypeChoices: function() {
    var ret = [],
        day = this.get('day'),
        types = Calendar.store.find(Calendar.SampleType);

    types.forEach(function(type) {
      var availability;

      // Admins are all-powerful
      if( Calendar.get('admin') ) availability = YES;
      else availability = type.isAvailableForDay(day);

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
  }.property().cacheable()

}) ;
